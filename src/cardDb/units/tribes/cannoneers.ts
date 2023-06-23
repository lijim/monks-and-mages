import { makeUnitCard as makeCard } from '@/factories/cards';
import { CardRarity, UnitCard } from '@/types/cards';
import { EffectType, TargetTypes } from '@/types/effects';
import { Resource } from '@/types/resources';

const SUNSET_SPARTAN: UnitCard = makeCard({
    artistName: 'Mohammed Hassan',
    artistUrl: 'https://pixabay.com/users/mohamed_hassan-5229782/',
    originalImagePage:
        'https://pixabay.com/photos/spartan-sunset-roman-soldier-3696073/',
    name: 'Sunset Spartan',
    imgSrc: 'https://cdn.pixabay.com/photo/2018/09/22/20/17/spartan-3696073_1280.jpg',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.IRON]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BUFF_ATTACK_FOR_TURN,
            strength: 1,
            target: TargetTypes.UNIT,
        },
    ],
    totalHp: 3,
    attack: 3,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const CUIRASEER: UnitCard = makeCard({
    artistName: 'Greet Gladine',
    artistUrl: 'https://pixabay.com/users/bigandtall-670338/',
    originalImagePage:
        'https://pixabay.com/photos/war-soldiers-horses-belgium-618895/',
    name: 'Cuiraseer',
    imgSrc: 'https://cdn.pixabay.com/photo/2015/01/31/20/54/war-618895_1280.jpg',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.IRON]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.RAMP_FOR_TURN,
            strength: 1,
            resourceType: Resource.IRON,
        },
        {
            type: EffectType.RAMP_FOR_TURN,
            strength: 1,
            resourceType: Resource.FIRE,
        },
    ],
    totalHp: 2,
    attack: 3,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const SKILLED_IRONWORKER: UnitCard = makeCard({
    artistName: 'Lu Zhao',
    artistUrl: 'https://www.pexels.com/@lu-zhao-145486608/',
    originalImagePage:
        'https://www.pexels.com/photo/a-blacksmith-at-work-10431796/',
    name: 'Skilled Ironworker',
    imgSrc: 'https://images.pexels.com/photos/10431796/pexels-photo-10431796.jpeg',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.IRON]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DRAW_UNTIL,
            strength: 2,
        },
    ],
    totalHp: 1,
    attack: 3,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const ARMADA_FLAGSHIP: UnitCard = makeCard({
    artistName: 'Facusio Creations',
    artistUrl: 'https://pixabay.com/users/facusio-29552153/',
    originalImagePage:
        'https://pixabay.com/photos/wallpaper-ship-landscape-pirates-7415571/',
    name: 'Armada Flagship',

    imgSrc: 'https://cdn.pixabay.com/photo/2022/08/28/01/34/wallpaper-7415571_1280.jpg',
    cost: {
        [Resource.FIRE]: 2,
        [Resource.IRON]: 2,
        [Resource.WATER]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 4,
            target: TargetTypes.ANY,
        },
        {
            type: EffectType.TUCK,
            target: TargetTypes.OWN_UNIT,
        },
    ],
    totalHp: 5,
    attack: 3,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.MYTHIC,
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
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 3,
            target: TargetTypes.ANY,
        },
    ],
    totalHp: 5,
    attack: 3,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.RARE,
});

const HEAVY_ARTILLERY: UnitCard = makeCard({
    artistName: 'Vlastimil Starec',
    artistUrl: 'https://www.pexels.com/@vlastimil-starec-166600664/',
    originalImagePage:
        'https://www.pexels.com/photo/people-firing-cannons-on-green-grass-14173501/',
    name: 'Heavy Artillery',

    imgSrc: 'https://images.pexels.com/photos/14173501/pexels-photo-14173501.jpeg',
    cost: {
        [Resource.FIRE]: 2,
        [Resource.IRON]: 2,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.EXTRACT_CARD,
            cardName: 'Fire Away',
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
    totalHp: 5,
    attack: 4,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    passiveEffects: [],
    rarity: CardRarity.MYTHIC,
});

const JOAN_SIEGE_DEFENDER: UnitCard = makeCard({
    artistName: 'Jean-Jacques Scherrer',
    artistUrl: 'https://commons.wikimedia.org/wiki/File:Siege_orleans.jpg',
    originalImagePage:
        'https://commons.wikimedia.org/wiki/File:Scherrer_jeanne_enters_orlean.jpg',
    name: 'Joan, Siege Defender',
    imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Scherrer_jeanne_enters_orlean.jpg',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.IRON]: 1,
        [Resource.GENERIC]: 3,
    },
    description: '',
    enterEffects: [],
    damagePlayerEffects: [
        {
            type: EffectType.EXTRACT_UNIT_AND_SET_COST,
            cost: {
                [Resource.FIRE]: 1,
                [Resource.IRON]: 1,
            },
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
    totalHp: 4,
    attack: 3,
    numAttacks: 1,
    isRanged: true,
    isMagical: false,
    isSoldier: false,
    isLegendary: true,
    passiveEffects: [],
    rarity: CardRarity.MYTHIC,
});

export const CANNONEERS = {
    SUNSET_SPARTAN,
    CUIRASEER,
    ARMADA_FLAGSHIP,
    SKILLED_IRONWORKER,
    CANNON,
    HEAVY_ARTILLERY,
    JOAN_SIEGE_DEFENDER,
};
