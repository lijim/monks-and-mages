import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '@/test-utils';

import { HandOfCards } from './HandOfCards';
import { RootState } from '@/client/redux/store';
import { makeNewBoard } from '@/factories/board';

describe('Hand of Cards', () => {
    it('renders cards in hand', () => {
        const preloadedState: Partial<RootState> = {
            user: {
                name: 'Tommy',
            },
            board: makeNewBoard(['Tommy', 'Timmy']),
        };
        render(<HandOfCards />, { preloadedState });
        const unitCards = screen.queryAllByTestId('UnitGridItem');
        const resourceCards = screen.queryAllByTestId('ResourceCard-GridItem');
        const spellCards = screen.queryAllByTestId('SpellGridItem');
        expect(
            unitCards.length + resourceCards.length + spellCards.length
        ).toEqual(preloadedState.board.players[0].numCardsInHand);
    });
});
