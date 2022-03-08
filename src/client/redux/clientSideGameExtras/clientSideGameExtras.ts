import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';

/**
 * Client-side held only game information, to store multiple things like:
 * - the attacking unit
 */
interface ClientSideGameExtras {
    attackingUnit?: string; // cardId
}

export const clientSideGameExtrasSlice = createSlice({
    name: 'clientSideExtras',
    initialState: { attackingUnit: undefined },
    reducers: {
        selectAttackingUnit(state, action: PayloadAction<string>) {
            state.attackingUnit = action.payload;
        },
        passTurn(state) {
            state.attackingUnit = undefined;
        },
        performAttack(state) {
            state.attackingUnit = undefined;
        },
    },
});

export const clientSideGameExtrasReducer: Reducer<ClientSideGameExtras> =
    clientSideGameExtrasSlice.reducer;

export const { selectAttackingUnit, passTurn, performAttack } =
    clientSideGameExtrasSlice.actions;
