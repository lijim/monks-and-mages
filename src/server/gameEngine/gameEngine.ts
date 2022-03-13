import cloneDeep from 'lodash.clonedeep';

import { Board, GameState, Player } from '@/types/board';
import { GameAction, GameActionTypes } from '@/types/gameActions';
import { CardType, ResourceCard, UnitCard } from '@/types/cards';
import { canPlayerPayForCard } from '@/transformers/canPlayerPayForCard';
import { payForCard } from '@/transformers/payForCard';
import { PassiveEffect } from '@/types/effects';

const getNextPlayer = (board: Board): Player => {
    const { players } = board;
    const activePlayer = players.find((player) => player.isActivePlayer);
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

const applyWinState = (board: Board): Board => {
    const { players } = board;
    if (players.filter((player) => player.isAlive).length === 1) {
        board.gameState = GameState.WIN;
    }
    if (players.filter((player) => player.isAlive).length === 0) {
        board.gameState = GameState.TIE;
    }
    return board;
};

export const resetUnitCard = (unitCard: UnitCard) => {
    const hasQuick = unitCard.passiveEffects.indexOf(PassiveEffect.QUICK) > -1;

    unitCard.hp = unitCard.totalHp;
    unitCard.hpBuff = 0;
    unitCard.attackBuff = 0;
    unitCard.numAttacksLeft = hasQuick ? unitCard.numAttacks : 0;
    unitCard.cost = cloneDeep(unitCard.originalCost);
};

/**
 * Mutates the board that's passed in.
 *
 * Cleans up all units where the hp (including buffs) is <= 0 and seend
 * them to the cemetry
 */
export const processBoardToCemetery = (board: Board) => {
    const { players } = board;
    if (!players?.length) return;
    players.forEach((player) => {
        const unitsHeadedToCemetery = player.units.filter(
            (unit) => unit.hp + unit.hpBuff <= 0
        );

        const unitsLeft = player.units.filter(
            (unit) => unit.hp + unit.hpBuff > 0
        );

        player.units = unitsLeft;
        player.cemetery = player.cemetery.concat(unitsHeadedToCemetery);
        unitsHeadedToCemetery.forEach(resetUnitCard);
    });
};

type ApplyGameActionParams = {
    board: Board;
    gameAction: GameAction;
    playerName: string; // player name taking the action
};
export const applyGameAction = ({
    board,
    gameAction,
    playerName,
}: ApplyGameActionParams): Board => {
    const clonedBoard = cloneDeep(board);
    const { players } = clonedBoard;
    let activePlayer = players.find((player) => player.isActivePlayer);
    const otherPlayers = players.filter((player) => !player.isActivePlayer);

    // Error out when event is being emitted by the non-active player
    if (activePlayer?.name !== playerName) {
        return board; // TODO: implement error UI
    }

    switch (gameAction.type) {
        case GameActionTypes.PASS_TURN: {
            activePlayer.resourcePool = {};
            // tries to loop through all players, in case one draws out of their deck
            // and loses the game
            for (let i = 0; i < players.length; i += 1) {
                const nextPlayer = getNextPlayer(clonedBoard);
                activePlayer.isActivePlayer = false;
                nextPlayer.isActivePlayer = true;

                // Untap
                nextPlayer.resources.forEach((resource) => {
                    resource.isUsed = false;
                });

                // give each unit it's starting number of attacks
                nextPlayer.units.forEach((unit) => {
                    unit.numAttacksLeft = unit.numAttacks;
                });

                // If you draw out of the deck, you lose the game
                if (nextPlayer.deck.length === 0) {
                    nextPlayer.isAlive = false;
                    applyWinState(clonedBoard);
                    if (board.gameState !== GameState.PLAYING)
                        return clonedBoard;
                    activePlayer = nextPlayer;
                } else {
                    // proceed to next turn
                    nextPlayer.resourcesLeftToDeploy = 1;
                    nextPlayer.hand.push(nextPlayer.deck.pop());
                    return clonedBoard;
                }
            }

            return clonedBoard;
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

            resources.push(
                hand.splice(matchingCardIndex, 1)[0] as ResourceCard
            );
            return clonedBoard;
        }
        case GameActionTypes.TAP_RESOURCE: {
            const { cardId } = gameAction;
            const { resources, resourcePool } = activePlayer;
            const matchingCard = resources.find(
                (card) =>
                    card.id === cardId && card.cardType === CardType.RESOURCE
            );
            if (!matchingCard) return clonedBoard;
            if (matchingCard.isUsed) {
                return clonedBoard;
            }

            const { resourceType } = matchingCard;
            resourcePool[resourceType] = (resourcePool[resourceType] || 0) + 1;
            matchingCard.isUsed = true;
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
                activePlayer.units.push(matchingCard);
                activePlayer.effectQueue = activePlayer.effectQueue.concat(
                    cloneDeep(matchingCard.enterEffects)
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
                const defenderHasPoisonous = defender.passiveEffects.some(
                    (passiveEffect) => passiveEffect === PassiveEffect.POISONED
                );
                const attackerHasPoisonous = attacker.passiveEffects.some(
                    (passiveEffect) => passiveEffect === PassiveEffect.POISONED
                );

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

                const { attack, attackBuff, hp } = attacker;
                const {
                    attack: defenderAttack,
                    attackBuff: defenderAttackBuff,
                    hp: defenderHp,
                } = defender;
                if (
                    (attacker.isRanged && defender.isRanged) ||
                    !attacker.isRanged
                ) {
                    attacker.hp = defenderHasPoisonous
                        ? -Number.MAX_SAFE_INTEGER
                        : hp - defenderAttack - defenderAttackBuff;
                }
                defender.hp = attackerHasPoisonous
                    ? -Number.MAX_SAFE_INTEGER
                    : defenderHp - attack - attackBuff;

                // Resolve units going to the cemetery
                processBoardToCemetery(clonedBoard);
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
                defendingPlayer.health -= attacker.attack + attacker.attackBuff;
                if (defendingPlayer.health < 0) {
                    defendingPlayer.isAlive = false;
                    applyWinState(board);
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

            if (matchingCard.cardType !== CardType.SPELL) {
                return clonedBoard;
            }
            if (!canPlayerPayForCard(activePlayer, matchingCard)) {
                return clonedBoard;
            }

            activePlayer.resourcePool = payForCard(
                activePlayer,
                matchingCard
            ).resourcePool;
            activePlayer.effectQueue = activePlayer.effectQueue.concat(
                cloneDeep(matchingCard.effects)
            );
            cemetery.push(hand.splice(matchingCardIndex, 1)[0]);

            return clonedBoard;
        }
        default:
            return clonedBoard;
    }
};
