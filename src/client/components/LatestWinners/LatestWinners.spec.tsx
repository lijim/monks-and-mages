import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '@/test-utils';

import { LatestWinners } from './LatestWinners';
import { RootState } from '@/client/redux/store';

describe('Rooms', () => {
    it('renders no games played yet', () => {
        const preloadedState: Partial<RootState> = {
            lobby: {
                rooms: [],
                latestGameResults: [],
            },
        };
        render(<LatestWinners />, { preloadedState });
        expect(screen.queryByText('No games played yet')).toBeInTheDocument();
    });

    it('renders wins', () => {
        const preloadedState: Partial<RootState> = {
            lobby: {
                rooms: [],
                latestGameResults: [
                    {
                        id: 'randomId1',
                        winners: ['Laura'],
                        nonWinners: ['Charles', 'Joni', 'Rickie'],
                        result: 'WIN',
                    },
                ],
            },
        };
        render(<LatestWinners />, { preloadedState });
        expect(
            screen.queryByText('Laura won 🏆 over Charles, Joni, Rickie')
        ).toBeInTheDocument();
    });

    it('renders ties', () => {
        const preloadedState: Partial<RootState> = {
            lobby: {
                rooms: [],
                latestGameResults: [
                    {
                        id: 'randomId1',
                        winners: [],
                        nonWinners: ['Laura', 'Charles', 'Joni', 'Rickie'],
                        result: 'TIE',
                    },
                ],
            },
        };
        render(<LatestWinners />, { preloadedState });
        expect(
            screen.queryByText('Tie game: Laura, Charles, Joni, Rickie')
        ).toBeInTheDocument();
    });
});
