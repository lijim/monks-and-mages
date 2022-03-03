import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import { Board } from '@/types/board';
import { makeNewBoard } from '@/factories/board';
import { obscureBoardInfo } from '../obscureBoardInfo';

import {
    ClientToServerEvents,
    DetailedRoom,
    ServerToClientEvents,
} from '@/types';

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
    const clearName = (idToMatch: string) => {
        const matchingName = [...namesToIds.entries()].find(
            ([, id]) => id === idToMatch
        );
        if (!matchingName) return;
        namesToIds.delete(matchingName[0]);
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

    // TODO: use adapters instead to get rooms => games
    // implement one that just retrieves shallowly all the rooms
    // implement one that retrieves the whole room's game

    // gets all public rooms + players in those rooms
    const getDetailedRooms = () => {
        const detailedRooms: DetailedRoom[] = [];
        const roomsAndIds = io.sockets.adapter.rooms;
        [...roomsAndIds.entries()].forEach(([roomName, socketIds]) => {
            if (!roomName.startsWith('public-')) return; // skip private rooms

            const room = {
                roomName,
                players: getNamesFromIds([...socketIds]),
                hasStartedGame: startedBoards.has(roomName),
            };
            detailedRooms.push(room);
        });
        return detailedRooms;
    };

    io.on(
        'connection',
        (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
            socket.emit('listRooms', getDetailedRooms());

            socket.on('chooseName', (name: string) => {
                if (!name) {
                    clearName(socket.id);
                    socket.rooms.forEach((room) => socket.leave(room));
                    io.emit('listRooms', getDetailedRooms());
                    socket.emit('confirmName', '');
                    return;
                }
                if (!namesToIds.has(name)) {
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
                socket.join(`public-${roomName}`);
                io.emit('listRooms', getDetailedRooms());
            });

            socket.on('startGame', () => {
                // TODO: handle race condition where 2 people start game at same time
                socket.rooms.forEach((roomName) => {
                    const socketIds = io.sockets.adapter.rooms.get(roomName);
                    const board = makeNewBoard(getNamesFromIds([...socketIds]));
                    startedBoards.set(roomName, board);
                    io.to(roomName).emit('startGame');
                    sendBoardForRoom(roomName);
                });
                io.emit('listRooms', getDetailedRooms());
            });

            socket.on('disconnect', () => {
                clearName(socket.id);
                io.emit('listRooms', getDetailedRooms());
            });
        }
    );

    // TODO: implement these
    io.of('/').adapter.on('delete-room', () => {});
    io.of('/').adapter.on('join-room', () => {});
    io.of('/').adapter.on('leave-room', () => {});

    return io;
};
