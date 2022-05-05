import { CardType, UnitBase } from '@/types/cards';
import { EffectType, PassiveEffect } from '@/types/effects';
import { Resource } from '@/types/resources';
import { makeUnitCard as makeCard } from '@/factories/cards';

describe('Unit Cards', () => {
    it('creates a card based on a base', () => {
        const unitBase: UnitBase = {
            name: "Magician's Apprentice",
            cost: {
                [Resource.CRYSTAL]: 1,
                [Resource.GENERIC]: 1,
            },
            description: '',
            enterEffects: [
                {
                    type: EffectType.DRAW,
                    strength: 1,
                },
            ],
            totalHp: 10,
            attack: 7,
            numAttacks: 3,
            isRanged: true,
            isMagical: true,
            isSoldier: false,
            passiveEffects: [],
        };
        const unitCard = makeCard(unitBase);
        expect(unitCard.name).toBe(unitBase.name);
        expect(unitCard.attack).toBe(unitBase.attack);
        expect(unitCard.attackBuff).toBe(0);
        expect(unitCard.numAttacksLeft).toBe(0);
        expect(unitCard.hp).toBe(10);
        expect(unitCard.hpBuff).toBe(0);
        expect(unitCard.originalCost).toEqual(unitBase.cost);
        expect(unitCard.cardType).toBe(CardType.UNIT);
        expect(unitCard.isSelected).toBe(false);
    });

    it('sets the number of attacks to non-zero if the unit is hasty', () => {
        const unitBase: UnitBase = {
            name: 'Hasty Wizard',
            cost: {
                [Resource.CRYSTAL]: 1,
                [Resource.GENERIC]: 1,
            },
            description: '',
            enterEffects: [],
            totalHp: 10,
            attack: 7,
            numAttacks: 3,
            isRanged: true,
            isMagical: true,
            isSoldier: false,
            passiveEffects: [PassiveEffect.QUICK],
        };
        const unitCard = makeCard(unitBase);
        expect(unitCard.numAttacksLeft).toBe(3);
    });
});
