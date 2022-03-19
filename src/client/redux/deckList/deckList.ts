import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { DetailedRoom } from '@/types';
import { DeckListSelections } from '@/constants/lobbyConstants';

type DeckListState = {
    premadeDecklist: DeckListSelections;
};

const initialState: DeckListState = {
    premadeDecklist: DeckListSelections.MONKS,
};

export const deckListSlice = createSlice({
    name: 'deckList',
    initialState,
    reducers: {
        confirmPremadeDecklist(
            state,
            action: PayloadAction<DeckListSelections>
        ) {
            state.premadeDecklist = action.payload;
        },
    },
});

export const deckListReducer: Reducer<DeckListState> = deckListSlice.reducer;

export const { confirmPremadeDecklist } = deckListSlice.actions;
