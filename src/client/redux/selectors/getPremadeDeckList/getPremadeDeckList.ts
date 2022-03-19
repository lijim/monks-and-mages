import { DeckListSelections } from '@/constants/lobbyConstants';
import { RootState } from '../../store';

export const getPremadeDeckList = (
    state: Partial<RootState>
): DeckListSelections | undefined => {
    return state.deckList?.premadeDecklist;
};
