import cloneDeep from 'lodash.clonedeep';

import {
    CardRarity,
    CardType,
    EffectRequirementsType,
    SpellBase,
    SpellCard,
} from '@/types/cards';
import { EffectType, PassiveEffect, TargetTypes } from '@/types/effects';
import { Resource } from '@/types/resources';
import { Tokens } from '../units';

export const makeCard = (spellBase: SpellBase): SpellCard => ({
    ...spellBase,
    cardType: CardType.SPELL,
    isSelected: false,
    originalCost: cloneDeep(spellBase.cost),
});

// Fire Magic
const SMOLDER = makeCard({
    name: 'Smolder',
    imgSrc: 'https://cdn.pixabay.com/photo/2017/10/30/09/09/fire-2901807_1280.jpg',
    cost: { [Resource.FIRE]: 1 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 2,
        },
    ],
    rarity: CardRarity.COMMON,
});

const EMBER_SPEAR = makeCard({
    name: 'Ember Spear',
    imgSrc: 'https://images.unsplash.com/photo-1577556715463-912a96b45eae',
    cost: { [Resource.FIRE]: 1 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 3,
        },
    ],
    rarity: CardRarity.COMMON,
});

const WARPATH = makeCard({
    name: 'Warpath',
    imgSrc: 'https://cdn.pixabay.com/photo/2018/10/03/16/42/fantasy-3721894_1280.jpg',
    cost: { [Resource.FIRE]: 1 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 3,
            target: TargetTypes.OPPOSING_UNIT,
        },
    ],
    rarity: CardRarity.COMMON,
});

const INCINERATION = makeCard({
    name: 'Incineration',
    imgSrc: 'https://images.pexels.com/photos/3912408/pexels-photo-3912408.jpeg',
    cost: { [Resource.FIRE]: 1 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 3,
            target: TargetTypes.PLAYER,
        },
    ],
    rarity: CardRarity.UNCOMMON,
});

const FURY_OF_THE_OWL = makeCard({
    artistName: 'Barroa_Artworks',
    artistUrl: 'https://pixabay.com/users/barroa_artworks-1783849/',
    originalImagePage:
        'https://pixabay.com/photos/owl-fire-flame-woman-fantasy-bird-1212930/',
    name: 'Fury of the Owl',
    imgSrc: 'https://cdn.pixabay.com/photo/2016/02/20/22/19/owl-1212930_1280.jpg',
    cost: { [Resource.FIRE]: 1 },
    effects: [
        {
            type: EffectType.GRANT_PASSIVE_EFFECT,
            passiveEffect: PassiveEffect.QUICK,
            target: TargetTypes.UNIT,
        },
    ],
    rarity: CardRarity.COMMON,
});

const LIGHTNING_SLICK = makeCard({
    name: 'Lightning Slick',
    imgSrc: 'https://images.unsplash.com/photo-1626329473491-59bb128e31e9',
    cost: { [Resource.FIRE]: 1, [Resource.GENERIC]: 1 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.OPPOSING_UNIT,
            strength: 4,
        },
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 1,
            target: TargetTypes.ALL_OPPONENTS,
        },
    ],
    rarity: CardRarity.COMMON,
});

const CURSE_HAND = makeCard({
    name: 'Curse Hand',
    imgSrc: 'https://images.unsplash.com/photo-1571931468289-38ebb2c5a1c2?',
    cost: { [Resource.FIRE]: 1, [Resource.GENERIC]: 1 },
    effects: [
        {
            type: EffectType.CURSE_HAND,
            strength: 1,
            target: TargetTypes.ALL_OPPONENTS,
        },
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 1,
            target: TargetTypes.ALL_OPPONENTS,
        },
    ],
    rarity: CardRarity.UNCOMMON,
});

const SUPERNOVA = makeCard({
    name: 'Supernova',
    imgSrc: 'https://cdn.pixabay.com/photo/2014/03/10/16/11/explosion-284562_1280.jpg',
    cost: { [Resource.FIRE]: 1, [Resource.CRYSTAL]: 1 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 2,
            target: TargetTypes.ALL_UNITS,
        },
    ],
    rarity: CardRarity.RARE,
});

const BEND_AND_SCORCH = makeCard({
    name: 'Bend and Scorch',
    imgSrc: 'https://images.pexels.com/photos/10556435/pexels-photo-10556435.jpeg',
    cost: { [Resource.FIRE]: 1, [Resource.GENERIC]: 1 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 4,
            target: TargetTypes.ALL_PLAYERS,
        },
    ],
    rarity: CardRarity.UNCOMMON,
});

const FIRE_CEREMONY = makeCard({
    name: 'Fire Ceremony',
    imgSrc: 'https://images.pexels.com/photos/3646749/pexels-photo-3646749.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
    cost: { [Resource.FIRE]: 1, [Resource.GENERIC]: 1 },
    effects: [
        {
            type: EffectType.BUFF_MAGIC,
            strength: 1,
            target: TargetTypes.UNIT,
        },
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 2,
            target: TargetTypes.OPPONENT,
        },
    ],
    rarity: CardRarity.UNCOMMON,
});

const BRUSH_FIRE = makeCard({
    name: 'Brush Fire',
    imgSrc: 'https://images.pexels.com/photos/51951/forest-fire-fire-smoke-conservation-51951.jpeg',
    cost: { [Resource.FIRE]: 1, [Resource.GENERIC]: 1 },
    effects: [
        {
            type: EffectType.DESTROY_RESOURCE,
            strength: 1,
            resourceType: Resource.BAMBOO,
            target: TargetTypes.ALL_OPPONENTS,
        },
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 1,
            target: TargetTypes.ALL_OPPONENTS,
        },
    ],
    rarity: CardRarity.RARE,
});

const CHANNEL_SPARKS = makeCard({
    name: 'Channel Sparks',
    imgSrc: 'https://images.pexels.com/photos/6478432/pexels-photo-6478432.jpeg',
    cost: { [Resource.FIRE]: 1, [Resource.GENERIC]: 1 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 3,
            target: TargetTypes.ANY,
        },
    ],
    rarity: CardRarity.COMMON,
});

const CAVE_IMPLOSION = makeCard({
    name: 'Cave Implosion',
    imgSrc: 'https://images.pexels.com/photos/4344418/pexels-photo-4344418.jpeg',
    cost: { [Resource.FIRE]: 1, [Resource.GENERIC]: 1 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 1,
            target: TargetTypes.ALL_OPPOSING_UNITS,
        },
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 1,
            target: TargetTypes.OPPONENT,
        },
    ],
    rarity: CardRarity.COMMON,
});

const INCREDIBLE_DISCOVERY = makeCard({
    name: 'Incredible Discovery',
    // https://pixabay.com/illustrations/rock-man-fantasy-silhouette-person-1412287/
    imgSrc: 'https://cdn.pixabay.com/photo/2016/05/24/12/24/rock-1412287_1280.jpg',
    cost: { [Resource.FIRE]: 1, [Resource.CRYSTAL]: 1 },
    effects: [
        {
            type: EffectType.BLOOM,
            strength: 2,
        },
    ],
    rarity: CardRarity.UNCOMMON,
});

const STRIKE_TWICE = makeCard({
    name: 'Strike Twice',
    imgSrc: 'https://images.pexels.com/photos/10826067/pexels-photo-10826067.jpeg',
    cost: { [Resource.FIRE]: 1, [Resource.GENERIC]: 2 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 2,
            target: TargetTypes.ANY,
        },
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 2,
            target: TargetTypes.OPPONENT,
        },
    ],
    rarity: CardRarity.RARE,
});

