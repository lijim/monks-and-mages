import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '@/test-utils';

import { makeNewPlayer } from '@/factories/player';
import { SAMPLE_DECKLIST_1 } from '@/factories/deck';
import { PlayerBoardSection } from './PlayerBoardSection';
import { makeCard, makeResourceCard } from '@/factories/cards';
import { UnitCards } from '@/cardDb/units';
import { Resource } from '@/types/resources';

describe('Player Board Section', () => {
    it('renders unit cards', () => {
        const player = makeNewPlayer('April', SAMPLE_DECKLIST_1);
        player.units = [
            makeCard(UnitCards.FIRE_MAGE),
            makeCard(UnitCards.WATER_MAGE),
        ];
        render(<PlayerBoardSection player={player} />);
        expect(screen.getByText('Fire Mage')).toBeInTheDocument();
    });

    it('renders resource cards', () => {
        const player = makeNewPlayer('April', SAMPLE_DECKLIST_1);
        player.resources = [
            makeResourceCard(Resource.BAMBOO),
            makeResourceCard(Resource.FIRE),
        ];
        render(<PlayerBoardSection player={player} />);
        expect(screen.getByText('Fire')).toBeInTheDocument();
        expect(screen.getByText('Bamboo')).toBeInTheDocument();
    });
});
