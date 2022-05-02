import { CardType, ResourceCard } from '@/types/cards';
import { EffectType, TargetTypes } from '@/types/effects';
import { Resource } from '@/types/resources';
import { Tokens } from '../units';

export const makeAdvancedResourceCard = (
    params: Omit<ResourceCard, 'cardType' | 'isUsed' | 'isAdvanced'>
): ResourceCard => ({
    cardType: CardType.RESOURCE,
    isAdvanced: true,
    isUsed: false,
    ...params,
});

// Duals - self ping duals
const STRATOVOLCANO = makeAdvancedResourceCard({
    name: 'Stratovolcano',
    resourceType: Resource.CRYSTAL,
    secondaryResourceType: Resource.FIRE,
    imgSrc: 'images/resources/stratovolcano.avif', // https://www.pexels.com/photo/volcano-erupting-at-night-under-starry-sky-4220967/
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
});

const SEASIDE_COVE = makeAdvancedResourceCard({
    name: 'Seaside Cove',
    resourceType: Resource.CRYSTAL,
    secondaryResourceType: Resource.WATER,
    imgSrc: 'images/resources/seaside-cove.avif', // https://www.pexels.com/photo/a-city-built-between-the-mountain-and-the-sea-2899726/
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
});

const BLACK_MARSH = makeAdvancedResourceCard({
    name: 'Black Marsh',
    resourceType: Resource.CRYSTAL,
    secondaryResourceType: Resource.BAMBOO,
    imgSrc: 'https://images.pexels.com/photos/5618266/pexels-photo-5618266.jpeg',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
});

const SAHARAN_DESERT = makeAdvancedResourceCard({
    name: 'Saharan Desert',
    resourceType: Resource.CRYSTAL,
    secondaryResourceType: Resource.IRON,
    imgSrc: 'images/resources/saharan-desert.avif', // https://www.pexels.com/photo/people-sitting-in-front-of-bonfire-in-desert-during-nighttime-1703314/
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
});

const CLOUD_HAVEN = makeAdvancedResourceCard({
    name: 'Cloud Haven',
    resourceType: Resource.FIRE,
    secondaryResourceType: Resource.WATER,
    imgSrc: 'https://images.pexels.com/photos/5823989/pexels-photo-5823989.jpeg',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
});

const DRAGONS_NEST = makeAdvancedResourceCard({
    name: "Dragon's Nest",
    resourceType: Resource.FIRE,
    secondaryResourceType: Resource.BAMBOO,
    imgSrc: 'https://images.pexels.com/photos/356653/pexels-photo-356653.jpeg',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
});

const SMELTING_FORGE = makeAdvancedResourceCard({
    name: 'Smelting Forge',
    resourceType: Resource.FIRE,
    secondaryResourceType: Resource.IRON,
    imgSrc: 'images/resources/smelting-forge.avif', // https://www.pexels.com/photo/silhouette-of-man-in-helmet-standing-near-steel-melting-pool-3736111/
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
});

const LUSH_REEF = makeAdvancedResourceCard({
    name: 'Lush Reef',
    resourceType: Resource.WATER,
    secondaryResourceType: Resource.BAMBOO,
    imgSrc: 'images/resources/lush-reef.avif', // https://www.pexels.com/photo/school-of-fish-near-coral-reefs-3723505/
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
});

const HARBOR_TOWN = makeAdvancedResourceCard({
    name: 'Harbor Town',
    resourceType: Resource.WATER,
    secondaryResourceType: Resource.IRON,
    imgSrc: 'https://images.pexels.com/photos/4254555/pexels-photo-4254555.jpeg',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
});

const TANGLED_RUINS = makeAdvancedResourceCard({
    name: 'Tangled Ruins',
    resourceType: Resource.BAMBOO,
    secondaryResourceType: Resource.IRON,
    imgSrc: 'images/resources/tangled-ruins.avif', // https://www.pexels.com/photo/wood-landscape-art-building-7205915/
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
});

