import React from 'react';
import { render } from '@/test-utils';
import { GameManager } from './GameManager';
import { makeNewBoard } from '@/factories/board';
import { EffectType, TargetTypes } from '@/types/effects';
import { RootState } from '@/client/redux/store';

describe('Game Manager', () => {
    it('auto-resolves targets', () => {
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
        expect(webSocket.socket.emit).toHaveBeenCalledWith('resolveEffect', {
            effect,
        });
    });

    it('fizzles the last effect if it has no valid targets', () => {
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
        expect(webSocket.socket.emit).toHaveBeenCalledWith('resolveEffect', {
            effect,
        });
    });
});
