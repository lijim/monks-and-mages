import { CardRarity } from '@/types/cards';

export enum Colors {
    BAMBOO_GREEN = '#136313',
    BUFF_BLUE = '#0096FF',
    COMMON_GREY = '#bdc3c7',
    CRYSTAL_PURPLE = '#684B77',
    DARK_BROWN = '#4a2e15',
    DEBUFF_RED = '#ffc7d7',
    FELT_GREEN = '#247345',
    FELT_GREEN_ALT = '#36ae68',
    FIRE_ORANGE = '#f57322',
    FIRE_ORANGE_EMPHASIZED = '#dc671e',
    FOCUS_BLUE = '#0071bc',
    INVALID_RED = '#c70039',
    IRON_GREY = '#484441',
    // for outlines, accessiblity, showing active player
    // Light grey is perfect for when you want a background white text,
    // but different color emojis to contrast against the background
    LIGHT_GREY = '#666',
    MAROON = '#800000',
    MYTHIC_PURPLE = '#8e44ad',
    NO_COLOR_BROWN = '#5c4d50',
    RARE_BLUE = '#2980b9',
    SECONDARY_GREEN = '#08A946',
    SECONDARY_GREEN_EMPHASIZED = '#057932',
    UNCOMMON_GREEN = '#2ecc71',
    VANTA_BLACK = '#101010', // for text against white
    WATER_BLUE = '#093FBE',
}

export const COLORS_FOR_RARITY: Record<CardRarity, string> = {
    [CardRarity.COMMON]: Colors.COMMON_GREY,
    [CardRarity.UNCOMMON]: Colors.UNCOMMON_GREEN,
    [CardRarity.RARE]: Colors.RARE_BLUE,
    [CardRarity.MYTHIC]: Colors.MYTHIC_PURPLE,
};
