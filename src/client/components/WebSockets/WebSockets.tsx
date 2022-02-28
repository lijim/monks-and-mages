import React, { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { io, Socket } from 'socket.io-client';

import {
    chooseName as chooseNameReducer,
    initializeUser,
} from '@/client/redux/user';

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
    const [socket, setSocket] =
        useState<Socket<ServerToClientEvents, ClientToServerEvents>>(null);
    const [ws, setWs] = useState<WebSocketValue>(null);

    // WebSocketProvider needs to go 1 layer beneath the Redux layer
    const dispatch = useDispatch();

    if (!socket) {
        const newSocket = io();

        newSocket.on('confirmName', (name: string) => {
            dispatch(chooseNameReducer({ name }));
        });

        newSocket.on('connect', () => {
            dispatch(initializeUser({ id: newSocket.id }));
        });

        const chooseName = (name: string) => {
            if (!newSocket) return;
            newSocket.emit('chooseName', name);
        };

        setSocket(newSocket);
        setWs({ socket, chooseName });
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
