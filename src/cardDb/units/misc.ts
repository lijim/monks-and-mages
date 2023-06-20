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

const THE_MAD_HATTER_AND_FRIENDS: UnitCard = makeCard({
    artistName: 'Arthur Rackham',
    artistUrl: 'https://pixabay.com/users/prawny-162579/',
    originalImagePage:
        'https://pixabay.com/illustrations/vintage-book-illustration-1794705/',
    name: 'The Mad Hatter and Friends',
    imgSrc: 'https://cdn.pixabay.com/photo/2016/11/03/15/41/vintage-1794705_1280.jpg',
    cost: {
        [Resource.BAMBOO]: 1,
    },
    description: '',
    enterEffects: [
        {
            requirements: [
                {
                    type: EffectRequirementsType.ARE_HOLDING_A_SPECIFIC_CARDNAME,
                    cardName: 'Tea',
                    strength: 1,
                },
            ],
            type: EffectType.EXTRACT_SPELL_CARDS,
            strength: 2,
        },
    ],
    totalHp: 2,
    attack: 1,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    isLegendary: true,
    passiveEffects: [],
    rarity: CardRarity.RARE,
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
    rarity: CardRarity.RARE,
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
            strength: 2,
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

const GURU_RIPONCHE: UnitCard = makeCard({
    artistName: 'Dean Moriarty',
    artistUrl: 'https://pixabay.com/users/terimakasih0-624267/',
    originalImagePage:
        'https://pixabay.com/illustrations/snake-serpent-buddha-thailand-1055963/',
    name: 'Guru Riponche',
    imgSrc: 'https://cdn.pixabay.com/photo/2015/11/22/08/31/snake-1055963_1280.jpg',
    cost: {
        [Resource.CRYSTAL]: 1,
    },
    description: '',
    enterEffects: [
        {
            requirements: [
                {
                    type: EffectRequirementsType.HAVE_AT_LEAST_THRESHOLD_CARDS_IN_CEMETERY,
                    strength: 4,
                },
            ],
            type: EffectType.SUMMON_UNITS,
            summonType: Tokens.SERPENT,
            strength: 2,
        },
    ],
    totalHp: 2,
    attack: 1,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    isLegendary: true,
    passiveEffects: [],
    rarity: CardRarity.RARE,
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

const STARDUST_SEEKER: UnitCard = makeCard({
    artistName: 'Dylan Leagh',
    artistUrl: 'https://pixabay.com/users/dylanleagh-22758146/',
    originalImagePage:
        'https://pixabay.com/photos/waterfall-mountains-fog-water-7468593/',
    name: 'Stardust Seeker',
    imgSrc: 'https://cdn.pixabay.com/photo/2022/09/20/19/13/waterfall-7468593_1280.jpg',
    cost: {
        [Resource.CRYSTAL]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DRAW,
            strength: 2,
            requirements: [
                {
                    type: EffectRequirementsType.HAVE_AT_LEAST_THRESHOLD_CARDS_IN_CEMETERY,
                    strength: 4,
                },
            ],
        },
    ],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isLegendary: false,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
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
            type: EffectType.BUFF_HAND_NON_MAGIC_ATTACK,
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

const WINTER_SPRITE: UnitCard = makeCard({
    artistName: 'Artie Navarre',
    artistUrl: 'https://pixabay.com/users/artie_navarre-66276/',
    originalImagePage:
        'https://pixabay.com/illustrations/narcissus-ghost-reflection-woman-6754880/',
    name: 'Winter Sprite',
    imgSrc: 'https://cdn.pixabay.com/photo/2021/10/30/16/27/narcissus-6754880_1280.jpg',
    cost: {
        [Resource.WATER]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.GRANT_PASSIVE_EFFECT,
            target: TargetTypes.OPPOSING_UNIT,
            passiveEffects: [PassiveEffect.SNOW_BLINDED],
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

const CURIOUS_CATFISH: UnitCard = makeCard({
    artistName: 'F. Muhammad',
    artistUrl: 'https://pixabay.com/users/artisticoperations-4161274/',
    originalImagePage:
        'https://pixabay.com/photos/cat-fish-amphibious-sea-creature-4625313/',
    name: 'Curious Catfish',
    imgSrc: 'https://cdn.pixabay.com/photo/2019/11/14/04/53/cat-fish-4625313_1280.jpg',
    cost: {
        [Resource.WATER]: 4,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DEPLOY_LEGENDARY_LEADER,
            target: TargetTypes.ALL_PLAYERS,
        },
    ],
    totalHp: 5,
    attack: 4,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.RARE,
});

const ALGAE_HARVESTER: UnitCard = makeCard({
    artistName: 'Quang NGUYEN DANG',
    artistUrl: 'https://pixabay.com/users/dangquangn-16743885/',
    originalImagePage:
        'https://pixabay.com/photos/pink-algae-pink-algae-fisherman-5389441/',
    name: 'Algae Harvester',
    imgSrc: 'https://cdn.pixabay.com/photo/2020/07/10/04/06/pink-algae-5389441_1280.jpg',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.TRANSFORM_RESOURCE,
            target: TargetTypes.PLAYER,
            strength: 2,
            cardName: 'Water',
            secondaryCardName: 'Bamboo',
        },
    ],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isLegendary: false,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
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
            type: EffectType.DESTROY_RESOURCE_TO_GAIN_STATS,
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

const SUSPECT_SQUID: UnitCard = makeCard({
    artistName: 'Baggeb',
    artistUrl: 'https://pixabay.com/users/baggeb-15600954/',
    originalImagePage:
        'https://pixabay.com/photos/fantasy-clock-statue-light-spiral-2879946/',

    name: 'Suspect Squid',
    imgSrc: 'https://cdn.pixabay.com/photo/2020/07/26/20/46/squid-5440718_1280.jpg',
    cost: {
        [Resource.WATER]: 1,
        [Resource.GENERIC]: 5,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.SHUFFLE_HAND_INTO_DECK,
            target: TargetTypes.ALL_PLAYERS,
        },

        {
            type: EffectType.SHUFFLE_CEMETERY_INTO_DECK,
            target: TargetTypes.ALL_PLAYERS,
        },
        {
            type: EffectType.DRAW,
            strength: 6,
            target: TargetTypes.ALL_PLAYERS,
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

const NEZHA_SCALE_HUNTER: UnitCard = makeCard({
    artistName: 'Mystic Art Design',
    artistUrl: 'https://pixabay.com/users/mysticsartdesign-322497/',
    originalImagePage:
        'https://pixabay.com/illustrations/dragon-amazone-temple-fantasy-3345081/',
    name: 'Nezha, Scale Hunter',
    imgSrc: 'https://cdn.pixabay.com/photo/2018/04/23/18/12/dragon-3345081_1280.jpg',
    cost: {
        [Resource.FIRE]: 1,
    },
    description: '',
    enterEffects: [],
    damagePlayerEffects: [
        {
            type: EffectType.RAMP_FOR_TURN,
            strength: 1,
            resourceType: Resource.FIRE,
        },
    ],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isLegendary: true,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.RARE,
});

const CAMEL_PACK: UnitCard = makeCard({
    artistName: 'Mystic Art Design',
    artistUrl: 'https://pixabay.com/users/mysticsartdesign-322497/',
    originalImagePage:
        'https://pixabay.com/illustrations/dragon-amazone-temple-fantasy-3345081/',
    name: 'Camel Pack',
    imgSrc: 'https://cdn.pixabay.com/photo/2022/11/27/14/14/camel-7619884_1280.jpg',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.TRANSFORM_RESOURCE,
            strength: 1,
            secondaryCardName: 'Treacherous Desert',
            target: TargetTypes.ALL_PLAYERS,
        },
    ],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isLegendary: false,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const NOMADIC_GUIDE: UnitCard = makeCard({
    artistName: 'Mystic Art Design',
    artistUrl: 'https://pixabay.com/users/mysticsartdesign-322497/',
    originalImagePage:
        'https://pixabay.com/illustrations/dragon-amazone-temple-fantasy-3345081/',
    name: 'Nomadic Guide',
    imgSrc: 'https://cdn.pixabay.com/photo/2020/04/04/04/43/yak-5000817_1280.jpg',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DRAW,
            strength: 2,
            requirements: [
                {
                    type: EffectRequirementsType.CONTROL_A_GENERIC_PRODUCING_RESOURCE,
                    strength: 1,
                },
            ],
        },
    ],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isLegendary: false,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const GRIFFIN_FRIEND: UnitCard = makeCard({
    artistName: 'Arthur Rackham',
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
    rarity: CardRarity.RARE,
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

// Goliath Cycle
const GOLIATH_OF_THE_SEA: UnitCard = makeCard({
    artistName: 'Silenced Artworks',
    artistUrl: 'https://pixabay.com/users/silencedartworks-27135548/',
    originalImagePage:
        'https://pixabay.com/illustrations/ai-generated-sea-dragon-kanagawa-7958432/',
    name: 'Goliath of the Sea',
    imgSrc: 'https://cdn.pixabay.com/photo/2023/04/29/12/02/ai-generated-7958432_1280.jpg',
    cost: {
        [Resource.WATER]: 2,
        [Resource.GENERIC]: 5,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BOUNCE_UNITS_UNDER_THRESHOLD_ATTACK,
            target: TargetTypes.ALL_PLAYERS,
            strength: 2,
        },
        {
            type: EffectType.RETURN_SPELLS_FROM_CEMETERY,
            target: TargetTypes.SELF_PLAYER,
            strength: 1,
        },
    ],
    totalHp: 7,
    attack: 7,
    numAttacks: 1,
    imgObjectPosition: 'top',
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.COMMON,
});

const GOLIATH_OF_THE_GROVES: UnitCard = makeCard({
    artistName: 'Mike Singleton',
    artistUrl: 'https://pixabay.com/users/mikeydred-27964498/',
    originalImagePage:
        'https://pixabay.com/illustrations/dragon-baby-dragon-mother-dragon-7498745/',
    name: 'Goliath of the Groves',
    imgSrc: 'https://cdn.pixabay.com/photo/2022/10/04/17/41/dragon-7498745_1280.jpg',
    cost: {
        [Resource.BAMBOO]: 2,
        [Resource.GENERIC]: 5,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.GAIN_ATTACK_UNTIL,
            target: TargetTypes.ALL_SELF_UNITS,
            strength: 3,
        },
        {
            type: EffectType.RETURN_RESOURCES_FROM_CEMETERY,
            target: TargetTypes.SELF_PLAYER,
            strength: 1,
        },
    ],
    totalHp: 7,
    attack: 7,
    numAttacks: 1,
    imgObjectPosition: 'top',
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.MYTHIC,
});

const GOLIATH_OF_THE_SKIES: UnitCard = makeCard({
    artistName: 'Artie Navarre',
    artistUrl: 'https://pixabay.com/users/artie_navarre-66276/',
    originalImagePage:
        'https://pixabay.com/illustrations/dragon-monster-painting-fantasy-7832393/',
    name: 'Goliath of the Skies',
    imgSrc: 'https://cdn.pixabay.com/photo/2023/03/05/23/49/dragon-7832393_1280.jpg',
    cost: {
        [Resource.CRYSTAL]: 2,
        [Resource.GENERIC]: 5,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.GAIN_MAGICAL_HAND_AND_BOARD,
            target: TargetTypes.SELF_PLAYER,
        },
        {
            type: EffectType.LOSE_MAGICAL_AND_RANGED,
            target: TargetTypes.ALL_OPPONENTS,
        },
    ],
    totalHp: 7,
    attack: 7,
    numAttacks: 1,
    imgObjectPosition: 'top',
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.MYTHIC,
});

const GOLIATH_OF_THE_FLAMES: UnitCard = makeCard({
    artistName: 'Silenced Artworks',
    artistUrl: 'https://pixabay.com/users/silencedartworks-27135548/',
    originalImagePage:
        'https://pixabay.com/illustrations/ai-generated-demon-halloween-7958431/',
    name: 'Goliath of the Flames',
    imgSrc: 'https://cdn.pixabay.com/photo/2023/04/29/12/01/ai-generated-7958431_1280.png',
    cost: {
        [Resource.FIRE]: 2,
        [Resource.GENERIC]: 5,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ALL_OPPOSING_UNITS,
            requirements: [
                {
                    type: EffectRequirementsType.HAVE_NO_CARDS_IN_HAND,
                },
            ],
            strength: 3,
        },
        {
            type: EffectType.DRAW_UNTIL,
            strength: 3,
        },
    ],
    totalHp: 7,
    attack: 7,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.MYTHIC,
});

const GOLIATH_OF_THE_TEMPLES: UnitCard = makeCard({
    artistName: 'Mike Singleton',
    artistUrl: 'https://pixabay.com/users/mikeydred-27964498/',

    originalImagePage:
        'https://pixabay.com/illustrations/vampire-halloween-shadows-arrows-7525179/',
    name: 'Goliath of the Temples',
    imgSrc: 'https://cdn.pixabay.com/photo/2022/10/16/14/11/vampire-7525179_1280.jpg',
    cost: {
        [Resource.IRON]: 2,
        [Resource.GENERIC]: 5,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.CURSE_HAND_RESOURCE_TYPE,
            target: TargetTypes.SELF_PLAYER,
            strength: -2,
            resourceType: Resource.IRON,
        },
        {
            type: EffectType.CURSE_HAND_SPELLS,
            target: TargetTypes.ALL_OPPONENTS,
            strength: 2,
            resourceType: Resource.IRON,
        },
    ],
    totalHp: 7,
    attack: 7,
    numAttacks: 1,
    imgObjectPosition: 'top',
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
    THE_MAD_HATTER_AND_FRIENDS,
    TEA_FARMER,
    CITY_GUARD_WOLF,
    LAKE_ZOMBIE,
    PASTURE_EXPLORER,
    RELAXED_ROWBOATER,
    NOVICE_ASTRONOMER,
    GURU_RIPONCHE,
    ENERGY_ENHANCER,
    PEGASUS,
    STARDUST_SEEKER,
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
    WINTER_SPRITE,
    TUNDRA_FROST_PACK,
    CURIOUS_CATFISH,
    ALGAE_HARVESTER,
    SUSPECT_SQUID,
    INCONSPICUOUS_CRAB,
    RUFOUS_HUMMINGBIRD,
    NEZHA_SCALE_HUNTER,
    CAMEL_PACK,
    NOMADIC_GUIDE,
    GRIFFIN_FRIEND,
    PET_DEMON,
    RULER_OF_THE_JUNGLE,
    GOLIATH_OF_THE_FLAMES,
    GOLIATH_OF_THE_GROVES,
    GOLIATH_OF_THE_SEA,
    GOLIATH_OF_THE_SKIES,
    GOLIATH_OF_THE_TEMPLES,
};
