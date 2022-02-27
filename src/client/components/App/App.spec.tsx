import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { render } from '@/test-utils';

import { App } from './App';
import { RootState } from '@/client/redux/store';

describe('App', () => {
    it('goes to the compact decklist view', () => {
        const preloadedState: Partial<RootState> = {
            user: {
                name: 'Grestch',
            },
        };
        render(<App />, { preloadedState });
        expect(
            screen.queryByText('Deal 3 damage to any target')
        ).toBeInTheDocument();
        fireEvent.click(screen.getByText('Compact Deck List'));
        expect(
            screen.queryByText('Deal 3 damage to any target')
        ).not.toBeInTheDocument();
    });
});
