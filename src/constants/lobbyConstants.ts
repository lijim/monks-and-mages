import {
    MONKS_DECKLIST,
    SAMPLE_DECKLIST_1,
    FIRE_MAGES_DECKLIST,
    WATER_MAGES_DECKLIST,
    WIND_MAGES_DECKLIST,
    FARMERS_DECKLIST,
    GENIES_DECKLIST,
    SORCERORS_DECKLIST,
    DIVERS_DECKLIST,
    CANNONEERS_DECKLIST,
    PIRATES_DECKLIST,
} from '@/constants/deckLists';
import { DeckList } from '@/types/cards';

export const DEFAULT_ROOM_NAMES = [
    'Aardvark Alley 🐜',
    'Beetle Boulevard 🪲',
    'Cobra Castle 🐍',
];

export enum DeckListSelections {
    CANNONEER = 'Cannoneers 🧨',
    DIVERS = 'Divers 🤿',
    FARMERS = 'Farmers 👩‍🌾',
    GENIES = 'Genies 🧞‍♀️',
    MAGES_FIRE = 'Fire Mages 🔥',
    MAGES_WATER = 'Water Mages 🌊',
    MAGES_WIND = 'Wind Mages 💨',
    MONKS = 'Monks 🤺',
    PIRATES = 'Pirates 🏴‍☠️',
    RANDOM = 'Random ⁉️',
    SORCERORS = 'Sorcerors 🧙🏾‍♀️',
}

export const PREMADE_DECKLIST_DEFAULT = DeckListSelections.MONKS;

export const deckListMappings: Record<DeckListSelections, DeckList> = {
    [DeckListSelections.CANNONEER]: CANNONEERS_DECKLIST,
    [DeckListSelections.DIVERS]: DIVERS_DECKLIST,
    [DeckListSelections.GENIES]: GENIES_DECKLIST,
    [DeckListSelections.MONKS]: MONKS_DECKLIST,
    [DeckListSelections.MAGES_FIRE]: FIRE_MAGES_DECKLIST,
    [DeckListSelections.MAGES_WATER]: WATER_MAGES_DECKLIST,
    [DeckListSelections.MAGES_WIND]: WIND_MAGES_DECKLIST,
    [DeckListSelections.FARMERS]: FARMERS_DECKLIST,
    [DeckListSelections.RANDOM]: SAMPLE_DECKLIST_1,
    [DeckListSelections.SORCERORS]: SORCERORS_DECKLIST,
    [DeckListSelections.PIRATES]: PIRATES_DECKLIST,
};

export const MAX_PLAYER_NAME_LENGTH = 25;

export const MAX_ROOM_NAME_LENGTH = 50;

// needs to be greater than 20 so no user can ever choose this with auth0
export const GUEST_NAME_PREFIX = 'Guest - ';
