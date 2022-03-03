import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { DetailedRoom } from '@/types';

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState: { rooms: [] as DetailedRoom[] },
    reducers: {
        updateRoomsAndPlayers(state, action: PayloadAction<DetailedRoom[]>) {
            state.rooms = action.payload;
        },
    },
});

export const roomsReducer: Reducer<{ rooms: DetailedRoom[] }> =
    roomsSlice.reducer;

export const { updateRoomsAndPlayers } = roomsSlice.actions;
