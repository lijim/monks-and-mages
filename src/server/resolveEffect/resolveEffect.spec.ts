import cloneDeep from 'lodash.clonedeep';
import { PlayerConstants } from '@/constants/gameConstants';
import { makeNewBoard } from '@/factories/board';
import { Board } from '@/types/board';
import { EffectType } from '@/types/effects';
import { resolveEffect } from './resolveEffect';

describe('resolve effect', () => {
    let board: Board;

    beforeEach(() => {
        board = makeNewBoard(['Timmy', 'Tommy', 'Bobby'], 0);
    });

    it('does nothing if not coming from the active player', () => {
        expect(
            resolveEffect(
                board,
                { effect: { type: EffectType.DRAW, strength: 1 } },
                'Tommy'
            )
        ).toBeNull();
    });

    it('clears the effect off the stack', () => {
        const effect = { type: EffectType.DRAW, strength: 1 };
        board.players[0].effectQueue = [effect];
        const newBoard = resolveEffect(
            board,
            { effect: cloneDeep(effect) },
            'Timmy'
        );
        expect(newBoard.players[0].effectQueue).toHaveLength(0);
    });

    describe('Draw Cards', () => {
        it('makes the player draw out of cards and lose', () => {
            const deckLength = board.players[0].deck.length;
            const newBoard = resolveEffect(
                board,
                { effect: { type: EffectType.DRAW, strength: deckLength + 1 } },
                'Timmy'
            );
            expect(newBoard.players[0].hand).toHaveLength(
                PlayerConstants.STARTING_HAND_SIZE + deckLength
            );
            expect(newBoard.players[0].numCardsInHand).toEqual(
                PlayerConstants.STARTING_HAND_SIZE + deckLength
            );
            expect(newBoard.players[0].deck).toEqual([]);
            expect(newBoard.players[0].numCardsInDeck).toEqual(0);
            expect(newBoard.players[0].isAlive).toEqual(false);
        });
    });
});
