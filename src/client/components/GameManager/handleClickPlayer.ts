import { Socket } from 'socket.io-client';

import { AppDispatch, RootState } from '@/client/redux/store';
import { ClientToServerEvents, ServerToClientEvents } from '@/types';
import { getAttackingUnit, getOtherPlayers } from '@/client/redux/selectors';
import { GameActionTypes } from '@/types/gameActions';
import { performAttack } from '@/client/redux/clientSideGameExtras';
import { Player } from '@/types/board';

interface HandleClickOnPlayerParams {
    dispatch: AppDispatch;
    player: Player;
    socket: Socket<ServerToClientEvents, ClientToServerEvents>;
    state: RootState;
}

/**
 * Handler for clicking on cards.  Reads from the redux state to determine the appropriate action
 * to send as a gameAction to the server
 * @param {Object} player - id of card that has been clicked
 * @param {Object} state - root state of redux
 * @param {Object} socket - client socket to emit game actions to the server
 * @returns
 */
export const handleClickOnPlayer = ({
    dispatch,
    player,
    state,
    socket,
}: HandleClickOnPlayerParams) => {
    const otherPlayers = getOtherPlayers(state);
    const attackingUnit = getAttackingUnit(state);

    if (otherPlayers.find((otherPlayer) => otherPlayer === player)) {
        // Perform Attack
        dispatch(performAttack());
        socket.emit('takeGameAction', {
            type: GameActionTypes.PERFORM_ATTACK,
            cardId: attackingUnit,
            playerTarget: player.name,
        });
    }
};
