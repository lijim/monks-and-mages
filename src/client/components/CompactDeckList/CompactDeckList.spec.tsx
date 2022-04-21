import React from 'react';
import { screen, render } from '@testing-library/react';

import { CompactDeckList } from './CompactDeckList';
import { makeSampleDeck1 } from '@/factories/deck';

describe('DeckList', () => {
    it('renders a deck', () => {
        render(<CompactDeckList deck={makeSampleDeck1()} />);
        expect(screen.queryAllByText('Knight Templar')).toHaveLength(1);
        expect(screen.queryAllByText('Bamboo')).toHaveLength(1);
        expect(screen.queryAllByText('3')).toHaveLength(7);
    });
});
