import express from 'express';
import http from 'http';
import path from 'path';
import { Server, Socket } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';

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

const namesToIds = new Map<string, string>();
const clearName = (idToMatch: string) => {
    const matchingName = [...namesToIds.entries()].find(
        ([, id]) => id === idToMatch
    );
    if (!matchingName) return;
    namesToIds.delete(matchingName[0]);
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
        socket.on('chatMessage', (msg: string) => {
            io.emit('chatMessage', msg);
        });

        socket.on('chooseName', (name: string) => {
            if (!name) {
                clearName(socket.id);
                socket.emit('confirmName', '');
                return;
            }
            if (!namesToIds.has(name)) {
                namesToIds.set(name, socket.id);
                socket.emit('confirmName', name);
            }
        });

        socket.on('disconnect', () => {
            clearName(socket.id);
        });
    }
);

server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`listening on *:${port}`);
});
