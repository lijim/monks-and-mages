import { render, screen } from '@testing-library/react';
import React from 'react';

import { RoomSquare } from './RoomSquare';

describe('Room Square', () => {
    it('renders a room name + players', () => {
        render(
            <RoomSquare
                detailedRoom={{
                    roomName: 'Room 6',
                    players: ['Kimmy', 'Jimmy', 'Timmy'],
                }}
            />
        );
        expect(screen.getByText('Room 6')).toBeInTheDocument();
        expect(screen.getByText('Kimmy')).toBeInTheDocument();
        expect(screen.getByText('Jimmy')).toBeInTheDocument();
        expect(screen.getByText('Timmy')).toBeInTheDocument();
    });
});
