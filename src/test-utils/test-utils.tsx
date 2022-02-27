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
    {
        preloadedState = {},
        store = configureStoreWithMiddlewares(preloadedState),
        ...renderOptions
    }: ReduxRenderOptions = {}
): RenderResult {
    function Wrapper({ children }: { children?: ReactNode }): ReactElement {
        return <Provider store={store}>{children}</Provider>;
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}
