import { makeUnitCard as makeCard } from '@/factories/cards';
import { UnitCard } from '@/types/cards';
import { EffectType, TargetTypes } from '@/types/effects';
import { Resource } from '@/types/resources';
import { Tokens } from '../tokens';

const FIRE_TECHNICIAN: UnitCard = makeCard({
    name: 'Fire Technician',
    imgSrc: 'https://images.unsplash.com/photo-1494389945381-0fe114b8ea4b',
    cost: {
        [Resource.FIRE]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ANY,
            strength: 1,
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

const PYROCALLER: UnitCard = makeCard({
    name: 'Pyrocaller',
    imgSrc: 'https://images.pexels.com/photos/9553065/pexels-photo-9553065.jpeg',
    cost: {
        [Resource.FIRE]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.SELF_PLAYER,
            strength: 2,
        },
    ],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const MYSTICAL_FIGURE: UnitCard = makeCard({
    name: 'Mystical Figure',
    imgSrc: 'https://images.pexels.com/photos/5551875/pexels-photo-5551875.jpeg',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.RETURN_FROM_CEMETERY,
            cardName: 'Ember Spear',
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
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

const ZEALOUS_ACOLYTE: UnitCard = makeCard({
    name: 'Zealous Acolyte',
    imgSrc: 'https://images.pexels.com/photos/6644224/pexels-photo-6644224.jpeg',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DESTROY_RESOURCE,
            target: TargetTypes.ALL_OPPONENTS,
            strength: 1,
            resourceType: Resource.BAMBOO,
        },
    ],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const IMPRESSIVE_DANCER: UnitCard = makeCard({
    name: 'Impressive Dancer',
    imgSrc: 'https://images.pexels.com/photos/6136284/pexels-photo-6136284.jpeg',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ALL_PLAYERS,
            strength: 2,
        },
    ],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const FIRE_MAGE: UnitCard = makeCard({
    name: 'Fire Mage',
    imgSrc: 'https://images.unsplash.com/photo-1601908911751-06aa20dc2b1d',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ANY,
            strength: 2,
        },
    ],
    totalHp: 2,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const DEMON_CALLER: UnitCard = makeCard({
    name: 'Demon Caller',
    imgSrc: 'https://images.pexels.com/photos/6492603/pexels-photo-6492603.jpeg',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.CRYSTAL]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.SUMMON_UNITS,
            target: TargetTypes.ALL_PLAYERS,
            strength: 3,
            summonType: Tokens.DEMON,
        },
    ],
    totalHp: 2,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const FIRE_STARTER: UnitCard = makeCard({
    name: 'Fire Starter',
    imgSrc: 'https://images.pexels.com/photos/2104236/pexels-photo-2104236.jpeg',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.CRYSTAL]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.TRANSMUTE,
            strength: 2,
            cardName: 'Fire',
            secondaryCardName: 'Smolder',
        },
    ],
    totalHp: 1,
    attack: 3,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const FLAME_PRESERVER: UnitCard = makeCard({
    name: 'Flame Preserver',
    imgSrc: 'https://images.pexels.com/photos/3052651/pexels-photo-3052651.jpeg',
    cost: {
        [Resource.FIRE]: 2,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BUFF_TEAM_MAGIC,
            strength: 2,
        },
    ],
    totalHp: 3,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const MIDNIGHT_HELLSPAWN: UnitCard = makeCard({
    name: 'Midnight Hellspawn',
    imgSrc: 'https://images.pexels.com/photos/35888/amazing-beautiful-breathtaking-clouds.jpg',
    cost: {
        [Resource.FIRE]: 2,
        [Resource.CRYSTAL]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DESTROY_RESOURCE,
            strength: 1,
            target: TargetTypes.ALL_OPPONENTS,
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

const INFERNO_SORCEROR: UnitCard = makeCard({
    name: 'Inferno Sorceror',
    imgSrc: 'https://images.unsplash.com/photo-1476611550464-4b94f060e1c6',
    cost: {
        [Resource.CRYSTAL]: 1,
        [Resource.FIRE]: 3,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 3,
            target: TargetTypes.ANY,
        },
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 1,
            target: TargetTypes.ALL_OPPOSING_UNITS,
        },
        {
            type: EffectType.BUFF_TEAM_MAGIC,
            strength: 1,
        },
    ],
    totalHp: 5,
    attack: 3,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

export const FIRE_MAGES = {
    FIRE_TECHNICIAN,
    PYROCALLER,
    MYSTICAL_FIGURE,
    ZEALOUS_ACOLYTE,
    IMPRESSIVE_DANCER,
    FIRE_MAGE,
    DEMON_CALLER,
    FIRE_STARTER,
    MIDNIGHT_HELLSPAWN,
    FLAME_PRESERVER,
    INFERNO_SORCEROR,
};