const SUMMON_DEMONS = makeCard({
    name: 'Summon Demons',
    imgSrc: 'https://images.unsplash.com/photo-1519235624215-85175d5eb36e',
    cost: { [Resource.FIRE]: 1, [Resource.CRYSTAL]: 1, [Resource.GENERIC]: 1 },
    effects: [
        {
            type: EffectType.SUMMON_UNITS,
            strength: 3,
            summonType: Tokens.DEMON,
        },
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 1,
            target: TargetTypes.ALL_OPPONENTS,
        },
    ],
    rarity: CardRarity.UNCOMMON,
});

const VOLCANIC_INFERNO = makeCard({
    name: 'Volcanic Inferno',
    imgSrc: 'https://images.unsplash.com/photo-1620649332832-45f944292179',
    cost: { [Resource.FIRE]: 1, [Resource.CRYSTAL]: 1, [Resource.GENERIC]: 1 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 3,
            target: TargetTypes.ALL_UNITS,
        },
    ],
    rarity: CardRarity.RARE,
});

const ERUPT = makeCard({
    name: 'Erupt',
    imgSrc: 'https://cdn.pixabay.com/photo/2016/10/10/11/40/volcano-1728164_1280.jpg',
    cost: { [Resource.FIRE]: 1, [Resource.CRYSTAL]: 1, [Resource.GENERIC]: 2 },
    effects: [
        {
            type: EffectType.DESTROY_RESOURCE,
            target: TargetTypes.ALL_PLAYERS,
            strength: Number.MAX_SAFE_INTEGER,
            resourceType: Resource.WATER,
        },
    ],
    rarity: CardRarity.RARE,
});

// Water Magic
const BUBBLE_BLAST = makeCard({
    name: 'Bubble Blast',
    imgSrc: 'https://images.unsplash.com/photo-1584794171574-fe3f84b43838',
    cost: { [Resource.WATER]: 1 },
    effects: [
        {
            type: EffectType.BOUNCE,
            target: TargetTypes.UNIT,
            strength: 1,
        },
    ],
    rarity: CardRarity.COMMON,
});

const COLD_ISOLATION = makeCard({
    name: 'Cold Isolation',
    // https://www.pexels.com/photo/aurora-borealis-624015/
    imgSrc: 'https://images.pexels.com/photos/624015/pexels-photo-624015.jpeg',
    cost: { [Resource.WATER]: 1 },
    effects: [
        {
            type: EffectType.BUFF_ATTACK,
            target: TargetTypes.UNIT,
            strength: -3,
        },
    ],
    rarity: CardRarity.COMMON,
});

const OASIS_RITUAL = makeCard({
    name: 'Oasis Ritual',
    imgSrc: 'https://images.pexels.com/photos/2155775/pexels-photo-2155775.jpeg',
    cost: { [Resource.WATER]: 1, [Resource.GENERIC]: 1 },
    effects: [
        {
            type: EffectType.DRAW,
            strength: 1,
        },
        {
            type: EffectType.HEAL,
            target: TargetTypes.SELF_PLAYER,
            strength: 2,
        },
    ],
    rarity: CardRarity.COMMON,
});

const STIR = makeCard({
    name: 'Stir',
    imgSrc: 'https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg',
    cost: { [Resource.WATER]: 1, [Resource.GENERIC]: 1 },
    effects: [
        {
            type: EffectType.DRAW,
            strength: 2,
            target: TargetTypes.ALL_PLAYERS,
        },
    ],
    rarity: CardRarity.UNCOMMON,
});

const WHALE_BREACH = makeCard({
    artistName: 'Kristendawn',
    artistUrl: 'https://pixabay.com/users/kristendawn-5971956/',
    originalImagePage:
        'https://pixabay.com/photos/whale-breaching-marine-life-ocean-2580660/',
    name: 'Whale Breach',
    imgSrc: 'https://cdn.pixabay.com/photo/2017/08/04/16/59/whale-2580660_1280.jpg',
    cost: { [Resource.WATER]: 1, [Resource.GENERIC]: 1 },
    effects: [
        {
            type: EffectType.TUCK_BOTTOM_AND_DRAW,
        },
    ],
    rarity: CardRarity.COMMON,
});

const GENEROUS_GEYSER = makeCard({
    name: 'Generous Geyser',
    imgSrc: 'https://images.unsplash.com/photo-1567604130959-7ea7ab2a7807?',
    cost: { [Resource.WATER]: 2, [Resource.GENERIC]: 1 },
    effects: [
        {
            type: EffectType.DRAW,
            strength: 2,
        },
        {
            type: EffectType.HEAL,
            target: TargetTypes.SELF_PLAYER,
            strength: 2,
        },
    ],
    rarity: CardRarity.COMMON,
});

const MIDNIGHT_ROW = makeCard({
    name: 'Midnight Row',
    // https://pixabay.com/illustrations/gondolier-boat-moon-water-night-2018052/
    imgSrc: 'https://cdn.pixabay.com/photo/2017/01/29/14/00/gondolier-2018052_1280.jpg',
    cost: { [Resource.WATER]: 1, [Resource.CRYSTAL]: 1, [Resource.GENERIC]: 1 },
    effects: [
        {
            type: EffectType.DRAW_MILL_WIN,
            strength: 2,
        },
    ],
    rarity: CardRarity.UNCOMMON,
});

const REFLECTION_OPPORTUNITY = makeCard({
    name: 'Reflection Opportunity',
    imgSrc: 'https://images.pexels.com/photos/9888656/pexels-photo-9888656.jpeg',
    cost: { [Resource.WATER]: 2, [Resource.GENERIC]: 2 },
    effects: [
        {
            type: EffectType.DRAW,
            strength: 1,
        },
        {
            type: EffectType.BOUNCE,
            target: TargetTypes.UNIT,
            strength: 1,
        },
    ],
    rarity: CardRarity.RARE,
});

const SUMMON_SHARKS = makeCard({
    name: 'Summon Sharks',
    imgSrc: 'https://images.unsplash.com/photo-1510965156882-b72babc7b619',
    cost: { [Resource.WATER]: 2, [Resource.CRYSTAL]: 1, [Resource.GENERIC]: 1 },
    effects: [
        {
            type: EffectType.SUMMON_UNITS,
            strength: 2,
            summonType: Tokens.SHARK,
        },
    ],
    rarity: CardRarity.UNCOMMON,
});

const RAGING_WHIRLPOOL = makeCard({
    name: 'Raging Whirlpool',
    imgSrc: 'https://images.pexels.com/photos/312105/pexels-photo-312105.jpeg',
    cost: { [Resource.WATER]: 1, [Resource.CRYSTAL]: 1, [Resource.GENERIC]: 2 },
    effects: [
        {
            type: EffectType.BUFF_TEAM_ATTACK,
            strength: -2,
            target: TargetTypes.ALL_OPPONENTS,
        },
        {
            type: EffectType.BUFF_TEAM_MAGIC,
            strength: -2,
            target: TargetTypes.ALL_OPPONENTS,
        },
    ],
    rarity: CardRarity.RARE,
});

const CONSTANT_REFILL = makeCard({
    name: 'Constant Refill',
    imgSrc: 'https://images.unsplash.com/photo-1556509511-4ee17e467199',
    cost: { [Resource.WATER]: 1, [Resource.CRYSTAL]: 1, [Resource.GENERIC]: 2 },
    effects: [
        {
            type: EffectType.DRAW,
            strength: 4,
        },
    ],
    rarity: CardRarity.RARE,
});

const PEACE_AND_HARMONY = makeCard({
    artistName: 'Sasin Tipchai',
    artistUrl: 'https://pixabay.com/users/sasint-3639875/',
    originalImagePage:
        'https://pixabay.com/photos/boys-monks-river-ritual-water-1793421/',
    name: 'Peace and Harmony',
    imgSrc: 'https://cdn.pixabay.com/photo/2016/11/03/04/02/boys-1793421_1280.jpg',
    cost: { [Resource.WATER]: 1, [Resource.GENERIC]: 4 },
    effects: [
        {
            type: EffectType.DRAW,
            strength: 3,
        },
        {
            type: EffectType.HEAL,
            target: TargetTypes.ANY,
            strength: 3,
        },
    ],
    rarity: CardRarity.COMMON,
});

