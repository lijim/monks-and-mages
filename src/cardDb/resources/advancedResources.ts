import { CardType, ResourceCard } from '@/types/cards';
import { EffectType, TargetTypes } from '@/types/effects';
import { Resource } from '@/types/resources';

export const makeAdvancedResourceCard = (
    params: Omit<ResourceCard, 'cardType' | 'isUsed' | 'isAdvanced'>
): ResourceCard => ({
    cardType: CardType.RESOURCE,
    isAdvanced: true,
    isUsed: false,
    ...params,
});

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

export const AdvancedResourceCards = {
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
};
