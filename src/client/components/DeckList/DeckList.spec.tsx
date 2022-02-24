import React from 'react';
import { screen, render } from '@testing-library/react';

import { DeckList } from './DeckList';
import { makeSampleDeck1 } from '@/factories/deck';

describe('DeckList', () => {
    it('renders a deck', () => {
        render(<DeckList deck={makeSampleDeck1()} />);
        expect(screen.queryAllByText('Knight Templar')).toHaveLength(1);
        expect(screen.queryAllByText('Bamboo')).toHaveLength(1);
        expect(screen.queryAllByText('3')).toHaveLength(9);
        expect(screen.queryAllByText('9')).toHaveLength(2);
    });
});
