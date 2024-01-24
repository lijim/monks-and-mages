import React from 'react';
import { makeCard, makeNewBoard } from '@/factories';
import { render, screen } from '@/test-utils';
import { Format } from '@/types/games';
import { DraftingTable } from './DraftingTable';
import { UnitCards } from '@/mocks/units';

describe('Drafting Table', () => {
    it('renders cards in your draft building pool', () => {
        const board = makeNewBoard({
            playerNames: ['Timmy', 'Tommy'],
            startingPlayerIndex: 0,
            format: Format.DRAFT,
        });
        board.players[0].deckBuildingPool = [makeCard(UnitCards.FIRE_MAGE)];

        render(<DraftingTable />, {
            preloadedState: { board, user: { name: 'Timmy' } },
        });

        expect(screen.getAllByText('Fire Mage').length).toBeGreaterThan(0);
    });

    it('works in spectator mode', () => {
        const board = makeNewBoard({
            playerNames: ['Timmy', 'Tommy'],
            startingPlayerIndex: 0,
            format: Format.DRAFT,
        });
        board.players[0].deckBuildingPool = [makeCard(UnitCards.FIRE_MAGE)];

        render(<DraftingTable />, {
            preloadedState: { board, user: { name: 'Rip Van Winkle' } },
        });

        expect(screen.getByText('Pile 1')).toBeInTheDocument();
    });
});
