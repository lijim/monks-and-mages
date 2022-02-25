import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { applyMiddleware } from 'redux';

import { userReducer, userSlice } from './user';

const { createReduxHistory, routerMiddleware, routerReducer } =
    createReduxHistoryContext({
        history: createBrowserHistory(),
    });

const createRootReducer = () =>
    combineReducers({
        router: routerReducer,
        user: userReducer,
    });

export const store = configureStore({
    reducer: createRootReducer(),
    devTools: true,
    enhancers: [applyMiddleware(routerMiddleware)],
    preloadedState: {
        user: userSlice.getInitialState(),
    },
});
export const history = createReduxHistory(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
