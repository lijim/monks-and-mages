import cloneDeep from 'lodash.clonedeep';
import shuffle from 'lodash.shuffle';

import { Board, GameState, Player } from '@/types/board';
import { GameAction, GameActionTypes } from '@/types/gameActions';
import { Card, CardType, ResourceCard, UnitCard } from '@/types/cards';
import { canPlayerPayForCard } from '@/transformers/canPlayerPayForCard';
import { payForCard } from '@/transformers/payForCard';
import { PassiveEffect } from '@/types/effects';
import { PlayerConstants } from '@/constants/gameConstants';
import { getDeckListFromSkeleton } from '@/transformers';
import { makeCard, makeNewPlayer } from '@/factories';
import { SpellCards } from '@/cardDb/spells';

const getPlayers = (board: Board) => {
    const { players } = board;
    const activePlayer = players.find((player) => player.isActivePlayer);
    const otherPlayers = players.filter((player) => !player.isActivePlayer);
    return { players, activePlayer, otherPlayers };
};

/**
 * @returns {Object} next player who has not readied yet (by accepting their mulligan) or
 * null if everyone has readied up
 */
const getNextUnreadyPlayer = (board: Board): Player => {
    const { players } = board;
    const activePlayerIndex = players.findIndex(
        (player) => player.isActivePlayer
    );
    for (
        let index = activePlayerIndex + 1;
        index < activePlayerIndex + players.length;
        index += 1
    ) {
        const nextPlayer = players[index % players.length];
        if (!nextPlayer.readyToStart) {
            return nextPlayer;
        }
    }
    return null;
};

const getNextPlayer = (board: Board): Player => {
    const { players, activePlayer } = getPlayers(board);
    const activePlayerIndex = players.findIndex(
        (player) => player.isActivePlayer
    );
    for (
        let index = activePlayerIndex + 1;
        index < activePlayerIndex + players.length;
        index += 1
    ) {
        const nextPlayer = players[index % players.length];
        if (nextPlayer.isAlive) {
            return nextPlayer;
        }
    }
    return activePlayer;
};

/**
 * Applies a win state based on the number of players alive and left in the game
 * (0 is a tie, 1 is a win)
 *
 * This function is effectful!  It should only be in places where we're
 * ok with mutating data and not just returning a new board state object
 *
 * @param {Object} board - board to analyze
 * @returns board with a win state applied
 */
export function applyWinState(board: Board): Board {
    const { players, activePlayer } = getPlayers(board);
    if (players.filter((player) => player.isAlive).length === 1) {
        board.gameState = GameState.WIN;
    }
    if (players.filter((player) => player.isAlive).length === 0) {
        board.gameState = GameState.TIE;
    }
    if (!activePlayer.isAlive) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        passTurn(board);
    }
    return board;
}

export const resetUnitCard = (unitCard: UnitCard) => {
    unitCard.passiveEffects = cloneDeep(unitCard.originalPassiveEffects);
    const hasQuick = unitCard.passiveEffects.includes(PassiveEffect.QUICK);

    unitCard.hp = unitCard.totalHp;
    unitCard.hpBuff = 0;
    unitCard.attackBuff = 0;
    unitCard.oneCycleAttackBuff = 0;
    unitCard.oneTurnAttackBuff = 0;
    unitCard.isFresh = true;
    unitCard.numAttacksLeft = hasQuick ? unitCard.numAttacks : 0;
    unitCard.cost = cloneDeep(unitCard.originalCost);
};

/**
 * Mutates the board that's passed in.
 *
 * Cleans up all units where the hp (including buffs) is <= 0 and send
 * them to the cemetry
 */
