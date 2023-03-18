import { Server } from 'socket.io';
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
    io: Server<ClientToServerEvents, ServerToClientEvents>;
    sessionStore: ReturnType<typeof createMemorySessionStore>;
};

export const createRoomStore = ({ sessionStore, io }: CreateRoomStoreArgs) => {
    let detailedRooms: DetailedRoomWithBoard[] = DEFAULT_ROOM_NAMES.map(
        (roomName) => createRoomFromScratch(roomName)
    );

    const getRoomNameForSocket = (
        socket: ExtendedSocket<ClientToServerEvents, ServerToClientEvents>
    ): string | null => {
        const firstRoomName = [...socket.rooms].filter(
            (room) =>
                room.startsWith('public-') || room.startsWith('publicSpectate-')
        )[0];
        return firstRoomName || null;
    };

    const getDetailedRooms = (): DetailedRoom[] => {
        return detailedRooms.map((room) => {
            const { board, ...rest } = room;
            return rest;
        });
    };

    const broadcastRooms = () => {
        io.emit('listRooms', getDetailedRooms());
    };

    const broadcastRoomsForSocket = (
        socket: ExtendedSocket<ClientToServerEvents, ServerToClientEvents>
    ) => {
        socket.emit('listRooms', getDetailedRooms());
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
        const roomNameToLeave = getRoomNameForSocket(socket);
        socket.leave(roomNameToLeave);

        const room = getCurrentRoom(socket);
        const username = sessionStore.findUserNameForSession(socket.sessionID);
        if (!room || !username) {
            return;
        }
        room.players = room.players.filter(
            (playerName) => playerName !== username
        );
        room.spectators = room.spectators.filter(
            (spectatorName) => spectatorName !== username
        );
        const { roomName } = room;

        if (room.players.length === 0 && room.spectators.length === 0) {
            // remove room
            detailedRooms = detailedRooms.filter(
                (detailedRoom) => detailedRoom.roomName !== roomName
            );
            // create the default room again
            if (DEFAULT_ROOM_NAMES.includes(roomName)) {
                detailedRooms.push(createRoomFromScratch(roomName));
            }
        }
    };

    type JoinRoomParams = {
        asSpectator: boolean;
        roomName: string;
        socket: ExtendedSocket<ClientToServerEvents, ServerToClientEvents>;
    };
    const joinRoom = ({ socket, roomName, asSpectator }: JoinRoomParams) => {
        const username = sessionStore.findUserNameForSession(socket.sessionID);
        if (!username) {
            return;
        }
        // first disconnect from previous rooms
        const prevRoom = getCurrentRoom(socket);
        if (prevRoom) {
            disconnectSocketFromRoom(socket);
        }

        // create or connect to a new room
        const matchingRoom = detailedRooms.find(
            (room) => room.roomName === roomName
        );
        if (matchingRoom) {
            const arrayToPushTo = asSpectator
                ? matchingRoom.spectators
                : matchingRoom.players;
            arrayToPushTo.push(username);
        } else {
            const newRoom = createRoomFromScratch(roomName);
            const arrayToPushTo = asSpectator
                ? newRoom.spectators
                : newRoom.players;
            arrayToPushTo.push(username);
            detailedRooms.push(newRoom);
        }
    };

    return {
        joinRoom,
        broadcastRooms,
        broadcastRoomsForSocket,
        broadcastBoardForRoom,
        disconnectSocketFromRoom,
        getRoomNameForSocket,
    };
};
