import { EnhancedStore } from '@reduxjs/toolkit'; // for redux-toolkit
// import { Store } from 'redux' // for non-toolkit
// eslint-disable-next-line import/no-extraneous-dependencies
import {
    render as rtlRender,
    RenderOptions,
    RenderResult,
} from '@testing-library/react';
import React, { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';

import { configureStoreWithMiddlewares, RootState } from '@/client/redux/store';

type ReduxRenderOptions = {
    preloadedState?: Partial<RootState>;
    renderOptions?: Omit<RenderOptions, 'wrapper'>;
    store?: EnhancedStore; // for redux-toolkit
    // store?: Store // for non-toolkit
};

// a verison of RTL's render that is a reusable way to
// incorporate redux state into tests
export function render(
    ui: ReactElement,
    { preloadedState = {}, ...renderOptions }: ReduxRenderOptions = {}
): RenderResult {
    const originalHistory = createBrowserHistory();

    // history-mocking test utils from:
    // https://github.com/salvoravida/redux-first-history/blob/master/__tests__/store.ts
    const history = {
        ...originalHistory,
        go: jest.fn(originalHistory.go),
        back: jest.fn(originalHistory.back),
        forward: jest.fn(originalHistory.forward),
        push: jest.fn(originalHistory.push),
        replace: jest.fn(originalHistory.replace),
    };

    const { routerMiddleware } = createReduxHistoryContext({
        history,
    });

    const store = configureStoreWithMiddlewares(preloadedState);

    function Wrapper({ children }: { children?: ReactNode }): ReactElement {
        return <Provider store={store}>{children}</Provider>;
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}
