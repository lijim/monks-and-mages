import { makeUnitCard as makeCard } from '@/factories/cards';
import { CardRarity, UnitCard } from '@/types/cards';
import { EffectType, TargetTypes } from '@/types/effects';
import { Resource } from '@/types/resources';

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
    rarity: CardRarity.UNCOMMON,
});

const THORNY_DEVIL: UnitCard = makeCard({
    artistName: 'Richard Lydekker',
    artistUrl: 'https://en.wikipedia.org/wiki/Richard_Lydekker',
    originalImagePage: 'https://commons.wikimedia.org/wiki/File:MolochLyd.jpg',
    name: 'Thorny Devil',
    imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/25/MolochLyd.jpg',
    cost: {
        [Resource.CRYSTAL]: 1,
        [Resource.IRON]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 2,
    attack: 3,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
    imgObjectPosition: 'right',
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
    rarity: CardRarity.RARE,
});

const CHARIOT_ARCHER: UnitCard = makeCard({
    artistName: 'Chaos07',
    artistUrl: 'https://pixabay.com/users/chaos07-2370306/',
    originalImagePage:
        'https://pixabay.com/illustrations/tutankhamen-pharaoh-egypt-1662814/',
    name: 'Chariot Archer',
    imgSrc: 'https://cdn.pixabay.com/photo/2016/09/12/00/22/tutankhamen-1662814_1280.jpg', // https://images.unsplash.com/photo-1554772279-37573acdd183
    cost: {
        [Resource.CRYSTAL]: 1,
        [Resource.IRON]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 2,
            target: TargetTypes.OPPOSING_UNIT,
        },
    ],
    totalHp: 4,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const ANUBIS_GOD_OF_DEATH: UnitCard = makeCard({
    artistName: 'Nanne Tiggelman',
    artistUrl: 'https://pixabay.com/users/artspark-13342248/',
    originalImagePage:
        'https://pixabay.com/photos/egypt-anubis-pyramid-desert-birds-7078739/',
    name: 'Anubis, God of Death',
    imgSrc: 'https://cdn.pixabay.com/photo/2022/03/19/15/15/egypt-7078739_1280.jpg',
    cost: {
        [Resource.CRYSTAL]: 1,
        [Resource.IRON]: 1,
        [Resource.GENERIC]: 3,
    },
    description: '',
    enterEffects: [],
    damagePlayerEffects: [
        {
            type: EffectType.DESTROY_UNIT,
            target: TargetTypes.OPPOSING_UNIT,
        },
        {
            type: EffectType.DESTROY_UNIT,
            target: TargetTypes.OWN_UNIT,
        },
    ],
    totalHp: 6,
    attack: 3,
    numAttacks: 1,
    isLegendary: true,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
    rarity: CardRarity.MYTHIC,
});

const CORRUPTED_GENIE: UnitCard = makeCard({
    artistName: 'Gordon Taylor',
    artistUrl: 'https://pixabay.com/users/gbtaylor-2058304/',
    originalImagePage:
        'https://pixabay.com/illustrations/ai-generated-genie-magic-fantasy-7725330/',
    name: 'Corrupted Genie',
    imgSrc: 'https://cdn.pixabay.com/photo/2023/01/17/19/12/ai-generated-7725330_1280.jpg',
    cost: {
        [Resource.CRYSTAL]: 2,
        [Resource.IRON]: 2,
        [Resource.WATER]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
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
    isLegendary: true,
    isRanged: true,
    isMagical: true,
    isSoldier: true,
    passiveEffects: [],
    rarity: CardRarity.MYTHIC,
});

export const SAHARANS = {
    FORTUNE_PREDICTOR,
    THORNY_DEVIL,
    CAPTAIN_OF_THE_GUARD,
    CHARIOT_ARCHER,
    ANUBIS_GOD_OF_DEATH,
    CORRUPTED_GENIE,
};
