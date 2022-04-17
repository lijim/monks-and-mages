import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { render } from '@/test-utils';

import { DeckListSelector } from './DeckListSelector';
import { RootState } from '@/client/redux/store';
import { DeckListSelections } from '@/constants/lobbyConstants';

describe('DeckListSelector', () => {
    it('chooses a deck', () => {
        const preloadedState: Partial<RootState> = {
            user: {
                name: 'Jimmy',
            },
        };
        const { webSocket } = render(<DeckListSelector />, { preloadedState });
        fireEvent.change(screen.getByLabelText('Choose a Deck'), {
            target: { value: DeckListSelections.MAGES_FIRE },
        });
        expect(webSocket.chooseDeck).toHaveBeenCalledWith(
            DeckListSelections.MAGES_FIRE
        );
    });

    it('displays the current deck list', () => {
        const preloadedState: Partial<RootState> = {
            user: {
                name: 'Jimmy',
            },
            deckList: {
                premadeDecklist: DeckListSelections.GENIES,
            },
        };
        render(<DeckListSelector />, { preloadedState });
        const select = screen.getByLabelText('Choose a Deck');
        expect(select).toHaveValue(DeckListSelections.GENIES);
    });

    it('hides the view deck list button for random', () => {
        const preloadedState: Partial<RootState> = {
            user: {
                name: 'Jimmy',
            },
            deckList: {
                premadeDecklist: DeckListSelections.RANDOM,
            },
        };
        render(<DeckListSelector />, { preloadedState });
        expect(screen.queryByText('View Decklist')).toBeNull();
    });

    it('displays custom decklist as the option', () => {
        const preloadedState: Partial<RootState> = {
            user: {
                name: 'Jimmy',
            },
            deckList: {
                premadeDecklist: DeckListSelections.RANDOM,
                customDeckList: [
                    { card: 'Lancer', quantity: 4 },
                    { card: 'Iron', quantity: 44 },
                ],
            },
        };
        render(<DeckListSelector />, { preloadedState });
        expect(screen.queryByText('Custom deck')).toBeInTheDocument();
        expect(screen.queryByLabelText('Choose a Deck')).toHaveValue('custom');
    });
});