// Duals, heal lands
const LONE_TOWER = makeAdvancedResourceCard({
    name: 'Lone Tower',
    resourceType: Resource.CRYSTAL,
    secondaryResourceType: Resource.FIRE,
    imgSrc: 'https://images.pexels.com/photos/11838430/pexels-photo-11838430.jpeg',
    enterEffects: [
        {
            type: EffectType.HEAL,
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
    comesInTapped: true,
});

const MYSTIFYING_LAKE = makeAdvancedResourceCard({
    name: 'Mystifying Lake',
    resourceType: Resource.CRYSTAL,
    secondaryResourceType: Resource.WATER,
    imgSrc: 'https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg',
    enterEffects: [
        {
            type: EffectType.HEAL,
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
    comesInTapped: true,
});

const UNPERTURBED_CAMPGROUNDS = makeAdvancedResourceCard({
    name: 'Unperturbed Campgrounds',
    resourceType: Resource.CRYSTAL,
    secondaryResourceType: Resource.BAMBOO,
    imgSrc: 'https://images.pexels.com/photos/1327786/pexels-photo-1327786.jpeg',
    enterEffects: [
        {
            type: EffectType.HEAL,
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
    comesInTapped: true,
});

const DIVINE_PALACE = makeAdvancedResourceCard({
    name: 'Divine Palace',
    resourceType: Resource.CRYSTAL,
    secondaryResourceType: Resource.IRON,
    imgSrc: 'https://images.unsplash.com/photo-1531213203257-16afb0eac95e',
    enterEffects: [
        {
            type: EffectType.HEAL,
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
    comesInTapped: true,
});

const TROUBLED_PARADISE = makeAdvancedResourceCard({
    name: 'Troubled Paradise',
    resourceType: Resource.FIRE,
    secondaryResourceType: Resource.WATER,
    imgSrc: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg',
    enterEffects: [
        {
            type: EffectType.HEAL,
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
    comesInTapped: true,
});

const HEALING_PLAINS = makeAdvancedResourceCard({
    name: 'Healing Plains',
    resourceType: Resource.FIRE,
    secondaryResourceType: Resource.BAMBOO,
    imgSrc: 'https://images.pexels.com/photos/158738/tree-black-hope-outdoor-158738.jpeg',
    enterEffects: [
        {
            type: EffectType.HEAL,
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
    comesInTapped: true,
});

const ORNATE_TEMPLE = makeAdvancedResourceCard({
    name: 'Ornate Temple',
    resourceType: Resource.FIRE,
    secondaryResourceType: Resource.IRON,
    imgSrc: 'https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg',
    enterEffects: [
        {
            type: EffectType.HEAL,
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
    comesInTapped: true,
});

const ROYAL_RESIDENCE = makeAdvancedResourceCard({
    name: 'Royal Residence',
    resourceType: Resource.WATER,
    secondaryResourceType: Resource.BAMBOO,
    imgSrc: 'https://images.pexels.com/photos/415708/pexels-photo-415708.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
    enterEffects: [
        {
            type: EffectType.HEAL,
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
    comesInTapped: true,
});

const CITY_CANALS = makeAdvancedResourceCard({
    name: 'City Canals',
    resourceType: Resource.WATER,
    secondaryResourceType: Resource.IRON,
    imgSrc: 'https://images.pexels.com/photos/4577642/pexels-photo-4577642.jpeg',
    enterEffects: [
        {
            type: EffectType.HEAL,
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
    comesInTapped: true,
});

const PREFECTURE_CAPITAL = makeAdvancedResourceCard({
    name: 'Prefecture Capital',
    resourceType: Resource.BAMBOO,
    secondaryResourceType: Resource.IRON,
    imgSrc: 'https://images.pexels.com/photos/734102/pexels-photo-734102.jpeg',
    enterEffects: [
        {
            type: EffectType.HEAL,
            strength: 1,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
    comesInTapped: true,
});

// Utility lands
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

export const AdvancedResourceCards = {
    // Duals - pain
    STRATOVOLCANO,
    SEASIDE_COVE,
    BLACK_MARSH,
    SAHARAN_DESERT,
    CLOUD_HAVEN,
    DRAGONS_NEST,
    SMELTING_FORGE,
    LUSH_REEF,
    HARBOR_TOWN,
    TANGLED_RUINS,
    COASTAL_CASTLE,
    // Duals - heal
    LONE_TOWER,
    MYSTIFYING_LAKE,
    UNPERTURBED_CAMPGROUNDS,
    DIVINE_PALACE,
    TROUBLED_PARADISE,
    HEALING_PLAINS,
    ORNATE_TEMPLE,
    ROYAL_RESIDENCE,
    CITY_CANALS,
    PREFECTURE_CAPITAL,
    // Utility - mono
    BAMBOO_FOOTBRIDGE,
    STARGAZERS_POINT,
    SLAG_FIELDS,
    HOLY_TEMPLE,
    TREACHEROUS_DESERT,
};
