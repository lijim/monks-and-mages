import React from 'react';
import { HistoryRouter as Router } from 'redux-first-history/rr6';

import { screen, waitFor } from '@testing-library/react';
import { render } from '@/test-utils';

import { RouterRoutes } from './App';
import { history, RootState } from '@/client/redux/store';

describe('App', () => {
    it('renders a name selection', async () => {
        const preloadedState: Partial<RootState> = {
            user: {
                name: '',
            },
        };
        render(
            <React.Suspense fallback={<></>}>
                <Router history={history}>
                    <RouterRoutes />
                </Router>
            </React.Suspense>,
            { preloadedState }
        );
        await waitFor(() =>
            expect(screen.queryByText('Choose a Name')).toBeInTheDocument()
        );
    });

    it('renders a particular name if already selected', async () => {
        const preloadedState: Partial<RootState> = {
            user: {
                name: 'Gretsch',
            },
        };

        render(
            <React.Suspense fallback={<></>}>
                <Router history={history}>
                    <RouterRoutes />
                </Router>
            </React.Suspense>,
            { preloadedState }
        );
        await waitFor(() =>
            expect(screen.queryByText('Gretsch')).toBeInTheDocument()
        );
    });
});
