import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { DetailedRoom } from '@/types';
import { GameResult } from '@/types/games';

export const lobbySlice = createSlice({
    name: 'lobby',
    initialState: {
        rooms: [] as DetailedRoom[],
        latestGameResults: [] as GameResult[],
    },
    reducers: {
        updateLatestGameResults(state, action: PayloadAction<GameResult[]>) {
            state.latestGameResults = action.payload;
        },
        updateRoomsAndPlayers(state, action: PayloadAction<DetailedRoom[]>) {
            state.rooms = action.payload;
        },
    },
});

export const lobbyReducer: Reducer<{
    latestGameResults: GameResult[];
    rooms: DetailedRoom[];
}> = lobbySlice.reducer;

export const { updateLatestGameResults, updateRoomsAndPlayers } =
    lobbySlice.actions;
