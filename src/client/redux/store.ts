import { configureStore } from '@reduxjs/toolkit';
import { userReducer, userSlice } from './user';

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    devTools: true,
    preloadedState: {
        user: userSlice.getInitialState(),
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