const PIERCE_THE_HEAVENS = makeCard({
    name: 'Pierce the Heavens',
    imgSrc: 'https://images.pexels.com/photos/4666754/pexels-photo-4666754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    cost: { [Resource.WATER]: 4, [Resource.GENERIC]: 3 },
    effects: [
        {
            type: EffectType.BOUNCE,
            target: TargetTypes.ALL_UNITS,
        },
        {
            type: EffectType.SUMMON_UNITS,
            summonType: Tokens.SHARK,
            strength: 2,
        },
    ],
    rarity: CardRarity.MYTHIC,
});

// Wind Magic
const A_GENTLE_GUST = makeCard({
    name: 'A Gentle Gust',
    imgSrc: 'https://images.unsplash.com/photo-1505672678657-cc7037095e60',
    cost: { [Resource.FIRE]: 1, [Resource.WATER]: 1 },
    effects: [
        {
            type: EffectType.BUFF_TEAM_ATTACK,
            strength: 2,
        },
        {
            type: EffectType.BUFF_TEAM_MAGIC,
            strength: 2,
        },
    ],
    rarity: CardRarity.UNCOMMON,
});

const A_THOUSAND_WINDS = makeCard({
    name: 'A Thousand Winds',
    imgSrc: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe',
    cost: { [Resource.FIRE]: 2, [Resource.WATER]: 1 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 3,
        },
        {
            type: EffectType.DRAW,
            strength: 1,
        },
    ],
    rarity: CardRarity.RARE,
});

const SOLFATARA = makeCard({
    name: 'Solfatara',
    imgSrc: 'https://images.pexels.com/photos/3824811/pexels-photo-3824811.jpeg',
    cost: { [Resource.FIRE]: 1, [Resource.WATER]: 1, [Resource.GENERIC]: 3 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 2,
        },
        {
            type: EffectType.BOUNCE,
            target: TargetTypes.UNIT,
            strength: 1,
        },
        {
            type: EffectType.DRAW,
            strength: 1,
        },
    ],
    rarity: CardRarity.UNCOMMON,
});

const COLLOSAL_TSUNAMI = makeCard({
    name: 'Collosal Tsunami',
    imgSrc: 'https://images.unsplash.com/photo-1593359393721-8c301de4bf7b',
    cost: { [Resource.GENERIC]: 4, [Resource.WATER]: 2, [Resource.FIRE]: 1 },
    effects: [
        {
            type: EffectType.BOUNCE,
            target: TargetTypes.ALL_OPPOSING_UNITS,
        },
    ],
    rarity: CardRarity.MYTHIC,
});

const MAGIC_RIFT = makeCard({
    name: 'Magic Rift',
    imgSrc: 'https://cdn.pixabay.com/photo/2017/07/17/23/51/wormhole-2514312_1280.jpg',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.WATER]: 1,
        [Resource.CRYSTAL]: 1,
    },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ALL_UNITS,
            strength: 3,
        },
        {
            type: EffectType.HEAL,
            target: TargetTypes.ALL_PLAYERS,
            strength: 3,
        },
    ],
    rarity: CardRarity.RARE,
});

const HOLY_REVIVAL = makeCard({
    name: 'Holy Revival',
    imgSrc: 'https://images.unsplash.com/photo-1467139729426-3079e66d5a7a',
    cost: {
        [Resource.FIRE]: 1,
        [Resource.WATER]: 1,
        [Resource.CRYSTAL]: 2,
        [Resource.GENERIC]: 2,
    },
    effects: [
        {
            type: EffectType.REVIVE,
            target: TargetTypes.ALL_SELF_UNITS_CEMETERY,
        },
    ],
    rarity: CardRarity.MYTHIC,
});

// Crystal Magic
const SPECTRAL_GENESIS = makeCard({
    name: 'Spectral Genesis',
    imgSrc: '/images/spells/spectral-genesis.avif', // https://images.unsplash.com/photo-1535027155668-be985a82f93c
    cost: { [Resource.CRYSTAL]: 1 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ANY,
            strength: 1,
        },
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ANY,
            strength: 1,
        },
    ],
    rarity: CardRarity.COMMON,
});

const SURREAL_DREAM = makeCard({
    artistName: 'Stefan Keller',
    artistUrl: 'https://pixabay.com/users/kellepics-4893063/',
    originalImagePage:
        'https://pixabay.com/photos/fantasy-clock-time-light-magic-3517206/',
    name: 'Surreal Dream',
    imgSrc: 'https://cdn.pixabay.com/photo/2018/07/04/22/55/fantasy-3517206_1280.jpg',
    cost: { [Resource.CRYSTAL]: 1 },
    effects: [
        {
            type: EffectType.LEARN,
            cardName: 'LANDMARK',
            strength: 2,
        },
    ],
    rarity: CardRarity.COMMON,
});

const DISTORT_REALITY = makeCard({
    name: 'Distort Reality',
    imgSrc: '/images/spells/distort-reality.avif', // https://images.pexels.com/photos/6492151/pexels-photo-6492151.jpeg
    cost: { [Resource.CRYSTAL]: 1 },
    effects: [
        {
            type: EffectType.DISCARD_HAND,
            target: TargetTypes.ALL_OPPONENTS,
            strength: 1,
        },
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.UNIT,
            strength: 1,
        },
    ],
    rarity: CardRarity.COMMON,
});

const GALACTIC_HOWL = makeCard({
    artistName: 'Kristendawn',
    artistUrl: 'https://pixabay.com/users/kristendawn-5971956/',
    originalImagePage:
        'https://pixabay.com/photos/galaxy-nebula-stars-digital-art-2728187/',
    name: 'Galactic Howl',
    imgSrc: 'https://cdn.pixabay.com/photo/2017/09/08/09/27/galaxy-2728187_1280.jpg',
    cost: { [Resource.CRYSTAL]: 1 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 3,
            requirements: [
                {
                    type: EffectRequirementsType.DISCARD_CARD,
                    strength: 1,
                    cardType: CardType.RESOURCE,
                },
            ],
        },
    ],
    rarity: CardRarity.COMMON,
});

const ZEN_STANCE = makeCard({
    name: 'Zen Stance',
    // https://pixabay.com/illustrations/meditation-spiritual-yoga-1384758/
    imgSrc: 'https://cdn.pixabay.com/photo/2016/05/10/21/50/meditation-1384758_1280.jpg',
    cost: { [Resource.CRYSTAL]: 1 },
    effects: [
        {
            type: EffectType.FLICKER,
            target: TargetTypes.OWN_UNIT,
        },
    ],
    rarity: CardRarity.UNCOMMON,
});

const BEAM_ME_UP = makeCard({
    name: 'Beam Me Up',
    // https://pixabay.com/photos/night-shot-starry-sky-night-sky-2553103/
    imgSrc: 'https://cdn.pixabay.com/photo/2017/07/30/00/03/night-photograph-2553103_1280.jpg',
    cost: { [Resource.GENERIC]: 1, [Resource.CRYSTAL]: 1 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ANY,
            strength: 2,
        },
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ANY,
            strength: 1,
        },
    ],
    rarity: CardRarity.UNCOMMON,
});

const PRAY_TO_ORION = makeCard({
    name: 'Pray to Orion',
    // https://pixabay.com/photos/orion-nebula-emission-nebula-11107/
    imgSrc: 'https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_1280.jpg', // https://images.unsplash.com/photo-1535027155668-be985a82f93c
    cost: { [Resource.GENERIC]: 1, [Resource.CRYSTAL]: 1 },
    effects: [
        {
            type: EffectType.DRAW,
            target: TargetTypes.SELF_PLAYER,
            strength: 4,
        },
        {
            type: EffectType.DISCARD_HAND,
            target: TargetTypes.SELF_PLAYER,
            strength: 4,
        },
    ],
    rarity: CardRarity.UNCOMMON,
});

