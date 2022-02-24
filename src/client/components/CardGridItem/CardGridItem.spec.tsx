import React from 'react';
import { render, screen } from '@testing-library/react';

import { makeCard, makeResourceCard } from '@/factories/cards';
import { ResourceCard } from '@/types/cards';
import { Resource } from '@/types/resources';

import { CardGridItem } from './CardGridItem';
import { UnitCards } from '@/cardDb/units';
import { SpellCards } from '@/cardDb/spells';

describe('Card (Grid Item)', () => {
    it('renders a resource card', () => {
        const resourceCard: ResourceCard = makeResourceCard(Resource.CRYSTAL);
        render(<CardGridItem card={resourceCard} />);
        expect(screen.getByText('Crystal')).toBeInTheDocument();
        expect(screen.getByText('Resource')).toBeInTheDocument();
    });

    it('renders a unit card', () => {
        render(<CardGridItem card={makeCard(UnitCards.TEMPLE_GUARDIAN)} />);
        expect(screen.getByText('Temple Guardian')).toBeInTheDocument();
        expect(screen.getByText('6 ⚔️')).toBeInTheDocument(); // attack
        expect(screen.getByText('7 💙')).toBeInTheDocument(); // health
    });

    it('renders a spell card', () => {
        render(<CardGridItem card={makeCard(SpellCards.CONSTANT_REFILL)} />);
        expect(screen.getByText('Draw 4 cards')).toBeInTheDocument();
        expect(screen.getByText('Constant Refill'));
    });
});