export const processBoardToCemetery = (
    board: Board,
    addSystemChat: (chatMessage: string) => void
) => {
    const { players } = board;

    if (!players?.length) return;
    players.forEach((player) => {
        const unitsHeadedToCemetery = player.units.filter(
            (unit) => unit.hp + unit.hpBuff <= 0
        );

        const unitsLeft = player.units.filter(
            (unit) => unit.hp + unit.hpBuff > 0
        );

        const unitsSurvivingViaHearty = unitsHeadedToCemetery.filter((unit) =>
            unit.passiveEffects.includes(PassiveEffect.HEARTY)
        );
        const unitsNotSurvivingViaHearty = unitsHeadedToCemetery.filter(
            (unit) => !unit.passiveEffects.includes(PassiveEffect.HEARTY)
        );

        // remove hearty and go to 1 hp instead of passing to cemetery
        unitsSurvivingViaHearty.forEach((unit) => {
            unit.passiveEffects = unit.passiveEffects.filter(
                (effect) => effect !== PassiveEffect.HEARTY
            );
            unit.hp = 1;
        });

        player.units = player.units.filter(
            (unit) =>
                unitsLeft.includes(unit) ||
                unitsSurvivingViaHearty.includes(unit)
        );
        if (unitsNotSurvivingViaHearty.length > 0) {
            addSystemChat(
                `${unitsNotSurvivingViaHearty
                    .map((unit) => `[[${unit.name}]]`)
                    .join(', ')} (${player.name}) went to the cemetery`
            );
        }
        player.cemetery = player.cemetery.concat(unitsNotSurvivingViaHearty);
        unitsNotSurvivingViaHearty.forEach(resetUnitCard);
    });
};

const isCardLegendaryLeader = (card: Card) =>
    card.cardType === CardType.UNIT && card.isLegendaryLeader;

/**
 * @param board - board to mutate
 * @param addSystemChat
 * @returns mutated board, with legendary leaders in cemetery/hand/deck replaced
 */
export const cleanupLegendaryLeaders = (
    board: Board,
    addSystemChat: (chatMessage: string) => void
) => {
    const { players } = board;

    if (!players?.length) return;
    players.forEach((player) => {
        if (!player.legendaryLeader || !player.isLegendaryLeaderDeployed) {
            return;
        }
        // try to find legendary leader amongst own hand / units
        const legendaryLeader = [...player.hand, ...player.units].find(
            isCardLegendaryLeader
        );
        // if not existent, remove them from cemetery / deck, undeploy them.
        if (!legendaryLeader) {
            player.cemetery = player.cemetery.filter(
                (card) => !isCardLegendaryLeader(card)
            );
            player.deck = player.deck.filter(
                (card) => !isCardLegendaryLeader(card)
            );
            player.isLegendaryLeaderDeployed = false;
            addSystemChat(
                `The legendary leader for ${player.name}, [[${player.legendaryLeader.name}]] is going back to the legendary leader zone`
            );
        }
    });
};

/**
 * Effectful code to pass the turn to the next player
 * @param {Object} board - board to analyze
 * @returns the board, but with one turn passed to the next player
 */
export function passTurn(board: Board): Board {
    let { activePlayer } = getPlayers(board);
    const { players } = getPlayers(board);
    activePlayer.resourcePool = {};
    activePlayer.units.forEach((unit) => {
        unit.oneTurnAttackBuff = 0;
        unit.isFresh = false;
    });
    // tries to loop through all players, in case one draws out of their deck
    // and loses the game
    for (let i = 0; i < players.length; i += 1) {
        const nextPlayer = getNextPlayer(board);
        activePlayer.isActivePlayer = false;
        nextPlayer.isActivePlayer = true;

        // Check if the player is the only one alive (or if no one is alive)
        if (players.filter((player) => player.isAlive).length <= 1) {
            return board;
        }

        // Untap
        nextPlayer.resources.forEach((resource) => {
            resource.isUsed = false;
        });

        // give each unit it's starting number of attacks
        nextPlayer.units.forEach((unit) => {
            unit.numAttacksLeft = unit.numAttacks;
            unit.oneCycleAttackBuff = 0;
        });

        // If you draw out of the deck, you lose the game
        if (nextPlayer.deck.length === 0) {
            nextPlayer.isAlive = false;
            applyWinState(board);
            if (board.gameState !== GameState.PLAYING) return board;
            activePlayer = nextPlayer;
        } else {
            // proceed to next turn
            nextPlayer.resourcesLeftToDeploy = 1;
            nextPlayer.hand.push(nextPlayer.deck.pop());
            return board;
        }
    }

    return board;
}

