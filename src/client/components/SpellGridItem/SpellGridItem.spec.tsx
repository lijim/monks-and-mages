import React from 'react';
import { render, screen } from '@testing-library/react';

import { SpellGridItem } from './SpellGridItem';
import { makeCard } from '@/factories/cards';
import { SpellCards } from '@/cardDb/spells';
import { Resource, RESOURCE_GLOSSARY } from '@/types/resources';

describe('SpellGridItem', () => {
    it('renders a spell card + rules text', () => {
        render(<SpellGridItem card={makeCard(SpellCards.EMBER_SPEAR)} />);

        expect(
            screen.getByText('Deal 3 damage to any target')
        ).toBeInTheDocument();
        expect(screen.getByText('Ember Spear')).toBeInTheDocument();
    });

    it('renders casting cost', () => {
        render(<SpellGridItem card={makeCard(SpellCards.EMBER_SPEAR)} />);

        expect(
            screen.getByText(RESOURCE_GLOSSARY[Resource.FIRE].icon)
        ).toBeInTheDocument();
    });
});
