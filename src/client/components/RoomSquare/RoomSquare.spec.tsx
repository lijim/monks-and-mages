import { fireEvent, render, screen } from '@testing-library/react';
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

    it('truncates "public-"', () => {
        render(
            <RoomSquare
                detailedRoom={{
                    roomName: 'public-Room 6',
                    players: ['Kimmy', 'Jimmy', 'Timmy'],
                }}
            />
        );
        expect(screen.getByText('Room 6')).toBeInTheDocument();
    });

    it('renders Started if a game has started', () => {
        render(
            <RoomSquare
                detailedRoom={{
                    roomName: 'Room 6',
                    players: ['Kimmy', 'Jimmy', 'Timmy'],
                    hasStartedGame: true,
                }}
            />
        );
        expect(screen.getByText('Started')).toBeInTheDocument();
    });

    it('hides the start game button if there are < 2 players in a room', () => {
        const mockStartGame = jest.fn();
        render(
            <RoomSquare
                detailedRoom={{
                    roomName: 'Room 6',
                    players: ['Kimmy'],
                    hasStartedGame: false,
                }}
                onStartGameClicked={mockStartGame}
            />
        );

        expect(screen.queryByText('Start Game')).not.toBeInTheDocument();
    });

    it('hides the start game button if the game has started', () => {
        const mockStartGame = jest.fn();
        render(
            <RoomSquare
                detailedRoom={{
                    roomName: 'Room 6',
                    players: ['Kimmy', 'Jimmy'],
                    hasStartedGame: true,
                }}
                onStartGameClicked={mockStartGame}
            />
        );

        expect(screen.queryByText('Start Game')).not.toBeInTheDocument();
    });

    it('starts the game', () => {
        const mockStartGame = jest.fn();
        render(
            <RoomSquare
                detailedRoom={{
                    roomName: 'Room 6',
                    players: ['Kimmy', 'Jimmy', 'Timmy'],
                    hasStartedGame: false,
                }}
                onStartGameClicked={mockStartGame}
            />
        );

        fireEvent.click(screen.getByText('Start Game'));

        expect(mockStartGame).toHaveBeenCalled();
    });
});