const getTotalAttack = (card: UnitCard) => {
    return (
        card.attack +
        card.attackBuff +
        card.oneCycleAttackBuff +
        card.oneTurnAttackBuff
    );
};

type ApplyGameActionParams = {
    addChatMessage?: (chatMessage: string) => void;
    board: Board;
    displayLastCard?: (card: Card) => void;
    gameAction: GameAction;
    playerName: string; // player name taking the action
};
export const applyGameAction = ({
    addChatMessage,
    board,
    displayLastCard,
    gameAction,
    playerName,
}: ApplyGameActionParams): Board => {
    const clonedBoard = cloneDeep(board);
    const { activePlayer, otherPlayers } = getPlayers(clonedBoard);
    const self = clonedBoard.players.find(
        (player) => player.name === playerName
    );
    const addSystemChat = (message: string) => addChatMessage?.(message);

    const ALLOWED_NON_ACTIVE_PLAYER_ACTIONS = [
        GameActionTypes.START_DECKBUILDING,
        GameActionTypes.SUBMIT_DECK,
    ];
    // Error out when event is being emitted by the non-active player
    if (
        activePlayer?.name !== playerName &&
        !ALLOWED_NON_ACTIVE_PLAYER_ACTIONS.includes(gameAction.type)
    ) {
        return board; // TODO: implement error UI
    }

    switch (gameAction.type) {
        case GameActionTypes.ACCEPT_MULLIGAN: {
            activePlayer.readyToStart = true;
            addSystemChat(
                `${activePlayer.name} has accepted a hand of ${activePlayer.hand.length} cards`
            );
            if (
                activePlayer.hand.length <
                PlayerConstants.STARTING_HAND_SIZE - 1
            ) {
                activePlayer.hand.push(activePlayer.deck.pop());
            }
            const nextPlayer = getNextUnreadyPlayer(clonedBoard);
            if (!nextPlayer) {
                // everyone has readied up, start the game
                clonedBoard.gameState = GameState.PLAYING;
                clonedBoard.players.forEach((player, index) => {
                    // TODO: account for when players drop off mid-mulligan
                    player.isActivePlayer =
                        index === clonedBoard.startingPlayerIndex;
                    if (!player.isActivePlayer) {
                        const positionAfterStartingPlayer =
                            (index - clonedBoard.startingPlayerIndex) %
                            clonedBoard.players.length;
                        if (
                            clonedBoard.players.length === 2 ||
                            positionAfterStartingPlayer > 1
                        ) {
                            player.hand.push(makeCard(SpellCards.RICHES));
                            addSystemChat(
                                `${player.name} get a [[Riches]] for not going first`
                            );
                        } else if (positionAfterStartingPlayer === 1) {
                            player.hand.push(makeCard(SpellCards.LANDMARK));
                            addSystemChat(
                                `${player.name} get a [[Landmark]] for not going first`
                            );
                        }
                    }
                });
            } else {
                activePlayer.isActivePlayer = false;
                nextPlayer.isActivePlayer = true;
            }

            return clonedBoard;
        }
        case GameActionTypes.REJECT_MULLIGAN: {
            // shuffle and deal new cards (1 less than before)
            const currentHandSize = activePlayer.hand.length;
            const newHandSize = Math.max(0, currentHandSize - 1);
            addSystemChat(
                `${activePlayer.name} has thrown back a hand of ${currentHandSize} cards and is going down to ${newHandSize} cards`
            );
            activePlayer.deck = activePlayer.deck.concat(activePlayer.hand);
            const shuffledDeck = shuffle(activePlayer.deck);
            activePlayer.deck = shuffledDeck.slice(newHandSize);
            activePlayer.hand = shuffledDeck.slice(0, newHandSize);

            // move to next player
            const nextPlayer = getNextUnreadyPlayer(clonedBoard);
            if (nextPlayer) {
                activePlayer.isActivePlayer = false;
                nextPlayer.isActivePlayer = true;
            }

            return clonedBoard;
        }
        case GameActionTypes.PASS_TURN: {
            return passTurn(clonedBoard);
        }
        case GameActionTypes.DEPLOY_RESOURCE: {
            const { cardId } = gameAction;
            const { hand, resourcesLeftToDeploy, resources } = activePlayer;
            const matchingCardIndex = hand.findIndex(
                (card) =>
                    card.id === cardId && card.cardType === CardType.RESOURCE
            );
            if (matchingCardIndex === -1) return clonedBoard;
            if (resourcesLeftToDeploy <= 0) {
                return clonedBoard;
            }
            activePlayer.resourcesLeftToDeploy -= 1;

            const resourceCard = hand.splice(
                matchingCardIndex,
                1
            )[0] as ResourceCard;
            resources.push(resourceCard);
            if (resourceCard.enterEffects) {
                activePlayer.effectQueue = activePlayer.effectQueue.concat(
                    cloneDeep(resourceCard.enterEffects)
                        .reverse()
                        .map((effect) => ({
                            ...effect,
                            sourceId: resourceCard.id,
                        }))
                );
            }
            if (resourceCard.comesInTapped) resourceCard.isUsed = true;
            return clonedBoard;
        }
        case GameActionTypes.TAP_RESOURCE: {
            const { cardId, resourceType } = gameAction;
            const { resources, resourcePool } = activePlayer;
            const matchingCard = resources.find(
                (card) =>
                    card.id === cardId && card.cardType === CardType.RESOURCE
            );
            if (!matchingCard) return clonedBoard;
            if (matchingCard.isUsed) {
                return clonedBoard;
            }

            const { resourceType: cardResourceType } = matchingCard;

            const resourceTypeToUse = resourceType || cardResourceType;
            resourcePool[resourceTypeToUse] =
                (resourcePool[resourceTypeToUse] || 0) + 1;
            matchingCard.isUsed = true;
            return clonedBoard;
        }
        case GameActionTypes.DEPLOY_LEGENDARY_LEADER: {
            const { legendaryLeader } = activePlayer;

            // check if player can afford resource costs
            if (
                !canPlayerPayForCard(activePlayer, legendaryLeader) ||
                activePlayer.isLegendaryLeaderDeployed
            ) {
                return clonedBoard;
            }

            // pay for the card
            activePlayer.resourcePool = payForCard(
                activePlayer,
                legendaryLeader
            ).resourcePool;
            activePlayer.isLegendaryLeaderDeployed = true;

            const legendaryLeaderInstance = makeCard(legendaryLeader);
            legendaryLeaderInstance.isLegendaryLeader = true;

            // deploy the card
            activePlayer.units.push(legendaryLeaderInstance);
            activePlayer.effectQueue = activePlayer.effectQueue.concat(
                cloneDeep(legendaryLeaderInstance.enterEffects)
                    .reverse()
                    .map((effect) => ({
                        ...effect,
                        sourceId: legendaryLeaderInstance.id,
                    }))
            );

            // announce the card
            addSystemChat(
                `${activePlayer.name} deployed their legendary leader, [[${legendaryLeader.name}]]`
            );

            // bump legendary leader costs
            activePlayer.legendaryLeaderExtraCost += 2;
            activePlayer.legendaryLeader.cost.Generic =
                (activePlayer.legendaryLeader.originalCost.Generic || 0) +
                activePlayer.legendaryLeaderExtraCost;

            return clonedBoard;
        }
        case GameActionTypes.DEPLOY_UNIT: {
            const { cardId } = gameAction;
            const { hand } = activePlayer;
            const matchingCard = hand.find((card) => card.id === cardId);
            const matchingCardIndex = hand.findIndex(
                (card) => card.id === cardId
            );
            if (!matchingCard || matchingCard.cardType !== CardType.UNIT)
                return clonedBoard;
            if (canPlayerPayForCard(activePlayer, matchingCard)) {
                activePlayer.resourcePool = payForCard(
                    activePlayer,
                    matchingCard
                ).resourcePool;

                addSystemChat(
                    `${activePlayer.name} played [[${matchingCard.name}]]`
                );

                // check to see if card is legendary
                if (matchingCard.isLegendary) {
                    const cardsWithSameNameAsLegendary =
                        activePlayer.units.filter(
                            (card) => card.name === matchingCard.name
                        );
                    activePlayer.units = activePlayer.units.filter(
                        (card) => card.name !== matchingCard.name
                    );
                    activePlayer.cemetery = activePlayer.cemetery.concat(
                        cardsWithSameNameAsLegendary
                    );
                    addSystemChat(
                        `The previous [[${matchingCard.name}]] was destroyed due to the legend rule (if there are duplicate legendary units, only 1 is allowed on the board at a time)`
                    );
                }
                activePlayer.units.push(matchingCard);
                activePlayer.effectQueue = activePlayer.effectQueue.concat(
                    cloneDeep(matchingCard.enterEffects)
                        .reverse()
                        .map((effect) => ({
                            ...effect,
                            sourceId: cardId,
                        }))
                );
                activePlayer.hand.splice(matchingCardIndex, 1);
            }
            return clonedBoard;
        }
        case GameActionTypes.PERFORM_ATTACK: {
            const { cardId, playerTarget, unitTarget } = gameAction;
            const attacker = activePlayer.units.find(
                (unitCard) => unitCard.id === cardId
            );
            if (!attacker?.numAttacksLeft) {
                return clonedBoard;
            }
            const attackTotal = Math.max(0, getTotalAttack(attacker));

            let attackEmoji = '';
            if (attacker.isMagical) attackEmoji = '🪄';
            else if (attacker.isRanged) {
                attackEmoji = '🏹';
            } else {
                attackEmoji = '⚔️';
            }

            if (unitTarget) {
                let defender: UnitCard = null;
                let defendingPlayer: Player = null;
                otherPlayers.forEach((player) => {
                    player.units.forEach((unitCard) => {
                        if (unitCard.id === unitTarget) {
                            defender = unitCard;
                            defendingPlayer = player;
                        }
                    });
                });
                if (!defender) return clonedBoard;
                const defenderHasPoisonous =
                    defender.passiveEffects.some(
                        (passiveEffect) =>
                            passiveEffect === PassiveEffect.POISONED
                    ) && getTotalAttack(defender) > 0;
                const attackerHasPoisonous =
                    attacker.passiveEffects.some(
                        (passiveEffect) =>
                            passiveEffect === PassiveEffect.POISONED
                    ) && getTotalAttack(attacker) > 0;

                // Soldiers prevent attacks vs. non-soldiers (unless magical)
                const defendingPlayerHasSoldier = defendingPlayer.units.some(
                    (unit) => unit.isSoldier
                );
                if (
                    defendingPlayerHasSoldier &&
                    !defender.isSoldier &&
                    !attacker.isMagical
                )
                    return clonedBoard;

                // Resolve Combat
                attacker.numAttacksLeft -= 1;

                const { hp } = attacker;
                const { hp: defenderHp } = defender;
                const defenderAttackTotal = Math.max(
                    getTotalAttack(defender),
                    0
                );
                if (
                    (attacker.isRanged && defender.isRanged) ||
                    !attacker.isRanged
                ) {
                    attacker.hp = defenderHasPoisonous
                        ? -Number.MAX_SAFE_INTEGER
                        : hp - defenderAttackTotal;
                }
                defender.hp = attackerHasPoisonous
                    ? -Number.MAX_SAFE_INTEGER
                    : defenderHp - attackTotal;

                // Resolve units going to the cemetery
                addSystemChat(
                    `[[${attacker.name}]] (${activePlayer.name}) ${attackEmoji}${attackEmoji} [[${defender.name}]] (${defendingPlayer.name})`
                );
                processBoardToCemetery(clonedBoard, addSystemChat);
                cleanupLegendaryLeaders(clonedBoard, addSystemChat);

                return clonedBoard;
            }

            if (playerTarget) {
                const defendingPlayer = otherPlayers.filter(
                    (player) => player.name === playerTarget
                )[0];
                if (!defendingPlayer) return clonedBoard;
                const defendingPlayerHasSoldier = defendingPlayer.units.some(
                    (unit) => unit.isSoldier
                );
                if (defendingPlayerHasSoldier && !attacker.isMagical)
                    return clonedBoard;

                addSystemChat(
                    `[[${attacker.name}]] (${activePlayer.name}) ${attackEmoji}${attackEmoji} ${defendingPlayer.name}`
                );
                defendingPlayer.health -= attackTotal;
                if (attackTotal && attacker.damagePlayerEffects?.length > 0) {
                    activePlayer.effectQueue = activePlayer.effectQueue.concat(
                        cloneDeep(attacker.damagePlayerEffects)
                            .reverse()
                            .map((effect) => ({
                                ...effect,
                                sourceId: cardId,
                            }))
                    );
                }
                if (defendingPlayer.health <= 0) {
                    defendingPlayer.isAlive = false;
                    applyWinState(clonedBoard);
                }
                attacker.numAttacksLeft -= 1;
                return clonedBoard;
            }

            return clonedBoard;
        }
        case GameActionTypes.CAST_SPELL: {
            const { cardId } = gameAction;
            const { hand, cemetery } = activePlayer;
            const matchingCard = hand.find((card) => card.id === cardId);
            const matchingCardIndex = hand.findIndex(
                (card) => card.id === cardId
            );

            if (matchingCard?.cardType !== CardType.SPELL) {
                return clonedBoard;
            }
            if (!canPlayerPayForCard(activePlayer, matchingCard)) {
                return clonedBoard;
            }

            // emit card out to boards as last card played
            displayLastCard?.(matchingCard);

            activePlayer.resourcePool = payForCard(
                activePlayer,
                matchingCard
            ).resourcePool;
            activePlayer.effectQueue = activePlayer.effectQueue.concat(
                cloneDeep(matchingCard.effects)
                    .reverse()
                    .map((spellEffect) => ({
                        ...spellEffect,
                        sourceId: cardId,
                    }))
            );
            cemetery.push(hand.splice(matchingCardIndex, 1)[0]);
            addSystemChat(`${activePlayer.name} cast [[${matchingCard.name}]]`);

            return clonedBoard;
        }
        case GameActionTypes.TAKE_DRAFT_PILE: {
            const { draftPileIndex } = gameAction;
            // take draft pile
            activePlayer.deckBuildingPool = [
                ...activePlayer.deckBuildingPool,
                ...clonedBoard.draftPiles[draftPileIndex],
            ];
            clonedBoard.draftPiles[draftPileIndex] = [];

            // deal out new cards
            clonedBoard.draftPiles.forEach((draftPile) => {
                if (clonedBoard.draftPool.length > 0) {
                    draftPile.push(clonedBoard.draftPool.pop());
                }
            });
            clonedBoard.draftPoolSize = clonedBoard.draftPool.length;

            const nextPlayer = getNextPlayer(clonedBoard);
            activePlayer.isActivePlayer = false;
            nextPlayer.isActivePlayer = true;

            return clonedBoard;
        }
        case GameActionTypes.START_DECKBUILDING: {
            if (
                clonedBoard.draftPoolSize === 0 &&
                clonedBoard.draftPiles.every((pile) => pile.length === 0)
            ) {
                clonedBoard.gameState = GameState.DECKBUILDING;
            }
            return clonedBoard;
        }
        case GameActionTypes.SUBMIT_DECK: {
            if (self.hand.length > 0) {
                return clonedBoard;
            }

            const { skeleton } = gameAction;
            const { decklist, errors } = getDeckListFromSkeleton(skeleton);
            if (decklist && errors.length === 0) {
                const { deck, hand, numCardsInDeck, numCardsInHand } =
                    makeNewPlayer({
                        name: playerName,
                        decklist,
                        format: clonedBoard.format,
                    });
                self.deck = deck;
                self.hand = hand;
                self.numCardsInDeck = numCardsInDeck;
                self.numCardsInHand = numCardsInHand;
            }
            if (clonedBoard.players.every((player) => player.hand.length > 0)) {
                clonedBoard.gameState = GameState.MULLIGANING;
            }
            return clonedBoard;
        }
        default:
            return clonedBoard;
    }
};
