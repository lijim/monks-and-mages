import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSelfPlayer, isBoardInteractable } from '@/client/redux/selectors';
import { RootState } from '@/client/redux/store';
import { passTurn as passTurnGameExtras } from '@/client/redux/clientSideGameExtras';

import { Player } from '@/types/board';
import { GameActionTypes } from '@/types/gameActions';
import { WebSocketContext } from '../WebSockets';
import { PlayerBriefInfo } from '../PlayerBriefInfo';
import { PrimaryColorButton } from '../Button';

/**
 * @returns {JSX.Element} - your player info (health, cards, etc.) + the pass turn button
 */
export const SelfPlayerInfo: React.FC = () => {
    const selfPlayer = useSelector<RootState, Player | null>(getSelfPlayer);
    const isGameInteractable = useSelector<RootState, boolean>(
        isBoardInteractable
    );
    const dispatch = useDispatch();

    const webSocket = useContext(WebSocketContext);
    const passTurn = () => {
        dispatch(passTurnGameExtras());
        webSocket.takeGameAction({ type: GameActionTypes.PASS_TURN });
    };
    if (!selfPlayer) return null;
    return (
        <>
            <PlayerBriefInfo player={selfPlayer} />
            {selfPlayer.isActivePlayer && (
                <PrimaryColorButton
                    onClick={passTurn}
                    disabled={
                        !isGameInteractable ||
                        selfPlayer?.effectQueue?.length > 0
                    }
                >
                    Pass Turn
                </PrimaryColorButton>
            )}
        </>
    );
};
