import cloneDeep from 'lodash.clonedeep';
import { PlayerConstants } from '@/constants/gameConstants';
import { makeNewBoard } from '@/factories/board';
import { Board } from '@/types/board';
import { EffectType, TargetTypes } from '@/types/effects';
import { resolveEffect } from './resolveEffect';
import { makeCard } from '@/factories/cards';
import { UnitCards } from '@/cardDb/units';

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
        it('draws cards for players', () => {
            const deckLength = board.players[0].deck.length;
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.DRAW,
                        strength: 2,
                        target: TargetTypes.ALL_PLAYERS,
                    },
                },
                'Timmy'
            );
            expect(newBoard.players[0].hand).toHaveLength(
                PlayerConstants.STARTING_HAND_SIZE + 2
            );
            expect(newBoard.players[0].numCardsInHand).toEqual(
                PlayerConstants.STARTING_HAND_SIZE + 2
            );
            expect(newBoard.players[0].deck).toHaveLength(deckLength - 2);
            expect(newBoard.players[1].hand).toHaveLength(
                PlayerConstants.STARTING_HAND_SIZE + 2
            );
            expect(newBoard.players[1].numCardsInHand).toEqual(
                PlayerConstants.STARTING_HAND_SIZE + 2
            );
        });
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

    describe('Deal Damage', () => {
        it('deals damage to a unit', () => {
            const lancer = makeCard(UnitCards.SQUIRE);
            board.players[0].units = [lancer];
            const newBoard = resolveEffect(
                board,
                {
                    effect: { type: EffectType.DEAL_DAMAGE, strength: 2 },
                    unitCardIds: [lancer.id],
                },
                'Timmy'
            );
            expect(newBoard.players[0].units[0].hp).toEqual(
                UnitCards.SQUIRE.hp - 2
            );
        });
        it('deals damage to a player', () => {
            const newBoard = resolveEffect(
                board,
                {
                    effect: { type: EffectType.DEAL_DAMAGE, strength: 3 },
                    playerNames: ['Tommy'],
                },
                'Timmy'
            );
            expect(newBoard.players[1].health).toEqual(
                PlayerConstants.STARTING_HEALTH - 3
            );
        });
        it('deals lethal to a unit', () => {
            const lancer = makeCard(UnitCards.SQUIRE);
            board.players[0].units = [lancer];
            const newBoard = resolveEffect(
                board,
                {
                    effect: { type: EffectType.DEAL_DAMAGE, strength: 3 },
                    unitCardIds: [lancer.id],
                },
                'Timmy'
            );
            expect(newBoard.players[0].units).toHaveLength(0);
            expect(newBoard.players[0].cemetery).toHaveLength(1);
        });
        it('deals lethal damage to a player', () => {
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.DEAL_DAMAGE,
                        strength: PlayerConstants.STARTING_HEALTH,
                    },
                    playerNames: ['Tommy'],
                },
                'Timmy'
            );
            expect(newBoard.players[1].isAlive).toBe(false);
        });
    });
});
