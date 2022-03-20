import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '@/test-utils';

import { GameDisplay } from './GameDisplay';
import { RootState } from '@/client/redux/store';
import { makeNewBoard } from '@/factories/board';
import { EffectType } from '@/types/effects';
import { makeSystemChatMessage } from '@/factories/chat';

describe('GameDisplay', () => {
    it('renders player names', () => {
        const preloadedState: Partial<RootState> = {
            user: {
                name: 'Tommy',
            },
            board: makeNewBoard({ playerNames: ['Tommy', 'Timmy'] }),
        };
        render(<GameDisplay />, { preloadedState });
        expect(screen.queryByText('Tommy')).toBeInTheDocument();
        expect(screen.queryByText('Timmy')).toBeInTheDocument();
    });

    it('renders player names (spectator mode)', () => {
        const preloadedState: Partial<RootState> = {
            user: {
                name: 'Tortimer',
            },
            board: makeNewBoard({ playerNames: ['Tommy', 'Timmy'] }),
        };
        render(<GameDisplay />, { preloadedState });
        expect(screen.queryByText('Tommy')).toBeInTheDocument();
        expect(screen.queryByText('Timmy')).toBeInTheDocument();
    });

    it('renders player names (4 player)', () => {
        const preloadedState: Partial<RootState> = {
            user: {
                name: 'Tommy',
            },
            board: makeNewBoard({
                playerNames: ['Tommy', 'Timmy', 'Celeste', 'Rover'],
            }),
        };
        render(<GameDisplay />, { preloadedState });
        expect(screen.queryByText('Tommy')).toBeInTheDocument();
        expect(screen.queryByText('Timmy')).toBeInTheDocument();
        expect(screen.queryByText('Rover')).toBeInTheDocument();
        expect(screen.queryByText('Celeste')).toBeInTheDocument();
    });

    it('displays chat messages', () => {
        const board = makeNewBoard({
            playerNames: ['Tommy', 'Timmy'],
        });
        board.chatLog = [makeSystemChatMessage('Tommy played [[Lancer]]')];

        const preloadedState: Partial<RootState> = {
            user: {
                name: 'Tommy',
            },
            board,
        };
        render(<GameDisplay />, { preloadedState });

        expect(
            screen.queryByText('Tommy played [[Lancer]]')
        ).toBeInTheDocument();
    });

    it('renders active effects', () => {
        const board = makeNewBoard({
            playerNames: ['Tommy', 'Timmy'],
            startingPlayerIndex: 0,
        });
        const preloadedState: Partial<RootState> = {
            user: {
                name: 'Timmy',
            },
            board,
        };
        board.players[0].effectQueue = [
            { type: EffectType.DEAL_DAMAGE, strength: 3 },
        ];
        render(<GameDisplay />, { preloadedState });

        expect(
            screen.getByText('Resolving: Deal 3 damage to any target')
        ).toBeInTheDocument();
    });
});
