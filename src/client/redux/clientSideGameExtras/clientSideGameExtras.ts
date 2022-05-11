import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { Card } from '@/types/cards';

/**
 * Client-side held only game information, to store multiple things like:
 * - the attacking unit
 */
interface ClientSideGameExtras {
    attackingUnit?: string; // cardId
    lastPlayedCards?: Card[];
}

const NUM_LAST_PLAYED_CARDS = 20;

export const clientSideGameExtrasSlice = createSlice({
    name: 'clientSideExtras',
    initialState: { attackingUnit: undefined, lastPlayedCards: [] },
    reducers: {
        receiveLastPlayedCard(state, action: PayloadAction<Card>) {
            state.lastPlayedCards = [
                ...state.lastPlayedCards,
                action.payload,
            ].splice(-NUM_LAST_PLAYED_CARDS);
        },
        startGame(state) {
            state.attackingUnit = undefined;
            state.lastPlayedCards = [];
        },
        selectAttackingUnit(state, action: PayloadAction<string>) {
            state.attackingUnit = action.payload;
        },
        cancelAttackingUnit(state) {
            state.attackingUnit = undefined;
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

export const {
    selectAttackingUnit,
    cancelAttackingUnit,
    passTurn,
    performAttack,
    receiveLastPlayedCard,
    startGame,
} = clientSideGameExtrasSlice.actions;
