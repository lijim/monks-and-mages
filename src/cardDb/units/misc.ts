import { makeUnitCard as makeCard } from '@/factories/cards';
import {
    CardRarity,
    CardType,
    EffectRequirementsType,
    UnitCard,
} from '@/types/cards';
import { EffectType, PassiveEffect, TargetTypes } from '@/types/effects';
import { Resource } from '@/types/resources';
import { Tokens } from './tokens';

// Misc units (not ranged, soldier, magic)
const ANGRY_HEN: UnitCard = makeCard({
    name: 'Angry Hen',
    imgSrc: 'https://images.pexels.com/photos/1405930/pexels-photo-1405930.jpeg',
    cost: {
        [Resource.BAMBOO]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 1,
    attack: 0,
    numAttacks: 2,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [PassiveEffect.QUICK],
    rarity: CardRarity.UNCOMMON,
});

const SAMBAR_DEER: UnitCard = makeCard({
    name: 'Sambar Deer',
    imgSrc: 'https://images.pexels.com/photos/4403902/pexels-photo-4403902.jpeg',
    cost: {
        [Resource.BAMBOO]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 2,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.COMMON,
});

const MARKET_MAKER: UnitCard = makeCard({
    name: 'Market Maker',
    imgSrc: 'https://images.pexels.com/photos/2766351/pexels-photo-2766351.jpeg',
    cost: {
        [Resource.BAMBOO]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.TRANSMUTE,
            cardName: 'Tea',
            secondaryCardName: 'Riches',
        },
    ],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const ALERT_FELINE: UnitCard = makeCard({
    name: 'Alert Feline',
    imgSrc: 'https://images.pexels.com/photos/10140329/pexels-photo-10140329.jpeg',
    cost: {
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [PassiveEffect.QUICK],
    rarity: CardRarity.COMMON,
});

const BAMBOO_FARMER: UnitCard = makeCard({
    name: 'Bamboo Farmer',
    imgSrc: 'https://images.unsplash.com/photo-1512631118612-7bf02594062b',
    cost: {
        [Resource.BAMBOO]: 1,
    },
    description: 'Bamboo?  Not for you!',
    enterEffects: [
        {
            type: EffectType.RAMP_FROM_HAND,
            resourceType: Resource.BAMBOO,
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

const TEA_FARMER: UnitCard = makeCard({
    name: 'Tea Farmer',
    imgSrc: 'https://images.pexels.com/photos/7427928/pexels-photo-7427928.jpeg',
    cost: {
        [Resource.BAMBOO]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.LEARN,
            cardName: 'TEA',
            strength: 2,
        },
    ],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.COMMON,
});

const CITY_GUARD_WOLF: UnitCard = makeCard({
    artistName: 'Angela (ang3law)',
    artistUrl: 'https://pixabay.com/users/ang3law-11692607/',
    originalImagePage:
        'https://pixabay.com/illustrations/ai-generated-wolf-predator-canine-7938831/',
    name: 'City Guard Wolf',
    imgSrc: 'https://cdn.pixabay.com/photo/2023/04/20/01/53/ai-generated-7938831_1280.jpg',
    cost: {
        [Resource.IRON]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 1,
    attack: 1,
    numAttacks: 2,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const SPELLCULLER: UnitCard = makeCard({
    artistName: 'Gismi',
    artistUrl: 'https://pixabay.com/users/gismi-34352013/',
    originalImagePage:
        'https://pixabay.com/illustrations/fantasy-dark-moon-night-death-7921049/',
    name: 'Spellculler',
    imgSrc: 'https://cdn.pixabay.com/photo/2023/04/12/19/32/fantasy-7921049_1280.jpg',
    cost: {
        [Resource.IRON]: 2,
    },
    description: '',
    enterEffects: [],
    damagePlayerEffects: [
        {
            type: EffectType.DRAW,
            strength: 1,
            requirements: [
                {
                    type: EffectRequirementsType.DISCARD_CARD,
                    strength: 1,
                    cardType: CardType.SPELL,
                },
            ],
        },
    ],
    totalHp: 1,
    attack: 2,
    numAttacks: 2,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const LAKE_ZOMBIE: UnitCard = makeCard({
    name: 'Lake Zombie',
    // https://pixabay.com/photos/zombie-warrior-lake-monster-water-5934063/
    imgSrc: 'https://cdn.pixabay.com/photo/2021/01/20/12/15/zombie-5934063_1280.jpg',
    cost: {
        [Resource.WATER]: 1,
    },
    damagePlayerEffects: [
        {
            type: EffectType.BOUNCE,
            target: TargetTypes.OWN_UNIT,
            strength: 1,
        },
    ],
    description: '',
    enterEffects: [],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const PASTURE_EXPLORER: UnitCard = makeCard({
    name: 'Pasture Explorer',
    imgSrc: 'https://images.unsplash.com/photo-1549806876-7d7a936f609c',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.EXTRACT_CARD,
            target: TargetTypes.SELF_PLAYER,
            cardName: 'Bamboo',
            strength: 3,
        },
    ],
    totalHp: 2,
    attack: 1,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.COMMON,
});

const CONTENT_CAMEL: UnitCard = makeCard({
    artistName: 'Angela (ambquinn)',
    artistUrl: 'https://pixabay.com/users/ambquinn-4464111/',
    originalImagePage:
        'https://pixabay.com/photos/bactrian-camel-camel-animal-head-7731688/',
    name: 'Content Camel',
    imgSrc: 'https://cdn.pixabay.com/photo/2023/01/20/13/00/bactrian-camel-7731688_1280.jpg',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [],
    totalHp: 3,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [PassiveEffect.HEARTY],
    rarity: CardRarity.COMMON,
});

const RELAXED_ROWBOATER: UnitCard = makeCard({
    name: 'Relaxed Rowboater',
    imgSrc: 'https://images.pexels.com/photos/10178456/pexels-photo-10178456.jpeg',
    cost: {
        [Resource.WATER]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.LEARN,
            cardName: 'GENEROUS_GEYSER',
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

const NOVICE_ASTRONOMER: UnitCard = makeCard({
    name: 'Novice Astronomer',
    imgSrc: 'https://images.pexels.com/photos/7139730/pexels-photo-7139730.jpeg',
    cost: {
        [Resource.CRYSTAL]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.LEARN,
            cardName: 'DISTORT_REALITY',
            strength: 1,
        },
    ],
    totalHp: 1,
    attack: 0,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.COMMON,
});

const ENERGY_ENHANCER: UnitCard = makeCard({
    name: 'Energy Enhancer',
    imgSrc: 'https://images.pexels.com/photos/4646238/pexels-photo-4646238.jpeg',
    cost: {
        [Resource.CRYSTAL]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BUFF_MAGIC,
            strength: 2,
        },
    ],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.COMMON,
});

const PEGASUS: UnitCard = makeCard({
    artistName: 'Susan Cipriano',
    artistUrl: 'https://pixabay.com/users/susan-lu4esm-7009216/',
    originalImagePage:
        'https://pixabay.com/illustrations/unicorn-clouds-fantasy-wings-horse-6257019/',
    name: 'Pegasus',
    imgSrc: 'https://cdn.pixabay.com/photo/2021/05/16/02/15/unicorn-6257019_1280.jpg',
    cost: {
        [Resource.CRYSTAL]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [],
    totalHp: 2,
    attack: 3,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [PassiveEffect.ETHEREAL],
    rarity: CardRarity.COMMON,
});

const QUARRY_WORKER: UnitCard = makeCard({
    name: 'Quarry Worker',
    imgSrc: 'https://images.unsplash.com/photo-1623438803816-1f7456b240fa',
    cost: {
        [Resource.GENERIC]: 1,
        [Resource.IRON]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.EXTRACT_CARD,
            cardName: 'Iron',
            strength: 1,
            target: TargetTypes.PLAYER,
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

const TEMPLE_DEVOTEE: UnitCard = makeCard({
    name: 'Temple Devotee',
    imgSrc: 'https://images.pexels.com/photos/8711201/pexels-photo-8711201.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
    cost: {
        [Resource.IRON]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.EXTRACT_CARD,
            cardName: 'Temple Guardian',
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
    totalHp: 2,
    attack: 1,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const ELITE_WEAPONS_MASTER: UnitCard = makeCard({
    name: 'Elite Weapons Master',
    imgSrc: 'https://images.pexels.com/photos/8765034/pexels-photo-8765034.jpeg',
    cost: {
        [Resource.GENERIC]: 1,
        [Resource.IRON]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.EXTRACT_CARD,
            cardName: 'Throw Shuriken',
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
        {
            type: EffectType.RETURN_FROM_CEMETERY,
            cardName: 'Throw Shuriken',
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.RARE,
});

const IRONSMITH: UnitCard = makeCard({
    name: 'Ironsmith',
    imgSrc: 'https://images.unsplash.com/photo-1554178286-db408c69256a',
    cost: {
        [Resource.GENERIC]: 1,
        [Resource.IRON]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BUFF_HAND_ATTACK,
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
    totalHp: 2,
    attack: 1,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const GARGOYLE: UnitCard = makeCard({
    name: 'Gargoyle',
    imgSrc: '/images/units/gargoyle.avif',
    cost: {
        [Resource.GENERIC]: 1,
        [Resource.IRON]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BUFF_MAGIC,
            strength: -1,
            target: TargetTypes.UNIT,
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

const FISHING_GNOME: UnitCard = makeCard({
    name: 'Fishing Gnome',
    imgSrc: 'https://images.pexels.com/photos/9025387/pexels-photo-9025387.jpeg',
    cost: {
        [Resource.GENERIC]: 1,
        [Resource.BAMBOO]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.LEARN,
            cardName: 'RICHES',
            strength: 1,
        },
    ],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.COMMON,
});

const TORCH_BEARER: UnitCard = makeCard({
    name: 'Torch Bearer',
    imgSrc: 'https://images.pexels.com/photos/7919635/pexels-photo-7919635.jpeg',
    cost: {
        [Resource.GENERIC]: 2,
        [Resource.FIRE]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DRAW_UNTIL,
            strength: 3,
        },
    ],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.RARE,
});

const BANISHER_OF_MAGIC: UnitCard = makeCard({
    name: 'Banisher of Magic',
    imgSrc: 'https://images.pexels.com/photos/9589475/pexels-photo-9589475.jpeg',
    cost: {
        [Resource.GENERIC]: 2,
        [Resource.IRON]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BUFF_MAGIC,
            strength: -3,
            target: TargetTypes.UNIT,
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

const DEEP_CORE_EXCAVATOR: UnitCard = makeCard({
    artistName: 'Amy - prettysleepy1',
    artistUrl: 'https://pixabay.com/users/prettysleepy1-2855492/',
    originalImagePage:
        'https://pixabay.com/illustrations/steampunk-woman-rosie-the-riveter-7503680/',
    name: 'Deep Core Excavator',
    imgSrc: 'https://cdn.pixabay.com/photo/2022/10/06/22/53/steampunk-7503680_1280.jpg',
    cost: {
        [Resource.GENERIC]: 2,
        [Resource.IRON]: 1,
    },
    description: '',
    damagePlayerEffects: [],
    enterEffects: [
        {
            type: EffectType.EXTRACT_CARD,
            cardName: 'Iron',
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
        {
            type: EffectType.LEARN,
            cardName: 'RICHES',
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
    totalHp: 2,
    attack: 1,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.COMMON,
});

const RAVENOUS_VULTURE: UnitCard = makeCard({
    artistName: 'Amy - prettysleepy1',
    artistUrl: 'https://pixabay.com/users/prettysleepy1-2855492/',
    originalImagePage:
        'https://pixabay.com/illustrations/vulture-landscape-dramatic-mood-5291257/',
    name: 'Ravenous Vulture',
    imgSrc: 'https://cdn.pixabay.com/photo/2020/06/12/18/02/vulture-5291257_1280.jpg',
    cost: {
        [Resource.GENERIC]: 3,
    },
    description: '',
    damagePlayerEffects: [
        {
            type: EffectType.DRAW,
            strength: 1,
        },
    ],
    enterEffects: [],
    totalHp: 3,
    attack: 1,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.COMMON,
});

const CONFUCIUS: UnitCard = makeCard({
    name: 'Confucius',
    imgSrc: 'https://images.pexels.com/photos/6486229/pexels-photo-6486229.jpeg',
    cost: {
        [Resource.GENERIC]: 3,
    },
    description:
        'If you make a mistake and do not correct it, this is called a mistake',
    enterEffects: [],
    totalHp: 3,
    attack: 3,
    numAttacks: 1,
    isLegendary: true,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const SPELUNKER: UnitCard = makeCard({
    name: 'Spelunker',
    imgSrc: 'https://cdn.pixabay.com/photo/2016/11/18/17/02/cave-1835825_1280.jpg',
    cost: {
        [Resource.GENERIC]: 3,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.TRANSMUTE,
            cardName: 'Riches',
            secondaryCardName: 'Landmark',
        },
    ],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.RARE,
});

const CHARGING_CATTLE: UnitCard = makeCard({
    artistName: 'Amy - prettysleepy1',
    artistUrl: 'https://pixabay.com/users/prettysleepy1-2855492/',
    originalImagePage:
        'https://pixabay.com/illustrations/cattle-horse-lightening-storm-bull-5877181/',
    name: 'Charging Cattle',
    imgSrc: 'https://cdn.pixabay.com/photo/2020/12/31/18/22/cattle-5877181_1280.jpg',
    cost: {
        [Resource.GENERIC]: 4,
    },
    description: '',
    damagePlayerEffects: [],
    enterEffects: [],
    totalHp: 3,
    attack: 3,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [PassiveEffect.QUICK],
    rarity: CardRarity.COMMON,
});

const KING_TUT: UnitCard = makeCard({
    name: 'King Tut',
    imgSrc: 'https://images.pexels.com/photos/33571/tutankhamun-death-mask-pharaonic-egypt.jpg',
    cost: {
        [Resource.GENERIC]: 4,
    },
    description: 'The sun always shines after the storm',
    enterEffects: [],
    totalHp: 4,
    attack: 4,
    numAttacks: 1,
    isLegendary: true,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const GENEROUS_BUDDHA: UnitCard = makeCard({
    name: 'Generous Buddha',
    imgSrc: 'https://images.pexels.com/photos/2810269/pexels-photo-2810269.jpeg',
    cost: {
        [Resource.GENERIC]: 5,
    },
    description: 'Attention is the rarest and purest form of generosity',
    enterEffects: [],
    totalHp: 5,
    attack: 5,
    numAttacks: 1,
    isLegendary: true,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const SNOW_LION: UnitCard = makeCard({
    artistName: 'JL G',
    artistUrl: 'https://pixabay.com/users/ractapopulous-24766/',
    originalImagePage:
        'https://pixabay.com/photos/lion-snow-lying-down-art-animal-2217152/',
    name: 'Snow Lion',
    imgSrc: 'https://cdn.pixabay.com/photo/2017/04/09/22/54/lion-2217152_1280.jpg',
    cost: {
        [Resource.WATER]: 2,
    },
    description: '',
    enterEffects: [],
    totalHp: 2,
    attack: 3,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.COMMON,
});

const RIVER_WANDERER: UnitCard = makeCard({
    artistName: 'Stefan Keller',
    artistUrl: 'https://pixabay.com/users/kellepics-4893063/',
    originalImagePage:
        'https://pixabay.com/photos/statue-lantern-ship-fantasy-river-3000308/',
    name: 'River Wanderer',
    imgSrc: 'https://cdn.pixabay.com/photo/2017/12/05/20/28/statue-3000308_1280.jpg',
    cost: {
        [Resource.WATER]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 2,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [PassiveEffect.STEADY],
    rarity: CardRarity.COMMON,
});

const TUNDRA_FROST_PACK: UnitCard = makeCard({
    artistName: '0fjd125gk87',
    artistUrl: 'https://pixabay.com/users/0fjd125gk87-51581/',
    originalImagePage:
        'https://pixabay.com/illustrations/wolf-wolves-deer-to-hunt-predator-1353253/',
    name: 'Tundra Frost Pack',
    imgSrc: 'https://cdn.pixabay.com/photo/2016/04/25/21/34/wolf-1353253_1280.jpg',
    cost: {
        [Resource.WATER]: 2,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BUFF_ATTACK_FOR_CYCLE,
            strength: -2,
            target: TargetTypes.ALL_OPPOSING_UNITS,
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

const HUNGRY_GOAT: UnitCard = makeCard({
    artistName: '0fjd125gk87',
    artistUrl: 'https://pixabay.com/users/0fjd125gk87-51581/',
    originalImagePage:
        'https://pixabay.com/photos/african-pygmy-goat-goat-livestock-7462776/',
    name: 'Hungry Goat',
    imgSrc: 'https://cdn.pixabay.com/photo/2022/09/18/11/23/african-pygmy-goat-7462776_1280.jpg',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.GENERIC]: 3,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DESTROY_RESOURCE_WITH_FEASTING,
            strength: 1,
            resourceType: Resource.BAMBOO,
            target: TargetTypes.PLAYER,
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

const INCONSPICUOUS_CRAB: UnitCard = makeCard({
    name: 'Inconspicuous Crab',
    imgSrc: 'https://images.pexels.com/photos/4890161/pexels-photo-4890161.jpeg',
    cost: {
        [Resource.WATER]: 2,
        [Resource.GENERIC]: 4,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DRAW,
            strength: 2,
            target: TargetTypes.ALL_PLAYERS,
        },
    ],
    totalHp: 6,
    attack: 6,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const RUFOUS_HUMMINGBIRD: UnitCard = makeCard({
    artistName: 'Daniel Roberts',
    artistUrl: 'https://pixabay.com/users/blendertimer-9538909/',
    originalImagePage:
        'https://pixabay.com/photos/hummingbird-rufous-bird-ornithology-7181235/',
    name: 'Rufous Hummingbird',
    imgSrc: 'https://cdn.pixabay.com/photo/2022/05/08/04/26/hummingbird-7181235_1280.jpg',
    cost: {
        [Resource.FIRE]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.RAMP_FOR_TURN,
            strength: 1,
            resourceType: Resource.FIRE,
        },
    ],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.COMMON,
});

const GRIFFIN_FRIEND: UnitCard = makeCard({
    artistName: 'Prawny',
    artistUrl: 'https://pixabay.com/users/prawny-162579/',
    originalImagePage:
        'https://pixabay.com/illustrations/vintage-book-illustration-1794782/',
    name: 'Griffin Friend',
    imgSrc: 'https://cdn.pixabay.com/photo/2016/11/03/15/52/vintage-1794782_1280.jpg',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.CURSE_HAND,
            strength: 1,
            target: TargetTypes.ALL_OPPONENTS,
            requirements: [
                {
                    type: EffectRequirementsType.DISCARD_CARD,
                    cardType: CardType.RESOURCE,
                    strength: 1,
                },
            ],
        },
    ],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const PET_DEMON: UnitCard = makeCard({
    artistName: 'Square Frog',
    artistUrl: 'https://pixabay.com/users/squarefrog-9690118/',
    originalImagePage:
        'https://pixabay.com/illustrations/demon-horror-thriller-spooky-7551771/',
    name: 'Pet Demon',
    imgSrc: 'https://cdn.pixabay.com/photo/2022/10/27/20/27/demon-7551771_1280.jpg',
    cost: {
        [Resource.FIRE]: 2,
        [Resource.GENERIC]: 4,
    },
    description: '',
    enterEffects: [],
    totalHp: 5,
    attack: 6,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.COMMON,
});

const RULER_OF_THE_JUNGLE: UnitCard = makeCard({
    name: 'Ruler of the Jungle',
    imgSrc: 'https://images.pexels.com/photos/5762282/pexels-photo-5762282.jpeg',
    cost: {
        [Resource.BAMBOO]: 2,
        [Resource.GENERIC]: 7,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 2,
            target: TargetTypes.ANY,
        },
        {
            type: EffectType.SUMMON_UNITS,
            summonType: Tokens.LION,
            strength: 2,
        },
    ],
    totalHp: 5,
    attack: 5,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.MYTHIC,
});

export const MISC_UNITS = {
    ALERT_FELINE,
    ANGRY_HEN,
    SAMBAR_DEER,
    MARKET_MAKER,
    BAMBOO_FARMER,
    TEA_FARMER,
    CITY_GUARD_WOLF,
    LAKE_ZOMBIE,
    PASTURE_EXPLORER,
    RELAXED_ROWBOATER,
    NOVICE_ASTRONOMER,
    ENERGY_ENHANCER,
    PEGASUS,
    QUARRY_WORKER,
    TEMPLE_DEVOTEE,
    ELITE_WEAPONS_MASTER,
    IRONSMITH,
    SPELLCULLER,
    GARGOYLE,
    FISHING_GNOME,
    CONTENT_CAMEL,
    TORCH_BEARER,
    BANISHER_OF_MAGIC,
    DEEP_CORE_EXCAVATOR,
    RAVENOUS_VULTURE,
    CONFUCIUS,
    CHARGING_CATTLE,
    SPELUNKER,
    KING_TUT,
    GENEROUS_BUDDHA,
    SNOW_LION,
    HUNGRY_GOAT,
    RIVER_WANDERER,
    TUNDRA_FROST_PACK,
    INCONSPICUOUS_CRAB,
    RUFOUS_HUMMINGBIRD,
    GRIFFIN_FRIEND,
    PET_DEMON,
    RULER_OF_THE_JUNGLE,
};
