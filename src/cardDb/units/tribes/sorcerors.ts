import { makeUnitCard as makeCard } from '@/factories/cards';
import { CardRarity, UnitCard } from '@/types/cards';
import { EffectType, PassiveEffect } from '@/types/effects';
import { Resource } from '@/types/resources';

const ALADDIN: UnitCard = makeCard({
    name: 'Aladdin',
    imgSrc: 'https://cdn.pixabay.com/photo/2020/12/29/17/48/prince-5871149_1280.jpg',
    cost: {
        [Resource.CRYSTAL]: 1,
        [Resource.FIRE]: 1,
        [Resource.WATER]: 1,
    },
    damagePlayerEffects: [
        {
            type: EffectType.DRAW,
            strength: 1,
        },
    ],
    description: '',
    enterEffects: [],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isLegendary: true,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [PassiveEffect.QUICK],
    rarity: CardRarity.MYTHIC,
});

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
    totalHp: 2,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.MYTHIC,
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
    rarity: CardRarity.MYTHIC,
});

export const SORCERORS = {
    ALADDIN,
    CURIOUS_RESEARCHER,
    BRIGHT_SCHOLAR,
};
