import React from 'react';
import { push } from 'redux-first-history';
import { fireEvent, screen } from '@testing-library/react';
import { render } from '@/test-utils';

import { RootState } from '@/client/redux/store';
import { makeNewBoard } from '@/factories/board';
import {
    ACCEPT_MULLIGAN_COPY,
    CenterPromptBox,
    REJECT_MULLIGAN_COPY,
} from './CenterPromptBox';
import { GameActionTypes } from '@/types/gameActions';
import { GameState } from '@/types/board';

describe('Center Prompt Box', () => {
    describe('Mulligans', () => {
        it('accepts the mulligan', () => {
            const board = makeNewBoard({
                playerNames: ['Tommy', 'Timmy'],
                startingPlayerIndex: 0,
            });
            board.gameState = GameState.MULLIGANING;
            const preloadedState: Partial<RootState> = {
                user: {
                    name: 'Tommy',
                },
                board,
            };

            const { webSocket } = render(<CenterPromptBox />, {
                preloadedState,
            });
            fireEvent.click(screen.getByText(ACCEPT_MULLIGAN_COPY));
            expect(webSocket.takeGameAction).toHaveBeenCalledWith({
                type: GameActionTypes.ACCEPT_MULLIGAN,
            });
        });
        it('rejects the mulligan', () => {
            const board = makeNewBoard({
                playerNames: ['Tommy', 'Timmy'],
                startingPlayerIndex: 0,
            });
            board.gameState = GameState.MULLIGANING;
            const preloadedState: Partial<RootState> = {
                user: {
                    name: 'Tommy',
                },
                board,
            };

            const { webSocket } = render(<CenterPromptBox />, {
                preloadedState,
            });
            fireEvent.click(screen.getByText(REJECT_MULLIGAN_COPY));
            expect(webSocket.takeGameAction).toHaveBeenCalledWith({
                type: GameActionTypes.REJECT_MULLIGAN,
            });
        });
        it('displays who is actively mulliganing for the non-active players', () => {
            const board = makeNewBoard({
                playerNames: ['Tommy', 'Timmy'],
                startingPlayerIndex: 0,
            });
            board.gameState = GameState.MULLIGANING;
            const preloadedState: Partial<RootState> = {
                user: {
                    name: 'Timmy',
                },
                board,
            };

            render(<CenterPromptBox />, {
                preloadedState,
            });
            expect(
                screen.queryByText('Accept Mulligan')
            ).not.toBeInTheDocument();
            expect(
                screen.queryByText(
                    'Tommy is deciding whether to keep their hand'
                )
            ).toBeInTheDocument();
        });
    });

    describe('Game over', () => {
        it('displays who won the game', () => {
            const board = makeNewBoard({
                playerNames: ['Tommy', 'Timmy'],
                startingPlayerIndex: 0,
            });
            board.gameState = GameState.WIN;
            board.players[0].isAlive = false;
            const preloadedState: Partial<RootState> = {
                user: {
                    name: 'Timmy',
                },
                board,
            };

            render(<CenterPromptBox />, {
                preloadedState,
            });
            expect(
                screen.getByText('Game over - Timmy won')
            ).toBeInTheDocument();
        });

        it('displays a tie', () => {
            const board = makeNewBoard({
                playerNames: ['Tommy', 'Timmy'],
                startingPlayerIndex: 0,
            });
            board.gameState = GameState.TIE;
            board.players[0].isAlive = false;
            board.players[1].isAlive = false;
            const preloadedState: Partial<RootState> = {
                user: {
                    name: 'Timmy',
                },
                board,
            };

            render(<CenterPromptBox />, {
                preloadedState,
            });
            expect(screen.getByText('Game over (tie)')).toBeInTheDocument();
        });

        it('returns to the lobby', () => {
            const board = makeNewBoard({
                playerNames: ['Tommy', 'Timmy'],
                startingPlayerIndex: 0,
            });
            board.gameState = GameState.TIE;
            board.players[0].isAlive = false;
            board.players[1].isAlive = false;
            const preloadedState: Partial<RootState> = {
                user: {
                    name: 'Timmy',
                },
                board,
            };

            const { dispatch, webSocket } = render(<CenterPromptBox />, {
                preloadedState,
            });
            fireEvent.click(screen.getByText('Return to Lobby'));
            expect(dispatch).toHaveBeenCalledWith(push('/'));
            expect(webSocket.leaveRoom).toHaveBeenCalled();
        });
    });
});
