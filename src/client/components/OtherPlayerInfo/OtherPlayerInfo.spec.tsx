import React from 'react';
import { render, screen } from '@testing-library/react';
import { OtherPlayerInfo } from './OtherPlayerInfo';
import { makeNewPlayer } from '@/factories/player';
import { SAMPLE_DECKLIST_1 } from '@/constants/deckLists';

describe('Other Player Info', () => {
    it("renders the other player's name", () => {
        const player = makeNewPlayer({
            name: 'Phyllis',
            decklist: SAMPLE_DECKLIST_1,
        });
        render(<OtherPlayerInfo player={player} />);
        expect(screen.getByText('Phyllis')).toBeInTheDocument();
    });
});
