import cloneDeep from 'lodash.clonedeep';
import { v4 as uuidv4 } from 'uuid';

import {
    Card,
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
        ...unitBase,
        cardType: CardType.UNIT,
        hp: unitBase.totalHp,
        numAttacksLeft: hasQuick ? unitBase.numAttacks : 0,
        isSelected: false,
        hpBuff: 0,
        attackBuff: 0,
        originalCost: cloneDeep(unitBase.cost),
        originalPassiveEffects: cloneDeep(unitBase.passiveEffects),
    };
};

export const makeCard = <T = Card>(card: T): T => {
    return { ...cloneDeep(card), id: uuidv4() };
};