const CATS_OUT_OF_THE_BAG = makeCard({
    artistName: 'Arthur Rackham',
    artistUrl: 'https://pixabay.com/users/prawny-162579/',
    originalImagePage:
        'https://pixabay.com/illustrations/vintage-literature-book-illustration-1723773/',
    name: "Cat's Out of the Bag",
    imgSrc: 'https://cdn.pixabay.com/photo/2016/10/08/14/14/vintage-1723773_1280.jpg',
    cost: { [Resource.CRYSTAL]: 1, [Resource.GENERIC]: 2 },
    effects: [
        {
            type: EffectType.DRAW,
            strength: 3,
        },
        {
            type: EffectType.TUCK,
            target: TargetTypes.OWN_UNIT,
        },
    ],
    rarity: CardRarity.UNCOMMON,
});

const STARRY_ILLUSION = makeCard({
    name: 'Starry Illusion',
    imgSrc: 'https://images.pexels.com/photos/3689634/pexels-photo-3689634.jpeg',
    cost: { [Resource.CRYSTAL]: 3 },
    effects: [
        {
            type: EffectType.DISCARD_HAND,
            target: TargetTypes.PLAYER,
            strength: 3,
        },
    ],
    rarity: CardRarity.RARE,
});

const HAT_AND_HALO = makeCard({
    artistName: 'Stefan Keller',
    artistUrl: 'https://pixabay.com/users/kellepics-4893063/',
    originalImagePage:
        'https://pixabay.com/illustrations/woman-stairs-backlighting-the-shade-3340958/',

    name: 'Hat and Halo',
    imgSrc: 'https://cdn.pixabay.com/photo/2018/04/22/12/48/woman-3340958_1280.jpg',
    cost: { [Resource.CRYSTAL]: 1, [Resource.GENERIC]: 2 },
    effects: [
        {
            type: EffectType.LEARN,
            cardName: 'LANDMARK',
            strength: 1,
        },
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 2,
        },
    ],
    rarity: CardRarity.COMMON,
});

const SCOUR_THE_LIBRARY = makeCard({
    name: 'Scour The Library',
    imgSrc: 'https://images.unsplash.com/photo-1549383028-df014fa3a325',
    cost: { [Resource.CRYSTAL]: 2, [Resource.GENERIC]: 1 },
    effects: [
        {
            type: EffectType.DISCARD_HAND,
            target: TargetTypes.ALL_PLAYERS,
            strength: Number.MAX_SAFE_INTEGER,
        },
        {
            type: EffectType.DRAW,
            target: TargetTypes.ALL_PLAYERS,
            strength: 7,
        },
    ],
    rarity: CardRarity.RARE,
});

const NIGHT_TEMPEST = makeCard({
    artistName: 'Amy Art-Dreams',
    artistUrl: 'https://pixabay.com/users/art_dreams-5864742/',
    originalImagePage:
        'https://pixabay.com/illustrations/lightning-storm-library-books-7570980/',
    name: 'Night Tempest',
    imgSrc: 'https://cdn.pixabay.com/photo/2022/11/05/02/15/lightning-7570980_1280.jpg',
    cost: { [Resource.CRYSTAL]: 1, [Resource.GENERIC]: 3 },
    effects: [
        {
            type: EffectType.TUCK,
            target: TargetTypes.OPPOSING_UNIT,
        },
    ],
    rarity: CardRarity.COMMON,
});

const OPEN_NEBULA = makeCard({
    name: 'Open Nebula',
    imgSrc: '/images/spells/open-nebula.avif', // https://images.unsplash.com/photo-1484589065579-248aad0d8b13
    cost: { [Resource.CRYSTAL]: 3, [Resource.GENERIC]: 3 },
    effects: [
        {
            type: EffectType.BOUNCE,
            strength: 1,
        },
        {
            type: EffectType.DISCARD_HAND,
            target: TargetTypes.ALL_PLAYERS,
            strength: Number.MAX_SAFE_INTEGER,
        },
        {
            type: EffectType.DRAW,
            target: TargetTypes.ALL_PLAYERS,
            strength: 4,
        },
        {
            type: EffectType.DRAW,
            target: TargetTypes.SELF_PLAYER,
            strength: 3,
        },
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ANY,
            strength: 2,
        },
    ],
    rarity: CardRarity.MYTHIC,
});

// Iron
const THROW_SHURIKEN = makeCard({
    name: 'Throw Shuriken',
    imgSrc: 'https://images.unsplash.com/photo-1567299720257-2619000f105e',
    cost: { [Resource.IRON]: 1 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.OPPOSING_UNIT,
            strength: 2,
        },
    ],
    rarity: CardRarity.COMMON,
});

const BESTOW_KNIGHTHOOD = makeCard({
    artistName: 'WikiImages',
    artistUrl: 'https://pixabay.com/users/wikiimages-1897/',
    originalImagePage:
        'https://pixabay.com/photos/accolade-knight-middle-ages-award-63001/',
    name: 'Bestow Knighthood',
    imgSrc: 'https://cdn.pixabay.com/photo/2012/10/26/01/17/accolade-63001_1280.jpg',
    cost: { [Resource.IRON]: 1 },
    effects: [
        {
            type: EffectType.BUFF_ATTACK,
            target: TargetTypes.UNIT,
            strength: 3,
            requirements: [
                {
                    type: EffectRequirementsType.RETURN_LOWEST_COST_UNIT_TO_HAND,
                    strength: 1,
                },
            ],
        },
    ],
    rarity: CardRarity.COMMON,
});

const BANDIT_AMBUSH = makeCard({
    name: 'Bandit Ambush',
    imgSrc: 'https://images.unsplash.com/photo-1627732922021-e73df99d192e',
    cost: { [Resource.IRON]: 1, [Resource.GENERIC]: 1 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.UNIT,
            strength: 2,
        },
        {
            type: EffectType.BUFF_HAND_ATTACK,
            target: TargetTypes.SELF_PLAYER,
            strength: 1,
        },
    ],
    rarity: CardRarity.COMMON,
});

const PERSECUTE = makeCard({
    artistName: 'Gioele Fazzeri',
    artistUrl: 'https://pixabay.com/users/gioelefazzeri-16466931/',
    originalImagePage:
        'https://pixabay.com/photos/witch-gothic-forest-horror-goth-7487743/',
    name: 'Persecute',
    imgSrc: 'https://cdn.pixabay.com/photo/2022/09/29/17/53/witch-7487743_1280.jpg',
    cost: { [Resource.IRON]: 1, [Resource.GENERIC]: 2 },
    effects: [
        {
            type: EffectType.DESTROY_UNIT,
            target: TargetTypes.UNIT,
        },
    ],
    rarity: CardRarity.UNCOMMON,
});

const MAJOR_EARTHQUAKE = makeCard({
    name: 'Major Earthquake',
    imgSrc: 'https://images.pexels.com/photos/11849377/pexels-photo-11849377.jpeg',
    cost: { [Resource.IRON]: 2, [Resource.GENERIC]: 3 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ALL_UNITS,
            strength: 5,
        },
    ],
    rarity: CardRarity.RARE,
});

// Bamboo
const TEA = makeCard({
    name: 'Tea',
    imgSrc: 'https://images.pexels.com/photos/230477/pexels-photo-230477.jpeg',
    cost: { [Resource.BAMBOO]: 1 },
    effects: [
        {
            type: EffectType.HEAL,
            strength: 1,
            target: TargetTypes.ANY,
        },
    ],
    rarity: CardRarity.COMMON,
    isTokenOnly: true,
});

