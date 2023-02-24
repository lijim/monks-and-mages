import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '@/test-utils';

import { makeCard, makeResourceCard } from '@/factories/cards';
import { ResourceCard } from '@/types/cards';
import { Resource } from '@/types/resources';

import { CardGridItem, HelperText } from './CardGridItem';
import { UnitCards } from '@/cardDb/units';
import { SpellCards } from '@/cardDb/spells';
import { AdvancedResourceCards } from '@/cardDb/resources/advancedResources';

describe('Card (Grid Item)', () => {
    it('renders a resource card', () => {
        const resourceCard: ResourceCard = makeResourceCard(Resource.CRYSTAL);
        render(<CardGridItem card={resourceCard} />);
        expect(screen.getByText('Crystal')).toBeInTheDocument();
        expect(screen.getByText('Resource')).toBeInTheDocument();
    });

    it('renders an advanced resource card', () => {
        render(
            <CardGridItem
                card={makeCard(AdvancedResourceCards.SAHARAN_DESERT)}
            />
        );
        expect(screen.getByText('Saharan Desert')).toBeInTheDocument();
    });

    it('renders a unit card', () => {
        render(<CardGridItem card={makeCard(UnitCards.TEMPLE_GUARDIAN)} />);
        expect(screen.getByText('Temple Guardian')).toBeInTheDocument();
        expect(screen.getByText('6 ⚔️')).toBeInTheDocument(); // attack
        expect(screen.getByText('7 💙')).toBeInTheDocument(); // health
    });

    it('renders help text', () => {
        // difficult to mock hover action on card, so testing the component directly
        render(<HelperText card={makeCard(UnitCards.TEMPLE_GUARDIAN)} />);
        expect(
            screen.getByText(
                'Soldiers must be attacked by non-magical units first'
            )
        ).toBeInTheDocument();
    });

    it('renders a spell card', () => {
        render(<CardGridItem card={makeCard(SpellCards.CONSTANT_REFILL)} />);
        expect(screen.getByText('Draw 4 cards')).toBeInTheDocument();
        expect(screen.getByText('Constant Refill'));
    });
});
