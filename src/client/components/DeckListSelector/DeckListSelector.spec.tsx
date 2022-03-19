import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { render } from '@/test-utils';

import { DeckListSelector } from './DeckListSelector';
import { RootState } from '@/client/redux/store';
import { DeckListSelections } from '@/constants/lobbyConstants';

describe('DeckListSelector', () => {
    it('chooses a deck', () => {
        const preloadedState: Partial<RootState> = {
            lobby: {
                rooms: [
                    {
                        roomName: 'Room 6',
                        players: ['Kimmy', 'Jimmy', 'Timmy'],
                    },
                    {
                        roomName: 'Room 7',
                        players: ['Peter', 'Paul', 'Mary'],
                    },
                ],
            },
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
});
