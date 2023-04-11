import { makeUnitCard as makeCard } from '@/factories/cards';
import { CardRarity, UnitCard } from '@/types/cards';
import { EffectType, PassiveEffect, TargetTypes } from '@/types/effects';
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
    rarity: CardRarity.UNCOMMON,
});

const SCHEMING_EXPLORER: UnitCard = makeCard({
    name: 'Scheming Explorer',
    // https://pixabay.com/photos/fantasy-temple-mysterious-landscape-4257828/
    imgSrc: 'https://cdn.pixabay.com/photo/2019/06/07/09/37/fantasy-4257828_1280.jpg',
    cost: {
        [Resource.WATER]: 1,
        [Resource.IRON]: 1,
    },
    damagePlayerEffects: [
        {
            type: EffectType.LEARN,
            cardName: 'RICHES',
            strength: 1,
        },
    ],
    description: '',
    enterEffects: [],
    totalHp: 2,
    attack: 3,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.RARE,
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
    rarity: CardRarity.UNCOMMON,
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
    rarity: CardRarity.RARE,
});

const SHIP_COXSWAIN: UnitCard = makeCard({
    name: 'Ship Coxswain',
    imgSrc: 'https://cdn.pixabay.com/photo/2014/09/07/03/41/fishermen-437420_1280.jpg',
    cost: {
        [Resource.WATER]: 1,
        [Resource.IRON]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.LEARN,
            cardName: 'LANDMARK',
            strength: 2,
        },
    ],
    totalHp: 2,
    attack: 3,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const SWAMPY_SMUGGLER: UnitCard = makeCard({
    artistName: 'Mysticsartdesign',
    artistUrl: 'https://pixabay.com/users/mysticsartdesign-322497/',
    originalImagePage:
        'https://pixabay.com/photos/pirates-swamp-smugglers-boat-ship-3277848/',
    name: 'Swampy Smuggler',
    imgSrc: 'https://cdn.pixabay.com/photo/2018/03/31/10/44/pirates-3277848_1280.jpg',
    cost: {
        [Resource.WATER]: 1,
        [Resource.IRON]: 1,
        [Resource.CRYSTAL]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.LEARN,
            strength: 1,
            cardName: 'OLD_WORLD_MAP',
        },
    ],
    totalHp: 2,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.RARE,
});

const CUTLASS_CRUSADER: UnitCard = makeCard({
    name: 'Cutlass Crusader',
    // https://pixabay.com/photos/pirate-corsair-piracy-privateers-2752397/
    imgSrc: 'https://cdn.pixabay.com/photo/2017/09/15/14/59/pirate-2752397_1280.jpg',
    cost: {
        [Resource.WATER]: 1,
        [Resource.IRON]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.LEARN,
            cardName: 'RICHES',
            strength: 2,
        },
    ],
    totalHp: 3,
    attack: 3,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const DOUBLE_DEALING_ROGUE: UnitCard = makeCard({
    artistName: 'Amy Art-Dreams',
    artistUrl: 'https://pixabay.com/users/art_dreams-5864742/',
    originalImagePage:
        'https://pixabay.com/illustrations/pirate-portrait-man-bandana-7543853/',
    name: 'Double Dealing Rogue',
    imgSrc: 'https://cdn.pixabay.com/photo/2022/10/24/16/31/pirate-7543853_1280.jpg',
    cost: {
        [Resource.WATER]: 1,
        [Resource.IRON]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BUFF_HAND_ATTACK,
            strength: 2,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
    totalHp: 3,
    attack: 3,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.RARE,
});

const NJORD_THE_MIGHTY: UnitCard = makeCard({
    artistName: 'Alistair',
    artistUrl: 'https://pixabay.com/users/zagadoo-3644042/',
    originalImagePage:
        'https://pixabay.com/illustrations/ai-generated-viking-god-fantasy-7691001/',
    name: 'Njord the Mighty',
    imgSrc: 'https://cdn.pixabay.com/photo/2023/01/01/23/28/ai-generated-7691001_1280.jpg',
    cost: {
        [Resource.WATER]: 1,
        [Resource.IRON]: 1,
        [Resource.GENERIC]: 3,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.EXTRACT_CARD,
            cardName: 'Cold Isolation',
            strength: 2,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
    totalHp: 4,
    attack: 4,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    isLegendary: true,
    passiveEffects: [],
    rarity: CardRarity.MYTHIC,
});

export const PIRATES = {
    NOBLE_STEED,
    SCHEMING_EXPLORER,
    ELDER_PIRATE,
    DARING_CORSAIR,
    SHIP_COXSWAIN,
    SWAMPY_SMUGGLER,
    CUTLASS_CRUSADER,
    DOUBLE_DEALING_ROGUE,
    NJORD_THE_MIGHTY,
};
