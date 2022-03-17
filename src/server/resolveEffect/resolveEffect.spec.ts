import cloneDeep from 'lodash.clonedeep';
import { PlayerConstants } from '@/constants/gameConstants';
import { makeNewBoard } from '@/factories/board';
import { Board } from '@/types/board';
import { EffectType, TargetTypes } from '@/types/effects';
import { resolveEffect } from './resolveEffect';
import { makeCard } from '@/factories/cards';
import { Tokens, UnitCards } from '@/mocks/units';
import { UnitCard } from '@/types/cards';
import { Resource } from '@/types/resources';

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

    it('does nothing if the effect does not verify with the board', () => {
        board.players[0].effectQueue = [{ type: EffectType.DRAW, strength: 2 }];
        expect(
            resolveEffect(
                board,
                { effect: { type: EffectType.DRAW, strength: 1 } },
                'Timmy',
                true
            )
        ).toBeNull();
    });

    it('does proceed if the effect does not verify with the board', () => {
        board.players[0].effectQueue = [{ type: EffectType.DRAW, strength: 1 }];
        expect(
            resolveEffect(
                board,
                { effect: { type: EffectType.DRAW, strength: 1 } },
                'Timmy',
                true
            )
        ).not.toBeNull();
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

    it('displays chat (auto-target)', () => {
        const effect = { type: EffectType.DRAW, strength: 1 };
        board.players[0].effectQueue = [effect];
        const newBoard = resolveEffect(board, { effect }, 'Timmy');
        expect(newBoard.chatLog[0].message).toBe(
            'Timmy resolved "draw 1 cards"'
        );
    });

    it('displays chat (target)', () => {
        const effect = {
            type: EffectType.DEAL_DAMAGE,
            strength: 1,
            target: TargetTypes.ANY,
        };
        board.players[0].effectQueue = [effect];
        const squire = makeCard(UnitCards.SQUIRE);
        board.players[0].units = [squire];
        const newBoard = resolveEffect(
            board,
            {
                effect,
                unitCardIds: [squire.id],
            },
            'Timmy'
        );
        expect(newBoard.chatLog[0].message).toBe(
            'Timmy resolved "deal 1 damage to any target" ➡️ [[Squire]]'
        );
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

        it("resets a unit's costs", () => {
            const squire = makeCard(UnitCards.SQUIRE);
            squire.attackBuff = 2;
            squire.hpBuff = 2;
            squire.cost.Generic = 5;
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
            expect(lastCardInHand.cost.Generic).toEqual(1);
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

    describe('Curse Hand', () => {
        it('increases costs for cards', () => {
            board.players[1].hand = [
                makeCard(UnitCards.SQUIRE),
                makeCard(UnitCards.LANCER),
            ];
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.CURSE_HAND,
                        strength: 2,
                        target: TargetTypes.OPPONENT,
                    },
                    playerNames: ['Tommy'],
                },
                'Timmy'
            );

            expect((newBoard.players[1].hand[0] as UnitCard).cost.Generic).toBe(
                3
            );
            expect((newBoard.players[1].hand[1] as UnitCard).cost.Generic).toBe(
                2
            );
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
            expect(newBoard.players[0].deck).toHaveLength(deckLength - 2);
            expect(newBoard.players[1].hand).toHaveLength(
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
            expect(newBoard.players[0].deck).toEqual([]);
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

        it('deals lethal damage (all opposing units)', () => {
            const squire = makeCard(UnitCards.SQUIRE);
            const squire2 = makeCard(UnitCards.SQUIRE);
            board.players[1].units = [squire, squire2];
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.DEAL_DAMAGE,
                        strength: 4,
                        target: TargetTypes.ALL_OPPOSING_UNITS,
                    },
                },
                'Timmy'
            );
            expect(newBoard.players[1].units).toHaveLength(0);
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

    describe('Heal', () => {
        it('heals players', () => {
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.HEAL,
                        strength: 2,
                        target: TargetTypes.ALL_PLAYERS,
                    },
                },
                'Timmy'
            );
            expect(newBoard.players[0].health).toEqual(
                PlayerConstants.STARTING_HEALTH + 2
            );
        });

        it('heals, but does not overheal units', () => {
            const knight1 = makeCard(UnitCards.KNIGHT_TEMPLAR);
            const knight2 = makeCard(UnitCards.KNIGHT_TEMPLAR);
            knight1.hp = 1;
            knight2.hp = 3;
            board.players[0].units = [knight1, knight2];
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.HEAL,
                        strength: 2,
                        target: TargetTypes.ALL_UNITS,
                    },
                },
                'Timmy'
            );
            expect(newBoard.players[0].units[0].hp).toEqual(3);
            expect(newBoard.players[0].units[1].hp).toEqual(4);
        });
    });

    describe('Ramp Player', () => {
        it('increases resources deployed', () => {
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.RAMP,
                        strength: 2,
                        resourceType: Resource.CRYSTAL,
                    },
                },
                'Timmy'
            );
            expect(newBoard.players[0].resources).toHaveLength(2);
            expect(newBoard.players[0].resources[0].name).toBe(
                Resource.CRYSTAL
            );
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
