import React, { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { Link, Route, Routes } from 'react-router-dom';

import { DeckList } from '../DeckList';
import { CompactDeckList } from '../CompactDeckList';
import { makeSampleDeck1 } from '@/factories/deck';
import { disconnectUser, initializeUser } from '@/client/redux/user';
import { AppDispatch, history } from '@/client/redux/store';

export const App: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();
    useEffect(() => {
        socket.on('connect', () => {
            dispatch(initializeUser({ id: socket.id }));
        });
        socket.on('disconnect', () => {
            dispatch(disconnectUser());
        });
    }, []);

    const deck = makeSampleDeck1();

    return (
        <div>
            <Router history={history}>
                <React.Fragment>
                    <Link to="/">Deck List 1</Link>
                    <br />
                    <Link to="/compact">Compact Deck List</Link>

                    <Routes>
                        <Route path="/" element={<DeckList deck={deck} />} />
                        <Route
                            path="/compact"
                            element={<CompactDeckList deck={deck} />}
                        />
                        <Route element={<DeckList deck={deck} />} />
                    </Routes>
                </React.Fragment>
            </Router>
        </div>
    );
};
