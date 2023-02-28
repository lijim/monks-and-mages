import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { DeckListSelections } from '@/constants/lobbyConstants';
import { Skeleton } from '@/types/cards';
import { SavedDeck } from '@/types/deckBuilder';

type DeckBuilderState = {
    currentSavedDeckName: string;
};

const initialState: DeckBuilderState = {
    currentSavedDeckName: '',
};

export const deckBuilderSlice = createSlice({
    name: 'deckList',
    initialState,
    reducers: {
        chooseSavedDeck(state, action: PayloadAction<SavedDeck>) {
            state.currentSavedDeckName = action.payload.name;
        },
    },
});

export const deckBuilderReducer: Reducer<DeckBuilderState> =
    deckBuilderSlice.reducer;

export const { chooseSavedDeck } = deckBuilderSlice.actions;
