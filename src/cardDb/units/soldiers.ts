import { makeUnitCard as makeCard } from '@/factories/cards';
import { CardRarity, EffectRequirementsType, UnitCard } from '@/types/cards';
import { EffectType, PassiveEffect, TargetTypes } from '@/types/effects';
import { Resource } from '@/types/resources';

// Soldiers
/* 1 total cost */
const FLAME_FORGED_HOPLITE: UnitCard = makeCard({
    name: 'Flame Forged Hoplite',
    imgSrc: 'https://cdn.pixabay.com/photo/2019/02/23/17/37/spartan-4016133_1280.jpg', // https://images.unsplash.com/photo-1569183602073-580599d8df15?
    cost: {
        [Resource.FIRE]: 1,
    },
    description: '',
    damagePlayerEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ALL_OPPONENTS,
            strength: 2,
        },
    ],
    enterEffects: [],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

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
    rarity: CardRarity.COMMON,
});

const DAVID_THE_DETERMINED: UnitCard = makeCard({
    artistName: 'Jeff Jacobs',
    artistUrl: 'https://pixabay.com/users/jeffjacobs1990-7438739/',
    originalImagePage:
        'https://pixabay.com/illustrations/jesus-christ-god-holy-spirit-4779546/',
    name: 'David the Determined',
    imgSrc: 'https://cdn.pixabay.com/photo/2020/01/20/05/35/jesus-4779546_1280.jpg',
    cost: {
        [Resource.IRON]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.GAIN_STATS_EQUAL_TO_COST,
        },
    ],
    totalHp: 0,
    attack: 0,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    isLegendary: true,
    passiveEffects: [],
    rarity: CardRarity.RARE,
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
    rarity: CardRarity.COMMON,
});

const PIKEMAN: UnitCard = makeCard({
    name: 'Pikeman',
    // https://pixabay.com/illustrations/medieval-knight-armor-helmet-1753740/
    imgSrc: 'https://cdn.pixabay.com/photo/2016/10/19/19/08/medieval-1753740_1280.jpg',
    cost: {
        [Resource.IRON]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.OPPOSING_UNIT,
            strength: 1,
        },
    ],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
    rarity: CardRarity.COMMON,
});

const QUESTING_DUO: UnitCard = makeCard({
    name: 'Questing Duo',
    // https://pixabay.com/photos/fantasy-animal-girl-3d-render-cg-4241786/
    imgSrc: 'https://cdn.pixabay.com/photo/2019/05/31/09/15/fantasy-4241786_1280.jpg',
    cost: {
        [Resource.IRON]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.LEARN,
            cardName: 'LANDMARK',
            strength: 1,
        },
    ],
    totalHp: 2,
    attack: 1,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
    rarity: CardRarity.COMMON,
});

const TOWN_TROOPS: UnitCard = makeCard({
    artistName: 'kirill_makes_pics',
    artistUrl: 'https://pixabay.com/users/gioelefazzeri-16466931/',
    originalImagePage:
        'https://pixabay.com/photos/king-charles-king-charles-3026472/',
    name: 'Town Troops',
    imgSrc: 'https://cdn.pixabay.com/photo/2017/12/18/16/13/king-charles-3026472_1280.jpg',
    cost: {
        [Resource.IRON]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 4,
    attack: 1,
    numAttacks: 0,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
    rarity: CardRarity.COMMON,
});

const UNHOLY_VETERAN: UnitCard = makeCard({
    name: 'Unholy Veteran',
    // https://pixabay.com/photos/man-wizard-magician-sword-rock-5599377/
    imgSrc: 'https://cdn.pixabay.com/photo/2020/09/24/18/00/man-5599377_1280.jpg',
    cost: {
        [Resource.CRYSTAL]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BUFF_MAGIC,
            target: TargetTypes.OPPOSING_UNIT,
            strength: -1,
        },
    ],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const SPIRIT_GUARDIAN: UnitCard = makeCard({
    name: 'Spirit Guardian',
    // https://pixabay.com/photos/magician-forest-wolf-fantasy-mood-3047235/
    imgSrc: 'https://cdn.pixabay.com/photo/2017/12/29/10/44/magician-3047235_1280.jpg',
    cost: {
        [Resource.CRYSTAL]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [PassiveEffect.HEARTY],
    rarity: CardRarity.COMMON,
});

/* 2 total cost */
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
    rarity: CardRarity.UNCOMMON,
});

const ARDENT_SPIRITUALIST: UnitCard = makeCard({
    name: 'Ardent Spiritualist',
    // https://pixabay.com/photos/fighter-warrior-meditation-fire-5369474/
    imgSrc: 'https://cdn.pixabay.com/photo/2020/07/04/12/59/fighter-5369474_1280.jpg',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BUFF_TEAM_MAGIC,
            strength: 1,
        },
    ],
    totalHp: 1,
    attack: 1,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
    rarity: CardRarity.COMMON,
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
    rarity: CardRarity.COMMON,
});

