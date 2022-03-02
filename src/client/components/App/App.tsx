import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { push } from 'redux-first-history';
import { Route, Routes } from 'react-router-dom';

import { makeSampleDeck1 } from '@/factories/deck';
import { isUserInitialized } from '@/client/redux/selectors';
import { history, RootState } from '@/client/redux/store';

import { DeckList } from '../DeckList';
import { IntroScreen } from '../IntroScreen';
import { Rooms } from '../Rooms';
import { WebSocketProvider } from '../WebSockets';

export const App: React.FC = () => {
    const deck = makeSampleDeck1();

    const isUserPastIntroScreen = useSelector<RootState>(isUserInitialized);

    const dispatch = useDispatch();

    useEffect(() => {
        if (history.location.pathname !== '/') {
            dispatch(push('/'));
        }
    }, []);

    return (
        <WebSocketProvider>
            <div>
                <Router history={history}>
                    {
                        <React.Fragment>
                            <IntroScreen />
                            <Routes>
                                <Route
                                    path="/"
                                    element={
                                        <>
                                            {isUserPastIntroScreen && <Rooms />}
                                        </>
                                    }
                                />
                                <Route
                                    path="/ingame"
                                    element={<div>IN-GAME</div>}
                                />
                                <Route element={<DeckList deck={deck} />} />
                            </Routes>
                        </React.Fragment>
                    }
                </Router>
            </div>
        </WebSocketProvider>
    );
};
