import React from 'react';
import { screen } from '@testing-library/react';

import { RootState } from '@/client/redux/store';
import { makeNewBoard } from '@/factories/board';
import { render } from '@/test-utils';
import { SelfPlayerInfo } from './SelfPlayerInfo';

describe('Self Player Board', () => {
    it("renders the pass turn button, if you're the active player", () => {
        const preloadedState: Partial<RootState> = {
            user: {
                name: 'Melvin',
            },
            board: makeNewBoard(['Melvin', 'Melissa'], 0),
        };
        render(<SelfPlayerInfo />, { preloadedState });
        expect(screen.getByText('Pass Turn')).toBeInTheDocument();
    });

    it("hides the pass turn button, if you're not the active player", () => {
        const preloadedState: Partial<RootState> = {
            user: {
                name: 'Melvin',
            },
            board: makeNewBoard(['Melvin', 'Melissa'], 1),
        };
        render(<SelfPlayerInfo />, { preloadedState });
        expect(screen.queryByText('Pass Turn')).not.toBeInTheDocument();
    });
});
