import { makeUnitCard as makeCard } from '@/factories/cards';
import { CardRarity, UnitCard } from '@/types/cards';
import { EffectType, PassiveEffect, TargetTypes } from '@/types/effects';
import { Resource } from '@/types/resources';
import { Tokens } from '../tokens';

const DRAGON_RIDER: UnitCard = makeCard({
    name: 'Dragon Rider',
    imgSrc: 'https://images.pexels.com/photos/3880721/pexels-photo-3880721.jpeg',
    cost: {
        [Resource.BAMBOO]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.TRANSMUTE,
            strength: 1,
            cardName: 'Bamboo',
            secondaryCardName: 'Ember Spear',
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

const BABY_DRAGON: UnitCard = makeCard({
    name: 'Baby Dragon',
    imgSrc: 'https://images.pexels.com/photos/5366443/pexels-photo-5366443.jpeg',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.FIRE]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 1,
        },
        {
            type: EffectType.HEAL,
            strength: 1,
            target: TargetTypes.ANY,
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

const DRAGON_SUMMONER: UnitCard = makeCard({
    name: 'Dragon Summoner',
    // https://pixabay.com/illustrations/fantasy-dragon-fairytale-mythology-4277066/
    imgSrc: 'https://cdn.pixabay.com/photo/2019/06/16/07/06/fantasy-4277066_1280.jpg',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.FIRE]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.SUMMON_UNITS,
            strength: 1,
            summonType: Tokens.FRIAR,
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

const HEARTY_STAG: UnitCard = makeCard({
    name: 'Hearty Stag',
    // https://pixabay.com/photos/fantasy-deer-mammal-forest-nature-3232570/
    imgSrc: 'https://cdn.pixabay.com/photo/2018/03/16/21/24/fantasy-3232570_1280.jpg',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.FIRE]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BUFF_MAGIC,
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

const LEAPING_DRAGON: UnitCard = makeCard({
    artistName: 'Artie Navarre',
    artistUrl: 'https://pixabay.com/users/artie_navarre-66276/',
    originalImagePage:
        'https://pixabay.com/illustrations/painting-the-framework-dragon-3564055/',
    name: 'Leaping Dragon',
    imgSrc: 'https://cdn.pixabay.com/photo/2018/07/26/16/36/painting-3564055_1280.jpg',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.FIRE]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.GRANT_PASSIVE_EFFECT,
            passiveEffect: PassiveEffect.QUICK,
            target: TargetTypes.UNIT,
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

const BRONZE_DRAGON: UnitCard = makeCard({
    name: 'Bronze Dragon',
    imgSrc: 'https://images.pexels.com/photos/9891049/pexels-photo-9891049.jpeg',
    cost: {
        [Resource.GENERIC]: 2,
        [Resource.BAMBOO]: 1,
        [Resource.FIRE]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.CURSE_HAND,
            strength: 1,
            target: TargetTypes.ALL_OPPONENTS,
        },
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 2,
        },
    ],
    totalHp: 2,
    attack: 3,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.RARE,
});

const BOOK_HOARDER: UnitCard = makeCard({
    artistName: 'Mystic Art Design',
    artistUrl: 'https://pixabay.com/users/mysticsartdesign-322497/',
    originalImagePage: 'https://pixabay.com/users/mysticsartdesign-322497/',
    name: 'Book Hoarder',
    imgSrc: 'https://cdn.pixabay.com/photo/2015/07/25/23/26/dragon-860670_1280.jpg',
    cost: {
        [Resource.GENERIC]: 2,
        [Resource.BAMBOO]: 1,
        [Resource.FIRE]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.RAMP,
            strength: 1,
            target: TargetTypes.ALL_PLAYERS,
            resourceType: Resource.BAMBOO,
        },
    ],
    totalHp: 3,
    attack: 3,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.RARE,
});

const YELLOW_DRAGON: UnitCard = makeCard({
    name: 'Yellow Dragon',
    imgSrc: 'https://images.pexels.com/photos/2299531/pexels-photo-2299531.jpeg',
    cost: {
        [Resource.GENERIC]: 3,
        [Resource.BAMBOO]: 1,
        [Resource.FIRE]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.SUMMON_UNITS,
            strength: 1,
            summonType: Tokens.GOLEM_DRAGON,
        },
    ],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.RARE,
});

const ICE_DRAGON: UnitCard = makeCard({
    artistName: 'Ria Sopala',
    artistUrl: 'https://pixabay.com/users/pixundfertig-683277/',
    originalImagePage:
        'https://pixabay.com/illustrations/dragon-elf-winter-castle-4669643/',
    name: 'Ice Dragon',
    imgSrc: 'https://cdn.pixabay.com/photo/2019/12/03/10/16/dragon-4669643_1280.jpg',
    cost: {
        [Resource.GENERIC]: 2,
        [Resource.BAMBOO]: 1,
        [Resource.FIRE]: 1,
        [Resource.WATER]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.EXTRACT_CARD,
            cardName: 'Fairy Queen',
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
    rarity: CardRarity.RARE,
});

const ARTI_THE_CHANNELER: UnitCard = makeCard({
    artistName: 'Jim Cooper',
    artistUrl: 'https://pixabay.com/users/jcoope12-17392968/',
    originalImagePage:
        'https://pixabay.com/illustrations/ocean-lightning-clouds-wizard-7825117/',
    name: 'Arti the Channeler',
    imgSrc: 'https://cdn.pixabay.com/photo/2023/03/02/11/25/ocean-7825117_1280.jpg',
    cost: {
        [Resource.BAMBOO]: 3,
        [Resource.FIRE]: 3,
    },
    description: '',
    enterEffects: [],
    damagePlayerEffects: [
        {
            type: EffectType.RAMP_FOR_TURN,
            resourceType: Resource.WATER,
            strength: 1,
        },
        {
            type: EffectType.RAMP_FOR_TURN,
            resourceType: Resource.FIRE,
            strength: 1,
        },
        {
            type: EffectType.RAMP_FOR_TURN,
            resourceType: Resource.BAMBOO,
            strength: 1,
        },
    ],
    totalHp: 4,
    attack: 5,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    isLegendary: true,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const BOLD_DRAGON: UnitCard = makeCard({
    name: 'Bold Dragon',
    imgSrc: 'https://cdn.pixabay.com/photo/2014/01/05/01/19/dragon-238931_1280.jpg',
    cost: {
        [Resource.GENERIC]: 2,
        [Resource.BAMBOO]: 2,
        [Resource.FIRE]: 1,
        [Resource.CRYSTAL]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 6,
    attack: 5,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.MYTHIC,
});

export const DRAGONS = {
    DRAGON_RIDER,
    BABY_DRAGON,
    DRAGON_SUMMONER,
    HEARTY_STAG,
    LEAPING_DRAGON,
    BRONZE_DRAGON,
    BOOK_HOARDER,
    YELLOW_DRAGON,
    ICE_DRAGON,
    BOLD_DRAGON,
    ARTI_THE_CHANNELER,
};
