import { SpellCards } from '@/mocks/spells';
import { UnitCards } from '@/mocks/units';
import { PlayerConstants } from '@/constants/gameConstants';
import { makeNewBoard } from '@/factories/board';
import { makeCard, makeResourceCard } from '@/factories/cards';
import { Board, GameState } from '@/types/board';
import { GameActionTypes } from '@/types/gameActions';
import { Resource } from '@/types/resources';
import { applyGameAction } from './gameEngine';
import { AdvancedResourceCards } from '@/cardDb/resources/advancedResources';
import { EffectType, PassiveEffect } from '@/types/effects';
import { Format } from '@/types/games';

describe('Game Action', () => {
    let board: Board;

    beforeEach(() => {
        board = makeNewBoard({
            playerNames: ['Timmy', 'Tommy', 'Bobby'],
            startingPlayerIndex: 0,
        });
    });

    it('short-circuits if the player is not the active player', () => {
        const newBoardState = applyGameAction({
            board,
            gameAction: { type: GameActionTypes.PASS_TURN },
            playerName: 'Tommy',
        });
        expect(newBoardState).toEqual(board);
    });

    describe('Mulligans', () => {
        beforeEach(() => {
            board.gameState = GameState.MULLIGANING;
        });

        it('displays chat messages', () => {
            const mockAddChatMessage = jest.fn();
            const newBoardState = applyGameAction({
                board,
                gameAction: { type: GameActionTypes.ACCEPT_MULLIGAN },
                playerName: 'Timmy',
                addChatMessage: mockAddChatMessage,
            });
            applyGameAction({
                board: newBoardState,
                gameAction: { type: GameActionTypes.REJECT_MULLIGAN },
                playerName: 'Tommy',
                addChatMessage: mockAddChatMessage,
            });

            expect(mockAddChatMessage).toHaveBeenNthCalledWith(
                1,
                'Timmy has accepted a hand of 7 cards'
            );
            expect(mockAddChatMessage).toHaveBeenNthCalledWith(
                2,
                'Tommy has thrown back a hand of 7 cards and is going down to 6 cards'
            );
        });

        it('starts the game when everyone has accepted a mulligan', () => {
            let newBoardState = applyGameAction({
                board,
                gameAction: { type: GameActionTypes.ACCEPT_MULLIGAN },
                playerName: 'Timmy',
            });
            newBoardState = applyGameAction({
                board: newBoardState,
                gameAction: { type: GameActionTypes.ACCEPT_MULLIGAN },
                playerName: 'Tommy',
            });
            newBoardState = applyGameAction({
                board: newBoardState,
                gameAction: { type: GameActionTypes.ACCEPT_MULLIGAN },
                playerName: 'Bobby',
            });

            expect(
                newBoardState.players.filter((player) => player.readyToStart)
            ).toHaveLength(3);
            expect(newBoardState.gameState).toEqual(GameState.PLAYING);
        });

        it('goes down a card for each mulligan', () => {
            let newBoardState = applyGameAction({
                board,
                gameAction: { type: GameActionTypes.ACCEPT_MULLIGAN },
                playerName: 'Timmy',
            });
            newBoardState = applyGameAction({
                board: newBoardState,
                gameAction: { type: GameActionTypes.REJECT_MULLIGAN },
                playerName: 'Tommy',
            });
            newBoardState = applyGameAction({
                board: newBoardState,
                gameAction: { type: GameActionTypes.ACCEPT_MULLIGAN },
                playerName: 'Bobby',
            });
            newBoardState = applyGameAction({
                board: newBoardState,
                gameAction: { type: GameActionTypes.REJECT_MULLIGAN },
                playerName: 'Tommy',
            });
            newBoardState = applyGameAction({
                board: newBoardState,
                gameAction: { type: GameActionTypes.ACCEPT_MULLIGAN },
                playerName: 'Tommy',
            });

            expect(
                newBoardState.players.filter((player) => player.readyToStart)
            ).toHaveLength(3);
            expect(newBoardState.players[1].hand).toHaveLength(
                PlayerConstants.STARTING_HAND_SIZE - 1 // Tommy mulligans 2 away, but draws 1
            );
            expect(newBoardState.gameState).toEqual(GameState.PLAYING);
        });
    });

    describe('Pass Turn', () => {
        it("resets the active player's resource pool", () => {
            board.players[0].resourcePool = { [Resource.CRYSTAL]: 1 };
            const newBoardState = applyGameAction({
                board,
                gameAction: { type: GameActionTypes.PASS_TURN },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[0].resourcePool).toEqual({});
        });

        it('passes the turn over to the next player', () => {
            const newBoardState = applyGameAction({
                board,
                gameAction: { type: GameActionTypes.PASS_TURN },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[0].isActivePlayer).toEqual(false);
            expect(newBoardState.players[1].isActivePlayer).toEqual(true);
        });

        it("untaps the next player's resources", () => {
            const resourceCard = makeResourceCard(Resource.FIRE);
            board.players[1].resources = [resourceCard];
            resourceCard.isUsed = true;

            const newBoardState = applyGameAction({
                board,
                gameAction: { type: GameActionTypes.PASS_TURN },
                playerName: 'Timmy',
            });

            expect(newBoardState.players[1].resources[0].isUsed).toEqual(false);
        });

        it("resets the number of attacks for the next player's units", () => {
            board.players[1].units.push(makeCard(UnitCards.SQUIRE));
            const newBoardState = applyGameAction({
                board,
                gameAction: { type: GameActionTypes.PASS_TURN },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[1].units[0].numAttacksLeft).toEqual(1);
        });

        it('makes the next player draw a card', () => {
            const cardsInDeckBefore = board.players[1].deck;
            const cardsInHandBefore = board.players[1].hand;
            const newBoardState = applyGameAction({
                board,
                gameAction: { type: GameActionTypes.PASS_TURN },
                playerName: 'Timmy',
            });

            const nextPlayer = newBoardState.players[1];

            expect(nextPlayer.deck).toEqual(
                cardsInDeckBefore.slice(0, cardsInDeckBefore.length - 1)
            );
            expect(nextPlayer.hand).toEqual([
                ...cardsInHandBefore,
                cardsInDeckBefore[cardsInDeckBefore.length - 1],
            ]);
        });

        it('makes the next player lose if there is nothing left to draw', () => {
            board.players[1].deck = [];
            const newBoardState = applyGameAction({
                board,
                gameAction: { type: GameActionTypes.PASS_TURN },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[1].isAlive).toBe(false);
        });

        it('skips to the 3rd player if the 2nd player loses by drawing out', () => {
            board.players[1].deck = [];
            const cardsInDeckBefore = board.players[2].deck;
            const newBoardState = applyGameAction({
                board,
                gameAction: { type: GameActionTypes.PASS_TURN },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[2].deck.length).toEqual(
                cardsInDeckBefore.length - 1
            );
        });

        it('ends the game if everyone draws out (except for the current player)', () => {
            board.players[1].deck = [];
            board.players[2].deck = [];
            const newBoardState = applyGameAction({
                board,
                gameAction: { type: GameActionTypes.PASS_TURN },
                playerName: 'Timmy',
            });
            expect(newBoardState.gameState).toBe(GameState.WIN);
        });

        it('lets the next player deploy a new resource', () => {
            board.players[1].resourcesLeftToDeploy = 0;
            const newBoardState = applyGameAction({
                board,
                gameAction: { type: GameActionTypes.PASS_TURN },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[1].resourcesLeftToDeploy).toBe(1);
        });
    });

    describe('Deploy Resource', () => {
        it('deploys a resource', () => {
            const resourceCard = makeResourceCard(Resource.BAMBOO);
            board.players[0].hand = [resourceCard];
            board.players[0].numCardsInHand = 1;
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.DEPLOY_RESOURCE,
                    cardId: resourceCard.id,
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[0].resources).toHaveLength(1);
            expect(newBoardState.players[0].hand).toHaveLength(0);
            expect(newBoardState.players[0].resourcesLeftToDeploy).toBe(0);
        });

        it('is limited to 1 per turn', () => {
            const resourceCard = makeResourceCard(Resource.BAMBOO);
            const resourceCard2 = makeResourceCard(Resource.FIRE);
            board.players[0].hand = [resourceCard, resourceCard2];
            let newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.DEPLOY_RESOURCE,
                    cardId: resourceCard.id,
                },
                playerName: 'Timmy',
            });

            newBoardState = applyGameAction({
                board: newBoardState,
                gameAction: {
                    type: GameActionTypes.DEPLOY_RESOURCE,
                    cardId: resourceCard2.id,
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[0].resources).toHaveLength(1);
            expect(newBoardState.players[0].resourcesLeftToDeploy).toBe(0);
        });

        it('applies effects', () => {
            const resourceCard = makeCard(AdvancedResourceCards.SAHARAN_DESERT);
            board.players[0].hand = [resourceCard];
            board.players[0].numCardsInHand = 1;
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.DEPLOY_RESOURCE,
                    cardId: resourceCard.id,
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[0].effectQueue).toHaveLength(1);
        });

        it('comes in tapped', () => {
            const resourceCard = makeCard(AdvancedResourceCards.COASTAL_CASTLE);
            board.players[0].hand = [resourceCard];
            board.players[0].numCardsInHand = 1;
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.DEPLOY_RESOURCE,
                    cardId: resourceCard.id,
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[0].resources[0].isUsed).toBe(true);
        });
    });

    describe('Tap Resource', () => {
        it('taps a resource', () => {
            const resourceCard = makeResourceCard(Resource.BAMBOO);
            board.players[0].resources = [resourceCard];
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.TAP_RESOURCE,
                    cardId: resourceCard.id,
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[0].resources[0].isUsed).toBe(true);
            expect(newBoardState.players[0].resourcePool).toEqual({
                [Resource.BAMBOO]: 1,
            });
        });

        it('taps a dual resource', () => {
            const resourceCard = makeCard(AdvancedResourceCards.SAHARAN_DESERT);
            board.players[0].resources = [resourceCard];
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.TAP_RESOURCE,
                    cardId: resourceCard.id,
                    resourceType: resourceCard.secondaryResourceType,
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[0].resources[0].isUsed).toBe(true);
            expect(newBoardState.players[0].resourcePool).toEqual({
                [resourceCard.secondaryResourceType]: 1,
            });
        });

        it('does nothing if the resource is tapped', () => {
            const resourceCard = makeResourceCard(Resource.BAMBOO);
            resourceCard.isUsed = true;
            board.players[0].resources = [resourceCard];
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.TAP_RESOURCE,
                    cardId: resourceCard.id,
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[0].resources[0].isUsed).toBe(true);
            expect(newBoardState.players[0].resourcePool).toEqual({});
        });
    });

    describe('Deploy Unit', () => {
        it('deploys a unit', () => {
            const unitCard = makeCard(UnitCards.CANNON);
            board.players[0].hand = [unitCard];
            board.players[0].numCardsInHand = 1;
            board.players[0].resourcePool = {
                [Resource.FIRE]: 2,
                [Resource.IRON]: 3,
            };
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.DEPLOY_UNIT,
                    cardId: unitCard.id,
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[0].hand).toEqual([]);
            expect(newBoardState.players[0].units[0]).toEqual(unitCard);
        });

        it('emits a chat message', () => {
            const mockAddChatMessage = jest.fn();
            const unitCard = makeCard(UnitCards.CANNON);
            board.players[0].hand = [unitCard];
            board.players[0].numCardsInHand = 1;
            board.players[0].resourcePool = {
                [Resource.FIRE]: 2,
                [Resource.IRON]: 3,
            };

            applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.DEPLOY_UNIT,
                    cardId: unitCard.id,
                },
                playerName: 'Timmy',
                addChatMessage: mockAddChatMessage,
            });
            expect(mockAddChatMessage).toHaveBeenCalledWith(
                'Timmy played [[Cannon]]'
            );
        });

        it('causes an "enter the board" effect', () => {
            const unitCard = makeCard(UnitCards.MARTIAL_TRAINER);
            board.players[0].hand = [unitCard];
            board.players[0].resourcePool = {
                [Resource.FIRE]: 2,
                [Resource.IRON]: 3,
            };
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.DEPLOY_UNIT,
                    cardId: unitCard.id,
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[0].effectQueue).toEqual(
                unitCard.enterEffects.reverse()
            );
        });

        it('does not deploy a unit when the player cannot pay for it', () => {
            const unitCard = makeCard(UnitCards.CANNON);
            board.players[0].hand = [unitCard];
            board.players[0].numCardsInHand = 1;
            board.players[0].resourcePool = {
                [Resource.FIRE]: 2,
                [Resource.IRON]: 2,
            };
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.DEPLOY_UNIT,
                    cardId: unitCard.id,
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[0].hand).toEqual([unitCard]);
            expect(newBoardState.players[0].numCardsInHand).toBe(1);
            expect(newBoardState.players[0].units).toHaveLength(0);
        });

        it('destroys previous legendary units', () => {
            const unitCard = makeCard(UnitCards.JOAN_OF_ARC_FOLK_HERO);
            const unitCard2 = makeCard(UnitCards.JAVELINEER);
            const previousUnitCard = makeCard(UnitCards.JOAN_OF_ARC_FOLK_HERO);
            board.players[0].hand = [unitCard];
            board.players[0].units = [previousUnitCard, unitCard2];
            board.players[0].numCardsInHand = 1;
            board.players[0].resourcePool = {
                [Resource.FIRE]: 2,
                [Resource.IRON]: 6,
            };
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.DEPLOY_UNIT,
                    cardId: unitCard.id,
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[0].hand).toEqual([]);
            expect(newBoardState.players[0].units[1]).toEqual(unitCard);
            expect(newBoardState.players[0].units).toHaveLength(2);
        });
    });

    describe('Perform Attack', () => {
        it("doesn't attack if it has no attacks left", () => {
            const attacker = makeCard(UnitCards.SQUIRE);
            attacker.numAttacksLeft = 0;
            const defender = makeCard(UnitCards.SQUIRE);
            board.players[0].units = [attacker];
            board.players[1].units = [defender];
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.PERFORM_ATTACK,
                    cardId: attacker.id,
                    unitTarget: defender.id,
                },
                playerName: 'Timmy',
            });
            expect(newBoardState).toEqual(board);
        });

        it('broadcasts a chat message (attacking another unit)', () => {
            const mockAddChatMessage = jest.fn();
            const attacker = makeCard(UnitCards.LANCER);
            attacker.numAttacksLeft = 1;
            const defender = makeCard(UnitCards.SQUIRE);
            board.players[0].units = [attacker];
            board.players[1].units = [defender];

            applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.PERFORM_ATTACK,
                    cardId: attacker.id,
                    unitTarget: defender.id,
                },
                playerName: 'Timmy',
                addChatMessage: mockAddChatMessage,
            });

            expect(mockAddChatMessage).toHaveBeenNthCalledWith(
                1,
                '[[Lancer]] (Timmy) ⚔️⚔️ [[Squire]] (Tommy)'
            );
            expect(mockAddChatMessage).toHaveBeenNthCalledWith(
                2,
                '[[Lancer]] (Timmy) went to the cemetery'
            );
        });

        it('performs a melee attack (non-lethal)', () => {
            const attacker = makeCard(UnitCards.SQUIRE);
            attacker.numAttacksLeft = 1;
            const defender = makeCard(UnitCards.SQUIRE);
            board.players[0].units = [attacker];
            board.players[1].units = [defender];
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.PERFORM_ATTACK,
                    cardId: attacker.id,
                    unitTarget: defender.id,
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[0].units[0].hp).toEqual(1);
            expect(newBoardState.players[0].units[0].numAttacksLeft).toEqual(0);
            expect(newBoardState.players[1].units[0].hp).toEqual(1);
        });

        it('performs a melee attack (non-lethal b/c of buffs)', () => {
            const attacker = makeCard(UnitCards.LANCER);
            attacker.numAttacksLeft = 1;
            attacker.hpBuff = 2;
            const defender = makeCard(UnitCards.LANCER);
            defender.hpBuff = 2;
            board.players[0].units = [attacker];
            board.players[1].units = [defender];
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.PERFORM_ATTACK,
                    cardId: attacker.id,
                    unitTarget: defender.id,
                },
                playerName: 'Timmy',
            });
            // hp = -1, but not in cemetery b/c of buffs
            expect(newBoardState.players[0].units[0].hp).toEqual(-1);
            expect(newBoardState.players[0].units[0].numAttacksLeft).toEqual(0);
            // hp = -1, but not in cemetery b/c of buffs
            expect(newBoardState.players[1].units[0].hp).toEqual(-1);
        });

        it('performs a melee attack (no damage because of attack nerfs)', () => {
            const attacker = makeCard(UnitCards.SQUIRE);
            attacker.attackBuff = -3;
            attacker.numAttacksLeft = 1;
            const defender = makeCard(UnitCards.SQUIRE);
            defender.attackBuff = -4;
            board.players[0].units = [attacker];
            board.players[1].units = [defender];

            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.PERFORM_ATTACK,
                    cardId: attacker.id,
                    unitTarget: defender.id,
                },
                playerName: 'Timmy',
            });

            expect(newBoardState.players[0].units[0].hp).toEqual(attacker.hp);
            expect(newBoardState.players[1].units[0].hp).toEqual(defender.hp);
        });

        it('performs a melee attack (lethal for both)', () => {
            const attacker = makeCard(UnitCards.LANCER);
            attacker.numAttacksLeft = 1;
            const defender = makeCard(UnitCards.MARTIAL_TRAINER);
            board.players[0].units = [attacker];
            board.players[1].units = [defender];
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.PERFORM_ATTACK,
                    cardId: attacker.id,
                    unitTarget: defender.id,
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[0].cemetery[0].name).toEqual(
                attacker.name
            );
            expect(newBoardState.players[0].units).toHaveLength(0);
            expect(newBoardState.players[1].cemetery[0].name).toEqual(
                defender.name
            );
            expect(newBoardState.players[1].units).toHaveLength(0);
        });

        it('performs a melee attack (lethal for attacker)', () => {
            const attacker = makeCard(UnitCards.LANCER);
            attacker.numAttacksLeft = 1;
            const defender = makeCard(UnitCards.CANNON);
            board.players[0].units = [attacker];
            board.players[1].units = [defender];
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.PERFORM_ATTACK,
                    cardId: attacker.id,
                    unitTarget: defender.id,
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[0].cemetery[0].name).toEqual(
                attacker.name
            );
            expect(newBoardState.players[0].units).toHaveLength(0);
            expect(newBoardState.players[1].units[0].hp).toEqual(
                defender.hp - attacker.attack
            );
        });

        it('performs a melee attack (lethal for defender)', () => {
            const attacker = makeCard(UnitCards.KNIGHT_TEMPLAR);
            attacker.numAttacksLeft = 1;
            const defender = makeCard(UnitCards.LANCER);
            board.players[0].units = [attacker];
            board.players[1].units = [defender];
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.PERFORM_ATTACK,
                    cardId: attacker.id,
                    unitTarget: defender.id,
                },
                playerName: 'Timmy',
            });

            expect(newBoardState.players[0].units[0].hp).toEqual(
                attacker.hp - defender.attack
            );
            expect(newBoardState.players[1].cemetery[0].name).toEqual(
                defender.name
            );
            expect(newBoardState.players[1].units).toHaveLength(0);
        });

        it('performs a ranged attack (lethal vs. melee)', () => {
            const attacker = makeCard(UnitCards.STONE_SLINGER);
            attacker.numAttacksLeft = 1;
            const defender = makeCard(UnitCards.MARTIAL_TRAINER);
            board.players[0].units = [attacker];
            board.players[1].units = [defender];
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.PERFORM_ATTACK,
                    cardId: attacker.id,
                    unitTarget: defender.id,
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[0].units[0].hp).toEqual(attacker.hp);
            expect(newBoardState.players[1].cemetery[0].name).toEqual(
                defender.name
            );
            expect(newBoardState.players[1].units).toHaveLength(0);
        });

        it('performs a ranged attack (lethal for defender through poisonous)', () => {
            const attacker = makeCard(UnitCards.BOUNTY_COLLECTOR);
            attacker.numAttacksLeft = 1;
            const defender = makeCard(UnitCards.SQUIRE);
            defender.hpBuff = 3;
            board.players[0].units = [attacker];
            board.players[1].units = [defender];
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.PERFORM_ATTACK,
                    cardId: attacker.id,
                    unitTarget: defender.id,
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[0].units).toHaveLength(1);
            expect(newBoardState.players[1].cemetery[0].name).toEqual(
                defender.name
            );
            expect(newBoardState.players[1].units).toHaveLength(0);
        });

        it('does not have lethal if the poisonous card is debuffed', () => {
            const attacker = makeCard(UnitCards.BOUNTY_COLLECTOR);
            attacker.attackBuff = -2;
            attacker.numAttacksLeft = 1;
            const defender = makeCard(UnitCards.SQUIRE);
            defender.hpBuff = 3;
            board.players[0].units = [attacker];
            board.players[1].units = [defender];
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.PERFORM_ATTACK,
                    cardId: attacker.id,
                    unitTarget: defender.id,
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[0].units).toHaveLength(1);
            expect(newBoardState.players[1].cemetery).toHaveLength(0);
            expect(newBoardState.players[1].units).toHaveLength(1);
        });

        it('performs a ranged attack (lethal for both through poisonous)', () => {
            const attacker = makeCard(UnitCards.BOUNTY_COLLECTOR);
            attacker.numAttacksLeft = 1;
            const defender = makeCard(UnitCards.BOUNTY_COLLECTOR);
            board.players[0].units = [attacker];
            board.players[1].units = [defender];
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.PERFORM_ATTACK,
                    cardId: attacker.id,
                    unitTarget: defender.id,
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[0].cemetery[0].name).toEqual(
                attacker.name
            );
            expect(newBoardState.players[0].units).toHaveLength(0);
            expect(newBoardState.players[1].cemetery[0].name).toEqual(
                defender.name
            );
            expect(newBoardState.players[1].units).toHaveLength(0);
        });

        it('performs a ranged attack (lethal for both vs. ranged)', () => {
            const attacker = makeCard(UnitCards.STONE_SLINGER);
            attacker.numAttacksLeft = 1;
            const defender = makeCard(UnitCards.SHADOW_STRIKER);
            board.players[0].units = [attacker];
            board.players[1].units = [defender];
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.PERFORM_ATTACK,
                    cardId: attacker.id,
                    unitTarget: defender.id,
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[0].cemetery[0].name).toEqual(
                attacker.name
            );
            expect(newBoardState.players[0].units).toHaveLength(0);
            expect(newBoardState.players[1].cemetery[0].name).toEqual(
                defender.name
            );
            expect(newBoardState.players[1].units).toHaveLength(0);
        });

        it('prevents non-magical attacks vs. non-soldiers (if soldiers are present for defender)', () => {
            const attacker = makeCard(UnitCards.STONE_SLINGER);
            attacker.numAttacksLeft = 1;
            const defender = makeCard(UnitCards.SHADOW_STRIKER);
            const defender2 = makeCard(UnitCards.LANCER);
            board.players[0].units = [attacker];
            board.players[1].units = [defender, defender2];
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.PERFORM_ATTACK,
                    cardId: attacker.id,
                    unitTarget: defender.id,
                },
                playerName: 'Timmy',
            });
            expect(newBoardState).toEqual(board);
        });

        it('does not prevent magical attacks vs. non-soldiers', () => {
            const attacker = makeCard(UnitCards.WATER_GUARDIAN);
            attacker.numAttacksLeft = 1;
            const defender = makeCard(UnitCards.LONGBOWMAN);
            const defender2 = makeCard(UnitCards.LANCER);
            board.players[0].units = [attacker];
            board.players[1].units = [defender, defender2];
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.PERFORM_ATTACK,
                    cardId: attacker.id,
                    unitTarget: defender.id,
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[0].units[0].hp).toEqual(
                attacker.hp - defender.attack
            );
            expect(newBoardState.players[1].cemetery[0].name).toEqual(
                defender.name
            );
            expect(newBoardState.players[1].units).toHaveLength(1);
        });

        it('attacks the opposing player', () => {
            const attacker = makeCard(UnitCards.WATER_GUARDIAN);
            attacker.numAttacksLeft = 1;
            board.players[0].units = [attacker];
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.PERFORM_ATTACK,
                    cardId: attacker.id,
                    playerTarget: 'Tommy',
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[1].health).toEqual(
                PlayerConstants.STARTING_HEALTH - attacker.attack
            );
            expect(newBoardState.players[0].units[0].numAttacksLeft).toEqual(0);
        });

        it('attacks the opposing player', () => {
            const attacker = makeCard(UnitCards.WATER_GUARDIAN);
            attacker.damagePlayerEffects = [
                { type: EffectType.BLOOM, resourceType: Resource.WATER },
            ];
            attacker.numAttacksLeft = 1;
            board.players[0].units = [attacker];
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.PERFORM_ATTACK,
                    cardId: attacker.id,
                    playerTarget: 'Tommy',
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[0].effectQueue).toEqual([
                { type: EffectType.BLOOM, resourceType: Resource.WATER },
            ]);
        });

        it('deals zero damage if buffed below 0 attack', () => {
            const attacker = makeCard(UnitCards.WATER_GUARDIAN);
            attacker.attackBuff = -7;
            attacker.numAttacksLeft = 1;
            board.players[0].units = [attacker];
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.PERFORM_ATTACK,
                    cardId: attacker.id,
                    playerTarget: 'Tommy',
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[1].health).toEqual(
                PlayerConstants.STARTING_HEALTH
            );
            expect(newBoardState.players[0].units[0].numAttacksLeft).toEqual(0);
        });

        it('broadcasts that it attacks the opposing player in chat', () => {
            const mockAddChatMessage = jest.fn();
            const attacker = makeCard(UnitCards.WATER_GUARDIAN);
            attacker.numAttacksLeft = 1;
            board.players[0].units = [attacker];

            applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.PERFORM_ATTACK,
                    cardId: attacker.id,
                    playerTarget: 'Tommy',
                },
                playerName: 'Timmy',
                addChatMessage: mockAddChatMessage,
            });

            expect(mockAddChatMessage).toHaveBeenCalledWith(
                '[[Water Guardian]] (Timmy) 🪄🪄 Tommy'
            );
        });

        it('attacks the opposing player (attack buff)', () => {
            const attacker = makeCard(UnitCards.WATER_GUARDIAN);
            attacker.attackBuff = 3;
            attacker.numAttacksLeft = 1;
            board.players[0].units = [attacker];
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.PERFORM_ATTACK,
                    cardId: attacker.id,
                    playerTarget: 'Tommy',
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[1].health).toEqual(
                PlayerConstants.STARTING_HEALTH -
                    attacker.attack -
                    attacker.attackBuff
            );
            expect(newBoardState.players[0].units[0].numAttacksLeft).toEqual(0);
        });

        it('deals lethal damage to opposing player', () => {
            const attacker = makeCard(UnitCards.WATER_GUARDIAN);
            attacker.numAttacksLeft = 1;
            board.players[0].units = [attacker];
            board.players[1].health = attacker.attack;
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.PERFORM_ATTACK,
                    cardId: attacker.id,
                    playerTarget: 'Tommy',
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[1].isAlive).toBe(false);
        });

        it('does not win the game with a lethal attack if another player is around', () => {
            const attacker = makeCard(UnitCards.WATER_GUARDIAN);
            attacker.numAttacksLeft = 1;
            board.players[0].units = [attacker];
            board.players[1].health = 1;
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.PERFORM_ATTACK,
                    cardId: attacker.id,
                    playerTarget: 'Tommy',
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[1].isAlive).toBe(false);
            expect(newBoardState.gameState).toBe(GameState.PLAYING);
        });

        it('wins the game with a lethal attack', () => {
            const attacker = makeCard(UnitCards.WATER_GUARDIAN);
            attacker.numAttacksLeft = 1;
            board.players[0].units = [attacker];
            board.players[1].health = 1;
            board.players[2].isAlive = false;
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.PERFORM_ATTACK,
                    cardId: attacker.id,
                    playerTarget: 'Tommy',
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[1].isAlive).toBe(false);
            expect(newBoardState.gameState).toBe(GameState.WIN);
        });

        it('blocks an attack vs player with soldiers', () => {
            const attacker = makeCard(UnitCards.LANCER);
            const defender = makeCard(UnitCards.LANCER);
            attacker.numAttacksLeft = 1;
            board.players[0].units = [attacker];
            board.players[1].units = [defender];
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.PERFORM_ATTACK,
                    cardId: attacker.id,
                    playerTarget: 'Tommy',
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[1].health).toEqual(
                PlayerConstants.STARTING_HEALTH
            );
            expect(newBoardState.players[0].units[0].numAttacksLeft).toEqual(1);
        });

        it('does not block an attack vs player with soldiers (magical units)', () => {
            const attacker = makeCard(UnitCards.FIRE_MAGE);
            const defender = makeCard(UnitCards.LANCER);
            attacker.numAttacksLeft = 1;
            board.players[0].units = [attacker];
            board.players[1].units = [defender];
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.PERFORM_ATTACK,
                    cardId: attacker.id,
                    playerTarget: 'Tommy',
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[1].health).toEqual(
                PlayerConstants.STARTING_HEALTH - UnitCards.FIRE_MAGE.attack
            );
            expect(newBoardState.players[0].units[0].numAttacksLeft).toEqual(0);
        });
    });

    describe('cast spell', () => {
        it('casts a spell', () => {
            const spellCard = makeCard(SpellCards.A_THOUSAND_WINDS);
            board.players[0].hand.push(spellCard);
            board.players[0].resourcePool = {
                [Resource.FIRE]: 2,
                [Resource.WATER]: 1,
            };

            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.CAST_SPELL,
                    cardId: spellCard.id,
                },
                playerName: 'Timmy',
            });

            expect(newBoardState.players[0].effectQueue[0]).toEqual(
                spellCard.effects[1]
            );
            expect(newBoardState.players[0].effectQueue[1]).toEqual(
                spellCard.effects[0]
            );
            expect(newBoardState.players[0].cemetery).toEqual([spellCard]);
        });

        it('handles nonsensical cardIds', () => {
            const spellCard = makeCard(SpellCards.A_THOUSAND_WINDS);
            board.players[0].hand.push(spellCard);
            board.players[0].resourcePool = {
                [Resource.FIRE]: 2,
                [Resource.WATER]: 1,
            };

            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.CAST_SPELL,
                    cardId: 'not a match for anything',
                },
                playerName: 'Timmy',
            });

            expect(newBoardState).toEqual(board);
        });

        it('displays the last spell as the "last played card"', () => {
            const mockDisplayLastCard = jest.fn();
            const spellCard = makeCard(SpellCards.A_THOUSAND_WINDS);
            board.players[0].hand.push(spellCard);
            board.players[0].resourcePool = {
                [Resource.FIRE]: 2,
                [Resource.WATER]: 1,
            };

            applyGameAction({
                board,
                displayLastCard: mockDisplayLastCard,
                gameAction: {
                    type: GameActionTypes.CAST_SPELL,
                    cardId: spellCard.id,
                },
                playerName: 'Timmy',
            });

            expect(mockDisplayLastCard).toHaveBeenCalledWith(spellCard);
        });

        it('broadcasts the spell to chat', () => {
            const mockAddChatMessage = jest.fn();
            const spellCard = makeCard(SpellCards.A_THOUSAND_WINDS);
            board.players[0].hand.push(spellCard);
            board.players[0].resourcePool = {
                [Resource.FIRE]: 2,
                [Resource.WATER]: 1,
            };

            applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.CAST_SPELL,
                    cardId: spellCard.id,
                },
                playerName: 'Timmy',
                addChatMessage: mockAddChatMessage,
            });

            expect(mockAddChatMessage).toHaveBeenCalledWith(
                'Timmy cast [[A Thousand Winds]]'
            );
        });

        it("won't cast a spell that's too expensive", () => {
            const spellCard = makeCard(SpellCards.EMBER_SPEAR);
            board.players[0].hand.push(spellCard);

            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.CAST_SPELL,
                    cardId: spellCard.id,
                },
                playerName: 'Timmy',
            });

            expect(newBoardState.players[0].effectQueue).toHaveLength(0);
            expect(newBoardState.players[0].cemetery).toHaveLength(0);
        });
    });

    describe('Passive Effects', () => {
        describe('Hearty', () => {
            it('survives lethal damage', () => {
                const attacker = makeCard(UnitCards.BOUNTY_COLLECTOR);
                attacker.passiveEffects.push(PassiveEffect.HEARTY);
                const defender = makeCard(UnitCards.BOUNTY_COLLECTOR);
                board.players[0].units = [
                    attacker,
                    makeCard(UnitCards.BOUNTY_COLLECTOR),
                ];
                board.players[1].units = [defender];
                const newBoardState = applyGameAction({
                    board,
                    gameAction: {
                        type: GameActionTypes.PERFORM_ATTACK,
                        cardId: attacker.id,
                        unitTarget: defender.id,
                    },
                    playerName: 'Timmy',
                });
                expect(newBoardState.players[0].cemetery).toHaveLength(0);
                expect(
                    newBoardState.players[0].units[0].passiveEffects
                ).toEqual([PassiveEffect.POISONED, PassiveEffect.QUICK]);
                expect(newBoardState.players[0].units[0].hp).toEqual(1);
            });
        });
    });

    describe('Draft mode', () => {
        it('takes a pile', () => {
            const draftBoard = makeNewBoard({
                playerNames: ['Tommy', 'Timmy'],
                format: Format.DRAFT,
                startingPlayerIndex: 1,
            });
            board.gameState = GameState.DRAFTING;
            const newBoardState = applyGameAction({
                board: draftBoard,
                gameAction: {
                    type: GameActionTypes.TAKE_DRAFT_PILE,
                    draftPileIndex: 0,
                },
                playerName: 'Timmy',
            });

            expect(newBoardState.players[0].isActivePlayer).toBe(true);
            expect(newBoardState.players[1].deckBuildingPool).toHaveLength(3);
            expect(newBoardState.draftPiles[0]).toHaveLength(1);
            expect(newBoardState.draftPiles[2]).toHaveLength(4);
        });
    });
});
