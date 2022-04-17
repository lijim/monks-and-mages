import React from 'react';
import { fireEvent, render, screen } from '@/test-utils';

import { Rooms } from './Rooms';
import { RootState } from '@/client/redux/store';
import { DeckListSelections } from '@/constants/lobbyConstants';

describe('Rooms', () => {
    it('creates a new room', () => {
        const preloadedState: Partial<RootState> = {
            lobby: {
                rooms: [
                    {
                        roomName: 'Room 6',
                        players: ['Kimmy', 'Jimmy', 'Timmy'],
                        spectators: [],
                    },
                    {
                        roomName: 'Room 7',
                        players: ['Peter', 'Paul', 'Mary'],
                        spectators: [],
                    },
                ],
                latestGameResults: [],
            },
        };
        const { webSocket } = render(<Rooms />, { preloadedState });

        fireEvent.click(screen.getByText('Create'));

        expect(webSocket.joinRoom).toHaveBeenCalledWith('Room 1 🥑');
    });

    it('renders multiple rooms', () => {
        const preloadedState: Partial<RootState> = {
            lobby: {
                rooms: [
                    {
                        roomName: 'Room 6',
                        players: ['Kimmy', 'Jimmy', 'Timmy'],
                        spectators: [],
                    },
                    {
                        roomName: 'Room 7',
                        players: ['Peter', 'Paul', 'Mary'],
                        spectators: [],
                    },
                ],
                latestGameResults: [],
            },
        };
        render(<Rooms />, { preloadedState });
        expect(screen.queryByText('Room 6')).toBeInTheDocument();
        expect(screen.queryByText('Room 7')).toBeInTheDocument();
        expect(screen.queryByText('Paul')).toBeInTheDocument();
    });

    it('chooses a deck', () => {
        const preloadedState: Partial<RootState> = {
            lobby: {
                rooms: [
                    {
                        roomName: 'Room 6',
                        players: ['Kimmy', 'Jimmy', 'Timmy'],
                        spectators: [],
                    },
                    {
                        roomName: 'Room 7',
                        players: ['Peter', 'Paul', 'Mary'],
                        spectators: [],
                    },
                ],
                latestGameResults: [],
            },
            user: {
                name: 'Jimmy',
            },
        };
        const { webSocket } = render(<Rooms />, { preloadedState });
        fireEvent.change(screen.getByLabelText('Choose a Deck'), {
            target: { value: DeckListSelections.MAGES_FIRE },
        });
        expect(webSocket.chooseDeck).toHaveBeenCalledWith(
            DeckListSelections.MAGES_FIRE
        );
    });
});
