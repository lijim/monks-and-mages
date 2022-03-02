import express from 'express';
import http from 'http';
import path from 'path';
import { Server, Socket } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import { Board } from '@/types/board';

const app = express();
const port = 3000;
const server = http.createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
    cors: {
        origin: ['https://admin.socket.io'],
        credentials: true,
    },
});

instrument(io, {
    auth: false,
});

const idsToNames = new Map<string, string>();
const namesToIds = new Map<string, string>();
const clearName = (idToMatch: string) => {
    const matchingName = [...namesToIds.entries()].find(
        ([, id]) => id === idToMatch
    );
    if (!matchingName) return;
    namesToIds.delete(matchingName[0]);
    idsToNames.delete(idToMatch);
};

const startedBoards = new Map<string, Board>();

// TODO: use adapters instead to get rooms => games
// implement one that just retrieves shallowly all the rooms
// implement one that retrieves the whole room's game

// gets all public rooms + players in those rooms
const getDetailedRooms = () => {
    const detailedRooms: DetailedRoom[] = [];
    const roomsAndIds = io.sockets.adapter.rooms;
    [...roomsAndIds.entries()].forEach(([roomName, socketIds]) => {
        if (!roomName.startsWith('public-')) return; // skip private rooms

        const room = { roomName, players: [] as string[] };
        socketIds.forEach((socketId) => {
            if (idsToNames.has(socketId)) {
                room.players.push(idsToNames.get(socketId));
            }
        });
        detailedRooms.push(room);
    });
    return detailedRooms;
};
// Serves everything from dist/client as /client, e.g. http://localhost:3000/client/index.js
app.use('/client.bundle.js', (_, res) => {
    res.sendFile(path.join(__dirname, 'client.bundle.js'));
});

// Serves the base page
app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, 'homepage.html'));
});

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
            socket.rooms.forEach((roomName) => {
                startedBoards.get(roomName);
            });
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

server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`listening on *:${port}`);
});
