import cloneDeep from 'lodash.clonedeep';

import { CardType, SpellBase, SpellCard } from '@/types/cards';
import { EffectType, TargetTypes } from '@/types/effects';
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
});

const SURREAL_DREAM = makeCard({
    name: 'Surreal Dream',
    // https://pixabay.com/photos/fantasy-clock-time-light-magic-3517206/
    imgSrc: 'https://cdn.pixabay.com/photo/2018/07/04/22/55/fantasy-3517206_1280.jpg',
    cost: { [Resource.CRYSTAL]: 1 },
    effects: [
        {
            type: EffectType.LEARN,
            cardName: 'LANDMARK',
            strength: 2,
        },
    ],
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
});

const TEAM_GATHERING = makeCard({
    name: 'Team Gathering',
    imgSrc: 'https://images.pexels.com/photos/2152958/pexels-photo-2152958.jpeg',
    cost: { [Resource.BAMBOO]: 2, [Resource.GENERIC]: 3 },
    effects: [
        {
            type: EffectType.DRAW_PER_UNIT,
        },
    ],
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
});

const CONCENTRATED_FOCUS = makeCard({
    name: 'Concentrated Focus',
    imgSrc: 'https://images.pexels.com/photos/11331536/pexels-photo-11331536.jpeg',
    cost: { [Resource.BAMBOO]: 1, [Resource.IRON]: 1 },
    effects: [{ type: EffectType.BUFF_HAND_ATTACK, strength: 3 }],
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
});

const DECAY = makeCard({
    name: 'Decay',
    // https://pixabay.com/illustrations/fantasy-people-mysticism-mystical-2964231/
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
});

// 3-color
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
});

// Pirates
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
});

export const SpellCards = {
    // Fire
    SMOLDER,
    EMBER_SPEAR,
    WARPATH,
    INCINERATION,
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
    GENEROUS_GEYSER,
    MIDNIGHT_ROW,
    CONSTANT_REFILL,
    RAGING_WHIRLPOOL,
    SUMMON_SHARKS,
    REFLECTION_OPPORTUNITY,
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
    PRAY_TO_ORION,
    STARRY_ILLUSION,
    SCOUR_THE_LIBRARY,
    OPEN_NEBULA,

    // Iron
    THROW_SHURIKEN,
    BANDIT_AMBUSH,
    MAJOR_EARTHQUAKE,

    // Bamboo
    TEA,
    POISON_MUSHROOM,
    ARCHERY_AT_SUNSET,
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

    // Genies
    SIGNAL_BEACON,
    DECAY,
    DESERT_TRIALS,

    // Cannon
    IGNITE_SPARKS,
    SPARK_JOY,
    FESTIVE_BAZAAR,
    FIRE_AWAY,
    BESIEGE_THE_CASTLE,

    // Witch
    POLYMORPH_FROG,
    DOUBLE_MORPH_FROG,

    // Pirates
    RAISE_THE_MASTS,
    WRECK_SHIPS,

    // Multi-color misc.
    UNDERWORLD_MESSAGE,
    MAGNIMUTATION,
    A_DARK_FOREST,
    A_MILLION_RAYS,
    QUESTION_REALITY,
    CALL_THE_HERD,

    // Neutral
    HISTORICAL_RESEARCH,
    RICHES,
    LANDMARK,
};
