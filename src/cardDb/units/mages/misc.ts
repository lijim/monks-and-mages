import { makeUnitCard as makeCard } from '@/factories/cards';
import { CardRarity, UnitCard } from '@/types/cards';
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
    rarity: CardRarity.UNCOMMON,
});

const MOSS_TROLL: UnitCard = makeCard({
    artistName: 'Efraimstochter',
    artistUrl: 'https://pixabay.com/users/efraimstochter-12351/',
    originalImagePage: 'https://pixabay.com/photos/trolls-gnome-troll-785555/',
    name: 'Moss Troll',
    imgSrc: 'https://cdn.pixabay.com/photo/2015/05/26/21/32/control-785555_1280.jpg',
    cost: {
        [Resource.GENERIC]: 2,
        [Resource.BAMBOO]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 2,
    attack: 2,
    numAttacks: 1,
    isRanged: true,
    isMagical: true,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.COMMON,
});

export const MISC_MAGES = { OLD_TROLL, MOSS_TROLL };
