import React, { createContext } from 'react';
import { useDispatch } from 'react-redux';
import { io, Socket } from 'socket.io-client';

import { chooseName as chooseNameReducer } from '@/client/redux/user';

export const WebSocketContext = createContext<WebSocketValue>(null);

type WebSocketValue = {
    chooseName: ClientToServerEvents['chooseName'];
    socket: Socket<ServerToClientEvents, ClientToServerEvents>;
};

/**
 * Redux-Integrated WebSockets Provider.  The need for this arises b/c
 * child components will need to call socket.io in order to do things like:
 *
 * - joining a game
 * - choosing a name
 * - performing a game action
 *
 * The pattern we set up is that each action will
 *
 * Based on this guide:
 * https://www.pluralsight.com/guides/using-web-sockets-in-your-reactredux-app
 * */
export const WebSocketProvider: React.FC = ({ children }) => {
    let socket: Socket<ServerToClientEvents, ClientToServerEvents>;
    let ws: WebSocketValue;

    // WebSocketProvider needs to go 1 layer beneath the Redux layer
    const dispatch = useDispatch();

    const chooseName = (name: string) => {
        socket.emit('chooseName', name);
    };

    if (!socket) {
        socket = io();

        socket.on('confirmName', (name: string) => {
            dispatch(chooseNameReducer({ name }));
        });
        ws = { socket, chooseName };
    }

    /**
     * We cannot simply store functions / sockets in redux - redux wants
     * flattened objects / arrays without functions - hence a need for
     * context providers on top of the redux solution
     */
    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    );
};
