import { EnhancedStore } from '@reduxjs/toolkit'; // for redux-toolkit
// import { Store } from 'redux' // for non-toolkit
// eslint-disable-next-line import/no-extraneous-dependencies
import {
    render as rtlRender,
    RenderOptions,
    RenderResult,
} from '@testing-library/react';
import React, { ReactElement, ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { io, Socket } from 'socket.io-client';
import { HistoryRouter as Router } from 'redux-first-history/rr6';

import {
    AppDispatch,
    configureStoreWithMiddlewares,
    RootState,
} from '@/client/redux/store';
import {
    WebSocketContext,
    WebSocketValue,
} from '@/client/components/WebSockets';
import { ClientToServerEvents, ServerToClientEvents } from '@/types';

type ReduxRenderOptions = {
    preloadedState?: Partial<RootState>;
    renderOptions?: Omit<RenderOptions, 'wrapper'>;
    store?: EnhancedStore; // for redux-toolkit
    // store?: Store // for non-toolkit
};

interface WebSocketContextMockProviderProps {
    ws: WebSocketValue;
}

const WebSocketContextMockProvider: React.FC<
    WebSocketContextMockProviderProps
> = ({ children, ws }) => (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
);

interface RenderValue {
    dispatch: AppDispatch;
    render: RenderResult;
    webSocket: {
        chooseDeck: jest.Mock;
        chooseName: jest.Mock;
        joinRoom: jest.Mock;
        resolveEffect: jest.Mock;
        socket: Socket<ServerToClientEvents, ClientToServerEvents>;
        startGame: jest.Mock;
        takeGameAction: jest.Mock;
    };
}

// a verison of RTL's render that is a reusable way to
// incorporate redux state into tests
export function render(
    ui: ReactElement,
    { preloadedState = {}, ...renderOptions }: ReduxRenderOptions = {}
): RenderValue {
    const originalHistory = createBrowserHistory();

    // history-mocking test utils from:
    // https://github.com/salvoravida/redux-first-history/blob/master/__tests__/store.ts
    const history = {
        ...originalHistory,
        go: jest.fn(originalHistory.go),
        back: jest.fn(originalHistory.back),
        forward: jest.fn(originalHistory.forward),
        push: jest.fn(originalHistory.push),
        replace: jest.fn(originalHistory.replace),
    };

    const { routerMiddleware } = createReduxHistoryContext({
        history,
    });

    const store = configureStoreWithMiddlewares(
        preloadedState,
        routerMiddleware
    );

    store.dispatch = jest.fn();

    const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

    const mockWebSocket = {
        socket: newSocket,
        chooseDeck: jest.fn(),
        chooseName: jest.fn(),
        joinRoom: jest.fn(),
        resolveEffect: jest.fn(),
        startGame: jest.fn(),
        takeGameAction: jest.fn(),
    };

    mockWebSocket.socket.emit = jest.fn();

    function Wrapper({ children }: { children?: ReactNode }): ReactElement {
        useEffect(() => {
            return () => {
                newSocket.close();
            };
        }, []);
        return (
            <Provider store={store}>
                <Router history={history}>
                    <WebSocketContextMockProvider ws={mockWebSocket}>
                        {children}
                    </WebSocketContextMockProvider>
                </Router>
            </Provider>
        );
    }
    return {
        render: rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
        dispatch: store.dispatch,
        webSocket: mockWebSocket,
    };
}
