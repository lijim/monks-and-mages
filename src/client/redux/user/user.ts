import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';

import { User } from '@/types/user';

export const userSlice = createSlice({
    name: 'user',
    initialState: {} as User,
    reducers: {
        initializeUser(state, action: PayloadAction<{ id: string }>) {
            state.id = action.payload.id;
            state.isDisconnected = false;
        },
        disconnectUser(state) {
            state.id = undefined;
            state.name = undefined;
            state.isDisconnected = true;
        },
        chooseName(state, action: PayloadAction<{ name: string }>) {
            state.name = action.payload.name;
        },
    },
});

export const userReducer: Reducer<User> = userSlice.reducer;

export const { disconnectUser, initializeUser, chooseName } = userSlice.actions;
