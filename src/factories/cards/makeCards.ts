import cloneDeep from 'lodash.clonedeep';
import { v4 as uuidv4 } from 'uuid';

import {
    Card,
    CardRarity,
    CardType,
    ResourceCard,
    UnitBase,
    UnitCard,
} from '@/types/cards';
import { Resource } from '@/types/resources';
import { PassiveEffect } from '@/types/effects';

export const makeResourceCard = (resource: Resource): ResourceCard => ({
    cardType: CardType.RESOURCE,
    name: resource,
    resourceType: resource,
    isUsed: false,
    id: uuidv4(),
    rarity: CardRarity.COMMON,
});

export const makeAdvancedResourceCard = (
    params: Omit<ResourceCard, 'cardType' | 'isUsed' | 'isAdvanced'>
): ResourceCard => ({
    cardType: CardType.RESOURCE,
    isAdvanced: true,
    isUsed: false,
    ...params,
});

export const makeUnitCard = (unitBase: UnitBase): UnitCard => {
    const hasQuick = unitBase.passiveEffects.indexOf(PassiveEffect.QUICK) > -1;
    return {
        ...cloneDeep(unitBase),
        cardType: CardType.UNIT,
        hp: unitBase.totalHp,
        numAttacksLeft: hasQuick ? unitBase.numAttacks : 0,
        isFresh: true,
        isSelected: false,
        isLegendaryLeader: false,
        hpBuff: 0,
        attackBuff: 0,
        oneCycleAttackBuff: 0,
        oneTurnAttackBuff: 0,
        originalAttributes: {
            cost: cloneDeep(unitBase.cost),
            isMagical: unitBase.isMagical,
            isRanged: unitBase.isRanged,
            numAttacks: unitBase.numAttacks,
            passiveEffects: cloneDeep(unitBase.passiveEffects),
        },
    };
};

export const makeCard = <T = Card>(card: T): T => {
    return { ...cloneDeep(card), id: uuidv4() };
};
