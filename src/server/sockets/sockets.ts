import { Server as HttpServer } from 'http';
import { RemoteSocket, Server, Socket } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Board, GameState } from '@/types/board';
import { makeNewBoard } from '@/factories/board';
import { obscureBoardInfo } from '../obscureBoardInfo';

import {
    DeckListSelections,
    GUEST_NAME_PREFIX,
    PREMADE_DECKLIST_DEFAULT,
} from '@/constants/lobbyConstants';
import {
    ClientToServerEvents,
    DetailedRoom,
    ResolveEffectParams,
    RoomOptions,
    ServerToClientEvents,
} from '@/types';
import { applyGameAction, applyWinState, passTurn } from '../gameEngine';
import { resolveEffect } from '../resolveEffect';
import { makePlayerChatMessage, makeSystemChatMessage } from '@/factories/chat';
import { Format, GameResult } from '@/types/games';
import { calculateGameResult } from '@/factories/games';
import { Card, Skeleton } from '@/types/cards';
import { authorize, ExtendedSocket } from '../authorize';
import { auth0 } from '../auth0';
import {
    CreateGameResultsBody,
    DEFAULT_AVATAR_SOURCE_DOMAIN,
} from '@/types/api';
import { createMemorySessionStore, createRoomStore } from '../stores';

const SIGNING_SECRET = process.env.AUTH0_SIGNING_KEY;

interface CustomRemoteSocket<EmitEvents, SocketData>
    extends RemoteSocket<EmitEvents, SocketData> {
    sessionID: string;
    userID: string;
    username: string;
}

