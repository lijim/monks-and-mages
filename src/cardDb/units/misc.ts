import { makeUnitCard as makeCard } from '@/factories/cards';
import { CardRarity, UnitCard } from '@/types/cards';
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
    rarity: CardRarity.RARE,
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
    LAKE_ZOMBIE,
    PASTURE_EXPLORER,
    RELAXED_ROWBOATER,
    NOVICE_ASTRONOMER,
    ENERGY_ENHANCER,
    QUARRY_WORKER,
    TEMPLE_DEVOTEE,
    ELITE_WEAPONS_MASTER,
    IRONSMITH,
    GARGOYLE,
    FISHING_GNOME,
    TORCH_BEARER,
    BANISHER_OF_MAGIC,
    CONFUCIUS,
    SPELUNKER,
    KING_TUT,
    GENEROUS_BUDDHA,
    INCONSPICUOUS_CRAB,
    RULER_OF_THE_JUNGLE,
};
