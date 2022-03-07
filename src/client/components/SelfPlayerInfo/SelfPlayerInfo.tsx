import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import { getSelfPlayer } from '@/client/redux/selectors';
import { RootState } from '@/client/redux/store';
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

    const webSocket = useContext(WebSocketContext);
    const passTurn = () => {
        webSocket.takeGameAction({ type: GameActionTypes.PASS_TURN });
    };
    if (!selfPlayer) return null;
    return (
        <>
            <PlayerBriefInfo player={selfPlayer} />
            {selfPlayer.isActivePlayer && (
                <PrimaryColorButton onClick={passTurn}>
                    Pass Turn
                </PrimaryColorButton>
            )}
        </>
    );
};
