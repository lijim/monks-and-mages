import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '@/test-utils';

import { GameDisplay } from './GameDisplay';
import { RootState } from '@/client/redux/store';
import { makeNewBoard } from '@/factories/board';
import { EffectType } from '@/types/effects';

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

    it('renders active effects', () => {
        const board = makeNewBoard(['Tommy', 'Timmy'], 0);
        const preloadedState: Partial<RootState> = {
            user: {
                name: 'Tommy',
            },
            board,
        };
        board.players[0].effectQueue = [
            { type: EffectType.DEAL_DAMAGE, strength: 3 },
        ];
        render(<GameDisplay />, { preloadedState });

        expect(
            screen.getByText('Resolving: Deal 3 damage to any target')
        ).toBeInTheDocument();
    });
});
