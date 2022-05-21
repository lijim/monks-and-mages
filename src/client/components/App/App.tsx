import React from 'react';
import { useSelector, Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import 'react-popper-tooltip/dist/styles.css';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

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
const DeckBuilder = React.lazy(() =>
    import('../DeckBuilder').then((module) => ({
        default: module.DeckBuilder,
    }))
);
const DeckManager = React.lazy(() =>
    import('../DeckManager').then((module) => ({
        default: module.DeckManager,
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
    background-image: url(/images/lobby-background.avif);
    background-size: cover;
`;

const Centered = styled.div`
    height: 100vh;
    display: grid;
    place-items: center;
`;

export const RouterRoutes: React.FC = () => {
    const isUserGuestLoggedIn = useSelector<RootState>(isUserInitialized);
    const { user: authenticatedUser } = useAuth0();

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <LobbyBackground>
                        {isUserGuestLoggedIn || authenticatedUser ? (
                            <Rooms />
                        ) : (
                            <IntroScreen />
                        )}
                    </LobbyBackground>
                }
            />
            <Route path="/ingame" element={<GameDisplay />} />
            <Route
                path="/decklist"
                element={
                    <LobbyBackground>
                        <DeckManager />
                    </LobbyBackground>
                }
            />
            <Route
                path="/customize"
                element={
                    <LobbyBackground>
                        <DeckBuilder />
                    </LobbyBackground>
                }
            />
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
        <Auth0Provider
            domain={process.env.AUTH0_DOMAIN}
            clientId={process.env.AUTH0_CLIENT_ID}
            redirectUri={window.location.origin}
        >
            <Provider store={store}>
                <Main />
            </Provider>
        </Auth0Provider>
    );
};