const POISON_MUSHROOM = makeCard({
    name: 'Poison Mushroom',
    imgSrc: 'https://images.pexels.com/photos/5792564/pexels-photo-5792564.jpeg', // https://www.pexels.com/photo/fly-agaric-mushroom-on-the-ground-5792564/
    cost: { [Resource.CRYSTAL]: 1 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.UNIT,
            strength: 1,
        },
    ],
    rarity: CardRarity.COMMON,
    isTokenOnly: true,
});

const ARCHERY_AT_SUNSET = makeCard({
    name: 'Archery at Sunset',
    // https://pixabay.com/photos/archer-archery-sunset-arrow-bow-2345211/
    imgSrc: 'https://cdn.pixabay.com/photo/2017/05/26/05/36/archer-2345211_1280.jpg',
    cost: { [Resource.BAMBOO]: 1, [Resource.GENERIC]: 1 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 2,
            target: TargetTypes.ANY,
        },
    ],
    rarity: CardRarity.COMMON,
});

const FEED_TEAM = makeCard({
    name: 'Feed Team',
    imgSrc: 'https://images.unsplash.com/photo-1536746295297-2539b444b74d',
    cost: { [Resource.BAMBOO]: 1, [Resource.GENERIC]: 1 },
    effects: [
        {
            type: EffectType.RAMP,
            resourceType: Resource.BAMBOO,
            strength: 1,
        },
        {
            type: EffectType.HEAL,
            strength: 1,
            target: TargetTypes.ALL_SELF_UNITS,
        },
        { type: EffectType.BUFF_TEAM_HP, strength: 1 },
    ],
    rarity: CardRarity.UNCOMMON,
});

const FARMERS_MARKET = makeCard({
    name: "Farmer's Market",
    imgSrc: 'https://images.pexels.com/photos/4633292/pexels-photo-4633292.jpeg',
    cost: { [Resource.BAMBOO]: 1, [Resource.GENERIC]: 1 },
    effects: [
        {
            type: EffectType.RAMP,
            resourceType: Resource.BAMBOO,
            strength: 1,
        },
        {
            type: EffectType.LEARN,
            cardName: 'TEA',
            strength: 2,
        },
    ],
    rarity: CardRarity.COMMON,
});

const WILD_ROSE_HARVEST = makeCard({
    name: 'Wild Rose Harvest',
    imgSrc: 'https://images.pexels.com/photos/3368288/pexels-photo-3368288.jpeg',
    cost: { [Resource.BAMBOO]: 1, [Resource.GENERIC]: 1 },
    effects: [
        {
            type: EffectType.LEARN,
            cardName: 'TEA',
            strength: 3,
        },
    ],
    rarity: CardRarity.COMMON,
});

const SPRING_IN_BLOOM = makeCard({
    name: 'Spring in Bloom',
    imgSrc: 'https://images.pexels.com/photos/11669655/pexels-photo-11669655.jpeg',
    cost: { [Resource.BAMBOO]: 1, [Resource.GENERIC]: 2 },
    effects: [
        {
            type: EffectType.RAMP,
            resourceType: Resource.BAMBOO,
            strength: 1,
        },
        {
            type: EffectType.EXTRACT_CARD,
            cardName: 'Bamboo',
            strength: 1,
        },
    ],
    rarity: CardRarity.RARE,
});

const GENTLE_ENCOURAGEMENT = makeCard({
    artistName: '0fjd125gk87',
    artistUrl: 'https://pixabay.com/users/0fjd125gk87-51581/',
    originalImagePage:
        'https://pixabay.com/photos/elephant-watering-hole-baby-elephant-2380009/',
    name: 'Gentle Encouragement',
    imgSrc: 'https://cdn.pixabay.com/photo/2017/06/07/10/47/elephant-2380009_1280.jpg',
    cost: { [Resource.BAMBOO]: 1, [Resource.GENERIC]: 1 },
    effects: [
        {
            type: EffectType.SUMMON_UNITS,
            summonType: Tokens.ELEPHANT,
            strength: 1,
            requirements: [
                {
                    type: EffectRequirementsType.DISCARD_CARD,
                    cardType: CardType.SPELL,
                    strength: 2,
                },
                {
                    type: EffectRequirementsType.DISCARD_CARD,
                    cardType: CardType.RESOURCE,
                    strength: 1,
                },
            ],
        },
    ],
    rarity: CardRarity.UNCOMMON,
});

const RAIN_OF_ARROWS = makeCard({
    name: 'Rain of Arrows',
    imgSrc: 'https://images.unsplash.com/photo-1563705883268-eb58ab6f505d',
    cost: { [Resource.BAMBOO]: 2, [Resource.GENERIC]: 3 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ALL_OPPOSING_UNITS,
            strength: 3,
        },
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ALL_OPPONENTS,
            strength: 2,
        },
    ],
    rarity: CardRarity.RARE,
});

const TEAM_GATHERING = makeCard({
    name: 'Team Gathering',
    imgSrc: 'https://images.pexels.com/photos/2152958/pexels-photo-2152958.jpeg',
    cost: { [Resource.BAMBOO]: 2, [Resource.GENERIC]: 2 },
    effects: [
        {
            type: EffectType.DRAW_PER_UNIT,
        },
    ],
    rarity: CardRarity.RARE,
});

const SUMMON_THE_CROWS = makeCard({
    name: 'Summon the Crows',
    imgSrc: 'https://images.pexels.com/photos/3213357/pexels-photo-3213357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    cost: { [Resource.BAMBOO]: 3, [Resource.GENERIC]: 2 },
    effects: [
        {
            type: EffectType.SUMMON_UNITS,
            strength: 3,
            summonType: Tokens.FALCON,
        },
    ],
    rarity: CardRarity.COMMON,
});

// Monks (bamboo + iron)
const FISH_MARKET_VISIT = makeCard({
    name: 'Fish Market Visit',
    imgSrc: 'https://images.pexels.com/photos/11669729/pexels-photo-11669729.jpeg',
    cost: { [Resource.BAMBOO]: 1, [Resource.IRON]: 1 },
    effects: [
        { type: EffectType.BUFF_TEAM_HP, strength: 1 },
        { type: EffectType.BUFF_HAND_ATTACK, strength: 2 },
    ],
    rarity: CardRarity.UNCOMMON,
});

const CONCENTRATED_FOCUS = makeCard({
    name: 'Concentrated Focus',
    imgSrc: 'https://images.pexels.com/photos/11331536/pexels-photo-11331536.jpeg',
    cost: { [Resource.BAMBOO]: 1, [Resource.IRON]: 1 },
    effects: [{ type: EffectType.BUFF_HAND_ATTACK, strength: 3 }],
    rarity: CardRarity.RARE,
});

// Dragons (bamboo + fire)
const TOO_MUCH_SPICE = makeCard({
    artistName: 'Angela (ang3law)',
    artistUrl: 'https://pixabay.com/users/ang3law-11692607/',
    originalImagePage:
        'https://pixabay.com/illustrations/fire-breathing-fiction-dragon-7853170/',
    name: 'Too Much Spice',
    imgSrc: 'https://cdn.pixabay.com/photo/2023/03/14/21/10/fire-7853170_1280.jpg',
    cost: { [Resource.FIRE]: 1, [Resource.BAMBOO]: 1 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.OPPOSING_UNIT,
            strength: 2,
        },
        {
            type: EffectType.BUFF_MAGIC,
            target: TargetTypes.OWN_UNIT,
            strength: 2,
        },
    ],
    rarity: CardRarity.UNCOMMON,
});

const BRIDGE_TO_IMMORTALITY = makeCard({
    artistName: 'Artie Navarre',
    artistUrl: 'https://pixabay.com/users/artie_navarre-66276/',
    originalImagePage:
        'https://pixabay.com/illustrations/bridge-of-regret-bridge-regret-3935012/',
    name: 'Bridge to Immortality',
    imgSrc: 'https://cdn.pixabay.com/photo/2019/01/15/23/00/bridge-of-regret-3935012_1280.jpg',
    cost: { [Resource.FIRE]: 1, [Resource.BAMBOO]: 1 },
    effects: [
        {
            type: EffectType.GRANT_PASSIVE_EFFECT,
            target: TargetTypes.ALL_UNITS,
            passiveEffect: PassiveEffect.HEARTY,
        },
    ],
    rarity: CardRarity.MYTHIC,
});

