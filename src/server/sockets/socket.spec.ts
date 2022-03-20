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
import { DEFAULT_ROOM_NAMES } from '@/constants/lobbyConstants';

/**
 * TODO:
 * There aren't many tests on this file b/c I kept running into this issue:
 * A worker process has failed to exit gracefully and has been force exited.
 * This is likely caused by tests leaking due to improper teardown.
 * Try running with --detectOpenHandles to find leaks. Active timers can also
 * cause this, ensure that .unref() was called on them.
 *
 * I've skipped tests that I've tried to set up that cause these issues
 */
describe('sockets', () => {
    let httpServer: HttpServer;
    let io: Server<ClientToServerEvents, ServerToClientEvents>;
    let clientSocket: Socket<ServerToClientEvents, ClientToServerEvents>;
    let clientSocket2: Socket<ServerToClientEvents, ClientToServerEvents>;
    let port: number;

    beforeAll((done) => {
        httpServer = http.createServer();
        io = configureIo(httpServer);
        httpServer.listen(() => {
            port = (httpServer.address() as AddressInfo).port;
            clientSocket = clientIo(`http://localhost:${port}`, {
                multiplex: false,
                reconnection: false,
            });
            clientSocket.on('connect', done);
        });
    });

    afterAll(async () => {
        if (clientSocket.connected) {
            await clientSocket.close();
        }
        if (clientSocket2?.connected) {
            await clientSocket2.close();
        }
        io.disconnectSockets();
        io.close();
        await httpServer.close();
    });

    describe('room', () => {
        it('chooses a name', (done) => {
            clientSocket.emit('chooseName', 'Dora Wini');
            clientSocket.on('confirmName', (name) => {
                expect(name).toEqual('Dora Wini');
                done();
            });
        });

        it('joins a room', (done) => {
            clientSocket.emit('joinRoom', 'treehouse-1');

            const defaultRooms = DEFAULT_ROOM_NAMES.map(
                (roomName): DetailedRoom => {
                    return {
                        roomName: `public-${roomName}`,
                        players: [],
                        spectators: [],
                        hasStartedGame: false,
                    };
                }
            );
            clientSocket.on('listRooms', (roomsAndIds: DetailedRoom[]) => {
                expect(roomsAndIds).toEqual([
                    {
                        roomName: 'public-treehouse-1',
                        players: ['Dora Wini'],
                        spectators: [],
                        hasStartedGame: false,
                    },
                    ...defaultRooms,
                ]);
                done();
            });
        });
    });

    describe('2 users', () => {
        beforeEach((done) => {
            clientSocket2 = clientIo(`http://localhost:${port}`, {
                multiplex: false,
                reconnection: false,
            });
            clientSocket2.on('connect', done);
        });

        afterEach(async () => {
            if (clientSocket2?.connected) {
                await clientSocket2.close();
            }
        });

        // This was a lot of maintenance to avoid concurrency issues
        it.skip('join a room', async () => {
            clientSocket.emit('chooseName', 'Dora Wini');
            await clientSocket.emit('joinRoom', 'treehouse-1');
            clientSocket2.emit('chooseName', 'Francine');
            await clientSocket2.emit('joinRoom', 'treehouse-1');
            let numCalls = 0;

            await clientSocket2.on(
                'listRooms',
                (roomsAndIds: DetailedRoom[]) => {
                    numCalls += 1;
                    if (numCalls === 2) {
                        expect(roomsAndIds).toEqual([
                            {
                                roomName: 'public-treehouse-1',
                                players: ['Dora Wini', 'Francine'],
                                hasStartedGame: false,
                            },
                        ]);
                    }
                }
            );
        });
    });
});
