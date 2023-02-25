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

jest.mock('../auth0/', () => ({
    __esModule: true,
    auth0: jest.fn(),
}));

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
                expect(name).toEqual('Guest - Dora Wini');
                done();
            });
        });

        it('joins a room', (done) => {
            clientSocket.emit('joinRoom', {
                roomName: 'treehouse-1',
                avatarUrl:
                    'https://monksandmages.com/images/units/manta-ray.webp',
            });

            const defaultRooms = DEFAULT_ROOM_NAMES.map(
                (roomName): DetailedRoom => {
                    return {
                        roomName: `public-${roomName}`,
                        players: [],
                        spectators: [],
                        hasStartedGame: false,
                        avatarsForPlayers: {},
                    };
                }
            );
            clientSocket.on('listRooms', (roomsAndIds: DetailedRoom[]) => {
                expect(roomsAndIds).toEqual([
                    {
                        roomName: 'public-treehouse-1',
                        players: ['Guest - Dora Wini'],
                        spectators: [],
                        hasStartedGame: false,
                        avatarsForPlayers: {
                            'Guest - Dora Wini':
                                'https://monksandmages.com/images/units/manta-ray.webp',
                        },
                    },
                    ...defaultRooms,
                ]);
                done();
            });
        });
    });
});
