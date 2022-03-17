import React from 'react';
import { useSelector, Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import 'react-popper-tooltip/dist/styles.css';

import { isUserInitialized } from '@/client/redux/selectors';
import { history, RootState, store } from '@/client/redux/store';

const IntroScreen = React.lazy(() =>
    import('../IntroScreen').then((module) => ({
        default: module.IntroScreen,
    }))
);
const Rooms = React.lazy(() =>
    import('../Rooms').then((module) => ({
        default: module.Rooms,
    }))
);
const WebSocketProvider = React.lazy(() =>
    import('../WebSockets').then((module) => ({
        default: module.WebSocketProvider,
    }))
);
const GameManager = React.lazy(() =>
    import('../GameManager').then((module) => ({ default: module.GameManager }))
);
const GameDisplay = React.lazy(() =>
    import('../GameDisplay').then((module) => ({ default: module.GameDisplay }))
);
const LobbyBackground = styled.div`
    height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr;
    background-image: url(https://images.unsplash.com/photo-1618082445556-8b5e4fee89dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80);
    background-size: cover;
`;

const Centered = styled.div`
    height: 100vh;
    display: grid;
    place-items: center;
`;

export const RouterRoutes: React.FC = () => {
    const isUserPastIntroScreen = useSelector<RootState>(isUserInitialized);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <LobbyBackground>
                        <IntroScreen />
                        {isUserPastIntroScreen && <Rooms />}
                    </LobbyBackground>
                }
            />
            <Route path="/ingame" element={<GameDisplay />} />
        </Routes>
    );
};

const Main: React.FC = () => {
    return (
        <div>
            <Router history={history}>
                <React.Suspense
                    fallback={
                        <LobbyBackground>
                            <Centered></Centered>
                        </LobbyBackground>
                    }
                >
                    <WebSocketProvider>
                        <GameManager>
                            <RouterRoutes />
                        </GameManager>
                    </WebSocketProvider>
                </React.Suspense>
            </Router>
        </div>
    );
};

export const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
};
