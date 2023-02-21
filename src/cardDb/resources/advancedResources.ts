import { makeAdvancedResourceCard } from '@/factories/cards';
import { EffectType, TargetTypes } from '@/types/effects';
import { Resource } from '@/types/resources';
import { UTILITY_LANDS } from './utilityLands';

// Duals - self ping duals
const STRATOVOLCANO = makeAdvancedResourceCard({
    artistName: 'Clive Kim',
    artistUrl: 'https://www.pexels.com/@clive-kim-2523249/',
    originalImagePage:
        'https://www.pexels.com/photo/volcano-erupting-at-night-under-starry-sky-4220967/',
    name: 'Stratovolcano',
    resourceType: Resource.CRYSTAL,
    secondaryResourceType: Resource.FIRE,
    imgSrc: 'images/resources/stratovolcano.avif', // https://www.pexels.com/photo/volcano-erupting-at-night-under-starry-sky-4220967/
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 2,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
});

const SEASIDE_COVE = makeAdvancedResourceCard({
    artistName: 'Luke Barky',
    artistUrl: 'https://www.pexels.com/@lukebarky/',
    originalImagePage:
        'https://www.pexels.com/photo/a-city-built-between-the-mountain-and-the-sea-2899726/',
    name: 'Seaside Cove',
    resourceType: Resource.CRYSTAL,
    secondaryResourceType: Resource.WATER,
    imgSrc: 'images/resources/seaside-cove.avif', // https://www.pexels.com/photo/a-city-built-between-the-mountain-and-the-sea-2899726/
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 2,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
});

const BLACK_MARSH = makeAdvancedResourceCard({
    artistName: 'Nico Becker',
    artistUrl: 'https://www.pexels.com/@nicobecker/',
    originalImagePage:
        'https://www.pexels.com/photo/remote-cold-seashore-with-houses-at-mountains-5618266/',
    name: 'Black Marsh',
    resourceType: Resource.CRYSTAL,
    secondaryResourceType: Resource.BAMBOO,
    imgSrc: 'https://images.pexels.com/photos/5618266/pexels-photo-5618266.jpeg',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 2,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
});

const SAHARAN_DESERT = makeAdvancedResourceCard({
    artistName: 'Tomáš Malík',
    artistUrl: 'https://www.pexels.com/@tomas-malik-793526/',
    originalImagePage:
        'https://www.pexels.com/photo/people-sitting-in-front-of-bonfire-in-desert-during-nighttime-1703314/',
    name: 'Saharan Desert',
    resourceType: Resource.CRYSTAL,
    secondaryResourceType: Resource.IRON,
    imgSrc: 'images/resources/saharan-desert.avif',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 2,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
});

const CLOUD_HAVEN = makeAdvancedResourceCard({
    artistName: 'Kien Virak',
    artistUrl: 'https://www.pexels.com/@kienvirak/',
    originalImagePage:
        'https://www.pexels.com/photo/beautiful-sunset-above-sea-with-calm-waves-5823989/',
    name: 'Cloud Haven',
    resourceType: Resource.FIRE,
    secondaryResourceType: Resource.WATER,
    imgSrc: 'https://images.pexels.com/photos/5823989/pexels-photo-5823989.jpeg',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 2,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
});

const DRAGONS_NEST = makeAdvancedResourceCard({
    artistName: 'Pixabay',
    artistUrl: 'https://www.pexels.com/@pixabay',
    originalImagePage:
        'https://www.pexels.com/photo/ancient-architecture-buddhism-building-356653/',
    name: "Dragon's Nest",
    resourceType: Resource.FIRE,
    secondaryResourceType: Resource.BAMBOO,
    imgSrc: 'https://images.pexels.com/photos/356653/pexels-photo-356653.jpeg',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 2,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
});

const SMELTING_FORGE = makeAdvancedResourceCard({
    artistName: 'Kateryna Babaieva',
    artistUrl: 'https://www.pexels.com/@kateryna-babaieva-1423213/',
    originalImagePage:
        'https://www.pexels.com/photo/silhouette-of-man-in-helmet-standing-near-steel-melting-pool-3736111/',
    name: 'Smelting Forge',
    resourceType: Resource.FIRE,
    secondaryResourceType: Resource.IRON,
    imgSrc: 'images/resources/smelting-forge.avif',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 2,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
});

