import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';

import { User } from '@/types/user';

export const userSlice = createSlice({
    name: 'user',
    initialState: {} as User,
    reducers: {
        initializeUser(state: User, action: PayloadAction<{ id: string }>) {
            state.id = action.payload.id;
            state.isDisconnected = false;
        },
        disconnectUser(state: User) {
            state.auth0Id = undefined;
            state.id = undefined;
            state.name = undefined;
            state.isDisconnected = true;
        },
        chooseName(state: User, action: PayloadAction<{ name: string }>) {
            state.name = action.payload.name;
        },
        confirmAuth0Id(
            state: User,
            action: PayloadAction<{ auth0Id: string }>
        ) {
            state.auth0Id = action.payload.auth0Id;
        },
    },
});

export const userReducer: Reducer<User> = userSlice.reducer;

export const { disconnectUser, initializeUser, chooseName, confirmAuth0Id } =
    userSlice.actions;
