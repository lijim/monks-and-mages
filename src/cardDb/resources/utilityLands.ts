import { makeAdvancedResourceCard } from '@/factories/cards';
import { EffectType, TargetTypes } from '@/types/effects';
import { Resource } from '@/types/resources';
import { Tokens } from '../units';

// Set 1
const COASTAL_CASTLE = makeAdvancedResourceCard({
    name: 'Coastal Castle',
    resourceType: Resource.WATER,
    imgSrc: 'https://images.pexels.com/photos/4245826/pexels-photo-4245826.jpeg',
    enterEffects: [
        {
            type: EffectType.HEAL,
            strength: 2,
            target: TargetTypes.ANY,
        },
    ],
    comesInTapped: true,
});

const BAMBOO_FOOTBRIDGE = makeAdvancedResourceCard({
    name: 'Bamboo Footbridge',
    resourceType: Resource.BAMBOO,
    imgSrc: 'https://images.pexels.com/photos/4090092/pexels-photo-4090092.jpeg',
    enterEffects: [
        {
            type: EffectType.SUMMON_UNITS,
            strength: 2,
            summonType: Tokens.FROG,
        },
    ],
    comesInTapped: true,
});

const SLAG_FIELDS = makeAdvancedResourceCard({
    name: 'Slag Fields',
    resourceType: Resource.IRON,
    imgSrc: 'https://images.pexels.com/photos/955662/pexels-photo-955662.jpeg',
    enterEffects: [
        {
            type: EffectType.BUFF_HAND_ATTACK,
            strength: 1,
        },
    ],
    comesInTapped: true,
});

const STARGAZERS_POINT = makeAdvancedResourceCard({
    name: "Stargazer's Point",
    resourceType: Resource.CRYSTAL,
    imgSrc: 'https://images.pexels.com/photos/544268/pexels-photo-544268.jpeg',
    enterEffects: [
        {
            type: EffectType.DISCARD_HAND,
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
        {
            type: EffectType.DRAW,
            strength: 1,
        },
    ],
    comesInTapped: true,
});

const HOLY_TEMPLE = makeAdvancedResourceCard({
    name: 'Holy Temple',
    resourceType: Resource.FIRE,
    imgSrc: 'https://images.pexels.com/photos/6710712/pexels-photo-6710712.jpeg',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 1,
            target: TargetTypes.ALL_OPPONENTS,
        },
    ],
    comesInTapped: true,
});

// Set 2
const CHILLY_BERG = makeAdvancedResourceCard({
    name: 'Chilly Berg',
    resourceType: Resource.WATER,
    // https://pixabay.com/photos/iceland-ice-iceberg-sea-ocean-2287537/
    imgSrc: 'https://cdn.pixabay.com/photo/2017/05/05/16/01/iceland-2287537_1280.jpg',
    enterEffects: [
        {
            type: EffectType.BUFF_ATTACK,
            strength: -1,
            target: TargetTypes.OPPOSING_UNIT,
        },
    ],
    comesInTapped: true,
});

const FERTILE_FIELDS = makeAdvancedResourceCard({
    name: 'Fertile Fields',
    resourceType: Resource.BAMBOO,
    // https://pixabay.com/photos/view-landscape-nature-vietnam-2843338/
    imgSrc: 'https://cdn.pixabay.com/photo/2017/10/12/03/03/view-2843338_1280.jpg',
    enterEffects: [
        {
            type: EffectType.LEARN,
            cardName: 'TEA',
            strength: 2,
        },
    ],
    comesInTapped: true,
});

const OLD_FARMHOUSE = makeAdvancedResourceCard({
    name: 'Old Farmhouse',
    resourceType: Resource.IRON,
    imgSrc: 'https://cdn.pixabay.com/photo/2017/01/01/18/24/netherlands-1945177_1280.jpg',
    enterEffects: [
        {
            type: EffectType.BUFF_ATTACK,
            strength: 1,
        },
    ],
    comesInTapped: true,
});

const FOG_POINT = makeAdvancedResourceCard({
    name: 'Fog Point',
    resourceType: Resource.CRYSTAL,
    imgSrc: 'https://cdn.pixabay.com/photo/2017/08/10/17/08/lightning-2625010_1280.jpg',
    enterEffects: [
        {
            type: EffectType.BUFF_MAGIC,
            strength: 1,
            target: TargetTypes.UNIT,
        },
    ],
    comesInTapped: true,
});

const LAVA_RIVER = makeAdvancedResourceCard({
    name: 'Lava River',
    resourceType: Resource.FIRE,
    // https://pixabay.com/illustrations/lava-river-nature-s-wrath-6836437/
    imgSrc: 'https://cdn.pixabay.com/photo/2021/11/30/23/48/lava-river-6836437_1280.jpg',
    enterEffects: [
        {
            type: EffectType.SUMMON_UNITS,
            strength: 1,
            summonType: Tokens.DEMON,
        },
    ],
    comesInTapped: true,
});

const TREACHEROUS_DESERT = makeAdvancedResourceCard({
    name: 'Treacherous Desert',
    resourceType: Resource.GENERIC,
    imgSrc: 'https://images.pexels.com/photos/273935/pexels-photo-273935.jpeg',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 1,
            target: TargetTypes.ALL_PLAYERS,
        },
    ],
});

export const UTILITY_LANDS = {
    BAMBOO_FOOTBRIDGE,
    COASTAL_CASTLE,
    STARGAZERS_POINT,
    SLAG_FIELDS,
    HOLY_TEMPLE,
    CHILLY_BERG,
    FERTILE_FIELDS,
    OLD_FARMHOUSE,
    FOG_POINT,
    LAVA_RIVER,
    TREACHEROUS_DESERT,
};
