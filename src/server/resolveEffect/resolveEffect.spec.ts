import cloneDeep from 'lodash.clonedeep';
import { PlayerConstants } from '@/constants/gameConstants';
import { makeNewBoard } from '@/factories/board';
import { Board, GameState } from '@/types/board';
import { EffectType, PassiveEffect, TargetTypes } from '@/types/effects';
import { resolveEffect } from './resolveEffect';
import { makeCard, makeResourceCard, makeUnitCard } from '@/factories/cards';
import { Tokens, UnitCards } from '@/mocks/units';
import { EffectRequirementsType, UnitCard } from '@/types/cards';
import { Resource } from '@/types/resources';
import { SpellCards } from '@/mocks/spells';

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
        const mockAddSystemChat = jest.fn();
        const effect = { type: EffectType.DRAW, strength: 1 };
        board.players[0].effectQueue = [effect];

        resolveEffect(board, { effect }, 'Timmy', false, mockAddSystemChat);

        expect(mockAddSystemChat).toHaveBeenCalledWith(
            'Timmy resolved "draw 1 card"'
        );
    });

    it('displays chat (target)', () => {
        const mockAddSystemChat = jest.fn();
        const effect = {
            type: EffectType.DEAL_DAMAGE,
            strength: 1,
            target: TargetTypes.ANY,
        };
        board.players[0].effectQueue = [effect];
        const squire = makeCard(UnitCards.SQUIRE);
        board.players[0].units = [squire];

        resolveEffect(
            board,
            {
                effect,
                unitCardIds: [squire.id],
            },
            'Timmy',
            false,
            mockAddSystemChat
        );

        expect(mockAddSystemChat).toHaveBeenCalledWith(
            'Timmy resolved "deal 1 damage to any target" ➡️ [[Squire]]'
        );
    });

    it('displays chat (implicit target)', () => {
        const mockAddSystemChat = jest.fn();
        const effect = {
            type: EffectType.DEAL_DAMAGE,
            strength: 1,
        };
        board.players[0].effectQueue = [effect];
        const squire = makeCard(UnitCards.SQUIRE);
        board.players[0].units = [squire];

        resolveEffect(
            board,
            {
                effect,
                unitCardIds: [squire.id],
            },
            'Timmy',
            false,
            mockAddSystemChat
        );

        expect(mockAddSystemChat).toHaveBeenCalledWith(
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

        it('bounces units under an attack threshold', () => {
            const squire = makeCard(UnitCards.SQUIRE);
            const squire2 = makeCard(UnitCards.SQUIRE);
            squire2.oneCycleAttackBuff = 1;
            board.players[0].units = [squire, squire2];

            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.BOUNCE_UNITS_UNDER_THRESHOLD_ATTACK,
                        target: TargetTypes.ALL_SELF_UNITS,
                        strength: 2,
                    },
                },
                'Timmy'
            );

            expect(newBoard.players[0].units).toHaveLength(1);
        });
    });

    describe('Buff hand attack', () => {
        it('buffs attack of non-magic units on your hand', () => {
            const squire = makeCard(UnitCards.SQUIRE);
            const cannon = makeCard(UnitCards.CANNON);
            const apprentice = makeCard(UnitCards.MAGICIANS_APPRENTICE);
            board.players[0].hand = [squire, cannon, apprentice];

            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.BUFF_HAND_NON_MAGIC_ATTACK,
                        strength: 2,
                    },
                },
                'Timmy'
            );

            expect(newBoard.players[0].hand[0]).toMatchObject({
                attackBuff: 2,
            });
            expect(newBoard.players[0].hand[1]).toMatchObject({
                attackBuff: 2,
            });
            expect(newBoard.players[0].hand[2]).toMatchObject({
                attackBuff: 0,
            });
        });
    });

    describe('Bloom effect', () => {
        it('increases the number of resources playable', () => {
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.BLOOM,
                        strength: 2,
                    },
                },
                'Timmy'
            );

            expect(newBoard.players[0].resourcesLeftToDeploy).toEqual(3);
        });
    });

    describe('Buff units', () => {
        it('buffs attack', () => {
            const apprentice = makeCard(UnitCards.MAGICIANS_APPRENTICE);
            board.players[0].units = [apprentice];

            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.BUFF_ATTACK,
                        strength: 2,
                    },
                    unitCardIds: [apprentice.id],
                },
                'Timmy'
            );

            expect(newBoard.players[0].units[0].attackBuff).toEqual(2);
        });

        it('buffs attack until the end of turn', () => {
            const apprentice = makeCard(UnitCards.MAGICIANS_APPRENTICE);
            board.players[0].units = [apprentice];

            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.BUFF_ATTACK_FOR_TURN,
                        strength: 2,
                    },
                    unitCardIds: [apprentice.id],
                },
                'Timmy'
            );

            expect(newBoard.players[0].units[0].oneTurnAttackBuff).toEqual(2);
        });

        it('buffs attack until the next cycle', () => {
            const apprentice = makeCard(UnitCards.MAGICIANS_APPRENTICE);
            board.players[0].units = [apprentice];

            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.BUFF_ATTACK_FOR_CYCLE,
                        strength: 2,
                    },
                    unitCardIds: [apprentice.id],
                },
                'Timmy'
            );

            expect(newBoard.players[0].units[0].oneCycleAttackBuff).toEqual(2);
        });

        it('buffs magic units on your board', () => {
            const squire = makeCard(UnitCards.SQUIRE);
            const cannon = makeCard(UnitCards.CANNON);
            const apprentice = makeCard(UnitCards.MAGICIANS_APPRENTICE);
            board.players[0].units = [squire, cannon, apprentice];

            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.BUFF_MAGIC,
                        strength: 2,
                    },
                    unitCardIds: [apprentice.id, cannon.id],
                },
                'Timmy'
            );

            expect(newBoard.players[0].units[1].attackBuff).toEqual(0);
            expect(newBoard.players[0].units[1].hpBuff).toEqual(0);
            expect(newBoard.players[0].units[2].attackBuff).toEqual(2);
            expect(newBoard.players[0].units[2].hpBuff).toEqual(2);
        });

        it('buffs attack of non-magic units on your board', () => {
            const squire = makeCard(UnitCards.SQUIRE);
            const cannon = makeCard(UnitCards.CANNON);
            const apprentice = makeCard(UnitCards.MAGICIANS_APPRENTICE);
            board.players[0].units = [squire, cannon, apprentice];

            const newBoard = resolveEffect(
                board,
                {
                    effect: { type: EffectType.BUFF_TEAM_ATTACK, strength: 2 },
                },
                'Timmy'
            );

            expect(newBoard.players[0].units[0].attackBuff).toEqual(2);
            expect(newBoard.players[0].units[1].attackBuff).toEqual(2);
            expect(newBoard.players[0].units[2].attackBuff).toEqual(0);
        });

        it('does not debuff past 0 attack', () => {
            const squire = makeCard(UnitCards.SQUIRE);
            const cannon = makeCard(UnitCards.CANNON);
            const apprentice = makeCard(UnitCards.MAGICIANS_APPRENTICE);
            board.players[1].units = [squire, cannon, apprentice];

            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.BUFF_TEAM_ATTACK,
                        target: TargetTypes.ALL_OPPONENTS,
                        strength: -3,
                    },
                },
                'Timmy'
            );

            expect(newBoard.players[1].units[0].attackBuff).toEqual(-2);
            expect(newBoard.players[1].units[1].attackBuff).toEqual(-3);
            expect(newBoard.players[1].units[2].attackBuff).toEqual(0);
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
            const apprenticeWithSteady = makeCard(
                UnitCards.MAGICIANS_APPRENTICE
            );
            apprenticeWithSteady.passiveEffects = [PassiveEffect.STEADY];
            board.players[0].units = [
                squire,
                cannon,
                apprentice,
                apprenticeWithSteady,
            ];

            const newBoard = resolveEffect(
                board,
                {
                    effect: { type: EffectType.BUFF_TEAM_MAGIC, strength: 2 },
                },
                'Timmy'
            );

            expect(newBoard.players[0].units[0].attackBuff).toEqual(0);
            expect(newBoard.players[0].units[1].attackBuff).toEqual(0);
            expect(newBoard.players[0].units[2].attackBuff).toEqual(2);
            expect(newBoard.players[0].units[3].attackBuff).toEqual(0);
        });

        it('buffs attack and hp of generic units on your board', () => {
            const squire = makeCard(UnitCards.SQUIRE);
            const apprentice = makeCard(UnitCards.MAGICIANS_APPRENTICE);
            board.players[0].units = [squire, apprentice];

            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.BUFF_TEAM_GENERIC_UNITS,
                        strength: 2,
                    },
                },
                'Timmy'
            );

            expect(newBoard.players[0].units[0].attackBuff).toEqual(2);
            expect(newBoard.players[0].units[0].hpBuff).toEqual(2);
            expect(newBoard.players[0].units[1].attackBuff).toEqual(0);
            expect(newBoard.players[0].units[1].hpBuff).toEqual(0);
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

        it('decreases costs for cards', () => {
            board.players[1].hand = [
                makeCard(UnitCards.SQUIRE),
                makeCard(UnitCards.LANCER),
            ];
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.CURSE_HAND,
                        strength: -2,
                        target: TargetTypes.OPPONENT,
                    },
                    playerNames: ['Tommy'],
                },
                'Timmy'
            );

            expect((newBoard.players[1].hand[0] as UnitCard).cost.Generic).toBe(
                0
            );
            expect((newBoard.players[1].hand[1] as UnitCard).cost.Generic).toBe(
                0
            );
        });
    });

    describe('Destroy resources', () => {
        it('destroys a specific resource', () => {
            board.players[1].resources = [
                makeResourceCard(Resource.BAMBOO),
                makeResourceCard(Resource.FIRE),
            ];
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.DESTROY_RESOURCE,
                        target: TargetTypes.ALL_OPPONENTS,
                        strength: 1,
                        resourceType: Resource.BAMBOO,
                    },
                    playerNames: ['Tommy'],
                },
                'Timmy'
            );

            expect(newBoard.players[1].resources[0].resourceType).toEqual(
                Resource.FIRE
            );
        });

        it('destroys a resource', () => {
            board.players[1].resources = [
                makeResourceCard(Resource.BAMBOO),
                makeResourceCard(Resource.FIRE),
            ];
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.DESTROY_RESOURCE,
                        target: TargetTypes.ALL_OPPONENTS,
                        strength: 1,
                    },
                    playerNames: ['Tommy'],
                },
                'Timmy'
            );

            expect(newBoard.players[1].resources).toHaveLength(1);
        });

        it('destroys a specific resource and feasts on it', () => {
            const squire = makeCard(UnitCards.SQUIRE);
            board.players[1].resources = [
                makeResourceCard(Resource.BAMBOO),
                makeResourceCard(Resource.FIRE),
            ];
            board.players[1].units = [squire];
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.DESTROY_RESOURCE_TO_GAIN_STATS,
                        target: TargetTypes.ALL_OPPONENTS,
                        strength: 1,
                        resourceType: Resource.BAMBOO,
                        sourceId: squire.id,
                    },
                    playerNames: ['Tommy'],
                },
                'Timmy'
            );

            expect(newBoard.players[1].resources[0].resourceType).toEqual(
                Resource.FIRE
            );
            expect(newBoard.players[1].units[0].hpBuff).toEqual(1);
            expect(newBoard.players[1].units[0].attackBuff).toEqual(1);
        });
    });

    describe('Destroy Unit', () => {
        it('puts the unit in the cemetery', () => {
            const squire = makeCard(UnitCards.SQUIRE);
            board.players[0].units = [squire];
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.DESTROY_UNIT,
                    },
                    unitCardIds: [squire.id],
                },
                'Timmy'
            );
            expect(newBoard.players[0].cemetery.splice(-1)[0].name).toBe(
                'Squire'
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
            expect(newBoard.gameState).toEqual(GameState.WIN);
        });
    });

    describe('Draw - mill to win', () => {
        it('makes the player draw out of cards and win', () => {
            const deckLength = board.players[0].deck.length;

            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.DRAW_MILL_WIN,
                        strength: deckLength,
                    },
                },
                'Timmy'
            );

            expect(newBoard.players[0].hand).toHaveLength(
                PlayerConstants.STARTING_HAND_SIZE + deckLength
            );
            expect(newBoard.players[0].deck).toEqual([]);
            expect(newBoard.players[1].isAlive).toEqual(false);
            expect(newBoard.gameState).toEqual(GameState.WIN);
        });

        it('draw no cards if strength is 0', () => {
            const deckLength = board.players[0].deck.length;

            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.DRAW_MILL_WIN,
                        strength: 0,
                    },
                },
                'Timmy'
            );

            expect(newBoard.players[0].hand).toHaveLength(
                PlayerConstants.STARTING_HAND_SIZE
            );
            expect(newBoard.players[0].deck).toHaveLength(deckLength);
        });
    });

    describe('Draw cards per unit', () => {
        it('draws cards for players', () => {
            const deckLength = board.players[0].deck.length;

            board.players[0].units = [makeCard(UnitCards.SHADOW_STRIKER)];
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.DRAW_PER_UNIT,
                    },
                },
                'Timmy'
            );

            expect(newBoard.players[0].hand).toHaveLength(
                PlayerConstants.STARTING_HAND_SIZE + 1
            );
            expect(newBoard.players[0].deck).toHaveLength(deckLength - 1);
        });

        it('makes the player draw out of cards and lose', () => {
            board.players[0].deck = board.players[0].deck.splice(0, 1);
            const deckLength = board.players[0].deck.length;

            board.players[0].units = [
                makeCard(UnitCards.SHADOW_STRIKER),
                makeCard(UnitCards.LONGBOWMAN),
            ];
            // test: the other player can have an empty deck too
            board.players[1].deck = [];

            const newBoard = resolveEffect(
                board,
                { effect: { type: EffectType.DRAW_PER_UNIT } },
                'Timmy'
            );

            expect(newBoard.players[0].hand).toHaveLength(
                PlayerConstants.STARTING_HAND_SIZE + deckLength
            );
            expect(newBoard.players[0].deck).toEqual([]);
            expect(newBoard.players[0].isAlive).toEqual(false);
            expect(newBoard.gameState).toEqual(GameState.WIN);
        });
    });

    describe('Draw cards until X cards', () => {
        it('draws nothing if already at X cards', () => {
            const deckLength = board.players[0].deck.length;

            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.DRAW_UNTIL,
                        strength: PlayerConstants.STARTING_HAND_SIZE,
                    },
                },
                'Timmy'
            );

            expect(newBoard.players[0].hand).toHaveLength(
                PlayerConstants.STARTING_HAND_SIZE
            );
            expect(newBoard.players[0].deck).toHaveLength(deckLength);
        });

        it('draws cards for players', () => {
            const deckLength = board.players[0].deck.length;

            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.DRAW_UNTIL,
                        strength: PlayerConstants.STARTING_HAND_SIZE + 3,
                    },
                },
                'Timmy'
            );

            expect(newBoard.players[0].hand).toHaveLength(
                PlayerConstants.STARTING_HAND_SIZE + 3
            );
            expect(newBoard.players[0].deck).toHaveLength(deckLength - 3);
        });

        it('makes the player draw out of cards and lose', () => {
            const deckLength = board.players[0].deck.length;

            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.DRAW_UNTIL,
                        strength:
                            PlayerConstants.STARTING_HAND_SIZE + deckLength + 1,
                    },
                },
                'Timmy'
            );

            expect(newBoard.players[0].hand).toHaveLength(
                PlayerConstants.STARTING_HAND_SIZE + deckLength
            );
            expect(newBoard.players[0].deck).toEqual([]);
            expect(newBoard.players[0].isAlive).toEqual(false);
            expect(newBoard.gameState).toEqual(GameState.WIN);
        });
    });

    describe('Deal Damage', () => {
        it('passes the turn to the next player if dealing lethal to self', () => {
            const boardWith4Players = makeNewBoard({
                playerNames: ['Timmy', 'Tommy', 'Tom', 'Monty'],
                startingPlayerIndex: 0,
            });
            const [timmy, tommy] = boardWith4Players.players;
            // tommy has no more cards left, so after timmy loses, tom should be alive
            tommy.deck = [];
            tommy.numCardsInDeck = 0;
            timmy.resourcePool = { [Resource.FIRE]: 2 };

            const newBoard = resolveEffect(
                boardWith4Players,
                {
                    effect: {
                        type: EffectType.DEAL_DAMAGE,
                        strength: 20,
                    },
                    playerNames: ['Timmy'],
                },
                'Timmy'
            );
            expect(newBoard.gameState).toEqual(GameState.PLAYING);
            expect(newBoard.players[0].isActivePlayer).toBe(false);
            expect(newBoard.players[0].resourcePool).toEqual({});
            expect(newBoard.players[1].isAlive).toBe(false);
            expect(newBoard.players[2].isActivePlayer).toBe(true);
        });

        it('ends the game if dealing lethal to multiple players', () => {
            const boardWith4Players = makeNewBoard({
                playerNames: ['Timmy', 'Tommy', 'Tom', 'Monty'],
                startingPlayerIndex: 0,
            });
            const [timmy, tommy] = boardWith4Players.players;
            // tommy has no more cards left, so after timmy loses, tom should be alive
            tommy.deck = [];
            tommy.numCardsInDeck = 0;
            timmy.resourcePool = { [Resource.FIRE]: 2 };

            const newBoard = resolveEffect(
                boardWith4Players,
                {
                    effect: {
                        type: EffectType.DEAL_DAMAGE,
                        strength: 20,
                    },
                    playerNames: ['Timmy', 'Tom', 'Monty'],
                },
                'Timmy'
            );
            expect(newBoard.gameState).toEqual(GameState.WIN);
        });

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

        it('does not deal damage to a unit with ethereal', () => {
            const squire = makeCard(UnitCards.SQUIRE);
            squire.passiveEffects = [PassiveEffect.ETHEREAL];
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
                UnitCards.SQUIRE.hp
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

    describe('Discard', () => {
        it('discards random cards', () => {
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.DISCARD_HAND,
                        strength: 2,
                        target: TargetTypes.ALL_PLAYERS,
                    },
                },
                'Timmy'
            );
            expect(newBoard.players[0].hand).toHaveLength(
                PlayerConstants.STARTING_HAND_SIZE - 2
            );
        });

        it('discards a whole hand', () => {
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.DISCARD_HAND,
                        strength: Number.MAX_SAFE_INTEGER,
                        target: TargetTypes.ALL_PLAYERS,
                    },
                },
                'Timmy'
            );
            expect(newBoard.players[0].hand).toHaveLength(0);
            expect(newBoard.players[0].cemetery).toHaveLength(
                PlayerConstants.STARTING_HAND_SIZE
            );
        });

        it('resets costs', () => {
            board.players[0].hand = [
                { ...makeUnitCard(UnitCards.ASSASSIN), cost: {} },
                { ...makeCard(SpellCards.A_GENTLE_GUST), cost: {} },
            ];

            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.DISCARD_HAND,
                        strength: Number.MAX_SAFE_INTEGER,
                        target: TargetTypes.ALL_PLAYERS,
                    },
                },
                'Timmy'
            );
            expect(newBoard.players[0].hand).toHaveLength(0);
            // cards are discarded in random order b/c of lodash's sampleSize, so we can't rely on order
            // e.g. expeting newBoard.players[0].cemetery[0] to always be UnitCards.ASSASSIN
            expect(
                (
                    newBoard.players[0].cemetery.find(
                        (card) => card.name === UnitCards.ASSASSIN.name
                    ) as UnitCard
                ).cost
            ).toEqual(UnitCards.ASSASSIN.cost);
            expect(
                (
                    newBoard.players[0].cemetery.find(
                        (card) => card.name === SpellCards.A_GENTLE_GUST.name
                    ) as UnitCard
                ).cost
            ).toEqual(SpellCards.A_GENTLE_GUST.cost);
        });

        it('broadcasts what was discarded', () => {
            const mockAddSystemChat = jest.fn();
            board.players[0].hand = [
                makeCard(UnitCards.ASSASSIN),
                makeCard(UnitCards.ASSASSIN),
            ];
            resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.DISCARD_HAND,
                        strength: 2,
                        target: TargetTypes.SELF_PLAYER,
                    },
                },
                'Timmy',
                false,
                mockAddSystemChat
            );
            expect(mockAddSystemChat).toHaveBeenNthCalledWith(
                2,
                'Timmy discarded [[Assassin]], [[Assassin]]'
            );
        });
    });

    describe('Extract', () => {
        it('extracts cards from a deck', () => {
            board.players[0].deck.push(makeResourceCard(Resource.WATER));
            board.players[0].deck.push(makeResourceCard(Resource.WATER));
            board.players[1].deck.push(makeResourceCard(Resource.WATER));
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.EXTRACT_CARD,
                        cardName: 'Water',
                        strength: 2,
                        target: TargetTypes.ALL_PLAYERS,
                    },
                },
                'Timmy'
            );
            expect(newBoard.players[0].hand).toHaveLength(
                PlayerConstants.STARTING_HAND_SIZE + 3
            );
        });
    });

    describe('Flicker', () => {
        it('resets health and buffs', () => {
            const unitCard = makeCard(UnitCards.CANNON);
            unitCard.attackBuff = 3;
            unitCard.oneCycleAttackBuff = 2;
            unitCard.oneTurnAttackBuff = 1;
            unitCard.hp = 1;
            board.players[0].units = [unitCard];
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.FLICKER,
                    },
                    unitCardIds: [unitCard.id],
                },
                'Timmy'
            );
            const cannon = newBoard.players[0].units[0];
            expect(cannon.hp).toBe(UnitCards.CANNON.totalHp);
            expect(cannon.attackBuff).toBe(0);
            expect(cannon.oneCycleAttackBuff).toBe(0);
            expect(cannon.oneTurnAttackBuff).toBe(0);
        });

        it('retriggers "Enter the Board" effects', () => {
            const unitCard = makeCard(UnitCards.FIRE_MAGE);
            board.players[0].units = [unitCard];
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.FLICKER,
                    },
                    unitCardIds: [unitCard.id],
                },
                'Timmy'
            );
            expect(newBoard.players[0].effectQueue).toMatchObject(
                unitCard.enterEffects.reverse()
            );
        });
    });

    describe('Grant effects', () => {
        it('grants quick', () => {
            const squire1 = makeUnitCard(UnitCards.SQUIRE);
            const squire2 = makeUnitCard(UnitCards.SQUIRE);
            squire1.isFresh = false;
            squire1.numAttacksLeft = 0;
            board.players[0].units = [squire1, squire2];
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.GRANT_PASSIVE_EFFECT,
                        target: TargetTypes.ALL_UNITS,
                        passiveEffects: [PassiveEffect.QUICK],
                    },
                },
                'Timmy'
            );
            expect(newBoard.players[0].units[0].numAttacksLeft).toEqual(0);
            expect(newBoard.players[0].units[1].passiveEffects).toEqual([
                PassiveEffect.QUICK,
            ]);
            expect(newBoard.players[0].units[1].numAttacksLeft).toEqual(1);
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

    describe('Learn', () => {
        it('adds cards to hand', () => {
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.LEARN,
                        cardName: 'LANCER',
                        strength: 2,
                        target: TargetTypes.ALL_PLAYERS,
                    },
                },
                'Timmy'
            );
            expect(newBoard.players[0].hand).toHaveLength(
                PlayerConstants.STARTING_HAND_SIZE + 2
            );
        });
    });

    describe('Mill', () => {
        it('mills from the top of the deck', () => {
            const expectedCardNameToMill =
                board.players[0].deck[board.players[0].deck.length - 1].name;
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.MILL,
                        strength: 5,
                        target: TargetTypes.ALL_PLAYERS,
                    },
                },
                'Timmy'
            );
            expect(newBoard.players[0].cemetery[4].name).toBe(
                expectedCardNameToMill
            );
        });
    });

    describe('Polymorph', () => {
        it('turns a unit into a token', () => {
            board.players[1].units.push(makeCard(UnitCards.KNIGHT_TEMPLAR));
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.POLYMORPH,
                        summonType: Tokens.MANTA_RAY,
                        target: TargetTypes.ALL_OPPOSING_UNITS,
                    },
                },
                'Timmy'
            );
            expect(newBoard.players[1].units[0].name).toBe('Manta Ray');
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

        it('comes in tapped', () => {
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.RAMP,
                        strength: 1,
                        resourceType: Resource.CRYSTAL,
                    },
                },
                'Timmy'
            );
            expect(newBoard.players[0].resources[0].isUsed).toBe(true);
        });
    });

    describe('Ramp for Turn', () => {
        it('increases resources deployed', () => {
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.RAMP_FOR_TURN,
                        strength: 2,
                        resourceType: Resource.CRYSTAL,
                    },
                },
                'Timmy'
            );
            expect(newBoard.players[0].resourcePool.Crystal).toEqual(2);
        });

        it('adds to an already deployed resource', () => {
            board.players[0].resourcePool.Crystal = 2;
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.RAMP_FOR_TURN,
                        strength: 1,
                        resourceType: Resource.CRYSTAL,
                    },
                },
                'Timmy'
            );
            expect(newBoard.players[0].resourcePool.Crystal).toEqual(3);
        });
    });

    describe('Ramp From Hand', () => {
        it('increases resources deployed', () => {
            board.players[0].hand = [makeResourceCard(Resource.CRYSTAL)];
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.RAMP_FROM_HAND,
                        strength: 2,
                        resourceType: Resource.CRYSTAL,
                    },
                },
                'Timmy'
            );
            expect(newBoard.players[0].resources).toHaveLength(1);
            expect(newBoard.players[0].resources[0].name).toBe(
                Resource.CRYSTAL
            );
        });

        it('comes in tapped', () => {
            board.players[0].hand = [makeResourceCard(Resource.CRYSTAL)];
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.RAMP_FROM_HAND,
                        strength: 1,
                        resourceType: Resource.CRYSTAL,
                    },
                },
                'Timmy'
            );
            expect(newBoard.players[0].resources[0].isUsed).toBe(true);
        });
    });

    describe('Return from cemetery', () => {
        it('returns from cemetery', () => {
            board.players[0].cemetery.push(makeCard(UnitCards.KNIGHT_TEMPLAR));
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.RETURN_FROM_CEMETERY,
                        strength: 2,
                        cardName: 'Knight Templar',
                    },
                },
                'Timmy'
            );
            expect(newBoard.players[0].hand).toHaveLength(
                PlayerConstants.STARTING_HAND_SIZE + 1
            );
        });
    });

    describe('Revive units', () => {
        it('mass revives all units in your cemetery', () => {
            const knight1 = makeCard(UnitCards.KNIGHT_TEMPLAR);
            const knight2 = makeCard(UnitCards.KNIGHT_TEMPLAR);
            board.players[0].cemetery = [knight1, knight2];
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.REVIVE,
                        strength: 2,
                        target: TargetTypes.ALL_SELF_UNITS_CEMETERY,
                    },
                },
                'Timmy'
            );
            expect(newBoard.players[0].units).toHaveLength(2);
            expect(newBoard.players[0].cemetery).toHaveLength(0);
        });

        it('triggers any enter the board effects', () => {
            const fireMage = makeCard(UnitCards.FIRE_MAGE);
            const waterGuardian = makeCard(UnitCards.WATER_GUARDIAN);
            board.players[0].cemetery = [fireMage, waterGuardian];
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.REVIVE,
                        strength: 2,
                        target: TargetTypes.ALL_SELF_UNITS_CEMETERY,
                    },
                },
                'Timmy'
            );
            expect(newBoard.players[0].effectQueue).toHaveLength(3);
        });
    });

    describe('Shuffle from hand', () => {
        it('shuffles X cards from hand into a players deck', () => {
            board.players[0].hand = [
                makeCard(UnitCards.CANNON),
                makeCard(UnitCards.CANNON),
                makeCard(UnitCards.CANNON),
            ];
            const deckLength = board.players[1].deck.length;

            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.SHUFFLE_FROM_HAND,
                        strength: 2,
                        cardName: 'Cannon',
                        target: TargetTypes.OPPONENT,
                    },
                    playerNames: ['Tommy'],
                },
                'Timmy'
            );

            expect(newBoard.players[0].hand).toHaveLength(1);
            expect(newBoard.players[1].deck).toHaveLength(deckLength + 2);
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

    describe('Transmute', () => {
        it('turns one card into another', () => {
            board.players[0].hand = [makeCard(UnitCards.SQUIRE)];
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.TRANSMUTE,
                        cardName: 'Squire',
                        secondaryCardName: 'Assassin',
                    },
                },
                'Timmy'
            );
            expect(newBoard.players[0].hand[0].name).toBe('Assassin');
        });
    });

    describe('Tuck', () => {
        it('puts a card on top of the deck', () => {
            const squire = makeCard(UnitCards.SQUIRE);
            board.players[0].units = [squire];
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.TUCK,
                    },
                    unitCardIds: [squire.id],
                },
                'Timmy'
            );
            expect(newBoard.players[0].deck.splice(-1)[0].name).toBe('Squire');
        });

        it('puts a card on the bottom of the deck and makes the owner draw', () => {
            const squire = makeCard(UnitCards.SQUIRE);
            board.players[0].units = [squire];
            const newBoard = resolveEffect(
                board,
                {
                    effect: {
                        type: EffectType.TUCK_BOTTOM_AND_DRAW,
                    },
                    unitCardIds: [squire.id],
                },
                'Timmy'
            );
            expect(newBoard.players[0].deck[0].name).toBe('Squire');
            expect(newBoard.players[0].hand).toHaveLength(8);
        });
    });

    describe('Effect requirements', () => {
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
});
