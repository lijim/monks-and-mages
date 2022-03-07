import { Socket } from 'socket.io-client';

import { AppDispatch, RootState } from '@/client/redux/store';
import { ClientToServerEvents, ServerToClientEvents } from '@/types';
import { getSelfPlayer } from '@/client/redux/selectors';
import { CardType } from '@/types/cards';
import { GameActionTypes } from '@/types/gameActions';
import { canPlayerPayForCard } from '@/transformers/canPlayerPayForCard';
import { selectAttackingUnit } from '@/client/redux/clientSideGameExtras';

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
    if (!selfPlayer?.hand) {
        return;
    }

    const matchingCardInHand = selfPlayer.hand.find(
        (card) => card.id === cardId
    );
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
        return;
    }

    // Match Resources
    const matchingCardInResources = selfPlayer.resources.find(
        (card) => card.id === cardId
    );
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
    }

    // Match Units (Self Player)
    const matchingCardInUnits = selfPlayer.units.find(
        (card) => card.id === cardId
    );
    if (matchingCardInUnits && matchingCardInUnits.numAttacksLeft > 0) {
        dispatch(selectAttackingUnit(cardId));
    }
};
