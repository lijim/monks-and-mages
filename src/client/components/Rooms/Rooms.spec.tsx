import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { render } from '@/test-utils';

import { Rooms } from './Rooms';
import { RootState } from '@/client/redux/store';

describe('Rooms', () => {
    it('renders multiple rooms', () => {
        const preloadedState: Partial<RootState> = {
            rooms: {
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
        };
        render(<Rooms />, { preloadedState });
        expect(screen.queryByText('Room 6')).toBeInTheDocument();
        expect(screen.queryByText('Room 7')).toBeInTheDocument();
        expect(screen.queryByText('Paul')).toBeInTheDocument();
    });
});
