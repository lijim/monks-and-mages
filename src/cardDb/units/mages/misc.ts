import { makeUnitCard as makeCard } from '@/factories/cards';
import { UnitCard } from '@/types/cards';
import { Resource } from '@/types/resources';

const OLD_TROLL: UnitCard = makeCard({
    name: 'Old Troll',
    // https://pixabay.com/photos/wood-troll-old-summer-natural-4876938/
    imgSrc: 'https://cdn.pixabay.com/photo/2020/02/24/17/34/wood-4876938_1280.jpg',
    cost: {
        [Resource.BAMBOO]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
});

export const MISC_MAGES = { OLD_TROLL };
