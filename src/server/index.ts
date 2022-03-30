import express from 'express';
import http from 'http';
import path from 'path';
import { configureIo } from './sockets';

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

// Done to force https
// see: https://docs.divio.com/en/latest/how-to/node-express-force-https/
app.enable('trust proxy');

// eslint-disable-next-line consistent-return
app.use((request, response, next): void | undefined => {
    if (
        process.env.NODE_ENV !== 'development' &&
        !request.headers.host?.startsWith('localhost') &&
        !request.secure
    ) {
        return response.redirect(
            `https://${request.headers.host}${request.url}`
        );
    }

    next();
});

// Serves everything from dist/client as /client, e.g. http://localhost:3000/client/index.js
app.use(express.static(path.join(__dirname, 'public/js')));

app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Serves the base page
app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, 'public/js/index.html'));
});

app.get('*', (_, res) => {
    res.redirect('/');
});

configureIo(server);

server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`listening on *:${port}`);
});
