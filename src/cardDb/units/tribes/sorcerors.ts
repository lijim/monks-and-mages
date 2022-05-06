import { makeUnitCard as makeCard } from '@/factories/cards';
import { UnitCard } from '@/types/cards';
import { EffectType } from '@/types/effects';
import { Resource } from '@/types/resources';

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

export const SORCERORS = {
    CURIOUS_RESEARCHER,
    BRIGHT_SCHOLAR,
};
