import { DeckListSelections } from '@/constants/lobbyConstants';
import { RootState } from '../../store';
import { getPremadeDeckList } from './getPremadeDeckList';

describe('Get premade decklist', () => {
    it('returns the premade decklist', () => {
        const state: Partial<RootState> = {
            deckList: {
                premadeDecklist: DeckListSelections.SORCERORS,
            },
        };

        expect(getPremadeDeckList(state)).toEqual(DeckListSelections.SORCERORS);
    });
});
