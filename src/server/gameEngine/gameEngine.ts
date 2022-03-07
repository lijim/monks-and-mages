import cloneDeep from 'lodash.clonedeep';

import { Board, GameState, Player } from '@/types/board';
import { GameAction, GameActionTypes } from '@/types/gameActions';
import { CardType, ResourceCard } from '@/types/cards';
import { canPlayerPayForCard } from '@/transformers/canPlayerPayForCard';
import { payForCard } from '@/transformers/payForCard';

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
                    nextPlayer.numCardsInDeck -= 1;
                    nextPlayer.numCardsInHand += 1;
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
            activePlayer.numCardsInHand -= 1;
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
                activePlayer.numCardsInHand -= 1;
                activePlayer.hand.splice(matchingCardIndex, 1);
            }
            return clonedBoard;
        }
        default:
            return clonedBoard;
    }
};
