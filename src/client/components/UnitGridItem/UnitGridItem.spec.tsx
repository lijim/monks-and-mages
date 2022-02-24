import React from 'react';
import { render, screen } from '@testing-library/react';

import { UnitCards } from '@/cardDb/units';
import { UnitGridItem } from './UnitGridItem';
import { Resource, RESOURCE_GLOSSARY } from '@/types/resources';

describe('Unit Grid Item', () => {
    it('renders unit name + casting cost', () => {
        render(<UnitGridItem card={UnitCards.SQUIRE} />);
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(
            screen.getByText(RESOURCE_GLOSSARY[Resource.IRON].icon)
        ).toBeInTheDocument();
    });
    it('displays as soldier', () => {
        render(<UnitGridItem card={UnitCards.SQUIRE} />);
        expect(screen.getByText('Unit - Soldier')).toBeInTheDocument();
    });
    it('displays as ranged', () => {
        render(<UnitGridItem card={UnitCards.JAVELINEER} />);
        expect(screen.getByText('Unit - Ranged')).toBeInTheDocument();
    });
    it('displays as magic', () => {
        render(<UnitGridItem card={UnitCards.WATER_MAGE} />);
        expect(screen.getByText('Unit - Magical')).toBeInTheDocument();
    });
    it('displays rules text (ETBs)', () => {
        render(<UnitGridItem card={UnitCards.WATER_MAGE} />);
        expect(
            screen.getByText(`Return 1 of any unit back to its owner's hand`)
        ).toBeInTheDocument();
        expect(
            screen.getByText('Upon entering the board:')
        ).toBeInTheDocument();
    });
    it('displays rules text (Passives)', () => {
        render(<UnitGridItem card={UnitCards.KNIGHT_TEMPLAR} />);
        expect(
            screen.getByText('Quick (can attack right away)')
        ).toBeInTheDocument();
    });
});
