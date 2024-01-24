import { PlayerConstants } from '@/constants/gameConstants';
import { makeNewBoard } from '@/factories/board';
import { Board } from '@/types/board';
import { EffectType, TargetTypes } from '@/types/effects';
import { resolveEffect } from '../resolveEffect';
import { makeCard } from '@/factories/cards';
import { UnitCards } from '@/mocks/units';
import { EffectRequirementsType } from '@/types/cards';

describe('Effect requirements', () => {
    let board: Board;

    beforeEach(() => {
        board = makeNewBoard({
            playerNames: ['Timmy', 'Tommy'],
            startingPlayerIndex: 0,
        });
    });

    it('does not execute the effect if the conditions cannot be met (hand discard)', () => {
        const newBoard = resolveEffect(
            board,
            {
                effect: {
                    type: EffectType.DEAL_DAMAGE,
                    requirements: [
                        {
                            type: EffectRequirementsType.DISCARD_CARD,
                            strength: 8,
                        },
                    ],
                    strength: 7,
                    target: TargetTypes.ALL_OPPONENTS,
                },
                playerNames: ['Tommy'],
            },
            'Timmy'
        );
        expect(newBoard.players[1].health).toEqual(
            PlayerConstants.STARTING_HEALTH
        );
    });

    it('does not execute the effect if the conditions cannot be met (returning units to hand)', () => {
        const squire = makeCard(UnitCards.SQUIRE);
        board.players[0].units = [squire];
        const newBoard = resolveEffect(
            board,
            {
                effect: {
                    type: EffectType.DEAL_DAMAGE,
                    requirements: [
                        {
                            type: EffectRequirementsType.RETURN_LOWEST_COST_UNIT_TO_HAND,
                            strength: 2,
                        },
                    ],
                    strength: 7,
                    target: TargetTypes.ALL_OPPONENTS,
                },
                playerNames: ['Tommy'],
            },
            'Timmy'
        );
        expect(newBoard.players[1].health).toEqual(
            PlayerConstants.STARTING_HEALTH
        );
    });

    it('executes the effect and returns units to hand', () => {
        const squire1 = makeCard(UnitCards.SQUIRE);
        const squire2 = makeCard(UnitCards.SQUIRE);
        board.players[0].units = [squire1, squire2];
        const newBoard = resolveEffect(
            board,
            {
                effect: {
                    type: EffectType.DEAL_DAMAGE,
                    requirements: [
                        {
                            type: EffectRequirementsType.RETURN_LOWEST_COST_UNIT_TO_HAND,
                            strength: 1,
                        },
                    ],
                    strength: 7,
                    target: TargetTypes.ALL_OPPONENTS,
                },
                playerNames: ['Tommy'],
            },
            'Timmy'
        );
        expect(newBoard.players[0].units).toHaveLength(1);
        expect(newBoard.players[0].hand).toHaveLength(
            PlayerConstants.STARTING_HAND_SIZE + 1
        );
        expect(newBoard.players[1].health).toEqual(
            PlayerConstants.STARTING_HEALTH - 7
        );
    });

    it('checks a passive effect (pass)', () => {
        const squire1 = makeCard(UnitCards.SQUIRE);
        const squire2 = makeCard(UnitCards.SQUIRE);
        board.players[0].units = [squire1, squire2];
        const newBoard = resolveEffect(
            board,
            {
                effect: {
                    type: EffectType.DEAL_DAMAGE,
                    requirements: [
                        {
                            type: EffectRequirementsType.ARE_AT_LIFE_AT_OR_ABOVE_THRESHOLD,
                            strength: 15,
                        },
                    ],
                    strength: 7,
                    target: TargetTypes.ALL_OPPONENTS,
                },
                playerNames: ['Tommy'],
            },
            'Timmy'
        );
        expect(newBoard.players[1].health).toEqual(
            PlayerConstants.STARTING_HEALTH - 7
        );
    });

    it('checks a passive effect (fail)', () => {
        const squire1 = makeCard(UnitCards.SQUIRE);
        const squire2 = makeCard(UnitCards.SQUIRE);
        board.players[0].units = [squire1, squire2];
        const newBoard = resolveEffect(
            board,
            {
                effect: {
                    type: EffectType.DEAL_DAMAGE,
                    requirements: [
                        {
                            type: EffectRequirementsType.ARE_AT_LIFE_BELOW_OR_EQUAL_THRESHOLD,
                            strength: 15,
                        },
                    ],
                    strength: 7,
                    target: TargetTypes.ALL_OPPONENTS,
                },
                playerNames: ['Tommy'],
            },
            'Timmy'
        );
        expect(newBoard.players[1].health).toEqual(
            PlayerConstants.STARTING_HEALTH
        );
    });
});
