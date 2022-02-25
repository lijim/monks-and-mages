import React, { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useDispatch } from 'react-redux';

import { DeckList } from '../DeckList';
import { CompactDeckList } from '../CompactDeckList';
import { makeSampleDeck1 } from '@/factories/deck';
import { disconnectUser, initializeUser } from '@/client/redux/user';

export const App: React.FC = () => {
    const dispatch = useDispatch();
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
            <DeckList deck={deck} />
            <CompactDeckList deck={deck} />
        </div>
    );
};
