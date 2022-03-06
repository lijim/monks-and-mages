import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '@/test-utils';

import { GameDisplay } from './GameDisplay';
import { RootState } from '@/client/redux/store';
import { makeNewBoard } from '@/factories/board';

describe('GameDisplay', () => {
    it('renders player names', () => {
        const preloadedState: Partial<RootState> = {
            user: {
                name: 'Tommy',
            },
            board: makeNewBoard(['Tommy', 'Timmy']),
        };
        render(<GameDisplay />, { preloadedState });
        expect(screen.queryByText('Tommy')).toBeInTheDocument();
        expect(screen.queryByText('Timmy')).toBeInTheDocument();
    });
});
