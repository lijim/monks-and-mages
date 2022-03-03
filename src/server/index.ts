import express from 'express';
import http from 'http';
import path from 'path';
import { configureIo } from './sockets/sockets';

const app = express();
const port = 3000;
const server = http.createServer(app);

// Serves everything from dist/client as /client, e.g. http://localhost:3000/client/index.js
app.use('/client.bundle.js', (_, res) => {
    res.sendFile(path.join(__dirname, 'client.bundle.js'));
});

// Serves the base page
app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, 'homepage.html'));
});

configureIo(server);

server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`listening on *:${port}`);
});
