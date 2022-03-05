import React from 'react';
import { useSelector } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { Route, Routes } from 'react-router-dom';

import { makeSampleDeck1 } from '@/factories/deck';
import { isUserInitialized } from '@/client/redux/selectors';
import { history, RootState } from '@/client/redux/store';

import { DeckList } from '../DeckList';
import { IntroScreen } from '../IntroScreen';
import { Rooms } from '../Rooms';
import { WebSocketProvider } from '../WebSockets';
import { GameBoard } from '../GameBoard';

export const App: React.FC = () => {
    const deck = makeSampleDeck1();

    const isUserPastIntroScreen = useSelector<RootState>(isUserInitialized);

    return (
        <WebSocketProvider>
            <div>
                <Router history={history}>
                    {
                        <React.Fragment>
                            <Routes>
                                <Route
                                    path="/"
                                    element={
                                        <>
                                            <IntroScreen />
                                            {isUserPastIntroScreen && <Rooms />}
                                        </>
                                    }
                                />
                                <Route path="/ingame" element={<GameBoard />} />
                                <Route element={<DeckList deck={deck} />} />
                            </Routes>
                        </React.Fragment>
                    }
                </Router>
            </div>
        </WebSocketProvider>
    );
};
