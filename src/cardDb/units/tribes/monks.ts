import { makeUnitCard as makeCard } from '@/factories/cards';
import { CardRarity, UnitCard } from '@/types/cards';
import { EffectType, PassiveEffect } from '@/types/effects';
import { Resource } from '@/types/resources';

const ASSASSIN: UnitCard = makeCard({
    imgSrc: 'https://images.unsplash.com/photo-1531386151447-fd76ad50012f',
    name: 'Assassin',
    cost: {
        [Resource.IRON]: 1,
        [Resource.BAMBOO]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [PassiveEffect.POISONED],
    rarity: CardRarity.UNCOMMON,
});

const BOUNTY_COLLECTOR: UnitCard = makeCard({
    name: 'Bounty Collector',
    imgSrc: 'https://images.unsplash.com/photo-1614882914068-3b235f59cb38',
    cost: {
        [Resource.IRON]: 1,
        [Resource.BAMBOO]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 3,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [PassiveEffect.POISONED, PassiveEffect.QUICK],
    rarity: CardRarity.UNCOMMON,
});

const DISCIPLINED_WARRIOR: UnitCard = makeCard({
    name: 'Disciplined Warrior',
    imgSrc: 'https://images.pexels.com/photos/4760048/pexels-photo-4760048.jpeg',
    cost: {
        [Resource.IRON]: 1,
        [Resource.BAMBOO]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 6,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const SHADOW_STRIKER: UnitCard = makeCard({
    name: 'Shadow Striker',
    imgSrc: 'https://images.unsplash.com/photo-1518740028517-36c686a4a001',
    cost: {
        [Resource.IRON]: 1,
        [Resource.BAMBOO]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 2,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [PassiveEffect.POISONED, PassiveEffect.QUICK],
    rarity: CardRarity.RARE,
});

const TIGER_GENERAL: UnitCard = makeCard({
    name: 'Tiger General',
    // https://pixabay.com/photos/fantasy-warrior-fight-epic-heroine-6090734/
    imgSrc: 'https://cdn.pixabay.com/photo/2021/03/12/23/41/fantasy-6090734_1280.jpg',
    cost: {
        [Resource.IRON]: 1,
        [Resource.BAMBOO]: 1,
        [Resource.CRYSTAL]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 3,
    attack: 2,
    numAttacks: 2,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [PassiveEffect.QUICK],
    rarity: CardRarity.MYTHIC,
});

const NIGHTWOOD_RONIN: UnitCard = makeCard({
    artistName: 'Artie Navarre',
    artistUrl: 'https://pixabay.com/users/artie_navarre-66276/',
    originalImagePage:
        'https://pixabay.com/illustrations/samurai-warrior-sword-katana-4215748/',
    name: 'Nightwood Ronin',
    imgSrc: 'https://cdn.pixabay.com/photo/2019/05/20/01/29/samurai-4215748_1280.jpg',
    cost: {
        [Resource.IRON]: 1,
        [Resource.BAMBOO]: 1,
        [Resource.CRYSTAL]: 1,
        [Resource.FIRE]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 1,
    attack: 2,
    numAttacks: 2,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [
        PassiveEffect.QUICK,
        PassiveEffect.POISONED,
        PassiveEffect.HEARTY,
    ],
    rarity: CardRarity.MYTHIC,
});

const ELK_RIDER_SCOUT: UnitCard = makeCard({
    artistName: 'pencil parker',
    artistUrl: 'https://pixabay.com/users/pencilparker-7519217/',
    originalImagePage:
        'https://pixabay.com/illustrations/elf-elk-archery-deer-fairy-7300192/',
    name: 'Elk Rider Scout',
    imgSrc: 'https://cdn.pixabay.com/photo/2022/07/04/02/04/elf-7300192_1280.jpg',
    cost: {
        [Resource.IRON]: 1,
        [Resource.BAMBOO]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [],
    totalHp: 3,
    attack: 2,
    numAttacks: 2,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [PassiveEffect.QUICK, PassiveEffect.POISONED],
    rarity: CardRarity.UNCOMMON,
});

const MODEST_CLERIC: UnitCard = makeCard({
    artistName: 'Kateřina Hartlová',
    artistUrl: 'https://pixabay.com/users/khphotography-11313198/',
    originalImagePage:
        'https://pixabay.com/photos/middle-ages-knight-monarch-man-3947821/',
    name: 'Modest Cleric',
    imgSrc: 'https://cdn.pixabay.com/photo/2019/01/22/10/03/middle-ages-3947821_1280.jpg',
    cost: {
        [Resource.IRON]: 1,
        [Resource.BAMBOO]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.LEARN,
            cardName: 'TEA',
            strength: 1,
        },
        {
            type: EffectType.LEARN,
            cardName: 'RICHES',
            strength: 1,
        },
        {
            type: EffectType.LEARN,
            cardName: 'LANDMARK',
            strength: 1,
        },
    ],
    totalHp: 2,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

export const MONKS = {
    ASSASSIN,
    DISCIPLINED_WARRIOR,
    BOUNTY_COLLECTOR,
    SHADOW_STRIKER,
    TIGER_GENERAL,
    NIGHTWOOD_RONIN,
    ELK_RIDER_SCOUT,
    MODEST_CLERIC,
};
