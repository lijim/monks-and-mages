import { makeUnitCard as makeCard } from '@/factories/cards';
import { UnitCard } from '@/types/cards';
import { EffectType, PassiveEffect, TargetTypes } from '@/types/effects';
import { Resource } from '@/types/resources';

const FERRY_OPERATOR = makeCard({
    name: 'Ferry Operator',
    imgSrc: 'https://cdn.pixabay.com/photo/2013/07/18/20/25/boat-164977_1280.jpg',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.WATER]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 2,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const FROSTBURN_MAGE = makeCard({
    name: 'Frostburn Mage',
    imgSrc: 'https://images.pexels.com/photos/1879877/pexels-photo-1879877.jpeg',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.WATER]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ALL_OPPONENTS,
            strength: 2,
        },
    ],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [PassiveEffect.QUICK],
});

const HEAVENLY_FERRIER = makeCard({
    name: 'Heavenly Ferrier',
    imgSrc: 'https://images.pexels.com/photos/1829193/pexels-photo-1829193.jpeg',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.WATER]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BOUNCE,
            target: TargetTypes.OWN_UNIT,
        },
    ],
    totalHp: 1,
    attack: 3,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [PassiveEffect.QUICK],
});

const ARCHANGEL = makeCard({
    name: 'Archangel',
    imgSrc: 'https://images.pexels.com/photos/4362592/pexels-photo-4362592.jpeg',
    cost: {
        [Resource.FIRE]: 2,
        [Resource.WATER]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BOUNCE,
            target: TargetTypes.OPPOSING_UNIT,
        },
        {
            type: EffectType.RAMP_FOR_TURN,
            strength: 1,
            resourceType: Resource.FIRE,
        },
    ],
    totalHp: 3,
    attack: 3,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const WIND_MAGE: UnitCard = makeCard({
    name: 'Wind Mage',
    imgSrc: 'https://images.unsplash.com/photo-1629017131848-70565515a58e',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.WATER]: 1,
        [Resource.GENERIC]: 4,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DRAW,
            strength: 1,
        },
        {
            type: EffectType.BUFF_TEAM_HP,
            strength: 1,
        },
    ],
    totalHp: 4,
    attack: 3,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [PassiveEffect.QUICK],
});

export const WIND_MAGES = {
    FERRY_OPERATOR,
    FROSTBURN_MAGE,
    HEAVENLY_FERRIER,
    ARCHANGEL,
    WIND_MAGE,
};
