import cloneDeep from 'lodash.clonedeep';
import { CardType, UnitBase, UnitCard } from '@/types/cards';
import { EffectType, PassiveEffect, TargetTypes } from '@/types/effects';
import { Resource } from '@/types/resources';

export const makeCard = (unitBase: UnitBase): UnitCard => {
    const hasQuick = unitBase.passiveEffects.indexOf(PassiveEffect.QUICK) > -1;
    return {
        ...unitBase,
        cardType: CardType.UNIT,
        hp: unitBase.totalHp,
        numAttacksLeft: hasQuick ? unitBase.numAttacks : 0,
        isSelected: false,
        hpBuff: 0,
        attackBuff: 0,
        originalCost: cloneDeep(unitBase.cost),
    };
};

// Tokens
const DEMON: UnitCard = makeCard({
    name: 'Demon',
    imgSrc: 'https://images.unsplash.com/photo-1519235624215-85175d5eb36e',
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
    passiveEffects: [],
});

const FALCON: UnitCard = makeCard({
    name: 'Falcon',
    imgSrc: 'https://images.pexels.com/photos/3674987/pexels-photo-3674987.jpeg',
    cost: {
        [Resource.BAMBOO]: 1,
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

const MANTA_RAY: UnitCard = makeCard({
    name: 'Manta Ray',
    imgSrc: 'https://images.unsplash.com/photo-1621911864149-fc37d035bae9',
    cost: {
        [Resource.WATER]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 2,
    attack: 1,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
});

const SHARK: UnitCard = makeCard({
    name: 'Shark',
    imgSrc: 'https://images.unsplash.com/photo-1564731071754-001b53a902fb',
    cost: {
        [Resource.GENERIC]: 1,
        [Resource.WATER]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 3,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
});

const GOLEM_DRAGON: UnitCard = makeCard({
    name: 'Golem Dragon',
    imgSrc: 'https://images.unsplash.com/photo-1558346547-1b88655371db',
    cost: {
        [Resource.GENERIC]: 2,
        [Resource.IRON]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 3,
    attack: 3,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
});

export const Tokens = {
    DEMON,
    FALCON,
    GOLEM_DRAGON,
    MANTA_RAY,
    SHARK,
};

// Mages
const MAGICIANS_APPRENTICE: UnitCard = makeCard({
    name: "Magician's Apprentice",
    imgSrc: 'https://images.unsplash.com/photo-1615962122149-ef6987cf19f4',
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
    attack: 3,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

const PRACTICAL_SCHOLAR: UnitCard = makeCard({
    name: 'Practical Scholar',
    imgSrc: 'https://images.pexels.com/photos/8390504/pexels-photo-8390504.jpeg',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.WATER]: 1,
        [Resource.CRYSTAL]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.LEARN,
            cardName: 'EMBER_SPEAR',
            strength: 1,
        },
        {
            type: EffectType.LEARN,
            cardName: 'BUBBLE_BLAST',
            strength: 1,
        },
        {
            type: EffectType.LEARN,
            cardName: 'SPECTRAL_GENESIS',
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
            type: EffectType.BUFF_TEAM_MAGIC,
            strength: 3,
        },
    ],
    totalHp: 5,
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

const WATER_GUARDIAN: UnitCard = makeCard({
    name: 'Water Guardian',
    imgSrc: 'https://images.unsplash.com/photo-1616123654898-ee836f578193',
    cost: {
        [Resource.CRYSTAL]: 2,
        [Resource.WATER]: 3,
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

// Soldiers
const LANCER: UnitCard = makeCard({
    name: 'Lancer',
    imgSrc: 'https://images.unsplash.com/photo-1569183602073-580599d8df15?',
    cost: {
        [Resource.IRON]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 2,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
});

const SQUIRE: UnitCard = makeCard({
    name: 'Squire',
    imgSrc: 'https://images.unsplash.com/photo-1595280102482-65d3cf5c1253',
    cost: {
        [Resource.IRON]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 4,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
});

const MARTIAL_TRAINER: UnitCard = makeCard({
    name: 'Martial Trainer',
    imgSrc: 'https://images.unsplash.com/photo-1529374814797-de52885a0249',
    cost: {
        [Resource.IRON]: 2,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BUFF_TEAM_ATTACK,
            strength: 1,
        },
        {
            type: EffectType.BUFF_TEAM_HP,
            strength: 1,
        },
    ],
    totalHp: 2,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
});

const KNIGHT_TEMPLAR: UnitCard = makeCard({
    name: 'Knight Templar',
    imgSrc: 'https://images.unsplash.com/photo-1562128755-08baa2257ae2',
    cost: {
        [Resource.IRON]: 2,
        [Resource.GENERIC]: 3,
    },
    description: '',
    enterEffects: [],
    totalHp: 4,
    attack: 3,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [PassiveEffect.QUICK],
});

const TEMPLE_GUARDIAN: UnitCard = makeCard({
    name: 'Temple Guardian',
    imgSrc: 'https://images.unsplash.com/photo-1570998050878-44c852cf2246',
    cost: {
        [Resource.IRON]: 1,
        [Resource.GENERIC]: 5,
    },
    description: '',
    enterEffects: [],
    totalHp: 7,
    attack: 6,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
});

// Ninjas
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
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [PassiveEffect.POISONED, PassiveEffect.QUICK],
});

// Ranged Units
const STONE_SLINGER: UnitCard = makeCard({
    name: 'Stone Slinger',
    imgSrc: 'https://images.unsplash.com/photo-1523441114522-8da17c0d51bf',
    cost: {
        [Resource.IRON]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 2,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [PassiveEffect.QUICK],
});

const JAVELINEER: UnitCard = makeCard({
    name: 'Javelineer',
    imgSrc: 'https://images.unsplash.com/photo-1579156618441-0f9f420e2a25',
    cost: {
        [Resource.BAMBOO]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
});

const LONGBOWMAN: UnitCard = makeCard({
    name: 'Longbowman',
    imgSrc: 'https://images.unsplash.com/photo-1504207277217-3a177a9c2e08?',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 1,
    attack: 3,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
});

const CAVALRY_ARCHER: UnitCard = makeCard({
    name: 'Cavalry Archer',
    imgSrc: 'https://images.unsplash.com/photo-1560884854-6c1de51e4e15',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [PassiveEffect.QUICK],
});

const FALCON_RIDER: UnitCard = makeCard({
    name: 'Falcon Rider',
    imgSrc: 'https://images.pexels.com/photos/5275480/pexels-photo-5275480.jpeg',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.GENERIC]: 3,
    },
    description: '',
    enterEffects: [
        {
            strength: 2,
            type: EffectType.SUMMON_UNITS,
            summonType: FALCON,
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

const MERRY_RALLIER: UnitCard = makeCard({
    name: 'Merry Rallier',
    imgSrc: 'https://images.pexels.com/photos/9935713/pexels-photo-9935713.jpeg',
    cost: {
        [Resource.BAMBOO]: 2,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DRAW_PER_UNIT,
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

const CANNON: UnitCard = makeCard({
    name: 'Cannon',
    imgSrc: 'https://images.unsplash.com/flagged/photo-1573757613724-3fa205049a78',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.IRON]: 2,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [],
    totalHp: 4,
    attack: 4,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
});

// Misc
const BAMBOO_FARMER: UnitCard = makeCard({
    name: 'Bamboo Farmer',
    imgSrc: 'https://images.unsplash.com/photo-1512631118612-7bf02594062b',
    cost: {
        [Resource.BAMBOO]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.RAMP,
            resourceType: Resource.BAMBOO,
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

// Saharan Units
const FORTUNE_PREDICTOR: UnitCard = makeCard({
    name: 'Fortune Predictor',
    imgSrc: 'https://images.unsplash.com/photo-1508310621848-9b567e9621bf',
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
    imgSrc: 'https://images.unsplash.com/photo-1554772279-37573acdd183',
    cost: {
        [Resource.CRYSTAL]: 1,
        [Resource.IRON]: 2,
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
const DEEP_SEA_EXPLORER: UnitCard = makeCard({
    name: 'Deep Sea Explorer',
    imgSrc: 'https://images.pexels.com/photos/3113226/pexels-photo-3113226.jpeg',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.WATER]: 1,
        [Resource.GENERIC]: 3,
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

export const UnitCards = {
    MAGICIANS_APPRENTICE,
    // FIRE
    FIRE_TECHNICIAN,
    FIRE_MAGE,
    INFERNO_SORCEROR,
    // WATER
    MANTA_RAY_CONJURER,
    WATER_MAGE,
    WATER_GUARDIAN,
    // WIND
    WIND_MAGE,
    // SOLDIER
    LANCER,
    SQUIRE,
    MARTIAL_TRAINER,
    KNIGHT_TEMPLAR,
    TEMPLE_GUARDIAN,
    // ASSASSINS
    ASSASSIN,
    BOUNTY_COLLECTOR,
    SHADOW_STRIKER,
    // RANGED
    STONE_SLINGER,
    JAVELINEER,
    LONGBOWMAN,
    CAVALRY_ARCHER,
    FALCON_RIDER,
    MERRY_RALLIER,
    CANNON,
    // MISC
    BAMBOO_FARMER,
    RELAXED_ROWBOATER,
    // SAHARAN
    FORTUNE_PREDICTOR,
    CAPTAIN_OF_THE_GUARD,
    // SOCEROR
    PRACTICAL_SCHOLAR,
    // CORAL
    DEEP_SEA_EXPLORER,
};
