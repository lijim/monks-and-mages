import {
    SAMPLE_DECKLIST_0,
    SAMPLE_DECKLIST_2,
    SAMPLE_DECKLIST_3,
    SAMPLE_DECKLIST_4,
    SAMPLE_DECKLIST_5,
} from '@/factories/deck';

export const DEFAULT_ROOM_NAMES = [
    'Aardvark Alley 🐜',
    'Beetle Boulevard 🪲',
    'Cobra Castle 🐍',
];

export enum DeckListSelections {
    FARMERS = 'farmers 👩‍🌾',
    MAGES_FIRE = 'mages 🔥',
    MAGES_WATER = 'mages 🌊',
    MAGES_WIND = 'mages 💨',
    MONKS = 'monks 🤺',
}

export const deckListMappings = {
    [DeckListSelections.MONKS]: SAMPLE_DECKLIST_0,
    [DeckListSelections.MAGES_FIRE]: SAMPLE_DECKLIST_2,
    [DeckListSelections.MAGES_WATER]: SAMPLE_DECKLIST_3,
    [DeckListSelections.MAGES_WIND]: SAMPLE_DECKLIST_4,
    [DeckListSelections.FARMERS]: SAMPLE_DECKLIST_5,
};

export const MAX_PLAYER_NAME_LENGTH = 25;

export const MAX_ROOM_NAME_LENGTH = 50;
