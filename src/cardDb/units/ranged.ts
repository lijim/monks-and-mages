import { makeUnitCard as makeCard } from '@/factories/cards';
import { CardRarity, UnitCard } from '@/types/cards';
import { EffectType, PassiveEffect, TargetTypes } from '@/types/effects';
import { Resource } from '@/types/resources';
import { Tokens } from './tokens';

const STONE_SLINGER: UnitCard = makeCard({
    name: 'Stone Slinger',
    imgSrc: 'https://images.unsplash.com/photo-1523441114522-8da17c0d51bf',
    cost: {
        [Resource.IRON]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [PassiveEffect.QUICK],
    rarity: CardRarity.COMMON,
});

const JAVELINEER: UnitCard = makeCard({
    name: 'Javelineer',
    imgSrc: 'https://images.unsplash.com/photo-1579156618441-0f9f420e2a25',
    cost: {
        [Resource.BAMBOO]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.COMMON,
});

const DRYAD: UnitCard = makeCard({
    artistName: 'Stefan Keller',
    artistUrl: 'https://pixabay.com/users/kellepics-4893063/',
    originalImagePage:
        'https://pixabay.com/illustrations/composing-woman-fantasy-face-2391033/',
    name: 'Dryad',
    imgSrc: 'https://cdn.pixabay.com/photo/2017/06/10/22/58/composing-2391033_1280.jpg',
    cost: {
        [Resource.CRYSTAL]: 1,
        [Resource.BAMBOO]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 3,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.RARE,
});

const LONGBOWMAN: UnitCard = makeCard({
    name: 'Longbowman',
    imgSrc: 'https://images.unsplash.com/photo-1504207277217-3a177a9c2e08?',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 1,
    attack: 3,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.COMMON,
});

const SLY_HUNTER: UnitCard = makeCard({
    name: 'Sly Hunter',
    imgSrc: 'https://cdn.pixabay.com/photo/2016/10/12/18/29/fairytale-1735399_1280.jpg',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [PassiveEffect.HEARTY],
    rarity: CardRarity.UNCOMMON,
});

const SILENT_MARKSWOMAN: UnitCard = makeCard({
    name: 'Silent Markswoman',
    // https://pixabay.com/photos/archer-night-forest-nature-moon-7157557/
    imgSrc: 'https://cdn.pixabay.com/photo/2022/04/26/07/01/archer-7157557_1280.jpg',
    cost: {
        [Resource.BAMBOO]: 2,
    },
    description: '',
    enterEffects: [
        {
            strength: 2,
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.OPPONENT,
        },
    ],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.COMMON,
});

const CANYON_ELITE: UnitCard = makeCard({
    name: 'Canyon Elite',
    // https://pixabay.com/photos/guards-of-the-canyon-warriors-4352204/
    imgSrc: 'https://cdn.pixabay.com/photo/2019/07/21/08/57/guards-of-the-canyon-4352204_1280.jpg',
    cost: {
        [Resource.IRON]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            strength: 1,
            type: EffectType.BUFF_ATTACK,
        },
        {
            strength: 2,
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.COMMON,
});

const CAVALRY_ARCHER: UnitCard = makeCard({
    name: 'Cavalry Archer',
    imgSrc: 'https://images.unsplash.com/photo-1560884854-6c1de51e4e15',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [PassiveEffect.QUICK],
    rarity: CardRarity.COMMON,
});

const POLICY_UNDERWRITER: UnitCard = makeCard({
    artistName: 'Gordon Taylor',
    artistUrl: 'https://pixabay.com/users/gbtaylor-2058304/',
    originalImagePage: 'https://pixabay.com/users/gbtaylor-2058304/',
    name: 'Policy Underwriter',
    imgSrc: 'https://cdn.pixabay.com/photo/2023/02/26/20/23/ai-generated-7816932_1280.jpg',
    cost: {
        [Resource.CRYSTAL]: 1,
        [Resource.FIRE]: 1,
        [Resource.IRON]: 1,
    },
    description: '',
    enterEffects: [],
    damagePlayerEffects: [
        {
            type: EffectType.DESTROY_UNIT,
            target: TargetTypes.OPPOSING_UNIT,
        },
    ],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.MYTHIC,
});

const WINGED_SAVIOR: UnitCard = makeCard({
    name: 'Winged Savior',
    // https://pixabay.com/illustrations/angel-dark-dark-angel-gothic-goth-2665661/
    imgSrc: 'https://cdn.pixabay.com/photo/2017/08/21/15/06/angel-2665661_1280.jpg',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.WATER]: 1,
        [Resource.FIRE]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [PassiveEffect.HEARTY],
    rarity: CardRarity.RARE,
});

const THE_MONKEY_KING: UnitCard = makeCard({
    name: 'The Monkey King',
    // https://pixabay.com/photos/painting-gods-buddhist-pattern-201447/
    imgSrc: 'https://cdn.pixabay.com/photo/2013/10/27/14/32/painting-201447_1280.jpg',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.CRYSTAL]: 1,
        [Resource.FIRE]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.LEARN,
            cardName: 'BUBBLE_BLAST',
            strength: 2,
        },
    ],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isLegendary: true,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [PassiveEffect.QUICK],
    rarity: CardRarity.MYTHIC,
});

