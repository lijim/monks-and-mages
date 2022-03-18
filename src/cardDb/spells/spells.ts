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

const LIGHTNING_SLICK = makeCard({
    name: 'Lightning Slick',
    imgSrc: 'https://images.unsplash.com/photo-1626329473491-59bb128e31e9',
    cost: { [Resource.FIRE]: 1, [Resource.GENERIC]: 1 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.OPPOSING_UNIT,
            strength: 5,
        },
    ],
});

const CURSE_HAND = makeCard({
    name: 'Curse Hand',
    imgSrc: 'https://images.unsplash.com/photo-1571931468289-38ebb2c5a1c2?',
    cost: { [Resource.FIRE]: 2 },
    effects: [
        {
            type: EffectType.CURSE_HAND,
            strength: 1,
            target: TargetTypes.ALL_OPPONENTS,
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

const GENEROUS_GEYSER = makeCard({
    name: 'Generous Geyser',
    imgSrc: 'https://images.unsplash.com/photo-1567604130959-7ea7ab2a7807?',
    cost: { [Resource.WATER]: 2, [Resource.GENERIC]: 1 },
    effects: [
        {
            type: EffectType.DRAW,
            strength: 2,
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

// Wind Magic
const A_GENTLE_GUST = makeCard({
    name: 'A Gentle Gust',
    imgSrc: 'https://images.unsplash.com/photo-1505672678657-cc7037095e60',
    cost: { [Resource.FIRE]: 1, [Resource.WATER]: 1 },
    effects: [
        {
            type: EffectType.BUFF_TEAM_ATTACK,
            strength: 1,
        },
        {
            type: EffectType.BUFF_TEAM_MAGIC,
            strength: 1,
        },
        {
            type: EffectType.BUFF_TEAM_HP,
            strength: 1,
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
            type: EffectType.RAMP,
            resourceType: Resource.WATER,
            strength: 1,
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
            target: TargetTypes.ALL_SELF_UNITS_GRAVEYARD,
        },
    ],
});

// Crystal Magic
const SPECTRAL_GENESIS = makeCard({
    name: 'Spectral Genesis',
    imgSrc: 'https://images.unsplash.com/photo-1535027155668-be985a82f93c',
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

const OPEN_NEBULA = makeCard({
    name: 'Open Nebula',
    imgSrc: 'https://images.unsplash.com/photo-1484589065579-248aad0d8b13',
    cost: { [Resource.CRYSTAL]: 3, [Resource.GENERIC]: 1 },
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
        {
            type: EffectType.BOUNCE,
            strength: 1,
        },
        {
            type: EffectType.BUFF_TEAM_MAGIC,
            target: TargetTypes.ALL_PLAYERS,
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
            target: TargetTypes.UNIT,
            strength: 2,
        },
    ],
});

// Bamboo
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

const RAIN_OF_ARROWS = makeCard({
    name: 'Rain of Arrows',
    imgSrc: 'https://images.unsplash.com/photo-1563705883268-eb58ab6f505d',
    cost: { [Resource.BAMBOO]: 2, [Resource.GENERIC]: 2 },
    effects: [
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ALL_OPPOSING_UNITS,
            strength: 3,
        },
        {
            type: EffectType.DEAL_DAMAGE,
            target: TargetTypes.ALL_OPPONENTS,
            strength: 3,
        },
    ],
});

export const SpellCards = {
    // Fire
    EMBER_SPEAR,
    LIGHTNING_SLICK,
    CURSE_HAND,
    SUMMON_DEMONS,
    VOLCANIC_INFERNO,

    // Water
    BUBBLE_BLAST,
    GENEROUS_GEYSER,
    CONSTANT_REFILL,
    SUMMON_SHARKS,

    // Wind
    A_GENTLE_GUST,
    A_THOUSAND_WINDS,
    HOLY_REVIVAL,

    // Crystal
    SPECTRAL_GENESIS,
    OPEN_NEBULA,

    // Iron
    THROW_SHURIKEN,

    // Bamboo
    FEED_TEAM,
    RAIN_OF_ARROWS,
};
