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
    background: linear-gradient(70deg, #eed, transparent);
    height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr;
`;

const Centered = styled.div`
    height: 100vh;
    display: grid;
    place-items: center;
`;

const Main: React.FC = () => {
    const isUserPastIntroScreen = useSelector<RootState>(isUserInitialized);
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
                                <Route
                                    path="/ingame"
                                    element={<GameDisplay />}
                                />
                            </Routes>
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
