import cloneDeep from 'lodash.clonedeep';
import { PlayerConstants } from '@/constants/gameConstants';
import { makeNewBoard } from '@/factories/board';
import { Board } from '@/types/board';
import { EffectType, TargetTypes } from '@/types/effects';
import { resolveEffect } from './resolveEffect';
import { makeCard } from '@/factories/cards';
import { Tokens, UnitCards } from '@/mocks/units';
import { UnitCard } from '@/types/cards';

describe('resolve effect', () => {
    let board: Board;

    beforeEach(() => {
        board = makeNewBoard({
            playerNames: ['Timmy', 'Tommy'],
            startingPlayerIndex: 0,
        });
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

    describe('Bounce units', () => {
        it('bounces a unit back to hand', () => {
            const squire = makeCard(UnitCards.SQUIRE);
            squire.hp = 1;
            board.players[0].units = [squire];

            const newBoard = resolveEffect(
                board,
                {
                    effect: { type: EffectType.BOUNCE },
                    unitCardIds: [squire.id],
                },
                'Timmy'
            );

            expect(newBoard.players[0].units).toHaveLength(0);
            const lastCardInHand = newBoard.players[0].hand.splice(
                -1
            )[0] as UnitCard;
            expect(lastCardInHand.name).toEqual(squire.name);
            expect(lastCardInHand.hp).toEqual(squire.totalHp);
        });

        it("resets a unit's buffs", () => {
            const squire = makeCard(UnitCards.SQUIRE);
            squire.attackBuff = 2;
            squire.hpBuff = 2;
            board.players[0].units = [squire];

            const newBoard = resolveEffect(
                board,
                {
                    effect: { type: EffectType.BOUNCE },
                    unitCardIds: [squire.id],
                },
                'Timmy'
            );

            const lastCardInHand = newBoard.players[0].hand.splice(
                -1
            )[0] as UnitCard;
            expect(lastCardInHand.attackBuff).toEqual(0);
            expect(lastCardInHand.hpBuff).toEqual(0);
        });
    });

    describe('Buff units', () => {
        it('buffs attack of non-magic units on your board', () => {
            const squire = makeCard(UnitCards.SQUIRE);
            const cannon = makeCard(UnitCards.CANNON);
            const apprentice = makeCard(UnitCards.MAGICIANS_APPRENTICE);
            board.players[0].units = [squire, cannon, apprentice];

            const newBoard = resolveEffect(
                board,
                {
                    effect: { type: EffectType.BUFF_TEAM_ATTACK, strength: 2 },
                    unitCardIds: [squire.id],
                },
                'Timmy'
            );

            expect(newBoard.players[0].units[0].attackBuff).toEqual(2);
            expect(newBoard.players[0].units[1].attackBuff).toEqual(2);
            expect(newBoard.players[0].units[2].attackBuff).toEqual(0);
        });

        it('buffs hp of units on your board', () => {
            const squire = makeCard(UnitCards.SQUIRE);
            const cannon = makeCard(UnitCards.CANNON);
            const apprentice = makeCard(UnitCards.MAGICIANS_APPRENTICE);
            board.players[0].units = [squire, cannon, apprentice];

            const newBoard = resolveEffect(
                board,
                {
                    effect: { type: EffectType.BUFF_TEAM_HP, strength: 2 },
                    unitCardIds: [squire.id],
                },
                'Timmy'
            );

            expect(newBoard.players[0].units[0].hpBuff).toEqual(2);
            expect(newBoard.players[0].units[1].hpBuff).toEqual(2);
            expect(newBoard.players[0].units[2].hpBuff).toEqual(2);
        });

        it('buffs magic of units on your board', () => {
            const squire = makeCard(UnitCards.SQUIRE);
            const cannon = makeCard(UnitCards.CANNON);
            const apprentice = makeCard(UnitCards.MAGICIANS_APPRENTICE);
            board.players[0].units = [squire, cannon, apprentice];

            const newBoard = resolveEffect(
                board,
                {
                    effect: { type: EffectType.BUFF_TEAM_MAGIC, strength: 2 },
                    unitCardIds: [squire.id],
                },
                'Timmy'
            );

            expect(newBoard.players[0].units[0].attackBuff).toEqual(0);
            expect(newBoard.players[0].units[1].attackBuff).toEqual(0);
            expect(newBoard.players[0].units[2].attackBuff).toEqual(2);
        });
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
            const squire = makeCard(UnitCards.SQUIRE);
            board.players[0].units = [squire];
            const newBoard = resolveEffect(
                board,
                {
                    effect: { type: EffectType.DEAL_DAMAGE, strength: 2 },
                    unitCardIds: [squire.id],
                },
                'Timmy'
            );
            expect(newBoard.players[0].units[0].hp).toEqual(
                UnitCards.SQUIRE.hp - 2
            );
        });

        it('deals damage to all opposing unit', () => {
            const squire = makeCard(UnitCards.SQUIRE);
            board.players[1].units = [squire];
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.DEAL_DAMAGE,
                        strength: 2,
                        target: TargetTypes.ALL_OPPOSING_UNITS,
                    },
                },
                'Timmy'
            );
            expect(newBoard.players[1].units[0].hp).toEqual(
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
            const squire = makeCard(UnitCards.SQUIRE);
            board.players[0].units = [squire];
            const newBoard = resolveEffect(
                board,
                {
                    effect: { type: EffectType.DEAL_DAMAGE, strength: 3 },
                    unitCardIds: [squire.id],
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

    describe('Summon Unit', () => {
        it('summons 2 demons', () => {
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.SUMMON_UNITS,
                        strength: 2,
                        summonType: Tokens.DEMON,
                    },
                },
                'Timmy'
            );
            expect(newBoard.players[0].units).toHaveLength(2);
            expect(newBoard.players[0].units[0].name).toBe(Tokens.DEMON.name);
        });
    });
});
