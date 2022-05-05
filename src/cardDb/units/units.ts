import { UnitCard } from '@/types/cards';
import { EffectType, PassiveEffect, TargetTypes } from '@/types/effects';
import { Resource } from '@/types/resources';
import { makeUnitCard as makeCard } from '@/factories/cards';
import { SOLDIERS } from './soldiers';
import { RANGED_UNITS } from './ranged';
import { Tokens } from './tokens';

// Tokens
export { Tokens } from './tokens';

// Mages
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
});

const FIRE_TECHNICIAN: UnitCard = makeCard({
    name: 'Fire Technician',
    imgSrc: 'https://images.unsplash.com/photo-1494389945381-0fe114b8ea4b',
    cost: {
        [Resource.FIRE]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ANY,
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
});

const PYROCALLER: UnitCard = makeCard({
    name: 'Pyrocaller',
    imgSrc: 'https://images.pexels.com/photos/9553065/pexels-photo-9553065.jpeg',
    cost: {
        [Resource.FIRE]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.SELF_PLAYER,
            strength: 2,
        },
    ],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const MYSTICAL_FIGURE: UnitCard = makeCard({
    name: 'Mystical Figure',
    imgSrc: 'https://images.pexels.com/photos/5551875/pexels-photo-5551875.jpeg',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.RETURN_FROM_CEMETERY,
            cardName: 'Ember Spear',
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const ZEALOUS_ACOLYTE: UnitCard = makeCard({
    name: 'Zealous Acolyte',
    imgSrc: 'https://images.pexels.com/photos/6644224/pexels-photo-6644224.jpeg',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DESTROY_RESOURCE,
            target: TargetTypes.ALL_OPPONENTS,
            strength: 1,
            resourceType: Resource.BAMBOO,
        },
    ],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const IMPRESSIVE_DANCER: UnitCard = makeCard({
    name: 'Impressive Dancer',
    imgSrc: 'https://images.pexels.com/photos/6136284/pexels-photo-6136284.jpeg',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ALL_PLAYERS,
            strength: 2,
        },
    ],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const FIRE_MAGE: UnitCard = makeCard({
    name: 'Fire Mage',
    imgSrc: 'https://images.unsplash.com/photo-1601908911751-06aa20dc2b1d',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ANY,
            strength: 2,
        },
    ],
    totalHp: 2,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const DEMON_CALLER: UnitCard = makeCard({
    name: 'Demon Caller',
    imgSrc: 'https://images.pexels.com/photos/6492603/pexels-photo-6492603.jpeg',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.CRYSTAL]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.SUMMON_UNITS,
            target: TargetTypes.ALL_PLAYERS,
            strength: 3,
            summonType: Tokens.DEMON,
        },
    ],
    totalHp: 2,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const FIRE_STARTER: UnitCard = makeCard({
    name: 'Fire Starter',
    imgSrc: 'https://images.pexels.com/photos/2104236/pexels-photo-2104236.jpeg',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.CRYSTAL]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.TRANSMUTE,
            strength: 2,
            cardName: 'Fire',
            secondaryCardName: 'Smolder',
        },
    ],
    totalHp: 1,
    attack: 3,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const FLAME_PRESERVER: UnitCard = makeCard({
    name: 'Flame Preserver',
    imgSrc: 'https://images.pexels.com/photos/3052651/pexels-photo-3052651.jpeg',
    cost: {
        [Resource.FIRE]: 2,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BUFF_TEAM_MAGIC,
            strength: 2,
        },
    ],
    totalHp: 3,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const MIDNIGHT_HELLSPAWN: UnitCard = makeCard({
    name: 'Midnight Hellspawn',
    imgSrc: 'https://images.pexels.com/photos/35888/amazing-beautiful-breathtaking-clouds.jpg',
    cost: {
        [Resource.FIRE]: 2,
        [Resource.CRYSTAL]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DESTROY_RESOURCE,
            strength: 1,
            target: TargetTypes.ALL_OPPONENTS,
        },
    ],
    totalHp: 3,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const INFERNO_SORCEROR: UnitCard = makeCard({
    name: 'Inferno Sorceror',
    imgSrc: 'https://images.unsplash.com/photo-1476611550464-4b94f060e1c6',
    cost: {
        [Resource.CRYSTAL]: 1,
        [Resource.FIRE]: 3,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 3,
            target: TargetTypes.ANY,
        },
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 1,
            target: TargetTypes.ALL_OPPOSING_UNITS,
        },
        {
            type: EffectType.BUFF_TEAM_MAGIC,
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
});

// Sorcerors
const CURIOUS_RESEARCHER: UnitCard = makeCard({
    name: 'Curious Researcher',
    imgSrc: 'https://images.pexels.com/photos/4256852/pexels-photo-4256852.jpeg',
    cost: {
        [Resource.CRYSTAL]: 1,
        [Resource.FIRE]: 1,
        [Resource.WATER]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DRAW,
            strength: 1,
        },
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 1,
        },
        {
            type: EffectType.BUFF_TEAM_MAGIC,
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
});

const BRIGHT_SCHOLAR: UnitCard = makeCard({
    name: 'Bright Scholar',
    imgSrc: 'https://images.pexels.com/photos/8390504/pexels-photo-8390504.jpeg',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.WATER]: 1,
        [Resource.CRYSTAL]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.EXTRACT_CARD,
            cardName: 'Ember Spear',
            strength: 1,
        },
        {
            type: EffectType.EXTRACT_CARD,
            cardName: 'Bubble Blast',
            strength: 1,
        },
        {
            type: EffectType.EXTRACT_CARD,
            cardName: 'Spectral Genesis',
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
});

// Water Mages

const MEDITATION_EXPERT: UnitCard = makeCard({
    name: 'Meditation Expert',
    imgSrc: 'https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg',
    cost: {
        [Resource.WATER]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.HEAL,
            strength: 2,
            target: TargetTypes.ANY,
        },
    ],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const MANTA_RAY_CONJURER: UnitCard = makeCard({
    name: 'Manta Ray Conjurer',
    imgSrc: 'https://images.unsplash.com/photo-1626436819821-d2855be474c1',
    cost: {
        [Resource.WATER]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.SUMMON_UNITS,
            strength: 1,
            summonType: Tokens.MANTA_RAY,
        },
    ],
    totalHp: 2,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const TINY_MERMAID: UnitCard = makeCard({
    name: 'Tiny Mermaid',
    imgSrc: 'https://images.unsplash.com/photo-1573386843695-7d98e77ad72b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8',
    cost: {
        [Resource.WATER]: 1,
        [Resource.CRYSTAL]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.SUMMON_UNITS,
            strength: 1,
            summonType: Tokens.MANATEE,
        },
    ],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const RAIN_CHANNELER: UnitCard = makeCard({
    name: 'Rain Channeler',
    imgSrc: 'https://images.pexels.com/photos/1530423/pexels-photo-1530423.jpeg',
    cost: {
        [Resource.WATER]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BOUNCE,
            target: TargetTypes.OWN_UNIT,
        },
    ],
    totalHp: 2,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const WATER_MAGE: UnitCard = makeCard({
    name: 'Water Mage',
    imgSrc: 'https://images.unsplash.com/photo-1617073397927-12ff53956f42',
    cost: {
        [Resource.WATER]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BOUNCE,
            strength: 1,
            target: TargetTypes.UNIT,
        },
    ],
    totalHp: 3,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const PELAGIC_PREDATOR = makeCard({
    name: 'Pelagic Predator',
    imgSrc: 'https://images.pexels.com/photos/11348763/pexels-photo-11348763.jpeg',
    cost: {
        [Resource.WATER]: 1,
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
    totalHp: 3,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
});

const CURSED_CHIEFTAIN: UnitCard = makeCard({
    name: 'Cursed Chieftain',
    imgSrc: 'https://images.pexels.com/photos/2569229/pexels-photo-2569229.jpeg',
    cost: {
        [Resource.WATER]: 1,
        [Resource.GENERIC]: 3,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BOUNCE,
            strength: 1,
            target: TargetTypes.OWN_UNIT,
        },
        {
            type: EffectType.BOUNCE,
            strength: 1,
            target: TargetTypes.OWN_UNIT,
        },
    ],
    totalHp: 4,
    attack: 4,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const AQUARIAN_ADEPT: UnitCard = makeCard({
    name: 'Aquarian Adept',
    imgSrc: 'https://images.pexels.com/photos/5581759/pexels-photo-5581759.jpeg',
    cost: {
        [Resource.WATER]: 1,
        [Resource.CRYSTAL]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [],
    totalHp: 3,
    attack: 4,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const CHAD_THE_AQUAPHILE: UnitCard = makeCard({
    name: 'Chad the Aquaphile',
    imgSrc: 'https://images.pexels.com/photos/1635919/pexels-photo-1635919.jpeg',
    cost: {
        [Resource.WATER]: 1,
        [Resource.CRYSTAL]: 1,
        [Resource.GENERIC]: 3,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.RAMP,
            target: TargetTypes.ALL_OPPONENTS,
            resourceType: Resource.WATER,
            strength: 1,
        },
    ],
    totalHp: 5,
    attack: 4,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const WATER_GUARDIAN: UnitCard = makeCard({
    name: 'Water Guardian',
    imgSrc: 'https://images.unsplash.com/photo-1616123654898-ee836f578193',
    cost: {
        [Resource.CRYSTAL]: 2,
        [Resource.WATER]: 2,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.HEAL,
            strength: 3,
            target: TargetTypes.ANY,
        },
        {
            type: EffectType.BOUNCE,
            strength: 1,
            target: TargetTypes.UNIT,
        },
    ],
    totalHp: 5,
    attack: 5,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

// Wind
const FROSTBURN_MAGE = makeCard({
    name: 'Frostburn Mage',
    imgSrc: 'https://images.pexels.com/photos/1879877/pexels-photo-1879877.jpeg',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.WATER]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ALL_OPPONENTS,
            strength: 2,
        },
    ],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [PassiveEffect.QUICK],
});

const HEAVENLY_FERRIER = makeCard({
    name: 'Heavenly Ferrier',
    imgSrc: 'https://images.pexels.com/photos/1829193/pexels-photo-1829193.jpeg',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.WATER]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BOUNCE,
            target: TargetTypes.OWN_UNIT,
        },
    ],
    totalHp: 1,
    attack: 3,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [PassiveEffect.QUICK],
});

const ARCHANGEL = makeCard({
    name: 'Archangel',
    imgSrc: 'https://images.pexels.com/photos/4362592/pexels-photo-4362592.jpeg',
    cost: {
        [Resource.FIRE]: 2,
        [Resource.WATER]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BOUNCE,
            target: TargetTypes.OPPOSING_UNIT,
        },
        {
            type: EffectType.RAMP_FOR_TURN,
            strength: 1,
            resourceType: Resource.FIRE,
        },
    ],
    totalHp: 3,
    attack: 3,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const WIND_MAGE: UnitCard = makeCard({
    name: 'Wind Mage',
    imgSrc: 'https://images.unsplash.com/photo-1629017131848-70565515a58e',
    cost: {
        [Resource.FIRE]: 1,
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
            type: EffectType.BUFF_TEAM_HP,
            strength: 1,
        },
    ],
    totalHp: 4,
    attack: 3,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [PassiveEffect.QUICK],
});

// Monks
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
});

// Ranged Units

// Misc
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
});

const BAMBOO_FARMER: UnitCard = makeCard({
    name: 'Bamboo Farmer',
    imgSrc: 'https://images.unsplash.com/photo-1512631118612-7bf02594062b',
    cost: {
        [Resource.BAMBOO]: 1,
    },
    description: '',
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
});

const ENERGY_ENHANCER: UnitCard = makeCard({
    name: 'Energy Enhancer',
    imgSrc: 'https://images.pexels.com/photos/4646238/pexels-photo-4646238.jpeg',
    cost: {
        [Resource.CRYSTAL]: 1,
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
});

const QUARRY_WORKER: UnitCard = makeCard({
    name: 'Quarry Worker',
    imgSrc: 'https://images.unsplash.com/photo-1623438803816-1f7456b240fa',
    cost: {
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
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
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
    attack: 1,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
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
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
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
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
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
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
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
            strength: 3,
        },
    ],
    totalHp: 7,
    attack: 5,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
});

// Saharan Units
const FORTUNE_PREDICTOR: UnitCard = makeCard({
    name: 'Fortune Predictor',
    imgSrc: '/images/units/fortune-predictor.avif', // https://images.unsplash.com/photo-1508310621848-9b567e9621bf
    cost: {
        [Resource.CRYSTAL]: 1,
        [Resource.IRON]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DISCARD_HAND,
            strength: 1,
            target: TargetTypes.ALL_OPPONENTS,
        },
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 1,
            target: TargetTypes.ALL_OPPONENTS,
        },
    ],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const CAPTAIN_OF_THE_GUARD: UnitCard = makeCard({
    name: 'Captain of the Guard',
    imgSrc: 'images/units/captain-of-the-guard.avif', // https://images.unsplash.com/photo-1554772279-37573acdd183
    cost: {
        [Resource.CRYSTAL]: 1,
        [Resource.IRON]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DISCARD_HAND,
            strength: 2,
            target: TargetTypes.SELF_PLAYER,
        },
        {
            type: EffectType.DRAW,
            strength: 3,
        },
    ],
    totalHp: 3,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
});

// Coral
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
    isRanged: false,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

// Dragons
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
});

// Witches
const COVEN_NOVICE: UnitCard = makeCard({
    name: 'Coven Novice',
    imgSrc: 'https://images.pexels.com/photos/1548743/pexels-photo-1548743.jpeg',
    cost: {
        [Resource.CRYSTAL]: 1,
        [Resource.BAMBOO]: 1,
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
});

// Pirates
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
});

export const UnitCards = {
    // CRYSTAL
    THIRD_YEAR_STUDENTS,
    MAGICIANS_APPRENTICE,
    FAE_DRAGON,
    // FIRE
    FIRE_TECHNICIAN,
    PYROCALLER,
    MYSTICAL_FIGURE,
    ZEALOUS_ACOLYTE,
    IMPRESSIVE_DANCER,
    FIRE_MAGE,
    DEMON_CALLER,
    FIRE_STARTER,
    MIDNIGHT_HELLSPAWN,
    FLAME_PRESERVER,
    INFERNO_SORCEROR,
    // WATER
    MEDITATION_EXPERT,
    MANTA_RAY_CONJURER,
    TINY_MERMAID,
    RAIN_CHANNELER,
    PELAGIC_PREDATOR,
    WATER_MAGE,
    CURSED_CHIEFTAIN,
    AQUARIAN_ADEPT,
    CHAD_THE_AQUAPHILE,
    WATER_GUARDIAN,
    // WIND
    FROSTBURN_MAGE,
    HEAVENLY_FERRIER,
    ARCHANGEL,
    WIND_MAGE,
    // SOLDIER
    ...SOLDIERS,
    // Monks
    ASSASSIN,
    DISCIPLINED_WARRIOR,
    BOUNTY_COLLECTOR,
    SHADOW_STRIKER,
    // RANGED
    ...RANGED_UNITS,
    // MISC
    ALERT_FELINE,
    ANGRY_HEN,
    SAMBAR_DEER,
    MARKET_MAKER,
    BAMBOO_FARMER,
    TEA_FARMER,
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
    KING_TUT,
    GENEROUS_BUDDHA,
    INCONSPICUOUS_CRAB,
    RULER_OF_THE_JUNGLE,
    // SAHARAN
    FORTUNE_PREDICTOR,
    CAPTAIN_OF_THE_GUARD,
    // SORCEROR
    CURIOUS_RESEARCHER,
    BRIGHT_SCHOLAR,
    // CORAL
    TRAINEE_DIVER,
    SEASONAL_CROPHAND,
    CALM_SUMMONER,
    DEEP_SEA_EXPLORER,
    ICTHYOMANCER,
    // DRAGONS
    DRAGON_RIDER,
    BABY_DRAGON,
    BRONZE_DRAGON,
    YELLOW_DRAGON,
    BOLD_DRAGON,
    // Witches
    COVEN_NOVICE,
    INGREDIENT_HUNTER,
    MASTER_ENCHANTER,
    POTION_BREWER,
    FOREST_SPIRIT,
    POWERFUL_CRONE,
    BOG_WARLOCK,
    // IDEA: a witch that turns your tea into poisons [turn all X into Y in your hand]
    // Pirates
    NOBLE_STEED,
    ELDER_PIRATE,
    DARING_CORSAIR,
};
