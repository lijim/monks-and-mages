import React from 'react';
import { useSelector } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { Link, Route, Routes } from 'react-router-dom';

import { makeSampleDeck1 } from '@/factories/deck';
import { isUserInitialized } from '@/client/redux/selectors';
import { history, RootState } from '@/client/redux/store';

import { DeckList } from '../DeckList';
import { CompactDeckList } from '../CompactDeckList';
import { IntroScreen } from '../IntroScreen';
import { WebSocketProvider } from '../WebSockets';

export const App: React.FC = () => {
    const deck = makeSampleDeck1();

    const isUserPastIntroScreen = useSelector<RootState>(isUserInitialized);

    return (
        <WebSocketProvider>
            <div>
                <IntroScreen />
                <br />
                <Router history={history}>
                    {isUserPastIntroScreen && (
                        <React.Fragment>
                            <Link to="/">Deck List 1</Link>
                            <br />
                            <Link to="/compact">Compact Deck List</Link>

                            <Routes>
                                <Route
                                    path="/"
                                    element={<DeckList deck={deck} />}
                                />
                                <Route
                                    path="/compact"
                                    element={<CompactDeckList deck={deck} />}
                                />
                                <Route element={<DeckList deck={deck} />} />
                            </Routes>
                        </React.Fragment>
                    )}
                </Router>
            </div>
        </WebSocketProvider>
    );
};
