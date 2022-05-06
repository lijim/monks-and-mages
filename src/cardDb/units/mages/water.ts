import { makeUnitCard as makeCard } from '@/factories/cards';
import { UnitCard } from '@/types/cards';
import { EffectType, TargetTypes } from '@/types/effects';
import { Resource } from '@/types/resources';
import { Tokens } from '../tokens';

const MEDITATION_EXPERT: UnitCard = makeCard({
    name: 'Meditation Expert',
    imgSrc: 'https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg',
    cost: {
        [Resource.WATER]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.HEAL,
            strength: 2,
            target: TargetTypes.ANY,
        },
    ],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const MANTA_RAY_CONJURER: UnitCard = makeCard({
    name: 'Manta Ray Conjurer',
    imgSrc: 'https://images.unsplash.com/photo-1626436819821-d2855be474c1',
    cost: {
        [Resource.WATER]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.SUMMON_UNITS,
            strength: 1,
            summonType: Tokens.MANTA_RAY,
        },
    ],
    totalHp: 2,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const TINY_MERMAID: UnitCard = makeCard({
    name: 'Tiny Mermaid',
    imgSrc: 'https://images.unsplash.com/photo-1573386843695-7d98e77ad72b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8',
    cost: {
        [Resource.WATER]: 1,
        [Resource.CRYSTAL]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.SUMMON_UNITS,
            strength: 1,
            summonType: Tokens.MANATEE,
        },
    ],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const RAIN_CHANNELER: UnitCard = makeCard({
    name: 'Rain Channeler',
    imgSrc: 'https://images.pexels.com/photos/1530423/pexels-photo-1530423.jpeg',
    cost: {
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
    totalHp: 2,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const WATER_MAGE: UnitCard = makeCard({
    name: 'Water Mage',
    imgSrc: 'https://images.unsplash.com/photo-1617073397927-12ff53956f42',
    cost: {
        [Resource.WATER]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BOUNCE,
            strength: 1,
            target: TargetTypes.UNIT,
        },
    ],
    totalHp: 3,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const PELAGIC_PREDATOR = makeCard({
    name: 'Pelagic Predator',
    imgSrc: 'https://images.pexels.com/photos/11348763/pexels-photo-11348763.jpeg',
    cost: {
        [Resource.WATER]: 1,
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
    totalHp: 3,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
});

const CURSED_CHIEFTAIN: UnitCard = makeCard({
    name: 'Cursed Chieftain',
    imgSrc: 'https://images.pexels.com/photos/2569229/pexels-photo-2569229.jpeg',
    cost: {
        [Resource.WATER]: 1,
        [Resource.GENERIC]: 3,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BOUNCE,
            strength: 1,
            target: TargetTypes.OWN_UNIT,
        },
        {
            type: EffectType.BOUNCE,
            strength: 1,
            target: TargetTypes.OWN_UNIT,
        },
    ],
    totalHp: 4,
    attack: 4,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const AQUARIAN_ADEPT: UnitCard = makeCard({
    name: 'Aquarian Adept',
    imgSrc: 'https://images.pexels.com/photos/5581759/pexels-photo-5581759.jpeg',
    cost: {
        [Resource.WATER]: 1,
        [Resource.CRYSTAL]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [],
    totalHp: 3,
    attack: 4,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const CHAD_THE_AQUAPHILE: UnitCard = makeCard({
    name: 'Chad the Aquaphile',
    imgSrc: 'https://images.pexels.com/photos/1635919/pexels-photo-1635919.jpeg',
    cost: {
        [Resource.WATER]: 1,
        [Resource.CRYSTAL]: 1,
        [Resource.GENERIC]: 3,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.RAMP,
            target: TargetTypes.ALL_OPPONENTS,
            resourceType: Resource.WATER,
            strength: 1,
        },
    ],
    totalHp: 5,
    attack: 4,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const WATER_GUARDIAN: UnitCard = makeCard({
    name: 'Water Guardian',
    imgSrc: 'https://images.unsplash.com/photo-1616123654898-ee836f578193',
    cost: {
        [Resource.CRYSTAL]: 2,
        [Resource.WATER]: 2,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.HEAL,
            strength: 3,
            target: TargetTypes.ANY,
        },
        {
            type: EffectType.BOUNCE,
            strength: 1,
            target: TargetTypes.UNIT,
        },
    ],
    totalHp: 5,
    attack: 5,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

export const WATER_MAGES = {
    MEDITATION_EXPERT,
    MANTA_RAY_CONJURER,
    TINY_MERMAID,
    RAIN_CHANNELER,
    PELAGIC_PREDATOR,
    WATER_MAGE,
    CURSED_CHIEFTAIN,
    AQUARIAN_ADEPT,
    CHAD_THE_AQUAPHILE,
    WATER_GUARDIAN,
};
