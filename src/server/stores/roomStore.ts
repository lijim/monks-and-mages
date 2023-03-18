import { DEFAULT_ROOM_NAMES } from '@/constants/lobbyConstants';
import {
    ClientToServerEvents,
    DetailedRoom,
    DetailedRoomWithBoard,
    ServerToClientEvents,
} from '@/types';
import { Format } from '@/types/games';
import { ExtendedSocket } from '../authorize';
import { createMemorySessionStore } from './sessionStore';
import { Server } from 'socket.io';
import { obscureBoardInfo } from '../obscureBoardInfo';

const createRoomFromScratch = (roomName: string): DetailedRoomWithBoard => ({
    roomName,
    players: [],
    hasStartedGame: false,
    spectators: [],
    board: null,
    avatarsForPlayers: {},
    format: Format.STANDARD,
});

type CreateRoomStoreArgs = {
    sessionStore: ReturnType<typeof createMemorySessionStore>;
    io: Server<ClientToServerEvents, ServerToClientEvents>;
};

export const createRoomStore = ({ sessionStore, io }: CreateRoomStoreArgs) => {
    const detailedRooms: DetailedRoomWithBoard[] = DEFAULT_ROOM_NAMES.map(
        (roomName) => createRoomFromScratch(roomName)
    );

    const getDetailedRooms = (): DetailedRoom[] => {
        return detailedRooms.map((room) => {
            const { board, ...rest } = room;
            return rest;
        });
    };

    const broadcastRooms = () => {
        io.emit('listRooms', getDetailedRooms());
    };

    const broadcastBoardForRoom = async (roomName: string) => {
        const board = detailedRooms.find(
            (room) => room.roomName === roomName
        )?.board;
        if (!board) {
            return;
        }
        const allSocketsInRoom = await io.in(roomName).fetchSockets();
        allSocketsInRoom.forEach((socket) => {
            const name = (
                socket as unknown as ExtendedSocket<
                    ClientToServerEvents,
                    ServerToClientEvents
                >
            ).username;
            if (!name) return;
            io.to(socket.id).emit('updateBoard', obscureBoardInfo(board, name));
        });
        // broadcast to spectators as well
        io.to(`publicSpectate-${roomName.slice('public-'.length)}`).emit(
            'updateBoard',
            obscureBoardInfo(board)
        );
    };

    const getCurrentRoom = (
        socket: ExtendedSocket<ClientToServerEvents, ServerToClientEvents>
    ) => {
        const username = sessionStore.findUserNameForSession(socket.sessionID);
        if (!username) {
            return null;
        }
        return detailedRooms.find(
            (room) =>
                room.players.includes(username) ||
                room.spectators.includes(username)
        );
    };

    const disconnectSocketFromRoom = (
        socket: ExtendedSocket<ClientToServerEvents, ServerToClientEvents>
    ) => {
        const room = getCurrentRoom(socket);
        const username = sessionStore.findUserNameForSession(socket.sessionID);
        if (!room) {
            return;
        }
        room.players = room.players.filter(
            (playerName) => playerName !== username
        );
        room.spectators = room.spectators.filter(
            (spectatorName) => spectatorName !== username
        );
        socket.leave(room.roomName);
    };

    const joinRoom = (
        socket: ExtendedSocket<ClientToServerEvents, ServerToClientEvents>
    ) => {
        const prevRoom = getCurrentRoom(socket);
        if (prevRoom) {
            disconnectSocketFromRoom(socket);
        }
    };

    return {
        joinRoom,
        broadcastRooms,
        broadcastBoardForRoom,
        disconnectSocketFromRoom,
    };
};