const ADVENTURER: UnitCard = makeCard({
    name: 'Adventurer',
    // https://pixabay.com/illustrations/fantasy-heroine-portrait-warrior-4458063/
    imgSrc: 'https://cdn.pixabay.com/photo/2019/09/07/06/50/fantasy-4458063_1280.jpg',
    cost: {
        [Resource.IRON]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.LEARN,
            cardName: 'TEA',
            strength: 1,
        },
        {
            type: EffectType.LEARN,
            cardName: 'RICHES',
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
    rarity: CardRarity.UNCOMMON,
});

const ORCISH_CORPORAL: UnitCard = makeCard({
    name: 'Orcish Corporal',
    // https://pixabay.com/illustrations/ork-fantasy-warrior-troll-monster-4692676/
    imgSrc: 'https://cdn.pixabay.com/photo/2019/12/13/10/33/ork-4692676_1280.jpg',
    cost: {
        [Resource.IRON]: 1,
        [Resource.BAMBOO]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [PassiveEffect.HEARTY],
    rarity: CardRarity.UNCOMMON,
});

/* 3 total cost */
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
    totalHp: 0,
    attack: 1,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
    rarity: CardRarity.COMMON,
});

const EXPEDITION_LEADER: UnitCard = makeCard({
    artistName: 'Elias (Schäferle)',
    artistUrl: 'https://pixabay.com/users/sch%C3%A4ferle-3372715/',
    originalImagePage:
        'https://pixabay.com/photos/panorama-middle-ages-campaign-to-2962730/',
    name: 'Expedition Leader',
    imgSrc: 'https://cdn.pixabay.com/photo/2017/11/19/13/03/panorama-2962730_1280.jpg',
    cost: {
        [Resource.IRON]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            requirements: [
                {
                    type: EffectRequirementsType.HAVE_MINIMUM_ATTACK_ON_A_UNIT,
                    strength: 4,
                },
            ],
            type: EffectType.DRAW,
            strength: 3,
        },
    ],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
});

const UNSTOPPABLE_BERSERKER: UnitCard = makeCard({
    artistName: 'Gioele Fazzeri',
    artistUrl: 'https://pixabay.com/users/gioelefazzeri-16466931/',
    originalImagePage:
        'https://pixabay.com/photos/viking-warrior-vikings-sword-5164299/',
    name: 'Unstoppable Berserker',
    imgSrc: 'https://cdn.pixabay.com/photo/2020/05/12/18/14/viking-5164299_1280.jpg',
    cost: {
        [Resource.IRON]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BUFF_ATTACK_FOR_TURN,
            strength: 2,
        },
    ],
    totalHp: 2,
    attack: 3,
    numAttacks: 2,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
    rarity: CardRarity.UNCOMMON,
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
    rarity: CardRarity.RARE,
});

const FROST_WALKER: UnitCard = makeCard({
    artistName: 'Stefan Keller',
    artistUrl: 'https://pixabay.com/users/kellepics-4893063/',
    originalImagePage:
        'https://pixabay.com/photos/fantasy-walker-sculpture-monument-2925250/',
    name: 'Frost Walker',
    imgSrc: 'https://cdn.pixabay.com/photo/2017/11/07/00/07/fantasy-2925250_1280.jpg',
    cost: {
        [Resource.GENERIC]: 2,
        [Resource.WATER]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 4,
    attack: 3,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
    rarity: CardRarity.COMMON,
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
    rarity: CardRarity.MYTHIC,
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
    rarity: CardRarity.RARE,
});

const CELESTIAL_MERCENARY: UnitCard = makeCard({
    name: 'Celestial Mercenary',
    // https://pixabay.com/photos/angel-sword-woman-wings-749625/
    imgSrc: 'https://cdn.pixabay.com/photo/2015/05/02/08/02/angel-749625_1280.jpg',
    cost: {
        [Resource.IRON]: 1,
        [Resource.WATER]: 1,
        [Resource.FIRE]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 1,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [PassiveEffect.HEARTY, PassiveEffect.QUICK],
    rarity: CardRarity.RARE,
});

const GLADIATOR: UnitCard = makeCard({
    artistName: 'WikiImages',
    artistUrl: 'https://pixabay.com/users/wikiimages-1897/',
    originalImagePage:
        'https://pixabay.com/photos/romans-gladiator-spear-hoplite-60601/',
    name: 'Gladiator',
    imgSrc: 'https://cdn.pixabay.com/photo/2012/10/10/10/49/romans-60601_1280.jpg',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.IRON]: 1,
        [Resource.BAMBOO]: 1,
        [Resource.GENERIC]: 1,
    },
    description: '',
    enterEffects: [],
    totalHp: 1,
    attack: 5,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [PassiveEffect.QUICK],
    rarity: CardRarity.RARE,
});

