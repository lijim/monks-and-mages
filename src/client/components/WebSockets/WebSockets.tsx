import React, { ReactNode, createContext, useEffect, useState } from 'react';
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
import {
    DeckListSelections,
    GUEST_NAME_PREFIX,
} from '@/constants/lobbyConstants';
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
import { Format } from '@/types/games';

export const WebSocketContext = createContext<WebSocketValue>(null);

export interface CustomSocket
    extends Socket<ServerToClientEvents, ClientToServerEvents> {
    sessionID: string;
    userID: string;
}

export interface WebSocketValue extends Partial<ClientToServerEvents> {
    logout: () => void;
    socket: CustomSocket;
}

interface Props {
    children: ReactNode;
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
export const WebSocketProvider = ({ children }: Props) => {
    const [socket, setSocket] = useState<CustomSocket>(null);
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
                socket.auth = { ...socket.auth, username: user.name };
                socket.connect();
                socket.emit('login', `Bearer ${accessToken}`);
                setSocket(socket);
            } else {
                const accessToken = await getAccessTokenSilently({
                    audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
                    scope: 'read:users_app_metadata',
                });
                cookie.set('accessToken', accessToken);
                socket.auth = { ...socket.auth, username: user.name };
                socket.connect();
                socket.emit('login', `Bearer ${accessToken}`);
                setSocket(socket);
            }
        };
        authToken();
    }, [user]);

    // WebSocketProvider needs to go 1 layer beneath the Redux layer
    const dispatch = useDispatch<AppDispatch>();

    if (!socket) {
        const newSocket: CustomSocket = io() as CustomSocket;

        const sessionIDFromCache = localStorage.getItem('sessionID');
        if (typeof sessionIDFromCache === 'string') {
            newSocket.auth = { sessionID: sessionIDFromCache };
            newSocket.connect();
        }

        newSocket.on('session', ({ sessionID, userID, username }) => {
            dispatch(chooseNameReducer({ name: username }));
            newSocket.auth = { ...newSocket.auth, sessionID };
            localStorage.setItem('sessionID', sessionID);
            newSocket.userID = userID;
        });

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
            dispatch(initializeUser({ id: newSocket.userID }));
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

        const logout = () => {
            localStorage.removeItem('sessionID');
            dispatch(chooseNameReducer({ name: '' }));
            newSocket.disconnect();
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

        const chooseGameFormat = (format: Format) => {
            newSocket.emit('chooseGameFormat', format);
        };

        const chooseName = (name: string) => {
            newSocket.auth = {
                ...newSocket.auth,
                username: `${GUEST_NAME_PREFIX}${name}`,
            };
            newSocket.connect();
            newSocket.emit('chooseName', name);
        };

        const rejoinGame = () => {
            newSocket.emit('rejoinGame');
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
            chooseGameFormat,
            chooseDeck,
            chooseName,
            joinRoom,
            leaveRoom,
            logout,
            resolveEffect,
            sendChatMessage,
            rejoinGame,
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
