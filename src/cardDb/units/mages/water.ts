import { makeUnitCard as makeCard } from '@/factories/cards';
import { UnitCard } from '@/types/cards';
import { EffectType, TargetTypes } from '@/types/effects';
import { Resource } from '@/types/resources';
import { Tokens } from '../tokens';

const GIANT_JELLY: UnitCard = makeCard({
    name: 'Giant Jelly',
    // https://pixabay.com/photos/fantasy-beach-children-jellyfish-3281842/
    imgSrc: 'https://cdn.pixabay.com/photo/2018/04/01/19/15/fantasy-3281842_1280.jpg',
    cost: {
        [Resource.WATER]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 2,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const FROST_WYRM: UnitCard = makeCard({
    name: 'Frost Wyrm',
    // https://pixabay.com/photos/fantasy-dragon-rock-mountains-3756975/
    imgSrc: 'https://cdn.pixabay.com/photo/2018/10/18/17/30/fantasy-3756975_1280.jpg',
    cost: {
        [Resource.WATER]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.CURSE_HAND,
            target: TargetTypes.SELF_PLAYER,
            strength: 1,
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
    totalHp: 1,
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

const WAVING_FISHERMAN: UnitCard = makeCard({
    name: 'Waving Fisherman',
    // https://pixabay.com/photos/fisherman-fishing-boat-boat-fishing-2739115/
    imgSrc: 'https://cdn.pixabay.com/photo/2017/09/11/14/11/fisherman-2739115_1280.jpg',
    cost: {
        [Resource.WATER]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.TRANSMUTE,
            strength: 1,
            cardName: 'Water',
            secondaryCardName: 'Waving Fisherman',
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

const MISBEGOTTEN_MISTWALKER = makeCard({
    name: 'Misbegotten Mistwalker',
    // https://pixabay.com/photos/fantasy-spirit-nightmare-dream-2847724/
    imgSrc: 'https://cdn.pixabay.com/photo/2017/10/13/14/15/fantasy-2847724_1280.jpg',
    cost: {
        [Resource.WATER]: 2,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BOUNCE,
            strength: 1,
            target: TargetTypes.OPPOSING_UNIT,
        },
        {
            type: EffectType.BOUNCE,
            strength: 1,
            target: TargetTypes.OWN_UNIT,
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

const PEACE_BRINGER = makeCard({
    name: 'Peace Bringer',
    // https://pixabay.com/photos/fantasy-girl-sea-spray-gull-water-5369086/
    imgSrc: 'https://cdn.pixabay.com/photo/2020/07/04/10/36/fantasy-5369086_1280.jpg',
    cost: {
        [Resource.WATER]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DRAW,
            strength: 2,
            target: TargetTypes.ALL_PLAYERS,
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

const THUNDER_SCHEDULER: UnitCard = makeCard({
    name: 'Thunder Scheduler',
    // https://pixabay.com/photos/fantasy-waterfall-landscape-2762571/
    imgSrc: 'https://cdn.pixabay.com/photo/2017/09/18/17/34/fantasy-2762571_1280.jpg',
    cost: {
        [Resource.WATER]: 2,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BUFF_ATTACK,
            target: TargetTypes.OPPOSING_UNIT,
            strength: -2,
        },
        {
            type: EffectType.BUFF_ATTACK,
            target: TargetTypes.OPPOSING_UNIT,
            strength: -1,
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

const MAELSTROM_SEEKER: UnitCard = makeCard({
    name: 'Maelstrom Seeker',
    // https://pixabay.com/photos/man-swirl-wormhole-mountain-top-5724867/
    imgSrc: 'https://cdn.pixabay.com/photo/2020/11/08/20/06/man-5724867_1280.jpg',
    cost: {
        [Resource.WATER]: 2,
        [Resource.GENERIC]: 3,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.SHUFFLE_FROM_HAND,
            cardName: 'Water',
            target: TargetTypes.OPPONENT,
        },
    ],
    totalHp: 4,
    attack: 3,
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
    GIANT_JELLY,
    FROST_WYRM,
    MEDITATION_EXPERT,
    MANTA_RAY_CONJURER,
    TINY_MERMAID,
    RAIN_CHANNELER,
    WAVING_FISHERMAN,
    MISBEGOTTEN_MISTWALKER,
    PELAGIC_PREDATOR,
    WATER_MAGE,
    PEACE_BRINGER,
    THUNDER_SCHEDULER,
    MAELSTROM_SEEKER,
    CURSED_CHIEFTAIN,
    AQUARIAN_ADEPT,
    CHAD_THE_AQUAPHILE,
    WATER_GUARDIAN,
};