/* 4 total cost */
const RUSTED_GUARDIAN: UnitCard = makeCard({
    artistName: 'Amy Art-Dreams',
    artistUrl: 'https://pixabay.com/users/art_dreams-5864742/',
    originalImagePage:
        'https://pixabay.com/illustrations/steampunk-rust-grunge-metal-gears-7623597/',
    name: 'Rusted Guardian',
    imgSrc: 'https://cdn.pixabay.com/photo/2022/11/29/04/04/steampunk-7623597_1280.jpg',
    cost: {
        [Resource.CRYSTAL]: 1,
        [Resource.GENERIC]: 3,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DESTROY_UNIT,
            target: TargetTypes.OPPOSING_UNIT,
        },
        {
            type: EffectType.DISCARD_HAND,
            target: TargetTypes.SELF_PLAYER,
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
    rarity: CardRarity.COMMON,
});

const DRAGON_SLAYER: UnitCard = makeCard({
    artistName: 'Michael Seibt',
    artistUrl: 'https://pixabay.com/users/fantasticpicture-1560299/',
    originalImagePage:
        'https://pixabay.com/photos/people-a-adult-waters-smoke-3075152/',
    name: 'Dragon Slayer',
    imgSrc: 'https://cdn.pixabay.com/photo/2018/01/11/00/36/human-3075152_1280.jpg',
    cost: {
        [Resource.IRON]: 1,
        [Resource.GENERIC]: 3,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BUFF_ATTACK_FOR_TURN,
            strength: 2,
        },
        {
            type: EffectType.BUFF_MAGIC,
            target: TargetTypes.ALL_OPPOSING_UNITS,
            strength: -2,
        },
    ],
    totalHp: 2,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
    rarity: CardRarity.RARE,
});

const MAGI_RIDER: UnitCard = makeCard({
    name: 'Magi Rider',
    // https://pixabay.com/illustrations/pyramids-giza-night-caravan-camel-3913843/
    imgSrc: 'https://cdn.pixabay.com/photo/2019/01/04/18/57/pyramids-3913843_1280.jpg',
    cost: {
        [Resource.IRON]: 1,
        [Resource.CRYSTAL]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.LEARN,
            strength: 1,
            cardName: 'DISTORT_REALITY',
        },
    ],
    totalHp: 3,
    attack: 3,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [PassiveEffect.QUICK],
    rarity: CardRarity.RARE,
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
    rarity: CardRarity.COMMON,
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
    totalHp: 4,
    attack: 3,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [PassiveEffect.QUICK],
    rarity: CardRarity.COMMON,
});

const FIREBRAND_NOBLE: UnitCard = makeCard({
    artistName: 'Gordon Taylor',
    artistUrl: 'https://pixabay.com/users/gbtaylor-2058304/',
    originalImagePage:
        'https://pixabay.com/illustrations/fire-magic-sorcerer-wizard-mage-7695518/',
    name: 'Firebrand Noble',
    imgSrc: 'https://cdn.pixabay.com/photo/2023/01/03/22/55/fire-7695518_1280.jpg',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.IRON]: 1,
        [Resource.BAMBOO]: 1,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [],
    damagePlayerEffects: [
        {
            type: EffectType.DESTROY_RESOURCE,
            target: TargetTypes.OPPONENT,
            strength: 1,
        },
    ],
    totalHp: 6,
    attack: 2,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
    rarity: CardRarity.MYTHIC,
});

const WU_SONG_PILGRIM: UnitCard = makeCard({
    name: 'Wu Song, Pilgrim',
    // public domain image
    imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Wu_Song_Water_Margin.jpg',
    cost: {
        [Resource.IRON]: 1,
        [Resource.BAMBOO]: 1,
        [Resource.WATER]: 1,
        [Resource.FIRE]: 1,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DESTROY_RESOURCE,
            strength: 1,
        },
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 1,
            target: TargetTypes.ANY,
        },
        {
            type: EffectType.DRAW,
            strength: 1,
        },
    ],
    totalHp: 4,
    attack: 4,
    numAttacks: 1,
    isLegendary: true,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
    rarity: CardRarity.MYTHIC,
});

