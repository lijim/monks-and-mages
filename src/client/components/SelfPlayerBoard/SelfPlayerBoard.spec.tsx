import React from 'react';
import { screen } from '@testing-library/react';

import { RootState } from '@/client/redux/store';
import { makeNewBoard } from '@/factories/board';
import { render } from '@/test-utils';
import { SelfPlayerBoard } from './SelfPlayerBoard';

describe('Self Player Board', () => {
    it('renders your hand', () => {
        const preloadedState: Partial<RootState> = {
            user: {
                name: 'Melvin',
            },
            board: makeNewBoard(['Melvin', 'Melissa']),
        };
        render(<SelfPlayerBoard />, { preloadedState });
        const unitCards = screen.queryAllByTestId('UnitGridItem');
        const resourceCards = screen.queryAllByTestId('ResourceCard-GridItem');
        const spellCards = screen.queryAllByTestId('SpellGridItem');
        expect(
            unitCards.length + resourceCards.length + spellCards.length
        ).toEqual(preloadedState.board.players[0].numCardsInHand);
    });
});
