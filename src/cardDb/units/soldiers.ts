import { makeUnitCard as makeCard } from '@/factories/cards';
import { UnitCard } from '@/types/cards';
import { EffectType, PassiveEffect, TargetTypes } from '@/types/effects';
import { Resource } from '@/types/resources';

// Soldiers
const LANCER: UnitCard = makeCard({
    name: 'Lancer',
    imgSrc: '/images/units/lancer.avif', // https://images.unsplash.com/photo-1569183602073-580599d8df15?
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

const INFANTRY_OFFICER: UnitCard = makeCard({
    name: 'Infantry Officer',
    imgSrc: 'https://images.unsplash.com/photo-1616497886955-807c100c02ab', // https://images.unsplash.com/photo-1569183602073-580599d8df15?
    cost: {
        [Resource.IRON]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 3,
    attack: 1,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
});

const SWORDS_MASTER: UnitCard = makeCard({
    name: 'Swords Master',
    imgSrc: 'https://images.unsplash.com/photo-1574258170609-456184efd962',
    cost: {
        [Resource.IRON]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [PassiveEffect.QUICK],
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

const VILLAGE_DEFENDER: UnitCard = makeCard({
    name: 'Village Defender',
    imgSrc: 'https://images.pexels.com/photos/5197322/pexels-photo-5197322.jpeg',
    cost: {
        [Resource.IRON]: 2,
        [Resource.BAMBOO]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ALL_UNITS,
            strength: 1,
        },
    ],
    totalHp: 4,
    attack: 3,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
});

const DRAGON_MIST_WARRIOR: UnitCard = makeCard({
    name: 'Dragon Mist Warrior',
    imgSrc: 'https://images.unsplash.com/photo-1615038403612-c0db30ce8f91',
    cost: {
        [Resource.IRON]: 1,
        [Resource.FIRE]: 1,
        [Resource.BAMBOO]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 1,
        },
    ],
    totalHp: 4,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [PassiveEffect.QUICK],
});

const AMPHIBIOUS_SHINOBI: UnitCard = makeCard({
    name: 'Amphibious Shinobi',
    imgSrc: 'https://images.pexels.com/photos/5971353/pexels-photo-5971353.jpeg',
    cost: {
        [Resource.IRON]: 1,
        [Resource.WATER]: 1,
        [Resource.BAMBOO]: 1,
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
    isSoldier: true,
    passiveEffects: [PassiveEffect.QUICK],
});

const WARRIOR_OF_THE_LAKE: UnitCard = makeCard({
    name: 'Warrior of the Lake',
    imgSrc: 'https://images.pexels.com/photos/6848161/pexels-photo-6848161.jpeg',
    cost: {
        [Resource.IRON]: 2,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BUFF_TEAM_ATTACK,
            strength: 1,
        },
    ],
    totalHp: 4,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
});

const KNIGHT_TEMPLAR: UnitCard = makeCard({
    name: 'Knight Templar',
    imgSrc: '/images/units/knight-templar.avif', // https://images.unsplash.com/photo-1562128755-08baa2257ae2
    cost: {
        [Resource.IRON]: 2,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [],
    totalHp: 5,
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

export const SOLDIERS = {
    LANCER,
    INFANTRY_OFFICER,
    SWORDS_MASTER,
    SQUIRE,
    MARTIAL_TRAINER,
    AMPHIBIOUS_SHINOBI,
    DRAGON_MIST_WARRIOR,
    VILLAGE_DEFENDER,
    WARRIOR_OF_THE_LAKE,
    KNIGHT_TEMPLAR,
    TEMPLE_GUARDIAN,
};
