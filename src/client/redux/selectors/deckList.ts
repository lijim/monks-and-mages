import { RootState } from '../store';

export const getCurrentSavedDeckName = (state: Partial<RootState>): string =>
    state.deckBuilder.currentSavedDeckName;
