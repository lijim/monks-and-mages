import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { Filters, MatchStrategy } from '@/types/deckBuilder';
import { Resource } from '@/types/resources';

const initialState: Filters = {
    freeText: '',
    resources: [],
    resourceMatchStrategy: MatchStrategy.EXACT,
};

export const deckBuilderFiltersSlice = createSlice({
    name: 'deckBuilderFilters',
    initialState,
    reducers: {
        searchFreeTextFilter(state, action: PayloadAction<string>) {
            state.freeText = action.payload;
        },
        clearFreeTextFilter(state) {
            state.freeText = '';
        },
        toggleResourceFilter(state, action: PayloadAction<Resource>) {
            if (state.resources.indexOf(action.payload) > -1) {
                // deselect the resource
                state.resources = state.resources.filter(
                    (r) => r !== action.payload
                );
                return;
            }
            // select the resource
            state.resources.push(action.payload);
        },
        selectResourceMatchStrategy(
            state,
            action: PayloadAction<MatchStrategy>
        ) {
            state.resourceMatchStrategy = action.payload;
        },
    },
});

export const deckBuilderFiltersReducer: Reducer<Filters> =
    deckBuilderFiltersSlice.reducer;

export const {
    searchFreeTextFilter,
    clearFreeTextFilter,
    toggleResourceFilter,
    selectResourceMatchStrategy,
} = deckBuilderFiltersSlice.actions;
