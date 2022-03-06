import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import { getSelfPlayer } from '@/client/redux/selectors';
import { RootState } from '@/client/redux/store';
import { Player } from '@/types/board';
import { GameActionTypes } from '@/types/gameActions';
import { WebSocketContext } from '../WebSockets';
import { PlayerBriefInfo } from '../PlayerBriefInfo';

/**
 * @returns {JSX.Element} - represents everything deployed (units and resources)
 * for the self-player's (aka your) side of the board
 */
export const SelfPlayerBoard: React.FC = () => {
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
                <button onClick={passTurn}>Pass Turn</button>
            )}
        </>
    );
};