const LUSH_REEF = makeAdvancedResourceCard({
    artistName: 'Francesco Ungaro',
    artistUrl: 'https://www.pexels.com/@francesco-ungaro/',
    originalImagePage:
        'https://www.pexels.com/photo/school-of-fish-near-coral-reefs-3723505/',
    name: 'Lush Reef',
    resourceType: Resource.WATER,
    secondaryResourceType: Resource.BAMBOO,
    imgSrc: 'images/resources/lush-reef.avif', // https://www.pexels.com/photo/school-of-fish-near-coral-reefs-3723505/
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 2,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
});

const HARBOR_TOWN = makeAdvancedResourceCard({
    artistName: 'Samir Belhamra',
    artistUrl: 'https://www.pexels.com/@grafixartphoto/',
    originalImagePage:
        'https://www.pexels.com/photo/breathtaking-seascape-with-amazing-coastal-village-on-cliff-4254555/',
    name: 'Harbor Town',
    resourceType: Resource.WATER,
    secondaryResourceType: Resource.IRON,
    imgSrc: 'https://images.pexels.com/photos/4254555/pexels-photo-4254555.jpeg',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 2,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
});

const TANGLED_RUINS = makeAdvancedResourceCard({
    artistName: 'Los Muertos Crew',
    artistUrl: 'https://www.pexels.com/@cristian-rojas/',
    originalImagePage:
        'https://www.pexels.com/photo/wood-landscape-art-building-7205915/',
    name: 'Tangled Ruins',
    resourceType: Resource.BAMBOO,
    secondaryResourceType: Resource.IRON,
    imgSrc: 'images/resources/tangled-ruins.avif',
    enterEffects: [
        {
            type: EffectType.DEAL_DAMAGE,
            strength: 2,
            target: TargetTypes.SELF_PLAYER,
        },
    ],
});

// Duals, heal lands
const LONE_TOWER = makeAdvancedResourceCard({
    artistName: 'Marcell Pálmai',
    artistUrl: 'https://www.pexels.com/@marcell-palmai-136439112/',
    originalImagePage:
        'https://www.pexels.com/photo/silhouette-of-observation-tower-on-starry-night-sky-11838430/',
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
    artistName: 'Tobias Bjørkli',
    artistUrl: 'https://www.pexels.com/@tobiasbjorkli/',
    originalImagePage:
        'https://www.pexels.com/photo/mountain-beside-body-of-water-with-aurora-borealis-2113566/',
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
    artistName: 'Tobias Bjørkli',
    artistUrl: 'https://www.pexels.com/@tobiasbjorkli/',
    originalImagePage:
        'https://www.pexels.com/photo/trees-under-milky-way-1327786/',
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
    artistName: 'Nouman Younas',
    artistUrl: 'https://unsplash.com/photos/TM4522xcNRs',
    originalImagePage: 'https://unsplash.com/photos/TM4522xcNRs',
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
    artistName: 'Johannes Plenio',
    artistUrl: 'https://www.pexels.com/@jplenio/',
    originalImagePage:
        'https://www.pexels.com/photo/island-during-golden-hour-and-upcoming-storm-1118873/',
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
    artistName: 'Pixabay',
    artistUrl: 'https://www.pexels.com/@pixabay',
    originalImagePage: 'https://www.pexels.com/photo/tree-on-forest-158738/',
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
    artistName: 'Pixabay',
    artistUrl: 'https://www.pexels.com/@pixabay',
    originalImagePage:
        'https://www.pexels.com/photo/ancient-architecture-asia-buddhism-460376/',
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
    artistName: 'Pixabay',
    artistUrl: 'https://www.pexels.com/@pixabay',
    originalImagePage:
        'https://www.pexels.com/photo/beige-temple-reflecting-on-body-of-water-415708/',
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
    artistName: 'Rachel Claire',
    artistUrl: 'https://www.pexels.com/@rachel-claire/',
    originalImagePage:
        'https://www.pexels.com/photo/old-stone-building-near-water-4577642/',
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
    artistName: 'Zhu Peng',
    artistUrl: 'https://www.pexels.com/@jupen/',
    originalImagePage:
        'https://www.pexels.com/photo/closeup-photo-of-brown-and-black-wooden-houses-digital-wallpaper-734102/',
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
    ...UTILITY_LANDS,
};
export { makeAdvancedResourceCard } from '@/factories/cards';
