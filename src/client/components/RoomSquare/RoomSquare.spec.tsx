import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { RoomSquare } from './RoomSquare';
import { Format } from '@/types/games';
import { DetailedRoom } from '@/types';

const detailedRoom: DetailedRoom = {
    roomName: 'Room 6',
    players: ['Kimmy', 'Jimmy', 'Timmy'],
    spectators: [],
    avatarsForPlayers: {},
    format: Format.STANDARD,
};

describe('Room Square', () => {
    it('renders a room name + players', () => {
        render(<RoomSquare detailedRoom={detailedRoom} />);
        expect(screen.getByText('Room 6')).toBeInTheDocument();
        expect(screen.getByText('Kimmy')).toBeInTheDocument();
        expect(screen.getByText('Jimmy')).toBeInTheDocument();
        expect(screen.getByText('Timmy')).toBeInTheDocument();
    });

    it('truncates "public-"', () => {
        render(<RoomSquare detailedRoom={detailedRoom} />);
        expect(screen.getByText('Room 6')).toBeInTheDocument();
    });

    describe('rejoin button', () => {
        it('re-joins the room', () => {
            const mockRejoinGame = jest.fn();
            render(
                <RoomSquare
                    detailedRoom={{ ...detailedRoom, hasStartedGame: true }}
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
                    detailedRoom={detailedRoom}
                    rejoinRoom={mockRejoinGame}
                />
            );
            expect(screen.queryAllByText('Re-join game!')).toHaveLength(0);
        });

        it("hides rejoin if you haven't started", () => {
            const mockRejoinGame = jest.fn();
            render(
                <RoomSquare
                    detailedRoom={detailedRoom}
                    rejoinRoom={mockRejoinGame}
                    hasJoined
                />
            );
            expect(screen.queryAllByText('Re-join game!')).toHaveLength(0);
        });
    });

    describe('spectate button', () => {
        it('spectates the room', () => {
            const mockSpectateRoom = jest.fn();
            render(
                <RoomSquare
                    detailedRoom={detailedRoom}
                    spectateRoom={mockSpectateRoom}
                />
            );
            fireEvent.click(screen.getByText('Spectate'));
            expect(mockSpectateRoom).toHaveBeenCalled();
        });

        it('hides the spectate button if the game is already spectated', () => {
            render(<RoomSquare detailedRoom={detailedRoom} isSpectacting />);
            expect(screen.queryByText('Spectate')).not.toBeInTheDocument();
        });

        it('hides the spectate button if the game is started', () => {
            render(
                <RoomSquare
                    detailedRoom={{
                        ...detailedRoom,
                        hasStartedGame: true,
                    }}
                />
            );
            expect(screen.queryByText('Spectate')).not.toBeInTheDocument();
        });
    });

    describe('join room button', () => {
        it('joins the room', () => {
            const mockJoinRoom = jest.fn();
            render(
                <RoomSquare
                    detailedRoom={detailedRoom}
                    joinRoom={mockJoinRoom}
                />
            );
            fireEvent.click(screen.getByText('Join'));
            expect(mockJoinRoom).toHaveBeenCalled();
        });

        it('hides the join room option if the player has joined', () => {
            const mockJoinRoom = jest.fn();
            render(
                <RoomSquare
                    detailedRoom={{
                        roomName: 'public-Room 6',
                        players: ['Kimmy', 'Jimmy', 'Timmy'],
                        spectators: [],
                        avatarsForPlayers: {},
                        format: Format.STANDARD,
                    }}
                    hasJoined
                    joinRoom={mockJoinRoom}
                />
            );
            expect(screen.queryByText('Join')).not.toBeInTheDocument();
        });

        it('hides the join room option when there are 4 players', () => {
            const mockJoinRoom = jest.fn();
            render(
                <RoomSquare
                    detailedRoom={{
                        roomName: 'public-Room 6',
                        players: ['Kimmy', 'Jimmy', 'Timmy', 'Player 4'],
                        spectators: [],
                        avatarsForPlayers: {},
                        format: Format.STANDARD,
                    }}
                    joinRoom={mockJoinRoom}
                />
            );
            expect(screen.queryByText('Join')).not.toBeInTheDocument();
        });
    });

    it('renders Started if a game has started', () => {
        render(
            <RoomSquare
                detailedRoom={{ ...detailedRoom, hasStartedGame: true }}
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
                    spectators: [],
                    hasStartedGame: false,
                    avatarsForPlayers: {},
                    format: Format.STANDARD,
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
                detailedRoom={{ ...detailedRoom, hasStartedGame: true }}
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
                    ...detailedRoom,
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
