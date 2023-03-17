/* eslint-disable */
// @ts-ignore - TypeScript is merging this with the 'socket.io' interfaces to extend the Socket interface
import { Socket } from 'socket.io';

declare module 'socket.io' {
    interface Socket {
        sessionID: string;
        userID: string;
        username: string;
    }
}