// Genies
const SIGNAL_BEACON = makeCard({
    name: 'Signal Beacon',
    imgSrc: 'https://images.unsplash.com/photo-1531804308561-b6438d25a810',
    cost: { [Resource.IRON]: 1, [Resource.CRYSTAL]: 1 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ANY,
            strength: 1,
        },
        {
            type: EffectType.LEARN,
            cardName: 'DISTORT_REALITY',
            strength: 1,
        },
    ],
    rarity: CardRarity.UNCOMMON,
});

const DECAY = makeCard({
    artistName: 'Stefan Keller',
    artistUrl: 'https://pixabay.com/users/kellepics-4893063/',
    originalImagePage:
        'https://pixabay.com/illustrations/fantasy-people-mysticism-mystical-2964231/',
    name: 'Decay',
    imgSrc: 'https://cdn.pixabay.com/photo/2017/11/20/02/00/fantasy-2964231_1280.jpg',
    cost: { [Resource.IRON]: 1, [Resource.CRYSTAL]: 1, [Resource.GENERIC]: 1 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ALL_PLAYERS,
            strength: 1,
        },
        {
            type: EffectType.DISCARD_HAND,
            target: TargetTypes.ALL_PLAYERS,
            strength: 1,
        },
        {
            type: EffectType.DESTROY_RESOURCE,
            target: TargetTypes.ALL_PLAYERS,
            strength: 1,
        },
    ],
    rarity: CardRarity.RARE,
});

const WINDS_OF_TRADE = makeCard({
    artistName: 'Cilvarium',
    artistUrl: 'https://pixabay.com/users/cilvarium-3547927/',
    originalImagePage:
        'https://pixabay.com/photos/castle-desert-future-city-machine-5896308/',
    name: 'Winds of Trade',
    imgSrc: 'https://cdn.pixabay.com/photo/2021/01/07/06/19/castle-5896308_1280.jpg',
    cost: { [Resource.IRON]: 1, [Resource.CRYSTAL]: 1, [Resource.GENERIC]: 1 },
    effects: [
        {
            type: EffectType.LEARN,
            cardName: 'RICHES',
            strength: 2,
        },
        {
            type: EffectType.DRAW,
            strength: 2,
        },
        {
            type: EffectType.DISCARD_HAND,
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
    rarity: CardRarity.UNCOMMON,
});

const FORMIDABLE_STORM = makeCard({
    artistName: 'Placidplace',
    artistUrl: 'https://pixabay.com/users/placidplace-25572496/',
    originalImagePage:
        'https://pixabay.com/illustrations/sandstorm-desert-sand-storm-egypt-7854725/',
    name: 'Formidable Storm',
    imgSrc: 'https://cdn.pixabay.com/photo/2023/03/15/14/55/sandstorm-7854725_1280.jpg',
    cost: { [Resource.IRON]: 2, [Resource.CRYSTAL]: 2, [Resource.GENERIC]: 1 },
    effects: [
        {
            type: EffectType.DESTROY_UNIT,
            target: TargetTypes.ALL_UNITS,
        },
        {
            type: EffectType.EXTRACT_CARD,
            target: TargetTypes.SELF_PLAYER,
            cardName: 'King Tut',
            strength: 1,
        },
    ],
    rarity: CardRarity.RARE,
});

const DESERT_TRIALS = makeCard({
    name: 'Desert Trials',
    // https://pixabay.com/photos/camels-desert-man-oman-salalah-4432346/
    imgSrc: 'https://cdn.pixabay.com/photo/2019/08/26/17/21/camels-4432346_1280.jpg',
    cost: { [Resource.IRON]: 1, [Resource.CRYSTAL]: 1, [Resource.GENERIC]: 2 },
    effects: [
        {
            type: EffectType.RAMP,
            resourceType: Resource.WATER,
            strength: 1,
        },
        {
            type: EffectType.RAMP,
            resourceType: Resource.BAMBOO,
            strength: 1,
        },
    ],
    rarity: CardRarity.UNCOMMON,
});

// Cannon
const IGNITE_SPARKS = makeCard({
    name: 'Ignite Sparks',
    // https://images.pexels.com/photos/1098402/pexels-photo-1098402.jpeg
    imgSrc: '/images/spells/ignite-sparks.avif',
    cost: { [Resource.IRON]: 1, [Resource.FIRE]: 1 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ANY,
            strength: 2,
        },
        {
            type: EffectType.LEARN,
            cardName: 'SPARK_JOY',
            strength: 1,
        },
    ],
    rarity: CardRarity.UNCOMMON,
});

const SPARK_JOY = makeCard({
    name: 'Spark Joy',
    imgSrc: 'https://images.pexels.com/photos/668254/pexels-photo-668254.jpeg',
    cost: { [Resource.IRON]: 1 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ANY,
            strength: 1,
        },
    ],
    rarity: CardRarity.COMMON,
    isTokenOnly: true,
});

const REINFORCE_STEEL = makeCard({
    artistName: 'j.mt_photography',
    artistUrl: 'https://www.pexels.com/@j-mt_photography-628996/',
    originalImagePage:
        'https://www.pexels.com/photo/man-forging-metal-3680094/',
    name: 'Reinforce Steel',
    imgSrc: 'https://images.pexels.com/photos/3680094/pexels-photo-3680094.jpeg',
    cost: { [Resource.IRON]: 1, [Resource.FIRE]: 1 },
    effects: [
        {
            type: EffectType.BUFF_ATTACK,
            target: TargetTypes.ANY,
            strength: 3,
        },
        {
            type: EffectType.LEARN,
            cardName: 'SPARK_JOY',
            strength: 1,
        },
    ],
    rarity: CardRarity.UNCOMMON,
});

const FESTIVE_BAZAAR = makeCard({
    name: 'Festive Bazaar',
    imgSrc: 'https://images.pexels.com/photos/3243027/pexels-photo-3243027.jpeg',
    cost: { [Resource.IRON]: 1, [Resource.FIRE]: 1 },
    effects: [
        {
            type: EffectType.RAMP_FOR_TURN,
            strength: 2,
            resourceType: Resource.IRON,
        },
        {
            type: EffectType.RAMP_FOR_TURN,
            strength: 1,
            resourceType: Resource.FIRE,
        },
    ],
    rarity: CardRarity.RARE,
});

const FIRE_AWAY = makeCard({
    name: 'Fire Away',
    imgSrc: 'https://images.pexels.com/photos/9472579/pexels-photo-9472579.jpeg',
    cost: { [Resource.IRON]: 1, [Resource.FIRE]: 1, [Resource.GENERIC]: 1 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.SELF_PLAYER,
            strength: 2,
        },
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ANY,
            strength: 4,
        },
    ],
    rarity: CardRarity.UNCOMMON,
});

const BESIEGE_THE_CASTLE = makeCard({
    name: 'Besiege the Castle',
    imgSrc: 'https://images.pexels.com/photos/9738976/pexels-photo-9738976.jpeg',
    cost: { [Resource.IRON]: 1, [Resource.FIRE]: 1, [Resource.GENERIC]: 2 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ANY,
            strength: 3,
        },
        {
            type: EffectType.DESTROY_RESOURCE,
            target: TargetTypes.OPPONENT,
            strength: 1,
        },
    ],
    rarity: CardRarity.RARE,
});

