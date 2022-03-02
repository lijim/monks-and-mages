import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '@/test-utils';

import { App } from './App';
import { RootState } from '@/client/redux/store';

describe('App', () => {
    it('renders a name selection', () => {
        const preloadedState: Partial<RootState> = {
            user: {
                name: '',
            },
        };
        render(<App />, { preloadedState });
        expect(screen.queryByText('Select a Name')).toBeInTheDocument();
    });

    it('renders a particular name if already selected', () => {
        const preloadedState: Partial<RootState> = {
            user: {
                name: 'Gretsch',
            },
        };
        render(<App />, { preloadedState });
        expect(screen.queryByText('Name: Gretsch')).toBeInTheDocument();
    });
});
