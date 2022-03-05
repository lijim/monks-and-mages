import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import { getSelfPlayer } from '@/client/redux/selectors';
import { RootState } from '@/client/redux/store';
import { Player } from '@/types/board';
import { GameActionTypes } from '@/types/gameActions';
import { CardGridItem } from '../CardGridItem';
import { WebSocketContext } from '../WebSockets';

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
            <li>
                <b>{selfPlayer.name}</b>
                {selfPlayer.isActivePlayer && (
                    <>
                        <div>Active Player</div>
                        <button onClick={passTurn}>Pass Turn</button>
                    </>
                )}
            </li>
            {/* TODO: make cards have unique id's and use that as the key instead of index */}
            {selfPlayer.hand.map((card, index) => (
                <CardGridItem key={index} card={card} />
            ))}
        </>
    );
};
