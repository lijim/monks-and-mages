import { Colors } from '@/constants/colors';

export enum Resource {
    BAMBOO = 'Bamboo', // 🎋
    CRYSTAL = 'Crystal', // 🔮 - magic primary resource
    FIRE = 'Fire', // 🔥 - subgenre of magic, also for ranged/soldier
    GENERIC = 'Generic', // can be anything
    IRON = 'Iron', // 🛠️
    WATER = 'Water', // 🌊 - subgenre of magic
}

// ordered by type for casting cost displays
export const ORDERED_RESOURCES = [
    Resource.GENERIC,
    Resource.CRYSTAL,
    Resource.FIRE,
    Resource.WATER,
    Resource.BAMBOO,
    Resource.IRON,
];

type GlossaryEntry = {
    icon: string;
    name: string;
    primaryColor: string;
};

export const RESOURCE_GLOSSARY: Record<Resource, GlossaryEntry> = {
    [Resource.GENERIC]: {
        icon: '⚫',
        name: 'Generic',
        primaryColor: '#050426',
    },
    [Resource.BAMBOO]: { icon: '🎋', name: 'Bamboo', primaryColor: '#136313' },
    [Resource.CRYSTAL]: {
        icon: '🔮',
        name: 'Crystal',
        primaryColor: Colors.CRYSTAL_PURPLE,
    },
    [Resource.FIRE]: {
        icon: '🔥',
        name: 'Fire',
        primaryColor: Colors.FIRE_ORANGE,
    },
    [Resource.IRON]: {
        icon: '🛠️',
        name: 'Iron',
        primaryColor: Colors.IRON_GREY,
    },
    [Resource.WATER]: {
        icon: '🌊',
        name: 'Water',
        primaryColor: Colors.WATER_BLUE,
    },
};