/* 5 total cost */
const ARMORED_CAVALRY: UnitCard = makeCard({
    name: 'Armored Cavalry',
    imgSrc: 'https://images.pexels.com/photos/2046779/pexels-photo-2046779.jpeg', // https://www.pexels.com/photo/medieval-armor-2046779/
    cost: {
        [Resource.IRON]: 3,
        [Resource.GENERIC]: 2,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ALL_UNITS,
            strength: 1,
        },
    ],
    totalHp: 5,
    attack: 5,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
    rarity: CardRarity.RARE,
});

const SUNRISE_RIDER: UnitCard = makeCard({
    artistName: 'ha11ok',
    artistUrl: 'https://pixabay.com/users/ha11ok-1785462/',
    originalImagePage:
        'https://pixabay.com/photos/knight-warrior-artillery-horse-2565957/',
    name: 'Sunrise Rider',
    imgSrc: 'https://cdn.pixabay.com/photo/2017/08/01/14/42/knight-2565957_1280.jpg',
    cost: {
        [Resource.IRON]: 1,
        [Resource.GENERIC]: 4,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BUFF_ATTACK_FOR_CYCLE,
            strength: 2,
        },
        {
            type: EffectType.DESTROY_UNIT,
            target: TargetTypes.OPPOSING_UNIT,
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

const RAVEN_KNIGHT: UnitCard = makeCard({
    name: 'Raven Knight',
    // https://pixabay.com/photos/knight-middle-ages-armor-crusader-3002031/
    imgSrc: 'https://cdn.pixabay.com/photo/2017/12/06/15/39/knight-3002031_1280.jpg',
    cost: {
        [Resource.IRON]: 1,
        [Resource.GENERIC]: 4,
    },
    description: '',
    enterEffects: [],
    totalHp: 6,
    attack: 3,
    numAttacks: 1,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [PassiveEffect.HEARTY],
    rarity: CardRarity.RARE,
});

/* 6 total cost */
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
    rarity: CardRarity.COMMON,
});

const JOAN_OF_ARC_FOLK_HERO: UnitCard = makeCard({
    name: 'Joan of Arc, Folk Hero',
    imgSrc: 'https://cdn.pixabay.com/photo/2020/07/05/00/19/joan-of-arc-5371198_1280.jpg',
    cost: {
        [Resource.IRON]: 2,
        [Resource.GENERIC]: 5,
    },
    description: '',
    enterEffects: [
        {
            type: EffectType.BUFF_TEAM_ATTACK,
            strength: 2,
        },
        {
            type: EffectType.BUFF_TEAM_HP,
            strength: 2,
        },
    ],
    totalHp: 5,
    attack: 4,
    numAttacks: 1,
    isLegendary: true,
    isRanged: false,
    isMagical: false,
    isSoldier: true,
    passiveEffects: [],
    rarity: CardRarity.MYTHIC,
});

export const SOLDIERS = {
    // 1
    FLAME_FORGED_HOPLITE,
    LANCER,
    INFANTRY_OFFICER,
    PIKEMAN,
    QUESTING_DUO,
    UNHOLY_VETERAN,
    SPIRIT_GUARDIAN,
    TOWN_TROOPS,
    DAVID_THE_DETERMINED,
    // 2
    SWORDS_MASTER,
    ARDENT_SPIRITUALIST,
    SQUIRE,
    ADVENTURER,
    ORCISH_CORPORAL,
    // 3
    EXPEDITION_LEADER,
    MARTIAL_TRAINER,
    AMPHIBIOUS_SHINOBI,
    DRAGON_MIST_WARRIOR,
    VILLAGE_DEFENDER,
    FROST_WALKER,
    CELESTIAL_MERCENARY,
    UNSTOPPABLE_BERSERKER,
    GLADIATOR,
    // 4
    RUSTED_GUARDIAN,
    DRAGON_SLAYER,
    MAGI_RIDER,
    WARRIOR_OF_THE_LAKE,
    KNIGHT_TEMPLAR,
    FIREBRAND_NOBLE,
    WU_SONG_PILGRIM,
    // 5
    ARMORED_CAVALRY,
    RAVEN_KNIGHT,
    SUNRISE_RIDER,
    // 6
    TEMPLE_GUARDIAN,
    // 7
    JOAN_OF_ARC_FOLK_HERO,
};
