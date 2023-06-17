import { makeAdvancedResourceCard } from '@/factories/cards';
import { EffectType, TargetTypes } from '@/types/effects';
import { Resource } from '@/types/resources';
import { Tokens } from '../units';
import { CardRarity } from '@/types/cards';

// Set 1
const COASTAL_CASTLE = makeAdvancedResourceCard({
    artistName: 'Riccardo Bertolo',
    artistUrl: 'https://www.pexels.com/@riccardo-bertolo-2587816/',
    originalImagePage:
        'https://www.pexels.com/photo/blue-sea-under-blue-sky-4245826/',
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
    rarity: CardRarity.COMMON,
});

const BAMBOO_FOOTBRIDGE = makeAdvancedResourceCard({
    artistName: 'Tomáš Malík',
    artistUrl: 'https://www.pexels.com/@tomas-malik-793526/',
    originalImagePage:
        'https://www.pexels.com/photo/bamboo-path-in-agricultural-field-on-overcast-day-4090092/',
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
    rarity: CardRarity.COMMON,
});

const SLAG_FIELDS = makeAdvancedResourceCard({
    artistName: 'Torsten Kellermann',
    artistUrl: 'https://www.pexels.com/@torsten-kellermann-349167/',
    originalImagePage: 'https://www.pexels.com/photo/white-clouds-955662/',
    name: 'Slag Fields',
    resourceType: Resource.IRON,
    imgSrc: 'https://images.pexels.com/photos/955662/pexels-photo-955662.jpeg',
    enterEffects: [
        {
            type: EffectType.BUFF_HAND_NON_MAGIC_ATTACK,
            strength: 1,
        },
    ],
    comesInTapped: true,
    rarity: CardRarity.COMMON,
});

const STARGAZERS_POINT = makeAdvancedResourceCard({
    artistName: 'Luck Galindo',
    artistUrl: 'https://www.pexels.com/@luck47/',
    originalImagePage:
        'https://www.pexels.com/photo/view-of-countryside-under-evening-purple-sky-544268/',
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
    rarity: CardRarity.COMMON,
});

const HOLY_TEMPLE = makeAdvancedResourceCard({
    artistName: 'Quang Nguyen Vinh',
    artistUrl: 'https://www.pexels.com/@quang-nguyen-vinh-222549/',
    originalImagePage:
        'https://www.pexels.com/photo/asian-woman-with-candle-praying-near-temple-6710712/',
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
    rarity: CardRarity.COMMON,
});

// Set 2
const CHILLY_BERG = makeAdvancedResourceCard({
    artistName: 'Unknown',
    artistUrl: 'https://pixabay.com/users/12019-12019/',
    originalImagePage:
        'https://pixabay.com/photos/iceland-ice-iceberg-sea-ocean-2287537/',
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
    rarity: CardRarity.COMMON,
});

const FERTILE_FIELDS = makeAdvancedResourceCard({
    artistName: 'ThuyHaBich',
    artistUrl: 'https://pixabay.com/users/thuyhabich-6663646/',
    originalImagePage:
        'https://pixabay.com/photos/view-landscape-nature-vietnam-2843338/',
    name: 'Fertile Fields',
    resourceType: Resource.BAMBOO,
    imgSrc: 'https://cdn.pixabay.com/photo/2017/10/12/03/03/view-2843338_1280.jpg',
    enterEffects: [
        {
            type: EffectType.LEARN,
            cardName: 'TEA',
            strength: 2,
        },
    ],
    comesInTapped: true,
    rarity: CardRarity.COMMON,
});

const OLD_FARMHOUSE = makeAdvancedResourceCard({
    artistName: 'Walkerssk',
    artistUrl: 'https://pixabay.com/users/walkerssk-1409366/',
    originalImagePage:
        'https://pixabay.com/photos/netherlands-dutch-windmill-windmill-1945177/',
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
    rarity: CardRarity.COMMON,
});

const FOG_POINT = makeAdvancedResourceCard({
    artistName: 'StockSnap',
    artistUrl: 'https://pixabay.com/users/stocksnap-894430/',
    originalImagePage:
        'https://pixabay.com/photos/lightning-purple-sky-lilac-sky-2625010/',
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
    rarity: CardRarity.COMMON,
});

const LAVA_RIVER = makeAdvancedResourceCard({
    artistName: 'Alex Prado',
    artistUrl: 'https://pixabay.com/users/alex-prado-16797723/',
    originalImagePage:
        'https://pixabay.com/illustrations/lava-river-nature-s-wrath-6836437/',
    name: 'Lava River',
    resourceType: Resource.FIRE,
    //
    imgSrc: 'https://cdn.pixabay.com/photo/2021/11/30/23/48/lava-river-6836437_1280.jpg',
    enterEffects: [
        {
            type: EffectType.SUMMON_UNITS,
            strength: 1,
            summonType: Tokens.DEMON,
        },
    ],
    comesInTapped: true,
    rarity: CardRarity.COMMON,
});

const TREACHEROUS_DESERT = makeAdvancedResourceCard({
    artistName: 'Pixabay',
    artistUrl: 'https://www.pexels.com/@pixabay',
    originalImagePage: 'https://www.pexels.com/photo/brown-dessert-273935/',
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
    rarity: CardRarity.COMMON,
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
