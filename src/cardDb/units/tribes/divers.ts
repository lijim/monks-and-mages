import { makeUnitCard as makeCard } from '@/factories/cards';
import { UnitCard } from '@/types/cards';
import { EffectType } from '@/types/effects';
import { Resource } from '@/types/resources';
import { Tokens } from '../tokens';

const TRAINEE_DIVER: UnitCard = makeCard({
    name: 'Trainee Diver',
    imgSrc: 'https://images.pexels.com/photos/5581819/pexels-photo-5581819.jpeg',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.WATER]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.SUMMON_UNITS,
            summonType: Tokens.MANTA_RAY,
            strength: 2,
        },
    ],
    totalHp: 1,
    attack: 0,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
});

const SEASONAL_CROPHAND: UnitCard = makeCard({
    name: 'Seasonal Crophand',
    imgSrc: 'https://images.pexels.com/photos/247597/pexels-photo-247597.jpeg',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.WATER]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.RAMP,
            resourceType: Resource.WATER,
            strength: 1,
        },
    ],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
});

const CALM_SUMMONER: UnitCard = makeCard({
    name: 'Calm Summoner',
    imgSrc: 'https://images.pexels.com/photos/5368994/pexels-photo-5368994.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.WATER]: 1,
        [Resource.CRYSTAL]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.SUMMON_UNITS,
            summonType: Tokens.FALCON,
            strength: 2,
        },
        {
            type: EffectType.DRAW,
            strength: 1,
        },
    ],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
});

const DEEP_SEA_EXPLORER: UnitCard = makeCard({
    name: 'Deep Sea Explorer',
    imgSrc: 'https://images.pexels.com/photos/3113226/pexels-photo-3113226.jpeg',
    cost: {
        [Resource.BAMBOO]: 1,
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
            type: EffectType.SUMMON_UNITS,
            summonType: Tokens.MANTA_RAY,
            strength: 1,
        },
        {
            type: EffectType.SUMMON_UNITS,
            summonType: Tokens.SHARK,
            strength: 1,
        },
    ],
    totalHp: 2,
    attack: 1,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
});

const ICTHYOMANCER: UnitCard = makeCard({
    name: 'Icthyomancer',
    imgSrc: 'https://images.unsplash.com/photo-1540461788492-74719fe22ab9',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.WATER]: 1,
        [Resource.GENERIC]: 6,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.SUMMON_UNITS,
            summonType: Tokens.OCTOPUS,
            strength: 1,
        },
    ],
    totalHp: 2,
    attack: 1,
    numAttacks: 1,
    isRanged: false,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

export const DIVERS = {
    TRAINEE_DIVER,
    SEASONAL_CROPHAND,
    CALM_SUMMONER,
    DEEP_SEA_EXPLORER,
    ICTHYOMANCER,
};
