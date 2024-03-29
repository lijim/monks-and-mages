import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import { RootState } from '@/client/redux/store';
import { makeNewBoard } from '@/factories/board';
import { render } from '@/test-utils';
import { SelfPlayerInfo } from './SelfPlayerInfo';
import { passTurn } from '@/client/redux/clientSideGameExtras';
import { GameActionTypes } from '@/types/gameActions';
import { SpellCards } from '@/cardDb/spells';
import { GameState } from '@/types/board';

describe('Self Player Board', () => {
    it('disables the pass turn button if the game has not started', () => {
        const board = makeNewBoard({
            playerNames: ['Melvin', 'Melissa'],
            startingPlayerIndex: 0,
        });
        board.gameState = GameState.MULLIGANING;
        const preloadedState: Partial<RootState> = {
            user: {
                name: 'Melvin',
            },
            board,
        };
        render(<SelfPlayerInfo />, {
            preloadedState,
        });
        expect(screen.getByText('Pass Turn')).toBeDisabled();
    });

    it('disables the pass turn button if effects are remaining', () => {
        const board = makeNewBoard({
            playerNames: ['Melvin', 'Melissa'],
            startingPlayerIndex: 0,
        });
        board.players[0].effectQueue = [...SpellCards.A_GENTLE_GUST.effects];
        const preloadedState: Partial<RootState> = {
            user: {
                name: 'Melvin',
            },
            board,
        };
        render(<SelfPlayerInfo />, {
            preloadedState,
        });
        expect(screen.getByText('Pass Turn')).toBeDisabled();
    });

    it("passes the turn if you're the active player", () => {
        const preloadedState: Partial<RootState> = {
            user: {
                name: 'Melvin',
            },
            board: makeNewBoard({
                playerNames: ['Melvin', 'Melissa'],
                startingPlayerIndex: 0,
            }),
        };
        const { dispatch, webSocket } = render(<SelfPlayerInfo />, {
            preloadedState,
            useRealDispatch: false,
        });
        fireEvent.click(screen.getByText('Pass Turn'));
        expect(dispatch).toHaveBeenCalledWith(passTurn());
        expect(dispatch).toHaveBeenCalledWith(passTurn());
        expect(webSocket.takeGameAction).toHaveBeenCalledWith({
            type: GameActionTypes.PASS_TURN,
        });
    });

    it("hides the pass turn button, if you're not the active player", () => {
        const preloadedState: Partial<RootState> = {
            user: {
                name: 'Melvin',
            },
            board: makeNewBoard({
                playerNames: ['Melvin', 'Melissa'],
                startingPlayerIndex: 1,
            }),
        };
        render(<SelfPlayerInfo />, { preloadedState });
        expect(screen.queryByText('Pass Turn')).not.toBeInTheDocument();
    });
});
