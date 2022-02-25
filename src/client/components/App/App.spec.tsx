import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, screen, render } from '@testing-library/react';

import { App } from './App';
import { store } from '@/client/redux/store';

describe('App', () => {
    it('goes to the compact decklist view', () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        expect(
            screen.queryByText('Deal 3 damage to any target')
        ).toBeInTheDocument();
        fireEvent.click(screen.getByText('Compact Deck List'));
        expect(
            screen.queryByText('Deal 3 damage to any target')
        ).not.toBeInTheDocument();
    });
});
