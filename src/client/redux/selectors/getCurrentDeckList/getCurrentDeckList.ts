import {
    DECKLIST_MAPPINGS,
    PREMADE_DECKLIST_DEFAULT,
} from '@/constants/lobbyConstants';
import { RootState } from '../../store';
import { DeckList } from '@/types/cards';
import { getDeckListFromSkeleton } from '@/transformers';

export const getCurrentDeckList = (state: Partial<RootState>): DeckList => {
    if (state.deckList.customDeckList) {
        const { decklist, errors } = getDeckListFromSkeleton(
            state.deckList.customDeckList
        );
        if (errors.length === 0) {
            return decklist;
        }
    }
    return DECKLIST_MAPPINGS[
        state.deckList?.premadeDecklist || PREMADE_DECKLIST_DEFAULT
    ];
};
