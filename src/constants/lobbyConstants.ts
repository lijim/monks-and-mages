import {
    ALL_CARDS,
    SAMPLE_DECKLIST_0,
    SAMPLE_DECKLIST_1,
    SAMPLE_DECKLIST_2,
    SAMPLE_DECKLIST_3,
    SAMPLE_DECKLIST_4,
    SAMPLE_DECKLIST_5,
    SAMPLE_DECKLIST_6,
    SAMPLE_DECKLIST_7,
    SAMPLE_DECKLIST_8,
    SAMPLE_DECKLIST_9,
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
    MAGES_FIRE = 'Mages 🔥',
    MAGES_WATER = 'Mages 🌊',
    MAGES_WIND = 'Mages 💨',
    MONKS = 'Monks 🤺',
    RANDOM = 'Random ⁉️',
    SORCERORS = 'Sorcerors 🧙🏾‍♀️',
}

export const PREMADE_DECKLIST_DEFAULT = DeckListSelections.MONKS;

export const deckListMappings: Record<DeckListSelections, DeckList> = {
    [DeckListSelections.CANNONEER]: SAMPLE_DECKLIST_9,
    [DeckListSelections.DIVERS]: SAMPLE_DECKLIST_8,
    [DeckListSelections.GENIES]: SAMPLE_DECKLIST_6,
    [DeckListSelections.MONKS]: SAMPLE_DECKLIST_0,
    [DeckListSelections.MAGES_FIRE]: SAMPLE_DECKLIST_2,
    [DeckListSelections.MAGES_WATER]: SAMPLE_DECKLIST_3,
    [DeckListSelections.MAGES_WIND]: SAMPLE_DECKLIST_4,
    [DeckListSelections.FARMERS]: SAMPLE_DECKLIST_5,
    [DeckListSelections.RANDOM]: SAMPLE_DECKLIST_1,
    [DeckListSelections.SORCERORS]: ALL_CARDS,
};

export const MAX_PLAYER_NAME_LENGTH = 25;

export const MAX_ROOM_NAME_LENGTH = 50;
