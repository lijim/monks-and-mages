import React from 'react';
import { screen } from '@testing-library/react';

import { RootState } from '@/client/redux/store';
import { DeckListSelections } from '@/constants/lobbyConstants';
import { render } from '@/test-utils';
import { DeckManager } from './DeckManager';

describe('Deck Manager', () => {
    it('renders a premade decklist', () => {
        const preloadedState: Partial<RootState> = {
            deckList: {
                premadeDecklist: DeckListSelections.GENIES,
            },
        };
        render(<DeckManager />, { preloadedState });
        expect(screen.getByText('Fortune Predictor')).toBeInTheDocument();
    });

    it('renders a log out button', () => {
        const preloadedState: Partial<RootState> = {
            deckList: {
                premadeDecklist: DeckListSelections.GENIES,
            },
        };
        render(<DeckManager />, { preloadedState });
        expect(screen.getByText('Log Out')).toBeInTheDocument();
    });
});