export const configureIo = (server: HttpServer) => {
    const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
        cors: {
            origin: ['https://admin.socket.io'],
            credentials: true,
        },
    });

    const sessionStore = createMemorySessionStore();
    const roomStore = createRoomStore({ sessionStore, io });

    instrument(io, {
        auth: false,
    });

    /* Persistent Session Storage */
    io.use((socket, next) => {
        const { sessionID } = socket.handshake.auth;
        if (sessionID) {
            const session = sessionStore.findSession(sessionID);
            if (session) {
                socket.sessionID = sessionID;
                socket.userID = session.userID;
                socket.username = session.username;
                return next();
            }
        }

        const { username } = socket.handshake.auth;
        if (!username) {
            return next(new Error('invalid username'));
        }

        socket.sessionID = uuidv4();
        socket.userID = uuidv4();
        socket.username = username;
        return next();
    });

    /* Stateful Objects */
    let latestResults: GameResult[] = [];

    const namesToAvatars = new Map<string, string>(); // usernames to avatars chosen
    const nameToDeckListSelection = new Map<string, DeckListSelections>();
    const nameToCustomDeckSkeleton = new Map<string, Skeleton>();
    const startedBoards = new Map<string, Board>();
    const roomNameToRoomOptions = new Map<string, RoomOptions>();

    /* Utility functions */
    const clearName = (username: string) => {
        if (!username) return;
        namesToAvatars.delete(username);
        nameToDeckListSelection.delete(username);
        nameToCustomDeckSkeleton.delete(username);
    };

    const getDeckListSelectionsFromNames = (playerNames: string[]) => {
        return playerNames.map((playerName) =>
            nameToDeckListSelection.get(playerName)
        );
    };

    const addGameResult = (gameResult: GameResult | null): void => {
        if (gameResult) {
            latestResults.push(gameResult);
            latestResults = latestResults.slice(-20);
            io.emit('listLatestGameResults', latestResults);
        }
    };

    const recordGameResultToDatabase = async (
        gameResult: GameResult | null
    ): Promise<void> => {
        if (!gameResult) {
            return;
        }

        const { nonWinners, winners } = gameResult;

        const guests = [...nonWinners, ...winners]
            .filter((name) => name.startsWith(GUEST_NAME_PREFIX))
            .map((name) => name.slice(GUEST_NAME_PREFIX.length));

        const loggedInUsers = [...nonWinners, ...winners].filter(
            (name) => !name.startsWith(GUEST_NAME_PREFIX)
        );

        const winningGuests = winners
            .filter((name) => name.startsWith(GUEST_NAME_PREFIX))
            .map((name) => name.slice(GUEST_NAME_PREFIX.length));
        const winningUsers = winners.filter(
            (name) => !name.startsWith(GUEST_NAME_PREFIX)
        );

        // posts a game result over to the DB server (https://github.com/lijim/monks-and-mages-db-service)
        await axios.post<unknown, unknown, CreateGameResultsBody>(
            `${process.env.API_DOMAIN}/game_results`,
            { guests, usernames: loggedInUsers, winningGuests, winningUsers },
            {
                headers: {
                    'X-API-KEY': `${process.env.API_KEY}`,
                },
            }
        );
    };

    /**
     * Sockets have their own rooms, but we want to expose just the one
     * that players have joined (public rooms)
     * @param socket - socket.io socket
     * @returns matching room
     */
    const getRoomForSocket = (socket: Socket): string | null => {
        const firstRoomName = [...socket.rooms].filter(
            (room) =>
                room.startsWith('public-') || room.startsWith('publicSpectate-')
        )[0];
        return firstRoomName || null;
    };

    const getBoardForSocket = (socket: Socket): Board | null => {
        const firstRoomName = getRoomForSocket(socket);
        if (!firstRoomName) return null;
        const board = startedBoards.get(firstRoomName);
        return board;
    };

    const getFormatForRoom = (roomName: string) => {
        return roomNameToRoomOptions.has(roomName)
            ? roomNameToRoomOptions.get(roomName).format
            : Format.STANDARD;
    };

    const sendChatMessageForRoom =
        (socket: Socket) => (chatMessage: string) => {
            const firstRoomName = getRoomForSocket(socket);
            const systemMessage = makeSystemChatMessage(chatMessage);
            io.sockets.in(firstRoomName).emit('gameChatMessage', systemMessage);
            io.to(
                `publicSpectate-${firstRoomName.slice('public-'.length)}`
            ).emit('gameChatMessage', systemMessage);
        };

    const displayLastPlayedCardForRoom = (socket: Socket) => (card: Card) => {
        const firstRoomName = getRoomForSocket(socket);
        io.sockets.in(firstRoomName).emit('displayLastPlayedCard', card);
        io.to(`publicSpectate-${firstRoomName.slice('public-'.length)}`).emit(
            'displayLastPlayedCard',
            card
        );
    };

    const disconnectFromGame = async (
        socket: Socket<ClientToServerEvents, ServerToClientEvents>
    ) => {
        const board = getBoardForSocket(socket);
        const roomName = getRoomForSocket(socket);
        const name = socket.username;
        if (board) {
            const player = board.players.find((p) => p.name === name);

            if (player) {
                sendChatMessageForRoom(socket)(
                    `${player.name} has left the game`
                );
                player.health = 0;
                player.isAlive = false;
                player.effectQueue = [];
            }

            if (player?.isActivePlayer) {
                passTurn(board);
            }

            const playerLeft = board.players.find((p) => p.isAlive);
            // update win state if there are only 1 players alive left
            const prevGameState = board.gameState;
            applyWinState(board);
            const gameResult = calculateGameResult(prevGameState, board);
            addGameResult(gameResult);
            if (!playerLeft) {
                startedBoards.delete(roomName);
            } else {
                await roomStore.broadcastBoardForRoom(roomName);
            }
        }
    };

    io.on(
        'connection',
        async (
            socket: ExtendedSocket<ClientToServerEvents, ServerToClientEvents>
        ) => {
            // persist session
            sessionStore.saveSession(socket.sessionID, {
                userID: socket.userID,
                username: socket.username,
                connected: true,
            });

            // emit session details
            socket.emit('session', {
                sessionID: socket.sessionID,
                userID: socket.userID,
                username: socket.username,
            });

            roomStore.broadcastRoomsForSocket(socket);
            socket.emit('listLatestGameResults', latestResults);

            socket.on('login', (accessToken) => {
                authorize<ClientToServerEvents, ServerToClientEvents>({
                    accessToken,
                    secret: SIGNING_SECRET,
                    onAuthentication: async (decodedToken) => {
                        if (typeof decodedToken === 'string') return '';
                        try {
                            const user = await auth0.getUser({
                                id: decodedToken.sub,
                            });
                            const { username: name, user_id: userId } = user;
                            socket.username = name;
                            socket.userID = userId;
                            sessionStore.saveSession(socket.sessionID, {
                                userID: socket.userID,
                                username: name,
                                connected: true,
                            });

                            // emit session details
                            socket.emit('session', {
                                sessionID: socket.sessionID,
                                userID: socket.userID,
                                username: socket.username,
                            });
                            clearName(socket.username);
                            nameToDeckListSelection.set(
                                name,
                                PREMADE_DECKLIST_DEFAULT
                            );
                            socket.emit(
                                'confirmPremadeDeckList',
                                PREMADE_DECKLIST_DEFAULT
                            );
                            socket.emit('confirmName', name);
                            socket.emit('confirmAuth0Id', userId);
                        } catch (e) {
                            // eslint-disable-next-line no-console
                            console.error(e);
                        }
                        return decodedToken.sub;
                    },
                    // eslint-disable-next-line no-console
                })(socket, console.log);
                clearName(socket.username);
            });

            socket.on('chooseCustomDeck', (skeleton: Skeleton) => {
                if (!socket.username) return;
                nameToCustomDeckSkeleton.set(socket.username, skeleton);
                socket.emit('confirmCustomDeck', skeleton);
            });

            socket.on('chooseAvatar', (avatarUrl: string) => {
                if (!socket.username) return;
                if (!avatarUrl.startsWith(DEFAULT_AVATAR_SOURCE_DOMAIN)) {
                    return;
                }
                namesToAvatars.set(socket.username, avatarUrl);
            });

            socket.on('chooseDeck', (deckListSelection: DeckListSelections) => {
                if (!socket.username) return;
                nameToDeckListSelection.set(socket.username, deckListSelection);
                socket.emit('confirmPremadeDeckList', deckListSelection);
                // clear any previous custom decks
                nameToCustomDeckSkeleton.delete(socket.username);
                socket.emit('confirmCustomDeck', null);
            });

            socket.on('chooseGameFormat', async (format: Format) => {
                const roomName = getRoomForSocket(socket);
                if (!roomName) {
                    return;
                }
                if (roomNameToRoomOptions.has(roomName)) {
                    roomNameToRoomOptions.get(roomName).format = format;
                } else {
                    roomNameToRoomOptions.set(roomName, {
                        format,
                    });
                }
                // emit to all rooms the new room settings
                roomStore.broadcastRooms();
            });

            socket.on('chooseName', async (newName: string) => {
                const name = newName ? `${GUEST_NAME_PREFIX}${newName}` : '';
                clearName(socket.username);
                nameToDeckListSelection.set(name, PREMADE_DECKLIST_DEFAULT);
                socket.emit('confirmPremadeDeckList', PREMADE_DECKLIST_DEFAULT);
                socket.emit('confirmName', name);
            });

            socket.on('joinRoom', async ({ roomName }) => {
                if (!roomName) return; // blank-string room name not allowed

                roomStore.joinRoom({ socket, asSpectator: false, roomName });
                roomStore.broadcastRooms();
                socket.join(`public-${roomName}`);
            });

            socket.on('leaveRoom', async () => {
                roomStore.disconnectSocketFromRoom(socket);
                const prevRoom = getRoomForSocket(socket);
                if (prevRoom) {
                    await disconnectFromGame(socket);
                    await socket.leave(prevRoom);
                }
                roomStore.broadcastRooms();
            });

            socket.on('spectateRoom', async (roomName) => {
                if (!roomName) return; // blank-string room name not allowed
                const prevRoom = getRoomForSocket(socket);
                await socket.join(`publicSpectate-${roomName}`);
                if (prevRoom) {
                    await disconnectFromGame(socket);
                    await socket.leave(prevRoom);
                }
                roomStore.broadcastRooms();
            });

            socket.on('startGame', async () => {
                // TODO: handle race condition where 2 people start game at same time
                const roomName = getRoomForSocket(socket);
                if (!roomName) return;

                const sockets = await io.in(roomName).fetchSockets();
                const playerNames = [...sockets].map(
                    (remoteSocket) =>
                        (
                            remoteSocket as CustomRemoteSocket<
                                ServerToClientEvents,
                                unknown
                            >
                        ).username
                );

                const avatarsForPlayers =
                    {} as DetailedRoom['avatarsForPlayers'];
                playerNames.forEach((player) => {
                    avatarsForPlayers[player] = namesToAvatars.get(player);
                });
                const playerDeckListSelections =
                    getDeckListSelectionsFromNames(playerNames);
                const format = getFormatForRoom(roomName);

                const board = makeNewBoard({
                    playerDeckListSelections,
                    playerNames,
                    nameToCustomDeckSkeleton,
                    avatarsForPlayers,
                    format,
                });

                if (format === Format.DRAFT) {
                    board.gameState = GameState.DRAFTING;
                } else if (format === Format.SEALED) {
                    board.gameState = GameState.DECKBUILDING;
                } else {
                    board.gameState = GameState.MULLIGANING;
                }

                startedBoards.set(roomName, board);
                io.to(roomName).emit('startGame');
                io.to(
                    `publicSpectate-${roomName.slice('public-'.length)}`
                ).emit('startGame');
                roomStore.broadcastRooms();
            });

            socket.on('takeGameAction', async (gameAction) => {
                const board = getBoardForSocket(socket);
                const roomName = getRoomForSocket(socket);
                const playerName = socket.username;
                if (!board || !playerName) {
                    // TODO: add error handling emits down to the client, display via error toasts
                    return;
                }

                const prevGameState = board.gameState;

                if (
                    prevGameState === GameState.WIN ||
                    prevGameState === GameState.TIE
                ) {
                    return;
                }

                const newBoardState = applyGameAction({
                    board,
                    gameAction,
                    playerName,
                    addChatMessage: sendChatMessageForRoom(socket),
                    displayLastCard: displayLastPlayedCardForRoom(socket),
                }); // calculate new state after actions is taken
                const gameResult = calculateGameResult(
                    prevGameState,
                    newBoardState
                );
                if (gameResult) {
                    addGameResult(gameResult);
                    recordGameResultToDatabase(gameResult);
                }

                // TODO: add error handling when user tries to take an invalid action
                startedBoards.set(roomName, newBoardState); // apply state changes to in-memory storage of boards
                await roomStore.broadcastBoardForRoom(roomName); // update clients with changes
            });

            socket.on(
                'resolveEffect',
                async (effectParams: ResolveEffectParams) => {
                    const board = getBoardForSocket(socket);
                    const roomName = getRoomForSocket(socket);
                    const playerName = socket.username;

                    if (!board) return;

                    const prevGameState = board.gameState;

                    if (
                        prevGameState === GameState.WIN ||
                        prevGameState === GameState.TIE
                    ) {
                        return;
                    }

                    const newBoardState = resolveEffect(
                        board,
                        effectParams,
                        playerName,
                        true,
                        sendChatMessageForRoom(socket)
                    );

                    if (newBoardState) {
                        startedBoards.set(roomName, newBoardState);
                        await roomStore.broadcastBoardForRoom(roomName);

                        const gameResult = calculateGameResult(
                            prevGameState,
                            newBoardState
                        );
                        if (gameResult) {
                            addGameResult(gameResult);
                            recordGameResultToDatabase(gameResult);
                        }
                    }
                }
            );

            socket.on('sendChatMessage', (message: string) => {
                // TODO: handle race condition where 2 people start game at same time
                const roomName = getRoomForSocket(socket);
                const playerName = socket.username;
                if (!roomName?.startsWith('public-') || !playerName) return;

                io.to(roomName).emit(
                    'gameChatMessage',
                    makePlayerChatMessage({
                        message,
                        playerName,
                    })
                );
                io.to(
                    `publicSpectate-${roomName.slice('public-'.length)}`
                ).emit(
                    'gameChatMessage',
                    makePlayerChatMessage({
                        message,
                        playerName,
                    })
                );
            });

            socket.on('disconnecting', async (reason) => {
                const matchingSockets = await io.in(socket.id).allSockets();
                const isDisconnected = matchingSockets.size === 0;

                if (isDisconnected) {
                    sessionStore.saveSession(socket.sessionID, {
                        userID: socket.userID,
                        username: socket.username,
                        connected: false,
                    });
                }

                if (
                    [
                        'client namespace disconnect',
                        'server namespace disconnect',
                    ].includes(reason)
                ) {
                    disconnectFromGame(socket);
                    clearName(socket.username);
                }
                roomStore.broadcastRooms();
            });
        }
    );

    // TODO: implement these
    io.of('/').adapter.on('delete-room', () => {});
    io.of('/').adapter.on('join-room', () => {});
    io.of('/').adapter.on('leave-room', () => {});

    return io;
};
