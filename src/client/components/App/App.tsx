import React from 'react';
import { useSelector } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import 'react-popper-tooltip/dist/styles.css';

import { makeSampleDeck1 } from '@/factories/deck';
import { isUserInitialized } from '@/client/redux/selectors';
import { history, RootState } from '@/client/redux/store';

import { DeckList } from '../DeckList';
import { IntroScreen } from '../IntroScreen';
import { Rooms } from '../Rooms';
import { GameDisplay } from '../GameDisplay';
import { GameManager } from '../GameManager';

const LobbyBackground = styled.div`
    background: linear-gradient(70deg, #eed, transparent);
    height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr;
`;

export const App: React.FC = () => {
    const deck = makeSampleDeck1();

    const isUserPastIntroScreen = useSelector<RootState>(isUserInitialized);

    return (
        <GameManager>
            <div>
                <Router history={history}>
                    {
                        <React.Fragment>
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
                                <Route element={<DeckList deck={deck} />} />
                            </Routes>
                        </React.Fragment>
                    }
                </Router>
            </div>
        </GameManager>
    );
};
