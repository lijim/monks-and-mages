/**
 * @jest-environment node
 */

import http, { Server as HttpServer } from 'http';
import { AddressInfo } from 'net';
import { Server } from 'socket.io';
import { Socket, io as clientIo } from 'socket.io-client';

import { configureIo } from './sockets';
import {
    ClientToServerEvents,
    DetailedRoom,
    ServerToClientEvents,
} from '@/types';

describe('sockets', () => {
    let httpServer: HttpServer;
    let io: Server<ClientToServerEvents, ServerToClientEvents>;
    let clientSocket: Socket<ServerToClientEvents, ClientToServerEvents>;

    beforeEach((done) => {
        httpServer = http.createServer();
        io = configureIo(httpServer);
        httpServer.listen(() => {
            const { port } = httpServer.address() as AddressInfo;
            clientSocket = clientIo(`http://localhost:${port}`);
            clientSocket.on('connect', done);
        });
    });

    afterEach((done) => {
        if (clientSocket.connected) {
            clientSocket.disconnect();
        }
        io.disconnectSockets();
        httpServer.close();
        done();
    });

    describe('room', () => {
        it('is joined by a player', (done) => {
            clientSocket.emit('chooseName', 'Dora Wini');
            clientSocket.emit('joinRoom', 'treehouse-1');
            clientSocket.on('listRooms', (roomsAndIds: DetailedRoom[]) => {
                expect(roomsAndIds).toEqual([
                    {
                        roomName: 'public-treehouse-1',
                        players: ['Dora Wini'],
                        hasStartedGame: false,
                    },
                ]);
                done();
            });
        });
    });
});
