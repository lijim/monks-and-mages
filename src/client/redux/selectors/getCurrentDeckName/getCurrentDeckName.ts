import { PREMADE_DECKLIST_DEFAULT } from '@/constants/lobbyConstants';
import { RootState } from '../../store';

export const getCurrentDeckName = (state: Partial<RootState>): string => {
    if (state.deckList.customDeckList) {
        return state.deckBuilder?.currentSavedDeckName || 'Custom Deck';
    }
    return state.deckList?.premadeDecklist || PREMADE_DECKLIST_DEFAULT;
};