// 3-color
const SAMURAIS_TEMPEST = makeCard({
    artistName: 'Stefan Keller',
    artistUrl: 'https://pixabay.com/users/kellepics-4893063/',
    originalImagePage:
        'https://pixabay.com/photos/fantasy-lightning-winter-samurai-3412305/',
    name: "Samurai's Tempest",
    imgSrc: 'https://cdn.pixabay.com/photo/2018/05/18/22/57/fantasy-3412305_1280.jpg',
    cost: {
        [Resource.GENERIC]: 1,
        [Resource.CRYSTAL]: 1,
        [Resource.BAMBOO]: 1,
        [Resource.WATER]: 1,
    },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 2,
        },
        {
            type: EffectType.HEAL,
            strength: 2,
        },
        {
            type: EffectType.BLOOM,
            strength: 1,
        },
    ],
    rarity: CardRarity.MYTHIC,
});

const UNDERWORLD_MESSAGE = makeCard({
    name: 'Underworld Message',
    imgSrc: 'https://cdn.pixabay.com/photo/2020/04/07/12/17/photo-manipulation-5013193_1280.jpg',
    cost: {
        [Resource.CRYSTAL]: 1,
        [Resource.FIRE]: 1,
        [Resource.IRON]: 1,
    },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 2,
        },
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 2,
        },
        {
            type: EffectType.BUFF_ATTACK,
            strength: 2,
        },
    ],
    rarity: CardRarity.RARE,
});

const MAGNIMUTATION = makeCard({
    name: 'Magnimutation',
    // https://pixabay.com/photos/elephant-butterfly-6087632/
    imgSrc: 'https://cdn.pixabay.com/photo/2021/03/11/16/38/elephant-6087632_1280.jpg',
    cost: {
        [Resource.CRYSTAL]: 1,
        [Resource.BAMBOO]: 1,
        [Resource.FIRE]: 1,
        [Resource.GENERIC]: 1,
    },
    effects: [
        {
            type: EffectType.BUFF_MAGIC,
            strength: 2,
            target: TargetTypes.ALL_SELF_UNITS,
        },
    ],
    rarity: CardRarity.RARE,
});

// 4-color
const A_DARK_FOREST = makeCard({
    name: 'A Dark Forest',
    // https://pixabay.com/photos/mystery-road-fantasy-magical-fog-4532583/
    imgSrc: 'https://cdn.pixabay.com/photo/2019/10/07/13/18/mystery-4532583_1280.jpg',
    cost: {
        [Resource.BAMBOO]: 4,
    },
    effects: [
        {
            type: EffectType.RAMP_FOR_TURN,
            strength: 1,
            resourceType: Resource.CRYSTAL,
        },
        {
            type: EffectType.RAMP_FOR_TURN,
            strength: 1,
            resourceType: Resource.FIRE,
        },
        {
            type: EffectType.RAMP_FOR_TURN,
            strength: 1,
            resourceType: Resource.WATER,
        },
        {
            type: EffectType.RAMP_FOR_TURN,
            strength: 1,
            resourceType: Resource.IRON,
        },
    ],
    rarity: CardRarity.RARE,
});

const A_MILLION_RAYS = makeCard({
    name: 'A Million Rays',
    imgSrc: 'https://cdn.pixabay.com/photo/2013/03/11/01/16/rainbow-92342_1280.jpg',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.GENERIC]: 4,
    },
    effects: [
        {
            type: EffectType.RAMP_FOR_TURN,
            strength: 1,
            resourceType: Resource.CRYSTAL,
        },
        {
            type: EffectType.RAMP_FOR_TURN,
            strength: 1,
            resourceType: Resource.FIRE,
        },
        {
            type: EffectType.RAMP_FOR_TURN,
            strength: 1,
            resourceType: Resource.WATER,
        },
        {
            type: EffectType.RAMP_FOR_TURN,
            strength: 1,
            resourceType: Resource.BAMBOO,
        },
        {
            type: EffectType.RAMP_FOR_TURN,
            strength: 1,
            resourceType: Resource.IRON,
        },
    ],
    rarity: CardRarity.RARE,
});

const QUESTION_REALITY = makeCard({
    name: 'Question Reality',
    imgSrc: 'https://images.pexels.com/photos/5023641/pexels-photo-5023641.jpeg',
    cost: {
        [Resource.IRON]: 1,
        [Resource.CRYSTAL]: 1,
        [Resource.FIRE]: 1,
        [Resource.WATER]: 1,
    },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 3,
            target: TargetTypes.ALL_UNITS,
        },
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 3,
            target: TargetTypes.ALL_PLAYERS,
        },
        {
            type: EffectType.DISCARD_HAND,
            strength: 3,
            target: TargetTypes.ALL_PLAYERS,
        },
        {
            type: EffectType.HEAL,
            strength: 3,
            target: TargetTypes.ALL_UNITS,
        },
    ],
    rarity: CardRarity.MYTHIC,
});

const CALL_THE_HERD = makeCard({
    name: 'Call the Herd',
    imgSrc: 'https://images.pexels.com/photos/3231998/pexels-photo-3231998.jpeg',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.CRYSTAL]: 1,
        [Resource.FIRE]: 1,
        [Resource.WATER]: 1,
        [Resource.GENERIC]: 1,
    },
    effects: [
        {
            type: EffectType.SUMMON_UNITS,
            strength: 1,
            summonType: Tokens.FALCON,
        },
        {
            type: EffectType.SUMMON_UNITS,
            strength: 1,
            summonType: Tokens.MANTA_RAY,
        },
        {
            type: EffectType.SUMMON_UNITS,
            strength: 1,
            summonType: Tokens.SCORPION,
        },
        {
            type: EffectType.SUMMON_UNITS,
            strength: 1,
            summonType: Tokens.LION,
        },
        {
            type: EffectType.SUMMON_UNITS,
            strength: 1,
            summonType: Tokens.PIRATE_PARROT,
        },
        {
            type: EffectType.SUMMON_UNITS,
            strength: 1,
            summonType: Tokens.SHARK,
        },
    ],
    rarity: CardRarity.MYTHIC,
});

const DEFEND_THE_FORTRESS = makeCard({
    artistName: 'Thành Nguyễn',
    artistUrl: 'https://pixabay.com/users/thanh_nguyen_slq-21384332/',
    originalImagePage:
        'https://pixabay.com/illustrations/art-fortress-painting-fantasy-7917495/',
    name: 'Defend the Fortress',
    imgSrc: 'https://cdn.pixabay.com/photo/2023/04/11/15/12/art-7917495_1280.jpg',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.CRYSTAL]: 1,
        [Resource.IRON]: 1,
    },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 2,
            target: TargetTypes.ALL_UNITS,
        },
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 1,
            target: TargetTypes.ALL_UNITS,
        },
    ],
    rarity: CardRarity.RARE,
});

// Witches
const POLYMORPH_FROG = makeCard({
    name: 'Polymorph: Frog',
    imgSrc: 'https://images.pexels.com/photos/73798/frog-marbled-reed-frog-amphibian-animal-73798.jpeg',
    cost: { [Resource.BAMBOO]: 1, [Resource.CRYSTAL]: 1 },
    effects: [
        {
            type: EffectType.POLYMORPH,
            target: TargetTypes.UNIT,
            summonType: Tokens.FROG,
        },
    ],
    rarity: CardRarity.UNCOMMON,
});

const DOUBLE_MORPH_FROG = makeCard({
    name: 'Double Morph: Frog',
    // https://www.pexels.com/photo/pair-of-green-frogs-sitting-on-tree-branch-11575310/
    imgSrc: 'https://images.pexels.com/photos/11575310/pexels-photo-11575310.jpeg',
    cost: {
        [Resource.BAMBOO]: 1,
        [Resource.CRYSTAL]: 1,
        [Resource.GENERIC]: 3,
    },
    effects: [
        {
            type: EffectType.POLYMORPH,
            target: TargetTypes.UNIT,
            summonType: Tokens.FROG,
        },
        {
            type: EffectType.POLYMORPH,
            target: TargetTypes.UNIT,
            summonType: Tokens.FROG,
        },
    ],
    rarity: CardRarity.RARE,
});

