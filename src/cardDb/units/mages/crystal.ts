import { makeUnitCard as makeCard } from '@/factories/cards';
import { CardRarity, UnitCard } from '@/types/cards';
import { EffectType, TargetTypes } from '@/types/effects';
import { Resource } from '@/types/resources';

const THIRD_YEAR_STUDENTS: UnitCard = makeCard({
    name: 'Third Year Students',
    imgSrc: 'https://images.pexels.com/photos/8391400/pexels-photo-8391400.jpeg',
    cost: {
        [Resource.CRYSTAL]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 4,
    attack: 0,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.COMMON,
});

const IGNUS_FATUUS: UnitCard = makeCard({
    name: 'Ignus Fatuus',
    // https://pixabay.com/photos/mystical-mysterious-composing-3209035/
    imgSrc: 'https://cdn.pixabay.com/photo/2018/03/08/16/23/mystical-3209035_1280.jpg',
    cost: {
        [Resource.CRYSTAL]: 1,
    },
    damagePlayerEffects: [
        {
            type: EffectType.DISCARD_HAND,
            target: TargetTypes.SELF_PLAYER,
            strength: 2,
        },
        {
            type: EffectType.DRAW,
            target: TargetTypes.SELF_PLAYER,
            strength: 1,
        },
    ],
    description: '',
    enterEffects: [],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const SPIRIT_TENDER: UnitCard = makeCard({
    name: 'Spirit Tender',
    // https://pixabay.com/photos/fantasy-woman-forest-girl-young-6193818/
    imgSrc: 'https://cdn.pixabay.com/photo/2021/04/20/12/48/fantasy-6193818_1280.jpg',
    cost: {
        [Resource.GENERIC]: 1,
        [Resource.CRYSTAL]: 1,
    },
    damagePlayerEffects: [
        {
            type: EffectType.RETURN_FROM_CEMETERY,
            target: TargetTypes.SELF_PLAYER,
            cardName: 'Spectral Genesis',
            strength: 1,
        },
    ],
    description: '',
    enterEffects: [],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const MAGICIANS_APPRENTICE: UnitCard = makeCard({
    name: "Magician's Apprentice",
    imgSrc: '/images/units/magicians-apprentice.avif', // https://images.unsplash.com/photo-1615962122149-ef6987cf19f4'
    cost: {
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
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.COMMON,
});

const THE_ORACLE: UnitCard = makeCard({
    name: 'The Oracle',
    imgSrc: 'https://cdn.pixabay.com/photo/2017/03/10/23/13/oracle-girl-2133976_1280.jpg', // https://images.unsplash.com/photo-1615962122149-ef6987cf19f4'
    cost: {
        [Resource.CRYSTAL]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DRAW_MILL_WIN,
            target: TargetTypes.SELF_PLAYER,
            strength: 0,
        },
    ],
    totalHp: 2,
    attack: 1,
    numAttacks: 1,
    isLegendary: true,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.RARE,
});

const GADGETEER: UnitCard = makeCard({
    artistName: 'Oleksandr Pidvalnyi',
    artistUrl: 'https://www.pexels.com/@freestockpro/',
    originalImagePage:
        'https://www.pexels.com/photo/woman-in-steampunk-glasses-12969137/',
    name: 'Gadgeteer',
    imgSrc: 'https://images.pexels.com/photos/12969137/pexels-photo-12969137.jpeg',
    cost: {
        [Resource.CRYSTAL]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DRAW,
            target: TargetTypes.SELF_PLAYER,
            strength: 1,
        },
    ],
    totalHp: 2,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.COMMON,
});

const FAE_DRAGON: UnitCard = makeCard({
    name: 'Fae Dragon',
    imgSrc: 'https://cdn.pixabay.com/photo/2017/09/13/21/29/fantasy-2747066_1280.jpg', // https://images.unsplash.com/photo-1615962122149-ef6987cf19f4'
    cost: {
        [Resource.CRYSTAL]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DISCARD_HAND,
            target: TargetTypes.SELF_PLAYER,
            strength: 3,
        },
    ],
    totalHp: 3,
    attack: 3,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.RARE,
});

const CRACKLING_OCCULTIST: UnitCard = makeCard({
    artistName: 'Gioele Fazzeri',
    artistUrl: 'https://pixabay.com/users/gioelefazzeri-16466931/',
    originalImagePage:
        'https://pixabay.com/photos/fantasy-woman-viking-magic-6141885/',
    name: 'Crackling Occultist',
    imgSrc: 'https://cdn.pixabay.com/photo/2021/04/01/10/50/fantasy-6141885_1280.jpg',
    cost: {
        [Resource.CRYSTAL]: 1,
        [Resource.GENERIC]: 3,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.RETURN_FROM_CEMETERY,
            target: TargetTypes.SELF_PLAYER,
            cardName: 'Crystal',
            strength: 2,
        },
    ],
    totalHp: 2,
    attack: 3,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.COMMON,
});

const CYRUS_PURPLE_DRAGON: UnitCard = makeCard({
    name: 'Cyrus, Purple Dragon',
    imgSrc: 'https://cdn.pixabay.com/photo/2017/08/13/00/10/fantasy-2635797_1280.jpg', // https://images.unsplash.com/photo-1615962122149-ef6987cf19f4'
    cost: {
        [Resource.CRYSTAL]: 1,
        [Resource.GENERIC]: 4,
    },
    damagePlayerEffects: [
        {
            type: EffectType.DISCARD_HAND,
            target: TargetTypes.SELF_PLAYER,
            strength: 3,
        },
    ],
    description: '',
    enterEffects: [],
    totalHp: 4,
    attack: 4,
    numAttacks: 1,
    isLegendary: true,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.RARE,
});

export const CRYSTAL_MAGES = {
    THIRD_YEAR_STUDENTS,
    IGNUS_FATUUS,
    SPIRIT_TENDER,
    THE_ORACLE,
    MAGICIANS_APPRENTICE,
    GADGETEER,
    CRACKLING_OCCULTIST,
    FAE_DRAGON,
    CYRUS_PURPLE_DRAGON,
};
