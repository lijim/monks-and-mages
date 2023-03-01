import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '@/test-utils';

import { UnitCards } from '@/mocks/units';
import { UnitGridItem } from './UnitGridItem';
import { Resource, RESOURCE_GLOSSARY } from '@/types/resources';
import { makeCard } from '@/factories/cards';
import { EffectType } from '@/types/effects';

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
    it('displays as legendary', () => {
        render(<UnitGridItem card={UnitCards.JOAN_OF_ARC_FOLK_HERO} />);
        expect(
            screen.getByText('Unit - Soldier (Legendary)')
        ).toBeInTheDocument();
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
            screen.getByText(`Return any unit back to its owner's hand`)
        ).toBeInTheDocument();
        expect(
            screen.getByText('Upon entering the board:')
        ).toBeInTheDocument();
    });
    it('displays rules text (ETBs)', () => {
        const card = UnitCards.WATER_MAGE;
        card.damagePlayerEffects = [
            {
                type: EffectType.DEAL_DAMAGE,
                strength: 1,
            },
        ];
        render(<UnitGridItem card={card} />);
        expect(
            screen.getByText(`Upon damaging an opposing player in combat:`)
        ).toBeInTheDocument();
        expect(
            screen.getByText('Deal 1 damage to any target')
        ).toBeInTheDocument();
    });
    it('displays rules text (Passives)', () => {
        render(<UnitGridItem card={UnitCards.KNIGHT_TEMPLAR} />);
        expect(
            screen.getByText('Quick (can attack right away)')
        ).toBeInTheDocument();
    });

    it('displays "2 attacks per turn', () => {
        const card = makeCard(UnitCards.SQUIRE);
        card.numAttacks = 2;
        render(<UnitGridItem card={card} />);
        expect(screen.getByText('2 attacks per turn')).toBeInTheDocument();
    });

    it('displays sleepiness', () => {
        render(<UnitGridItem card={UnitCards.LANCER} isOnBoard />);
        expect(screen.getByText('💤')).toBeInTheDocument();
    });

    it('hides sleepiness (not on board)', () => {
        render(<UnitGridItem card={UnitCards.LANCER} />);
        expect(screen.queryByText('💤')).not.toBeInTheDocument();
    });

    it('hides sleepiness (quick units)', () => {
        render(<UnitGridItem card={UnitCards.KNIGHT_TEMPLAR} isOnBoard />);
        expect(screen.queryByText('💤')).not.toBeInTheDocument();
    });

    it('renders attack and hp buffs', () => {
        const unitCard = makeCard(UnitCards.SQUIRE);
        unitCard.attackBuff = 5;
        unitCard.hpBuff = 6;
        render(<UnitGridItem card={unitCard} isOnBoard />);
        expect(screen.getByTestId('attack')).toHaveTextContent(
            `${unitCard.attackBuff + unitCard.attack} ⚔️`
        );
        const newHpTotal = unitCard.hpBuff + unitCard.hp;
        expect(screen.getByTestId('hp')).toHaveTextContent(
            `${newHpTotal} / ${newHpTotal} 💙`
        );
    });
});