const FALCON_RIDER: UnitCard = makeCard({
    name: 'Falcon Rider',
    imgSrc: 'https://images.pexels.com/photos/5275480/pexels-photo-5275480.jpeg',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.GENERIC]: 3,
    },
    description: '',
    enterEffects: [
        {
            strength: 2,
            type: EffectType.SUMMON_UNITS,
            summonType: Tokens.FALCON,
        },
    ],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const EXCELLENT_EQUESTRIAN: UnitCard = makeCard({
    name: 'Excellent Equestrian',
    imgSrc: 'https://images.pexels.com/photos/5088037/pexels-photo-5088037.jpeg',
    cost: {
        [Resource.BAMBOO]: 2,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [],
    totalHp: 1,
    attack: 3,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [PassiveEffect.QUICK],
    rarity: CardRarity.COMMON,
});

const MERRY_RALLIER: UnitCard = makeCard({
    name: 'Merry Rallier',
    imgSrc: 'https://images.pexels.com/photos/9935713/pexels-photo-9935713.jpeg',
    cost: {
        [Resource.BAMBOO]: 2,
        [Resource.GENERIC]: 3,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DRAW_PER_UNIT,
        },
    ],
    totalHp: 2,
    attack: 3,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const INFERNALIST: UnitCard = makeCard({
    name: 'Infernalist',
    imgSrc: 'https://cdn.pixabay.com/photo/2022/01/24/02/19/fantasy-6962364_1280.jpg',
    cost: {
        [Resource.FIRE]: 2,
        [Resource.GENERIC]: 3,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DRAW_UNTIL,
            strength: 2,
        },
    ],
    totalHp: 3,
    attack: 4,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const ELITE_ARCHER: UnitCard = makeCard({
    name: 'Elite Archer',
    imgSrc: 'https://images.pexels.com/photos/6432651/pexels-photo-6432651.jpeg',
    cost: {
        [Resource.BAMBOO]: 2,
        [Resource.GENERIC]: 4,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.OPPOSING_UNIT,
            strength: 3,
        },
    ],
    totalHp: 2,
    attack: 5,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.RARE,
});

const MAHADEV: UnitCard = makeCard({
    name: 'Mahadev',
    // https://pixabay.com/illustrations/shiva-statue-lake-god-fog-mist-6018805/
    imgSrc: 'https://cdn.pixabay.com/photo/2021/02/15/18/44/shiva-6018805_1280.jpg',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.WATER]: 1,
        [Resource.FIRE]: 1,
        [Resource.GENERIC]: 6,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ALL_OPPOSING_UNITS,
            strength: 3,
        },
    ],
    totalHp: 3,
    attack: 6,
    numAttacks: 1,
    isLegendary: true,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.MYTHIC,
});

export const RANGED_UNITS = {
    STONE_SLINGER,
    JAVELINEER,
    DRYAD,
    CANYON_ELITE,
    LONGBOWMAN,
    SLY_HUNTER,
    SILENT_MARKSWOMAN,
    POLICY_UNDERWRITER,
    CAVALRY_ARCHER,
    WINGED_SAVIOR,
    THE_MONKEY_KING,
    FALCON_RIDER,
    EXCELLENT_EQUESTRIAN,
    MERRY_RALLIER,
    INFERNALIST,
    ELITE_ARCHER,
    MAHADEV,
};
