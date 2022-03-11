import React from 'react';
import { render } from '@/test-utils';
import { GameManager } from './GameManager';
import { makeNewBoard } from '@/factories/board';
import { EffectType, TargetTypes } from '@/types/effects';
import { RootState } from '@/client/redux/store';

jest.useFakeTimers();

describe('Game Manager', () => {
    it('auto-resolves targets', async () => {
        const board = makeNewBoard(['Antoinette', 'Beatrice', 'Claudia'], 0);
        const effect = {
            type: EffectType.BOUNCE,
            target: TargetTypes.ALL_OPPOSING_UNITS,
        };
        board.players[0].effectQueue = [effect];

        const preloadedState: Partial<RootState> = {
            user: {
                name: 'Antoinette',
            },
            board,
        };
        const { webSocket } = render(<GameManager />, { preloadedState });
        jest.advanceTimersByTime(2400);
        await expect(webSocket.socket.emit).toHaveBeenCalledWith(
            'resolveEffect',
            {
                effect,
            }
        );
    });

    it('fizzles the last effect if it has no valid targets', async () => {
        const board = makeNewBoard(['Antoinette', 'Beatrice', 'Claudia'], 0);
        const effect = {
            type: EffectType.BOUNCE,
            target: TargetTypes.OWN_UNIT,
        };
        board.players[0].effectQueue = [effect];

        const preloadedState: Partial<RootState> = {
            user: {
                name: 'Antoinette',
            },
            board,
        };
        const { webSocket } = render(<GameManager />, { preloadedState });
        jest.advanceTimersByTime(2400);
        await expect(webSocket.socket.emit).toHaveBeenCalledWith(
            'resolveEffect',
            {
                effect,
            }
        );
    });
});
