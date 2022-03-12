import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { DetailedRoom } from '@/types';

export const lobbySlice = createSlice({
    name: 'lobby',
    initialState: { rooms: [] as DetailedRoom[] },
    reducers: {
        updateRoomsAndPlayers(state, action: PayloadAction<DetailedRoom[]>) {
            state.rooms = action.payload;
        },
    },
});

export const lobbyReducer: Reducer<{ rooms: DetailedRoom[] }> =
    lobbySlice.reducer;

export const { updateRoomsAndPlayers } = lobbySlice.actions;
