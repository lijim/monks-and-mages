import { makeUnitCard as makeCard } from '@/factories/cards';
import { CardRarity, UnitCard } from '@/types/cards';
import { EffectType, TargetTypes } from '@/types/effects';
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
    rarity: CardRarity.UNCOMMON,
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
    rarity: CardRarity.UNCOMMON,
});

const CROP_HARVESTER: UnitCard = makeCard({
    artistName: 'Tuan Hoang',
    artistUrl: 'https://pixabay.com/users/hoangtuan_photography-12322747/',
    originalImagePage:
        'https://pixabay.com/photos/rice-cultivation-rice-fields-4165415/',
    name: 'Crop Harvester',
    imgSrc: 'https://cdn.pixabay.com/photo/2019/04/29/07/46/rice-cultivation-4165415_1280.jpg',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.WATER]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.LEARN,
            cardName: 'TEA',
            strength: 2,
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

const ENTERPRISING_VENDOR: UnitCard = makeCard({
    name: 'Enterprising Vendor',
    // https://pixabay.com/photos/thailand-plantains-market-floating-502480/
    imgSrc: 'https://cdn.pixabay.com/photo/2014/10/25/12/18/thailand-502480_1280.jpg',
    cost: {
        [Resource.GENERIC]: 1,
        [Resource.WATER]: 1,
        [Resource.BAMBOO]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.SHUFFLE_FROM_HAND,
            cardName: 'Tea',
            target: TargetTypes.OPPONENT,
        },
    ],
    totalHp: 3,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.RARE,
});

const BELOVED_BUFFALO: UnitCard = makeCard({
    artistName: 'Sasin Tipchai',
    artistUrl: 'https://pixabay.com/users/sasint-3639875/',
    originalImagePage:
        'https://pixabay.com/photos/animals-asia-buffalo-cambodia-cow-1782431/',
    name: 'Beloved Buffalo',
    imgSrc: 'https://cdn.pixabay.com/photo/2016/10/30/05/45/animals-1782431_1280.jpg',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.WATER]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.TRANSMUTE,
            cardName: 'Tea',
            secondaryCardName: 'Water',
        },
    ],
    totalHp: 3,
    attack: 1,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
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
    rarity: CardRarity.MYTHIC,
});

const BLUE_WHALE: UnitCard = makeCard({
    artistName: 'Džoko Stach',
    artistUrl: 'https://pixabay.com/users/phtorxp-3603324/',
    originalImagePage:
        'https://pixabay.com/illustrations/whale-the-sea-ocean-blue-water-2464799/',
    name: 'Blue Whale',
    imgSrc: 'https://cdn.pixabay.com/photo/2017/07/02/15/54/the-whale-2464799_1280.jpg',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.WATER]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [],
    totalHp: 7,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const MISCHIEVOUS_CRAB: UnitCard = makeCard({
    artistName: 'WikiImages',
    artistUrl: 'https://pixabay.com/users/wikiimages-1897/',
    originalImagePage: 'https://pixabay.com/photos/crab-animal-wildlife-63084/',
    name: 'Mischievous Crab',
    imgSrc: 'https://cdn.pixabay.com/photo/2012/10/26/02/14/crab-63084_1280.jpg',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.WATER]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DRAW,
            strength: 1,
            target: TargetTypes.ALL_PLAYERS,
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

const SASSY_SALLY: UnitCard = makeCard({
    artistName: 'kandhal keshvala',
    artistUrl: 'https://pixabay.com/users/kandhalkeshvala-4969592/',
    originalImagePage:
        'https://pixabay.com/photos/buffalo-village-asia-nature-cattle-4036291/',
    name: 'Sassy Sally',
    imgSrc: 'https://cdn.pixabay.com/photo/2019/03/05/14/29/buffalo-4036291_1280.jpg',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.WATER]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.LEARN,
            cardName: 'TEA',
            strength: 2,
        },
    ],
    totalHp: 4,
    attack: 4,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    isLegendary: true,
    passiveEffects: [],
    rarity: CardRarity.MYTHIC,
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
    rarity: CardRarity.MYTHIC,
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
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.RARE,
});

const WORLDLY_TURTLE: UnitCard = makeCard({
    artistName: 'Daniel Hannah',
    artistUrl: 'https://pixabay.com/users/danielhannah-8058574/',
    originalImagePage:
        'https://pixabay.com/illustrations/tortoise-giant-tortoise-tree-8043059/',
    name: 'Worldly Turtle',
    imgSrc: 'https://cdn.pixabay.com/photo/2023/06/05/18/40/tortoise-8043059_1280.jpg',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.WATER]: 1,
        [Resource.GENERIC]: 3,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.REDUCE_LEGENDARY_LEADER_COST,
            strength: 2,
        },
    ],
    totalHp: 4,
    attack: 4,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.RARE,
});

export const DIVERS = {
    TRAINEE_DIVER,
    SEASONAL_CROPHAND,
    BELOVED_BUFFALO,
    CROP_HARVESTER,
    MISCHIEVOUS_CRAB,
    ENTERPRISING_VENDOR,
    CALM_SUMMONER,
    BLUE_WHALE,
    SASSY_SALLY,
    DEEP_SEA_EXPLORER,
    ICTHYOMANCER,
    WORLDLY_TURTLE,
};
