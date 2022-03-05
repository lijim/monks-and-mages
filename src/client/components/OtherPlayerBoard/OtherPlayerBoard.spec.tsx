import React from 'react';
import { render, screen } from '@testing-library/react';
import { OtherPlayerBoard } from './OtherPlayerBoard';
import { makeNewPlayer } from '@/factories/player';
import { SAMPLE_DECKLIST_1 } from '@/factories/deck';

describe('Other Player Board Section', () => {
    it("renders the other player's name", () => {
        const player = makeNewPlayer('Phyllis', SAMPLE_DECKLIST_1);
        render(<OtherPlayerBoard player={player} />);
        expect(screen.getByText('Phyllis')).toBeInTheDocument();
    });
});
