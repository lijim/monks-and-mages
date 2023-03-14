import React from 'react';
import { screen } from '@testing-library/react';

import { CompactDeckList } from './CompactDeckList';
import { makeSampleDeck1 } from '@/factories/deck';
import { render } from '@/test-utils';
import { makeNewBoard } from '@/factories';

describe('DeckList', () => {
    it('renders a deck', () => {
        render(<CompactDeckList deck={makeSampleDeck1()} />, {
            preloadedState: {
                board: makeNewBoard({
                    playerNames: ['Timmy', 'Tommy'],
                }),
                user: {
                    name: 'Timmy',
                },
            },
        });
        expect(screen.queryAllByText('Knight Templar')).toHaveLength(1);
        expect(screen.queryAllByText('Bamboo')).toHaveLength(1);
        expect(screen.queryAllByText('3')).toHaveLength(7);
    });
});
