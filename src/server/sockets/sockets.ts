import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import axios from 'axios';
import { Board, GameState } from '@/types/board';
import { makeNewBoard } from '@/factories/board';
import { obscureBoardInfo } from '../obscureBoardInfo';

import {
    DeckListSelections,
    DEFAULT_ROOM_NAMES,
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

const SIGNING_SECRET = process.env.AUTH0_SIGNING_KEY;

export const configureIo = (server: HttpServer) => {
    const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
        cors: {
            origin: ['https://admin.socket.io'],
            credentials: true,
        },
    });

    instrument(io, {
        auth: false,
    });

    /* Stateful Objects */
    let latestResults: GameResult[] = [];

    const idsToNames = new Map<string, string>(); // mapping of socket ids to user-chosen names
    const namesToIds = new Map<string, string>(); // reverse map of idsToNames
    const namesToAvatars = new Map<string, string>(); // usernames to avatars chosen
    const nameToDeckListSelection = new Map<string, DeckListSelections>();
    const nameToCustomDeckSkeleton = new Map<string, Skeleton>();
    const startedBoards = new Map<string, Board>();
    const roomNameToRoomOptions = new Map<string, RoomOptions>();

    /* Utility functions */
    const clearName = (idToMatch: string) => {
        const matchingName = [...namesToIds.entries()].find(
            ([, id]) => id === idToMatch
        );
        if (!matchingName) return;
        namesToIds.delete(matchingName[0]);
        namesToAvatars.delete(matchingName[0]);
        nameToDeckListSelection.delete(matchingName[0]);
        nameToCustomDeckSkeleton.delete(matchingName[0]);
        idsToNames.delete(idToMatch);
    };

    const getNamesFromIds = (ids: string[]): string[] => {
        const names = [] as string[];
        ids.forEach((id) => {
            if (idsToNames.has(id)) {
                names.push(idsToNames.get(id));
            }
        });
        return names;
    };

    const getDeckListSelectionsFromNames = (playerNames: string[]) => {
        return playerNames.map((playerName) =>
            nameToDeckListSelection.get(playerName)
        );
    };

    const sendBoardForRoom = (roomName: string): void => {
        const board = startedBoards.get(roomName);
        const socketIds = io.sockets.adapter.rooms.get(roomName);
        if (!socketIds?.size || !board) return;
        socketIds.forEach((socketId) => {
            const name = idsToNames.get(socketId);
            if (!name) return;
            io.to(socketId).emit('updateBoard', obscureBoardInfo(board, name));
        });
        // broadcast to spectators as well
        io.to(`publicSpectate-${roomName.slice('public-'.length)}`).emit(
            'updateBoard',
            obscureBoardInfo(board)
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

    const cleanupRooms = () => {
        const roomsAndIds = io.sockets.adapter.rooms;
        roomNameToRoomOptions.forEach((_, roomName) => {
            if (!roomsAndIds.has(roomName)) {
                roomNameToRoomOptions.delete(roomName);
            }
        });
    };

    // TODO: use adapters instead to get rooms => games
    // implement one that just retrieves shallowly all the rooms
    // implement one that retrieves the whole room's game

    // gets all public rooms + players in those rooms
    const getDetailedRooms = () => {
        const detailedRooms: DetailedRoom[] = [];
        const roomsAndIds = io.sockets.adapter.rooms;
        const defaultRoomNames = DEFAULT_ROOM_NAMES.map(
            (roomName) => `public-${roomName}`
        ).filter((roomName) => !roomsAndIds.has(roomName));

        // Process public rooms
        [...roomsAndIds.entries()].forEach(([roomName, socketIds]) => {
            if (!roomName.startsWith('public-')) return; // process public rooms

            const players = getNamesFromIds([...socketIds]);
            const avatarsForPlayers = {} as DetailedRoom['avatarsForPlayers'];
            players.forEach((player) => {
                avatarsForPlayers[player] = namesToAvatars.get(player);
            });

            const room: DetailedRoom = {
                roomName,
                players,
                hasStartedGame: startedBoards.has(roomName),
                spectators: [] as string[],
                avatarsForPlayers,
                format: getFormatForRoom(roomName),
            };
            detailedRooms.push(room);
        });

        // Process empty default rooms
        defaultRoomNames.forEach((roomName) => {
            const room: DetailedRoom = {
                roomName,
                players: [] as string[],
                hasStartedGame: false,
                spectators: [],
                avatarsForPlayers: {},
                format: Format.STANDARD,
            };
            detailedRooms.push(room);
        });

        // Process Spectators
        [...roomsAndIds.entries()].forEach(([roomName, socketIds]) => {
            if (!roomName.startsWith('publicSpectate-')) return;

            const sanitizedRoomName = roomName.slice('publicSpectate-'.length);
            let room = detailedRooms.find(
                (detailedRoom) =>
                    detailedRoom.roomName === `public-${sanitizedRoomName}`
            );
            if (!room) {
                const originalRoomName = `public-${sanitizedRoomName}`;
                room = {
                    roomName: originalRoomName,
                    players: [],
                    hasStartedGame: false,
                    spectators: [],
                    avatarsForPlayers: {},
                    format: getFormatForRoom(sanitizedRoomName),
                };
                detailedRooms.push(room);
            }
            room.spectators = getNamesFromIds([...socketIds]);
        });
        return detailedRooms;
    };

    const disconnectFromGame = (
        socket: Socket<ClientToServerEvents, ServerToClientEvents>,
        shouldClearName = true
    ) => {
        const board = getBoardForSocket(socket);
        const roomName = getRoomForSocket(socket);
        const name = idsToNames.get(socket.id);
        if (shouldClearName) clearName(socket.id);
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
                sendBoardForRoom(roomName);
            }
        }
        io.emit('listRooms', getDetailedRooms());
    };

    io.on(
        'connection',
        (
            socket: ExtendedSocket<ClientToServerEvents, ServerToClientEvents>
        ) => {
            socket.emit('listRooms', getDetailedRooms());
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
                            clearName(socket.id);
                            namesToIds.set(name, socket.id);
                            idsToNames.set(socket.id, name);
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
                clearName(socket.id);
            });

            socket.on('chooseCustomDeck', (skeleton: Skeleton) => {
                const name = idsToNames.get(socket.id);
                if (!name) return;
                nameToCustomDeckSkeleton.set(name, skeleton);
                socket.emit('confirmCustomDeck', skeleton);
            });

            socket.on('chooseAvatar', (avatarUrl: string) => {
                const name = idsToNames.get(socket.id);
                if (!name) return;
                if (!avatarUrl.startsWith(DEFAULT_AVATAR_SOURCE_DOMAIN)) {
                    return;
                }
                namesToAvatars.set(name, avatarUrl);
            });

            socket.on('chooseDeck', (deckListSelection: DeckListSelections) => {
                const name = idsToNames.get(socket.id);
                if (!name) return;
                nameToDeckListSelection.set(name, deckListSelection);
                socket.emit('confirmPremadeDeckList', deckListSelection);
                // clear any previous custom decks
                nameToCustomDeckSkeleton.delete(name);
                socket.emit('confirmCustomDeck', null);
            });

            socket.on('chooseGameFormat', (format: Format) => {
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
                io.emit('listRooms', getDetailedRooms());
            });

            socket.on('chooseName', (newName: string) => {
                const name = newName ? `${GUEST_NAME_PREFIX}${newName}` : '';
                // log out
                if (!name) {
                    disconnectFromGame(socket);
                    const roomName = getRoomForSocket(socket);
                    if (roomName) socket.leave(roomName);
                    io.emit('listRooms', getDetailedRooms());
                    socket.emit('confirmName', '');
                    // remove decklist on client
                    socket.emit('confirmPremadeDeckList', undefined);
                    return;
                }
                if (!namesToIds.has(name)) {
                    clearName(socket.id);
                    namesToIds.set(name, socket.id);
                    idsToNames.set(socket.id, name);
                    nameToDeckListSelection.set(name, PREMADE_DECKLIST_DEFAULT);
                    socket.emit(
                        'confirmPremadeDeckList',
                        PREMADE_DECKLIST_DEFAULT
                    );
                    socket.emit('confirmName', name);
                }
            });

            socket.on('getRooms', () => {
                socket.emit('listRooms', getDetailedRooms());
            });

            socket.on('joinRoom', ({ roomName }) => {
                if (!roomName) return; // blank-string room name not allowed
                const prevRoom = getRoomForSocket(socket);
                if (prevRoom) {
                    disconnectFromGame(socket, false);
                    socket.leave(prevRoom);
                }
                socket.join(`public-${roomName}`);
                io.emit('listRooms', getDetailedRooms());
            });

            socket.on('leaveRoom', () => {
                const prevRoom = getRoomForSocket(socket);
                if (prevRoom) {
                    disconnectFromGame(socket, false);
                    socket.leave(prevRoom);
                }
                cleanupRooms();
                io.emit('listRooms', getDetailedRooms());
            });

            socket.on('spectateRoom', (roomName) => {
                if (!roomName) return; // blank-string room name not allowed
                const prevRoom = getRoomForSocket(socket);
                if (prevRoom) {
                    disconnectFromGame(socket, false);
                    socket.leave(prevRoom);
                }
                cleanupRooms();
                socket.join(`publicSpectate-${roomName}`);
                io.emit('listRooms', getDetailedRooms());
            });

            socket.on('startGame', () => {
                // TODO: handle race condition where 2 people start game at same time
                const roomName = getRoomForSocket(socket);
                if (!roomName) return;

                const socketIds = io.sockets.adapter.rooms.get(roomName);
                const playerNames = getNamesFromIds([...socketIds]);

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
                sendBoardForRoom(roomName);
                io.emit('listRooms', getDetailedRooms());
            });

            socket.on('takeGameAction', (gameAction) => {
                const board = getBoardForSocket(socket);
                const roomName = getRoomForSocket(socket);
                const playerName = idsToNames.get(socket.id);
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
                sendBoardForRoom(roomName); // update clients with changes
            });

            socket.on('resolveEffect', (effectParams: ResolveEffectParams) => {
                const board = getBoardForSocket(socket);
                const roomName = getRoomForSocket(socket);
                const playerName = idsToNames.get(socket.id);

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
                    sendBoardForRoom(roomName);

                    const gameResult = calculateGameResult(
                        prevGameState,
                        newBoardState
                    );
                    if (gameResult) {
                        addGameResult(gameResult);
                        recordGameResultToDatabase(gameResult);
                    }
                }
            });

            socket.on('sendChatMessage', (message: string) => {
                // TODO: handle race condition where 2 people start game at same time
                const roomName = getRoomForSocket(socket);
                const playerName = idsToNames.get(socket.id);
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

            socket.on('disconnecting', () => {
                disconnectFromGame(socket);
                cleanupRooms();
            });
        }
    );

    // TODO: implement these
    io.of('/').adapter.on('delete-room', () => {});
    io.of('/').adapter.on('join-room', () => {});
    io.of('/').adapter.on('leave-room', () => {});

    return io;
};
