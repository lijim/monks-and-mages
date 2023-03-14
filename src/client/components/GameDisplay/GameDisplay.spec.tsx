import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '@/test-utils';

import { GameDisplay } from './GameDisplay';
import { RootState } from '@/client/redux/store';
import { makeNewBoard } from '@/factories/board';
import { EffectType } from '@/types/effects';
import { makeSystemChatMessage } from '@/factories/chat';
import { makeCard } from '@/factories/cards';
import { SpellCards } from '@/mocks/spells';
import { Format } from '@/types/games';
import { GameState } from '@/types/board';

describe('GameDisplay', () => {
    it('renders a drafting screen', () => {
        const board = makeNewBoard({
            playerNames: ['Tommy', 'Timmy'],
            format: Format.DRAFT,
        });
        board.gameState = GameState.DRAFTING;
        const preloadedState: Partial<RootState> = {
            user: {
                name: 'Tommy',
            },
            board,
        };
        render(<GameDisplay />, { preloadedState });
        expect(screen.queryByText('Pile 4')).toBeInTheDocument();
    });

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

    it('displays the last card played', () => {
        const board = makeNewBoard({
            playerNames: ['Tommy', 'Timmy'],
        });

        const preloadedState: Partial<RootState> = {
            user: {
                name: 'Tommy',
            },
            board,
            clientSideGameExtras: {
                lastPlayedCards: [makeCard(SpellCards.SUMMON_DEMONS)],
            },
        };
        render(<GameDisplay />, { preloadedState });

        expect(screen.queryByText('Summon Demons')).toBeInTheDocument();
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
