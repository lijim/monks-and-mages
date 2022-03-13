import { Socket } from 'socket.io-client';

import { AppDispatch, RootState } from '@/client/redux/store';
import { ClientToServerEvents, ServerToClientEvents } from '@/types';
import {
    getAttackingUnit,
    getLastEffect,
    getOtherPlayers,
    getSelfPlayer,
    isBoardInteractable,
} from '@/client/redux/selectors';
import { CardType, UnitCard } from '@/types/cards';
import { GameActionTypes } from '@/types/gameActions';
import { canPlayerPayForCard } from '@/transformers/canPlayerPayForCard';
import {
    performAttack,
    selectAttackingUnit,
} from '@/client/redux/clientSideGameExtras';
import { getDefaultTargetForEffect, TargetTypes } from '@/types/effects';
import { GameState } from '@/types/board';

// TODO: make it take just the card instead and add a param for target area
// (your hand, your board, other players' board)
interface HandleClickOnCardParams {
    cardId: string;
    dispatch: AppDispatch;
    socket: Socket<ServerToClientEvents, ClientToServerEvents>;
    state: RootState;
}

/**
 * Handler for clicking on cards.  Reads from the redux state to determine the appropriate action
 * to send as a gameAction to the server
 * @param {string} cardId - id of card that has been clicked
 * @param {Object} state - root state of redux
 * @param {Object} socket - client socket to emit game actions to the server
 * @returns
 */
export const handleClickOnCard = ({
    cardId,
    dispatch,
    state,
    socket,
}: HandleClickOnCardParams) => {
    // Match the card ID to see what, if anything to emit
    const selfPlayer = getSelfPlayer(state);
    const otherPlayers = getOtherPlayers(state);
    const attackingUnit = getAttackingUnit(state);
    const lastEffect = getLastEffect(state);
    if (!isBoardInteractable(state)) {
        return;
    }

    const matchingCardInHand = selfPlayer.hand.find(
        (card) => card.id === cardId
    );
    const matchingCardInResources = selfPlayer.resources.find(
        (card) => card.id === cardId
    );
    const matchingCardInUnits = selfPlayer.units.find(
        (card) => card.id === cardId
    );
    let matchingCardInOtherUnits: UnitCard = null;
    otherPlayers.forEach((player) => {
        player.units.forEach((unitCard) => {
            if (unitCard.id === cardId) {
                matchingCardInOtherUnits = unitCard;
            }
        });
    });

    if (lastEffect) {
        const target =
            lastEffect.target || getDefaultTargetForEffect(lastEffect.type);
        switch (target) {
            case TargetTypes.OPPOSING_UNIT: {
                if (matchingCardInOtherUnits) {
                    socket.emit('resolveEffect', {
                        effect: lastEffect,
                        unitCardIds: [matchingCardInOtherUnits.id],
                    });
                }
                break;
            }
            case TargetTypes.OWN_UNIT: {
                if (matchingCardInUnits) {
                    socket.emit('resolveEffect', {
                        effect: lastEffect,
                        unitCardIds: [matchingCardInUnits.id],
                    });
                }
                break;
            }
            case TargetTypes.ANY:
            case TargetTypes.UNIT: {
                if (matchingCardInOtherUnits) {
                    socket.emit('resolveEffect', {
                        effect: lastEffect,
                        unitCardIds: [matchingCardInOtherUnits.id],
                    });
                }
                if (matchingCardInUnits) {
                    socket.emit('resolveEffect', {
                        effect: lastEffect,
                        unitCardIds: [matchingCardInUnits.id],
                    });
                }
                break;
            }
            default: {
                break;
            }
        }
        return;
    }

    if (!selfPlayer?.hand) {
        return;
    }

    // Match cards in hand
    if (matchingCardInHand) {
        if (matchingCardInHand.cardType === CardType.RESOURCE) {
            socket.emit('takeGameAction', {
                type: GameActionTypes.DEPLOY_RESOURCE,
                cardId,
            });
        }
        if (
            matchingCardInHand.cardType === CardType.UNIT &&
            canPlayerPayForCard(selfPlayer, matchingCardInHand)
        ) {
            socket.emit('takeGameAction', {
                type: GameActionTypes.DEPLOY_UNIT,
                cardId,
            });
        }
        if (
            matchingCardInHand.cardType === CardType.SPELL &&
            canPlayerPayForCard(selfPlayer, matchingCardInHand)
        ) {
            socket.emit('takeGameAction', {
                type: GameActionTypes.CAST_SPELL,
                cardId,
            });
        }
        return;
    }

    // Match Resources
    if (matchingCardInResources) {
        if (
            matchingCardInResources.cardType === CardType.RESOURCE &&
            !matchingCardInResources.isUsed
        ) {
            socket.emit('takeGameAction', {
                type: GameActionTypes.TAP_RESOURCE,
                cardId,
            });
        }
        return;
    }

    // Match Units (Self Player)
    if (matchingCardInUnits && matchingCardInUnits.numAttacksLeft > 0) {
        dispatch(selectAttackingUnit(cardId));
        return;
    }

    // Matching Units (Other Players)
    if (matchingCardInOtherUnits && attackingUnit) {
        dispatch(performAttack());
        socket.emit('takeGameAction', {
            type: GameActionTypes.PERFORM_ATTACK,
            cardId: attackingUnit,
            unitTarget: cardId,
        });
    }
};
