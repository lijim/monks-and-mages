import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import {
    DeckListSelections,
    GUEST_NAME_PREFIX,
    PLAYER_ROOM_PREFIX,
    PREMADE_DECKLIST_DEFAULT,
    SPECTATOR_ROOM_PREFIX,
} from '@/constants/lobbyConstants';
import {
    ClientToServerEvents,
    ResolveEffectParams,
    ServerToClientEvents,
} from '@/types';
import { makePlayerChatMessage } from '@/factories/chat';
import { Format, GameResult } from '@/types/games';
import { Skeleton } from '@/types/cards';
import { authorize, ExtendedSocket } from '../authorize';
import { auth0 } from '../auth0';
import {
    CreateGameResultsBody,
    DEFAULT_AVATAR_SOURCE_DOMAIN,
} from '@/types/api';
import { createMemorySessionStore, createRoomStore } from '../stores';

const SIGNING_SECRET = process.env.AUTH0_SIGNING_KEY;

export const configureIo = (server: HttpServer) => {
    const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
        cors: {
            origin: ['https://admin.socket.io'],
            credentials: true,
        },
    });

    const sessionStore = createMemorySessionStore();
    const roomStore = createRoomStore({ sessionStore, io });
    const {
        namesToAvatars,
        nameToDeckListSelection,
        nameToCustomDeckSkeleton,
    } = roomStore;

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

    /* Utility functions */
    const clearName = (username: string) => {
        if (!username) return;
        namesToAvatars.delete(username);
        nameToDeckListSelection.delete(username);
        nameToCustomDeckSkeleton.delete(username);
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

    const disconnectFromGame = async (
        socket: ExtendedSocket<ClientToServerEvents, ServerToClientEvents>
    ) => {
        await roomStore.disconnectFromGame({
            socket,
            addGameResult,
        });
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

            socket.on('chooseGameFormat', (format: Format) => {
                roomStore.chooseGameFormat(socket, format);
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
                socket.join(`${PLAYER_ROOM_PREFIX}${roomName}`);
            });

            socket.on('leaveRoom', async () => {
                roomStore.disconnectSocketFromRoom(socket);
                await disconnectFromGame(socket);
                roomStore.broadcastRooms();
            });

            socket.on('spectateRoom', async (roomName) => {
                if (!roomName) return; // blank-string room name not allowed
                roomStore.joinRoom({ socket, roomName, asSpectator: true });
                await socket.join(`${SPECTATOR_ROOM_PREFIX}${roomName}`);

                const prevRoom = roomStore.getRoomNameForSocket(socket);
                if (prevRoom) {
                    await disconnectFromGame(socket);
                }

                roomStore.broadcastRooms();
            });

            socket.on('startGame', async () => {
                await roomStore.startGameForSocket(socket);
                roomStore.broadcastRooms();
            });

            socket.on('rejoinGame', async () => {
                const room = roomStore.getCurrentRoom(socket);
                const roomName = room?.roomName;
                if (roomName) {
                    if (room.players.includes(socket.username)) {
                        await socket.join(`${PLAYER_ROOM_PREFIX}${roomName}`);
                    } else if (room.spectators.includes(socket.username)) {
                        await socket.join(
                            `${SPECTATOR_ROOM_PREFIX}${roomName}`
                        );
                    }
                    roomStore.broadcastBoardForRoom(roomName);
                }
            });

            socket.on('takeGameAction', async (gameAction) => {
                await roomStore.takeGameAction({
                    socket,
                    gameAction,
                    recordGameResultToDatabase,
                    addGameResult,
                });
            });

            socket.on(
                'resolveEffect',
                async (effectParams: ResolveEffectParams) => {
                    await roomStore.resolveEffectForSocket({
                        socket,
                        effectParams,
                        addGameResult,
                        recordGameResultToDatabase,
                    });
                }
            );

            socket.on('sendChatMessage', (message: string) => {
                // TODO: handle race condition where 2 people start game at same time
                const room = roomStore.getCurrentRoom(socket);
                if (!room) {
                    return;
                }
                const playerName = socket.username;
                if (!playerName || !room.players.includes(playerName)) {
                    return;
                }

                io.to(`${PLAYER_ROOM_PREFIX}${room.roomName}`).emit(
                    'gameChatMessage',
                    makePlayerChatMessage({
                        message,
                        playerName,
                    })
                );
                io.to(`${SPECTATOR_ROOM_PREFIX}${room.roomName}`).emit(
                    'gameChatMessage',
                    makePlayerChatMessage({
                        message,
                        playerName,
                    })
                );
            });

            socket.on('disconnect', async (reason) => {
                const room = roomStore.getCurrentRoom(socket);
                const matchingSockets = await io.in(socket.id).allSockets();
                const isDisconnected = matchingSockets.size === 0;

                if (isDisconnected) {
                    sessionStore.saveSession(socket.sessionID, {
                        userID: socket.userID,
                        username: socket.username,
                        connected: false,
                    });
                }

                // stop spectating any games
                if (room?.spectators.includes(socket.username)) {
                    roomStore.disconnectSocketFromRoom(socket);
                }

                // if nobody connected is left, clean the room out
                if (room && sessionStore.isEntireRoomDisconnected(room)) {
                    roomStore.removeRoomEntirely(room.roomName);
                }

                if (
                    [
                        'client namespace disconnect',
                        'server namespace disconnect',
                    ].includes(reason)
                ) {
                    await disconnectFromGame(socket);
                    roomStore.disconnectSocketFromRoom(socket);
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
