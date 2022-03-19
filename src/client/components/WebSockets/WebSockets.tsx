import React, { createContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { io, Socket } from 'socket.io-client';

import { push } from 'redux-first-history';
import {
    chooseName as chooseNameReducer,
    initializeUser,
} from '@/client/redux/user';
import { updateRoomsAndPlayers } from '@/client/redux/lobby';
import { AppDispatch } from '@/client/redux/store';
import { addChatLog, clearChat, updateBoardState } from '@/client/redux/board';
import {
    ClientToServerEvents,
    ResolveEffectParams,
    ServerToClientEvents,
} from '@/types';
import { GameAction } from '@/types/gameActions';
import { DeckListSelections } from '@/constants/lobbyConstants';
import { confirmPremadeDecklist } from '@/client/redux/deckList';

export const WebSocketContext = createContext<WebSocketValue>(null);

export interface WebSocketValue extends Partial<ClientToServerEvents> {
    socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}

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
    const dispatch = useDispatch<AppDispatch>();

    if (!socket) {
        const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> =
            io();

        // Server-to-client events
        newSocket.on('confirmName', (name: string) => {
            dispatch(chooseNameReducer({ name }));
        });

        newSocket.on(
            'confirmPremadeDeckList',
            (premadeDeck: DeckListSelections) => {
                dispatch(confirmPremadeDecklist(premadeDeck));
            }
        );

        newSocket.on('connect', () => {
            dispatch(initializeUser({ id: newSocket.id }));
        });

        newSocket.on('gameChatMessage', (chatMessage) => {
            dispatch(addChatLog(chatMessage));
        });

        newSocket.on('listRooms', (detailedRooms) => {
            dispatch(updateRoomsAndPlayers(detailedRooms));
        });

        newSocket.on('startGame', () => {
            dispatch(clearChat());
            dispatch(push('/ingame'));
        });

        newSocket.on('updateBoard', (board) => {
            dispatch(updateBoardState(board));
        });

        // Client-to-server events
        const joinRoom = (roomName: string) => {
            newSocket.emit('joinRoom', roomName);
        };

        const chooseDeck = (deckListSelection: DeckListSelections) => {
            newSocket.emit('chooseDeck', deckListSelection);
        };

        const chooseName = (name: string) => {
            newSocket.emit('chooseName', name);
        };

        const resolveEffect = (params: ResolveEffectParams) => {
            newSocket.emit('resolveEffect', params);
        };

        const startGame = () => {
            newSocket.emit('startGame');
        };

        const takeGameAction = (gameAction: GameAction) => {
            newSocket.emit('takeGameAction', gameAction);
        };

        setSocket(newSocket);
        setWs({
            socket: newSocket,
            chooseDeck,
            chooseName,
            joinRoom,
            resolveEffect,
            startGame,
            takeGameAction,
        });
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
