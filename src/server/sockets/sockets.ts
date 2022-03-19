import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import { Board, GameState } from '@/types/board';
import { makeNewBoard } from '@/factories/board';
import { obscureBoardInfo } from '../obscureBoardInfo';

import {
    DeckListSelections,
    DEFAULT_ROOM_NAMES,
} from '@/constants/lobbyConstants';
import {
    ClientToServerEvents,
    DetailedRoom,
    ResolveEffectParams,
    ServerToClientEvents,
} from '@/types';
import { applyGameAction } from '../gameEngine';
import { resolveEffect } from '../resolveEffect';
import { makeSystemChatMessage } from '@/factories/chat';

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

    const idsToNames = new Map<string, string>(); // mapping of socket ids to user-chosen names
    const namesToIds = new Map<string, string>(); // reverse map of idsToNames
    const nameToDeckListSelection = new Map<string, DeckListSelections>();
    const clearName = (idToMatch: string) => {
        const matchingName = [...namesToIds.entries()].find(
            ([, id]) => id === idToMatch
        );
        if (!matchingName) return;
        namesToIds.delete(matchingName[0]);
        nameToDeckListSelection.delete(matchingName[0]);
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

    const startedBoards = new Map<string, Board>();

    const sendBoardForRoom = (roomName: string): void => {
        const board = startedBoards.get(roomName);
        const socketIds = io.sockets.adapter.rooms.get(roomName);
        if (!socketIds?.size || !board) return;
        socketIds.forEach((socketId) => {
            const name = idsToNames.get(socketId);
            if (!name) return;
            io.to(socketId).emit('updateBoard', obscureBoardInfo(board, name));
        });
    };

    const getRoomForSocket = (socket: Socket): string | null => {
        const firstRoomName = [...socket.rooms].filter((room) =>
            room.startsWith('public-')
        )[0];
        return firstRoomName || null;
    };

    const getBoardForSocket = (socket: Socket): Board | null => {
        const firstRoomName = getRoomForSocket(socket);
        if (!firstRoomName) return null;
        const board = startedBoards.get(firstRoomName);
        return board;
    };

    const sendChatMessageForRoom =
        (socket: Socket) => (chatMessage: string) => {
            const firstRoomName = getRoomForSocket(socket);
            const systemMessage = makeSystemChatMessage(chatMessage);
            io.sockets.in(firstRoomName).emit('gameChatMessage', systemMessage);
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

        [...roomsAndIds.entries()].forEach(([roomName, socketIds]) => {
            if (!roomName.startsWith('public-')) return; // skip private rooms

            const room = {
                roomName,
                players: getNamesFromIds([...socketIds]),
                hasStartedGame: startedBoards.has(roomName),
            };
            detailedRooms.push(room);
        });

        defaultRoomNames.forEach((roomName) => {
            const room: DetailedRoom = {
                roomName,
                players: [] as string[],
                hasStartedGame: false,
            };
            detailedRooms.push(room);
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
            }

            const playerLeft = board.players.find((p) => p.isAlive);
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
        (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
            socket.emit('listRooms', getDetailedRooms());

            socket.on('chooseDeck', (deckListSelection: DeckListSelections) => {
                const name = idsToNames.get(socket.id);
                if (!name) return;
                nameToDeckListSelection.set(name, deckListSelection);
                socket.emit('confirmPremadeDeckList', deckListSelection);
            });

            socket.on('chooseName', (name: string) => {
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
                    socket.emit('confirmName', name);
                }
            });

            socket.on('getRooms', () => {
                socket.emit('listRooms', getDetailedRooms());
            });

            socket.on('joinRoom', (roomName) => {
                if (!roomName) return; // blank-string room name not allowed
                const prevRoom = getRoomForSocket(socket);
                if (prevRoom) {
                    disconnectFromGame(socket, false);
                    socket.leave(prevRoom);
                }
                socket.join(`public-${roomName}`);
                io.emit('listRooms', getDetailedRooms());
            });

            socket.on('startGame', () => {
                // TODO: handle race condition where 2 people start game at same time
                const roomName = getRoomForSocket(socket);
                if (!roomName) return;

                const socketIds = io.sockets.adapter.rooms.get(roomName);
                const playerNames = getNamesFromIds([...socketIds]);
                const playerDeckListSelections =
                    getDeckListSelectionsFromNames(playerNames);
                const board = makeNewBoard({
                    playerDeckListSelections,
                    playerNames,
                });
                board.gameState = GameState.MULLIGANING;
                startedBoards.set(roomName, board);
                io.to(roomName).emit('startGame');
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
                const newBoardState = applyGameAction({
                    board,
                    gameAction,
                    playerName,
                    addChatMessage: sendChatMessageForRoom(socket),
                }); // calculate new state after actions is taken
                // TODO: add error handling when user tries to take an invalid action
                startedBoards.set(roomName, newBoardState); // apply state changes to in-memory storage of boards
                sendBoardForRoom(roomName); // update clients with changes
            });

            socket.on('resolveEffect', (effectParams: ResolveEffectParams) => {
                const board = getBoardForSocket(socket);
                const roomName = getRoomForSocket(socket);
                const playerName = idsToNames.get(socket.id);
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
                }
            });

            socket.on('disconnecting', () => {
                disconnectFromGame(socket);
            });
        }
    );

    // TODO: implement these
    io.of('/').adapter.on('delete-room', () => {});
    io.of('/').adapter.on('join-room', () => {});
    io.of('/').adapter.on('leave-room', () => {});

    return io;
};
