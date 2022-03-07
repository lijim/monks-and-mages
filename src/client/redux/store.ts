import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { applyMiddleware } from 'redux';

import { boardReducer } from './board';
import { roomsReducer } from './room';
import { userReducer, userSlice } from './user';
import { clientSideGameExtrasReducer } from './clientSideGameExtras';

const { createReduxHistory, routerMiddleware, routerReducer } =
    createReduxHistoryContext({
        history: createBrowserHistory(),
    });

export const createRootReducer = () =>
    combineReducers({
        board: boardReducer,
        clientSideGameExtras: clientSideGameExtrasReducer,
        router: routerReducer,
        rooms: roomsReducer,
        user: userReducer,
    });

const preloadedState = {
    user: userSlice.getInitialState(),
};

export const store = configureStore({
    reducer: createRootReducer(),
    devTools: true,
    enhancers: [applyMiddleware(routerMiddleware)],
    preloadedState,
});

export const configureStoreWithMiddlewares = (
    stateOverrides = {},
    routerMiddlewareOveride = routerMiddleware
) => {
    return configureStore({
        reducer: createRootReducer(),
        devTools: true,
        enhancers: [applyMiddleware(routerMiddlewareOveride)],
        preloadedState: {
            ...preloadedState,
            ...stateOverrides,
        },
    });
};

export const history = createReduxHistory(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
