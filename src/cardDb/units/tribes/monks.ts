import { makeUnitCard as makeCard } from '@/factories/cards';
import { CardRarity, UnitCard } from '@/types/cards';
import { PassiveEffect } from '@/types/effects';
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

export const MONKS = {
    ASSASSIN,
    DISCIPLINED_WARRIOR,
    BOUNTY_COLLECTOR,
    SHADOW_STRIKER,
    TIGER_GENERAL,
};
