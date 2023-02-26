import React, { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { io, Socket } from 'socket.io-client';

import { push } from 'redux-first-history';
import { useAuth0 } from '@auth0/auth0-react';
import cookie from 'cookiejs';
import {
    chooseName as chooseNameReducer,
    confirmAuth0Id,
    initializeUser,
} from '@/client/redux/user';
import {
    updateLatestGameResults,
    updateRoomsAndPlayers,
} from '@/client/redux/lobby';
import { AppDispatch } from '@/client/redux/store';
import { addChatLog, clearChat, updateBoardState } from '@/client/redux/board';
import {
    ClientToServerEvents,
    JoinRoomParams,
    ResolveEffectParams,
    ServerToClientEvents,
} from '@/types';
import { GameAction } from '@/types/gameActions';
import { DeckListSelections } from '@/constants/lobbyConstants';
import {
    confirmCustomDeckList,
    confirmPremadeDecklist,
} from '@/client/redux/deckList';
import { playAudio } from '@/audioHelpers/playAudio';
import { Sounds } from '@/constants/sounds';
import { Card, Skeleton } from '@/types/cards';
import {
    receiveLastPlayedCard,
    startGame as startGameAction,
} from '@/client/redux/clientSideGameExtras';

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

    const { user, getAccessTokenWithPopup, getAccessTokenSilently } =
        useAuth0();

    useEffect(() => {
        const authToken = async () => {
            if (!user) return;
            if (process.env.ENVIRONMENT !== 'production') {
                const accessToken = await getAccessTokenWithPopup({
                    audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
                    scope: 'read:users_app_metadata',
                });
                cookie.set('accessToken', accessToken);
                socket.emit('login', `Bearer ${accessToken}`);
            } else {
                const accessToken = await getAccessTokenSilently({
                    audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
                    scope: 'read:users_app_metadata',
                });
                cookie.set('accessToken', accessToken);
                socket.emit('login', `Bearer ${accessToken}`);
            }
        };
        authToken();
    }, [user]);

    // WebSocketProvider needs to go 1 layer beneath the Redux layer
    const dispatch = useDispatch<AppDispatch>();

    if (!socket) {
        const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> =
            io();

        // Server-to-client events
        newSocket.on('confirmCustomDeck', (skeleton: Skeleton) => {
            dispatch(confirmCustomDeckList(skeleton));
        });

        newSocket.on('confirmName', (name: string) => {
            dispatch(chooseNameReducer({ name }));
        });

        newSocket.on('confirmAuth0Id', (auth0Id: string) => {
            dispatch(confirmAuth0Id({ auth0Id }));
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

        newSocket.on('displayLastPlayedCard', (card: Card) => {
            dispatch(receiveLastPlayedCard(card));
        });

        newSocket.on('gameChatMessage', (chatMessage) => {
            dispatch(addChatLog(chatMessage));
        });

        newSocket.on('listLatestGameResults', (gameResults) => {
            dispatch(updateLatestGameResults(gameResults));
        });

        newSocket.on('listRooms', (detailedRooms) => {
            dispatch(updateRoomsAndPlayers(detailedRooms));
        });

        newSocket.on('startGame', () => {
            dispatch(clearChat());
            dispatch(push('/ingame'));
            dispatch(startGameAction());
            playAudio(Sounds.START_GAME);
        });

        newSocket.on('updateBoard', (board) => {
            dispatch(updateBoardState(board));
        });

        // Client-to-server events
        const authorizeToken = (token: string) => {
            newSocket.emit('authorizeToken', token);
        };

        const joinRoom = (params: JoinRoomParams) => {
            newSocket.emit('joinRoom', params);
        };

        const leaveRoom = () => {
            newSocket.emit('leaveRoom');
        };

        const spectateRoom = (roomName: string) => {
            newSocket.emit('spectateRoom', roomName);
        };

        const chooseAvatar = (avatarUrl: string) => {
            newSocket.emit('chooseAvatar', avatarUrl);
        };

        const chooseCustomDeck = (deckListSelection: Skeleton) => {
            newSocket.emit('chooseCustomDeck', deckListSelection);
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

        const sendChatMessage = (message: string) => {
            newSocket.emit('sendChatMessage', message);
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
            authorizeToken,
            chooseAvatar,
            chooseCustomDeck,
            chooseDeck,
            chooseName,
            joinRoom,
            leaveRoom,
            resolveEffect,
            sendChatMessage,
            spectateRoom,
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
