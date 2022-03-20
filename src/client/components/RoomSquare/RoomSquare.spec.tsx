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

    describe('rejoin button', () => {
        it('re-joins the room', () => {
            const mockRejoinGame = jest.fn();
            render(
                <RoomSquare
                    detailedRoom={{
                        hasStartedGame: true,
                        roomName: 'public-Room 6',
                        players: ['Kimmy', 'Jimmy', 'Timmy'],
                    }}
                    rejoinRoom={mockRejoinGame}
                    hasJoined
                />
            );
            fireEvent.click(screen.getByText('Re-join game!'));
            expect(mockRejoinGame).toHaveBeenCalled();
        });

        it("hides rejoin if you haven't joined", () => {
            const mockRejoinGame = jest.fn();
            render(
                <RoomSquare
                    detailedRoom={{
                        hasStartedGame: true,
                        roomName: 'public-Room 6',
                        players: ['Kimmy', 'Jimmy', 'Timmy'],
                    }}
                    rejoinRoom={mockRejoinGame}
                />
            );
            expect(screen.queryAllByText('Re-join game!')).toHaveLength(0);
        });

        it("hides rejoin if you haven't started", () => {
            const mockRejoinGame = jest.fn();
            render(
                <RoomSquare
                    detailedRoom={{
                        roomName: 'public-Room 6',
                        players: ['Kimmy', 'Jimmy', 'Timmy'],
                    }}
                    rejoinRoom={mockRejoinGame}
                    hasJoined
                />
            );
            expect(screen.queryAllByText('Re-join game!')).toHaveLength(0);
        });
    });

    it('joins the room', () => {
        const mockJoinRoom = jest.fn();
        render(
            <RoomSquare
                detailedRoom={{
                    roomName: 'public-Room 6',
                    players: ['Kimmy', 'Jimmy', 'Timmy'],
                }}
                joinRoom={mockJoinRoom}
            />
        );
        fireEvent.click(screen.getByText('Join'));
        expect(mockJoinRoom).toHaveBeenCalled();
    });

    it('hides the join room option', () => {
        const mockJoinRoom = jest.fn();
        render(
            <RoomSquare
                detailedRoom={{
                    roomName: 'public-Room 6',
                    players: ['Kimmy', 'Jimmy', 'Timmy'],
                }}
                hasJoined
                joinRoom={mockJoinRoom}
            />
        );
        expect(screen.queryByText('Join')).not.toBeInTheDocument();
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
                hasJoined
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
                hasJoined
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
                hasJoined
                onStartGameClicked={mockStartGame}
            />
        );

        fireEvent.click(screen.getByText('Start Game'));

        expect(mockStartGame).toHaveBeenCalled();
    });
});
