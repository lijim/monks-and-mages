import { makeUnitCard as makeCard } from '@/factories/cards';
import { UnitCard } from '@/types/cards';
import { EffectType, TargetTypes } from '@/types/effects';
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

export const DRAGONS = {
    DRAGON_RIDER,
    BABY_DRAGON,
    BRONZE_DRAGON,
    YELLOW_DRAGON,
    BOLD_DRAGON,
};
