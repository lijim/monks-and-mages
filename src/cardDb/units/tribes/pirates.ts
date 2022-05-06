import { makeUnitCard as makeCard } from '@/factories/cards';
import { UnitCard } from '@/types/cards';
import { EffectType, PassiveEffect } from '@/types/effects';
import { Resource } from '@/types/resources';
import { Tokens } from '../tokens';

const NOBLE_STEED: UnitCard = makeCard({
    name: 'Noble Steed',
    imgSrc: 'https://images.pexels.com/photos/210237/pexels-photo-210237.jpeg',
    cost: {
        [Resource.WATER]: 1,
        [Resource.IRON]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 4,
    attack: 1,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [PassiveEffect.QUICK],
});

const ELDER_PIRATE: UnitCard = makeCard({
    name: 'Elder Pirate',
    imgSrc: 'https://cdn.pixabay.com/photo/2016/03/22/16/09/sailboat-1273168_1280.jpg',
    cost: {
        [Resource.WATER]: 1,
        [Resource.IRON]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.SUMMON_UNITS,
            strength: 1,
            summonType: Tokens.PIRATE_PARROT,
        },
    ],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
});

const DARING_CORSAIR: UnitCard = makeCard({
    name: 'Daring Corsair',
    imgSrc: 'https://cdn.pixabay.com/photo/2019/06/03/20/38/pirate-4249873_1280.jpg',
    cost: {
        [Resource.WATER]: 2,
        [Resource.IRON]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.LEARN,
            cardName: 'RICHES',
            strength: 1,
        },
    ],
    totalHp: 3,
    attack: 2,
    numAttacks: 2,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
});

export const PIRATES = {
    NOBLE_STEED,
    ELDER_PIRATE,
    DARING_CORSAIR,
};
