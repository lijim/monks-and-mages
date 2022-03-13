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
import { GameActionTypes } from '@/types/gameActions';
import { performAttack } from '@/client/redux/clientSideGameExtras';
import { GameState, Player } from '@/types/board';
import { getDefaultTargetForEffect, TargetTypes } from '@/types/effects';

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
    const selfPlayer = getSelfPlayer(state);
    const otherPlayers = getOtherPlayers(state);
    const attackingUnit = getAttackingUnit(state);
    const lastEffect = getLastEffect(state);
    if (!isBoardInteractable(state)) {
        return;
    }

    const matchingOtherPlayer = otherPlayers.find(
        (otherPlayer) => otherPlayer === player
    );
    if (lastEffect) {
        const target =
            lastEffect.target || getDefaultTargetForEffect(lastEffect.type);
        switch (target) {
            case TargetTypes.PLAYER:
            case TargetTypes.ANY: {
                if (selfPlayer === player) {
                    socket.emit('resolveEffect', {
                        effect: lastEffect,
                        playerNames: [player.name],
                    });
                }
                if (matchingOtherPlayer) {
                    socket.emit('resolveEffect', {
                        effect: lastEffect,
                        playerNames: [matchingOtherPlayer.name],
                    });
                }
                break;
            }
            case TargetTypes.OPPONENT: {
                if (matchingOtherPlayer) {
                    socket.emit('resolveEffect', {
                        effect: lastEffect,
                        playerNames: [matchingOtherPlayer.name],
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

    if (matchingOtherPlayer) {
        // Perform Attack
        dispatch(performAttack());
        socket.emit('takeGameAction', {
            type: GameActionTypes.PERFORM_ATTACK,
            cardId: attackingUnit,
            playerTarget: player.name,
        });
    }
};
