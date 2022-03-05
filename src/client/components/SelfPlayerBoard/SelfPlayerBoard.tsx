import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import { getCurrentPlayer } from '@/client/redux/selectors';
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
    const currentPlayer = useSelector<RootState, Player | null>(
        getCurrentPlayer
    );

    const webSocket = useContext(WebSocketContext);
    const passTurn = () => {
        webSocket.takeGameAction({ type: GameActionTypes.PASS_TURN });
    };
    if (!currentPlayer) return null;
    return (
        <>
            <li>
                <b>{currentPlayer.name}</b>
                {currentPlayer.isActivePlayer && (
                    <>
                        <div>Active Player</div>
                        <button onClick={passTurn}>Pass Turn</button>
                    </>
                )}
            </li>
            {/* TODO: make cards have unique id's and use that as the key instead of index */}
            {currentPlayer.hand.map((card, index) => (
                <CardGridItem key={index} card={card} />
            ))}
        </>
    );
};