// Pirates
const OLD_WORLD_MAP = makeCard({
    artistName: 'MasterTux',
    artistUrl: 'https://pixabay.com/users/mastertux-470906/',
    originalImagePage:
        'https://pixabay.com/photos/adventure-treasure-map-old-world-map-2528477/',
    name: 'Old World Map',
    imgSrc: 'https://cdn.pixabay.com/photo/2017/07/22/11/46/adventure-2528477_1280.jpg',
    cost: {},
    effects: [
        {
            type: EffectType.CURSE_HAND,
            target: TargetTypes.SELF_PLAYER,
            strength: -1,
        },
    ],
    isTokenOnly: true,
    rarity: CardRarity.UNCOMMON,
});

const REST_AT_THE_TAVERN = makeCard({
    artistName: 'loulou Nash',
    artistUrl: 'https://pixabay.com/users/thefairypath-4207961/',
    originalImagePage:
        'https://pixabay.com/illustrations/pirate-pirate-village-swashbuckler-2144555/',
    name: 'Rest at the Tavern',
    imgSrc: 'https://cdn.pixabay.com/photo/2017/03/14/21/59/pirate-2144555_1280.jpg',
    cost: { [Resource.WATER]: 1, [Resource.IRON]: 1, [Resource.GENERIC]: 1 },
    effects: [
        {
            type: EffectType.DRAW,
            strength: 2,
        },
        {
            type: EffectType.HEAL,
            target: TargetTypes.ALL_SELF_UNITS,
            strength: 2,
        },
    ],
    rarity: CardRarity.UNCOMMON,
});

const RAISE_THE_MASTS = makeCard({
    name: 'Raise the Masts',
    imgSrc: 'https://images.pexels.com/photos/237781/pexels-photo-237781.jpeg',
    cost: { [Resource.WATER]: 1, [Resource.IRON]: 1 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ALL_OPPOSING_UNITS,
            strength: 1,
        },
        {
            type: EffectType.HEAL,
            target: TargetTypes.SELF_PLAYER,
            strength: 3,
        },
    ],
    rarity: CardRarity.UNCOMMON,
});

const WRECK_SHIPS = makeCard({
    name: 'Wreck ships',
    imgSrc: 'https://cdn.pixabay.com/photo/2017/05/01/12/24/ship-2275399_1280.jpg',
    cost: { [Resource.WATER]: 1, [Resource.IRON]: 1, [Resource.FIRE]: 1 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ALL_OPPOSING_UNITS,
            strength: 3,
        },
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ALL_SELF_UNITS,
            strength: 1,
        },
    ],
    rarity: CardRarity.RARE,
});

// Neutral
const HISTORICAL_RESEARCH = makeCard({
    name: 'Historical Research',
    imgSrc: 'https://images.pexels.com/photos/1557251/pexels-photo-1557251.jpeg',
    cost: { [Resource.GENERIC]: 2 },
    effects: [
        {
            type: EffectType.EXTRACT_CARD,
            cardName: 'Confucius',
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
        {
            type: EffectType.EXTRACT_CARD,
            cardName: 'King Tut',
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
        {
            type: EffectType.EXTRACT_CARD,
            cardName: 'Generous Buddha',
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
    rarity: CardRarity.RARE,
});

const RICHES = makeCard({
    name: 'Riches',
    imgSrc: 'https://images.unsplash.com/photo-1618017049045-0dc296b7eb10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    cost: {},
    effects: [
        {
            type: EffectType.RAMP_FOR_TURN,
            strength: 1,
            resourceType: Resource.GENERIC,
        },
    ],
    rarity: CardRarity.COMMON,
    isTokenOnly: true,
});

const LANDMARK = makeCard({
    name: 'Landmark',
    // https://pixabay.com/photos/ruin-monastery-graves-fantasy-3414235/
    imgSrc: 'https://cdn.pixabay.com/photo/2018/05/19/19/58/ruin-3414235_1280.jpg',
    cost: { [Resource.GENERIC]: 2 },
    effects: [
        {
            type: EffectType.DRAW,
            strength: 1,
        },
    ],
    rarity: CardRarity.COMMON,
    isTokenOnly: true,
});

export const SpellCards = {
    // Fire
    SMOLDER,
    EMBER_SPEAR,
    WARPATH,
    INCINERATION,
    FURY_OF_THE_OWL,
    LIGHTNING_SLICK,
    CURSE_HAND,
    SUPERNOVA,
    BEND_AND_SCORCH,
    FIRE_CEREMONY,
    BRUSH_FIRE,
    CHANNEL_SPARKS,
    CAVE_IMPLOSION,
    INCREDIBLE_DISCOVERY,
    STRIKE_TWICE,
    SUMMON_DEMONS,
    VOLCANIC_INFERNO,
    ERUPT,

    // Water
    BUBBLE_BLAST,
    COLD_ISOLATION,
    OASIS_RITUAL,
    STIR,
    WHALE_BREACH,
    GENEROUS_GEYSER,
    MIDNIGHT_ROW,
    CONSTANT_REFILL,
    RAGING_WHIRLPOOL,
    SUMMON_SHARKS,
    REFLECTION_OPPORTUNITY,
    PEACE_AND_HARMONY,
    PIERCE_THE_HEAVENS,

    // Wind
    A_GENTLE_GUST,
    A_THOUSAND_WINDS,
    SOLFATARA,
    COLLOSAL_TSUNAMI,

    // Sorceror
    MAGIC_RIFT,
    HOLY_REVIVAL,

    // Crystal
    DISTORT_REALITY,
    SPECTRAL_GENESIS,
    SURREAL_DREAM,
    ZEN_STANCE,
    BEAM_ME_UP,
    GALACTIC_HOWL,
    PRAY_TO_ORION,
    CATS_OUT_OF_THE_BAG,
    STARRY_ILLUSION,
    SCOUR_THE_LIBRARY,
    HAT_AND_HALO,
    NIGHT_TEMPEST,
    OPEN_NEBULA,

    // Iron
    THROW_SHURIKEN,
    BESTOW_KNIGHTHOOD,
    BANDIT_AMBUSH,
    PERSECUTE,
    MAJOR_EARTHQUAKE,

    // Bamboo
    TEA,
    POISON_MUSHROOM,
    ARCHERY_AT_SUNSET,
    GENTLE_ENCOURAGEMENT,
    FEED_TEAM,
    FARMERS_MARKET,
    WILD_ROSE_HARVEST,
    SPRING_IN_BLOOM,
    RAIN_OF_ARROWS,
    TEAM_GATHERING,
    SUMMON_THE_CROWS,

    // Monks
    FISH_MARKET_VISIT,
    CONCENTRATED_FOCUS,

    // Dragons
    BRIDGE_TO_IMMORTALITY,
    TOO_MUCH_SPICE,

    // Genies
    SIGNAL_BEACON,
    DECAY,
    DESERT_TRIALS,
    WINDS_OF_TRADE,
    FORMIDABLE_STORM,

    // Cannon
    REINFORCE_STEEL,
    IGNITE_SPARKS,
    SPARK_JOY,
    FESTIVE_BAZAAR,
    FIRE_AWAY,
    BESIEGE_THE_CASTLE,

    // Witch
    POLYMORPH_FROG,
    DOUBLE_MORPH_FROG,

    // Pirates
    OLD_WORLD_MAP,
    RAISE_THE_MASTS,
    WRECK_SHIPS,
    REST_AT_THE_TAVERN,

    // Multi-color misc.
    SAMURAIS_TEMPEST,
    UNDERWORLD_MESSAGE,
    MAGNIMUTATION,
    A_DARK_FOREST,
    A_MILLION_RAYS,
    QUESTION_REALITY,
    CALL_THE_HERD,
    DEFEND_THE_FORTRESS,

    // Neutral
    HISTORICAL_RESEARCH,
    RICHES,
    LANDMARK,
};
