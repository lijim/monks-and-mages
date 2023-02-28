import { DeckList } from '@/types/cards';
import { RootState } from '../store';

export const getCurrentSavedDeckName = (state: Partial<RootState>): string =>
    state.deckBuilder.currentSavedDeckName;

export const getCurrentSavedDeckId = (state: Partial<RootState>): string =>
    state.deckBuilder.currentSavedDeckId;

export const getDeckList = (state: Partial<RootState>): DeckList =>
    state.deckBuilder.decklist;
