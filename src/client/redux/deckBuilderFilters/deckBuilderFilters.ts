import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { Filters, MatchStrategy, ResourceCost } from '@/types/deckBuilder';
import { Resource } from '@/types/resources';
import { CardRarity, UnitType } from '@/types/cards';

const initialState: Filters = {
    freeText: '',
    rarities: [],
    resources: [],
    resourceCosts: [],
    resourceMatchStrategy: MatchStrategy.EXACT,
    unitTypes: [],
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
        toggleResourceCardFilter(state, action: PayloadAction<ResourceCost>) {
            if (state.resourceCosts.includes(action.payload)) {
                // deselect the resource
                state.resourceCosts = state.resourceCosts.filter(
                    (r) => r !== action.payload
                );
                return;
            }
            // select the resource
            state.resourceCosts.push(action.payload);
        },
        toggleResourceFilter(state, action: PayloadAction<Resource>) {
            if (state.resources.includes(action.payload)) {
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
        toggleUnitTypeFilter(state, action: PayloadAction<UnitType>) {
            if (state.unitTypes.includes(action.payload)) {
                // deselect the unit type
                state.unitTypes = state.unitTypes.filter(
                    (r) => r !== action.payload
                );
                return;
            }
            // select the unit type
            state.unitTypes.push(action.payload);
        },
        toggleRarityFilter(state, action: PayloadAction<CardRarity>) {
            if (state.rarities.includes(action.payload)) {
                // deselect the unit type
                state.rarities = state.rarities.filter(
                    (r) => r !== action.payload
                );
                return;
            }
            // select the unit type
            state.rarities.push(action.payload);
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
    toggleUnitTypeFilter,
    toggleRarityFilter,
    toggleResourceCardFilter,
} = deckBuilderFiltersSlice.actions;
