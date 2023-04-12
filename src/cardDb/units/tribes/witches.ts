import { makeUnitCard as makeCard } from '@/factories/cards';
import { CardRarity, UnitCard } from '@/types/cards';
import { EffectType, PassiveEffect, TargetTypes } from '@/types/effects';
import { Resource } from '@/types/resources';
import { Tokens } from '../tokens';

const COVEN_NOVICE: UnitCard = makeCard({
    name: 'Coven Novice',
    imgSrc: 'https://images.pexels.com/photos/1548743/pexels-photo-1548743.jpeg',
    cost: {
        [Resource.CRYSTAL]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.LEARN,
            strength: 1,
            cardName: 'SPECTRAL_GENESIS',
        },
    ],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const FAIRY_QUEEN: UnitCard = makeCard({
    name: 'Fairy Queen',
    // https://pixabay.com/photos/woman-dress-fairy-model-fantasy-7179165/
    imgSrc: 'https://cdn.pixabay.com/photo/2022/05/06/22/09/woman-7179165_1280.jpg',
    cost: {
        [Resource.CRYSTAL]: 1,
        [Resource.BAMBOO]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DISCARD_HAND,
            target: TargetTypes.SELF_PLAYER,
            strength: 1,
        },
        {
            type: EffectType.DRAW,
            target: TargetTypes.SELF_PLAYER,
            strength: 1,
        },
    ],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [PassiveEffect.QUICK],
    rarity: CardRarity.UNCOMMON,
});

const INGREDIENT_HUNTER: UnitCard = makeCard({
    name: 'Ingredient Hunter',
    imgSrc: 'https://images.pexels.com/photos/9708441/pexels-photo-9708441.jpeg',
    cost: {
        [Resource.CRYSTAL]: 1,
        [Resource.BAMBOO]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.LEARN,
            strength: 1,
            cardName: 'TEA',
        },
        {
            type: EffectType.LEARN,
            strength: 1,
            cardName: 'POISON_MUSHROOM',
        },
    ],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const POTION_BREWER: UnitCard = makeCard({
    name: 'Potion Brewer',
    imgSrc: 'https://images.pexels.com/photos/4355630/pexels-photo-4355630.jpeg',
    cost: {
        [Resource.GENERIC]: 1,
        [Resource.CRYSTAL]: 1,
        [Resource.BAMBOO]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.LEARN,
            strength: 1,
            cardName: 'POLYMORPH_FROG',
        },
    ],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const CASTAWAY_CONJURER: UnitCard = makeCard({
    artistName: 'Stefan Keller',
    artistUrl: 'https://pixabay.com/users/kellepics-4893063/',
    originalImagePage:
        'https://pixabay.com/illustrations/fantasy-magician-ship-wreck-sun-4382556/',
    name: 'Castaway Conjurer',
    imgSrc: 'https://cdn.pixabay.com/photo/2019/08/03/19/59/fantasy-4382556_1280.jpg',
    cost: {
        [Resource.CRYSTAL]: 1,
        [Resource.BAMBOO]: 1,
        [Resource.WATER]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.POLYMORPH,
            target: TargetTypes.UNIT,
            summonType: Tokens.MANTA_RAY,
        },
    ],
    totalHp: 2,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.RARE,
});

const FOREST_SPIRIT: UnitCard = makeCard({
    name: 'Forest Spirit',
    imgSrc: 'https://images.unsplash.com/photo-1572979129545-64c0741c3f84',
    cost: {
        [Resource.GENERIC]: 1,
        [Resource.CRYSTAL]: 1,
        [Resource.BAMBOO]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.POLYMORPH,
            target: TargetTypes.UNIT,
            summonType: Tokens.SHARK,
        },
    ],
    totalHp: 2,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.RARE,
});

const POWERFUL_CRONE: UnitCard = makeCard({
    name: 'Powerful Crone',
    imgSrc: 'https://images.pexels.com/photos/10007239/pexels-photo-10007239.jpeg',
    cost: {
        [Resource.CRYSTAL]: 2,
        [Resource.BAMBOO]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.SUMMON_UNITS,
            strength: 1,
            summonType: Tokens.SCORPION,
            target: TargetTypes.OPPONENT,
        },
    ],
    totalHp: 4,
    attack: 4,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.RARE,
});

const MASTER_ENCHANTER: UnitCard = makeCard({
    name: 'Master Enchanter',
    imgSrc: 'https://images.pexels.com/photos/5696555/pexels-photo-5696555.jpeg',
    cost: {
        [Resource.CRYSTAL]: 1,
        [Resource.BAMBOO]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.TRANSMUTE,
            cardName: 'Tea',
            secondaryCardName: 'Poison Mushroom',
        },
        {
            type: EffectType.POLYMORPH,
            target: TargetTypes.UNIT,
            summonType: Tokens.SCORPION,
        },
    ],
    totalHp: 2,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const BOG_WARLOCK: UnitCard = makeCard({
    name: 'Bog Warlock',
    imgSrc: 'https://images.pexels.com/photos/11009468/pexels-photo-11009468.jpeg',
    cost: {
        [Resource.GENERIC]: 2,
        [Resource.CRYSTAL]: 2,
        [Resource.BAMBOO]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.LEARN,
            strength: 1,
            cardName: 'POLYMORPH_FROG',
        },
        {
            type: EffectType.LEARN,
            strength: 1,
            cardName: 'DISTORT_REALITY',
        },
    ],
    totalHp: 3,
    attack: 3,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.MYTHIC,
});

export const WITCHES = {
    COVEN_NOVICE,
    FAIRY_QUEEN,
    INGREDIENT_HUNTER,
    MASTER_ENCHANTER,
    CASTAWAY_CONJURER,
    POTION_BREWER,
    FOREST_SPIRIT,
    POWERFUL_CRONE,
    BOG_WARLOCK,
};
