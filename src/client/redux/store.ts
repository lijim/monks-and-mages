import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { applyMiddleware } from 'redux';

import { boardReducer } from './board';
import { lobbyReducer } from './lobby';
import { userReducer, userSlice } from './user';
import { clientSideGameExtrasReducer } from './clientSideGameExtras';
import { deckListReducer, deckListSlice } from './deckList';

const { createReduxHistory, routerMiddleware, routerReducer } =
    createReduxHistoryContext({
        history: createBrowserHistory(),
    });

export const createRootReducer = () =>
    combineReducers({
        board: boardReducer,
        clientSideGameExtras: clientSideGameExtrasReducer,
        deckList: deckListReducer,
        router: routerReducer,
        lobby: lobbyReducer,
        user: userReducer,
    });

const preloadedState = {
    user: userSlice.getInitialState(),
    deckList: deckListSlice.getInitialState(),
};

// Used for production
export const store = configureStore({
    reducer: createRootReducer(),
    devTools: true,
    enhancers: [applyMiddleware(routerMiddleware)],
    preloadedState,
});

// Used only for tests
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
