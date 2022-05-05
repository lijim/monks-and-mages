import { makeUnitCard as makeCard } from '@/factories/cards';
import { UnitCard } from '@/types/cards';
import { PassiveEffect } from '@/types/effects';
import { Resource } from '@/types/resources';

const FROG: UnitCard = makeCard({
    name: 'Frog',
    imgSrc: 'https://images.pexels.com/photos/67290/frog-golden-eyes-macro-royalty-free-67290.jpeg',
    cost: {
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 1,
    attack: 0,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
});

const PIRATE_PARROT: UnitCard = makeCard({
    name: 'Pirate Parrot',
    imgSrc: 'https://cdn.pixabay.com/photo/2019/12/06/20/03/bird-4678162_1280.jpg',
    cost: {
        [Resource.WATER]: 1,
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
});

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

const MANATEE: UnitCard = makeCard({
    name: 'Manatee',
    imgSrc: 'https://images.pexels.com/photos/5254812/pexels-photo-5254812.jpeg',
    cost: {
        [Resource.WATER]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
});

const LION: UnitCard = makeCard({
    name: 'Lion',
    imgSrc: 'https://images.pexels.com/photos/68421/pexels-photo-68421.jpeg',
    cost: {
        [Resource.GENERIC]: 2,
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

const SCORPION: UnitCard = makeCard({
    name: 'Scorpion',
    imgSrc: 'https://images.pexels.com/photos/5927716/pexels-photo-5927716.png',
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
    passiveEffects: [PassiveEffect.POISONED],
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

const OCTOPUS: UnitCard = makeCard({
    name: 'Octopus',
    imgSrc: 'https://images.unsplash.com/photo-1616616839508-635cbd138f73',
    cost: {
        [Resource.GENERIC]: 6,
        [Resource.WATER]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 8,
    attack: 8,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
});

export const Tokens = {
    DEMON,
    FALCON,
    FROG,
    GOLEM_DRAGON,
    LION,
    MANTA_RAY,
    MANATEE,
    OCTOPUS,
    PIRATE_PARROT,
    SHARK,
    SCORPION,
};
