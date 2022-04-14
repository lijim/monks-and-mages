import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { DeckListSelections } from '@/constants/lobbyConstants';
import { Skeleton } from '@/types/cards';

type DeckListState = {
    customDeckList?: Skeleton;
    premadeDecklist: DeckListSelections;
};

const initialState: DeckListState = {
    customDeckList: null,
    premadeDecklist: DeckListSelections.MONKS,
};

export const deckListSlice = createSlice({
    name: 'deckList',
    initialState,
    reducers: {
        confirmCustomDeckList(state, action: PayloadAction<Skeleton>) {
            state.customDeckList = action.payload;
        },
        confirmPremadeDecklist(
            state,
            action: PayloadAction<DeckListSelections>
        ) {
            state.premadeDecklist = action.payload;
        },
    },
});

export const deckListReducer: Reducer<DeckListState> = deckListSlice.reducer;

export const { confirmCustomDeckList, confirmPremadeDecklist } =
    deckListSlice.actions;
