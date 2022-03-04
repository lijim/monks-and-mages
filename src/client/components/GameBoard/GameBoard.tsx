import React from 'react';
import { useSelector } from 'react-redux';

import { getCurrentPlayer, getOtherPlayers } from '@/client/redux/selectors';
import { RootState } from '@/client/redux/store';
import { Player } from '@/types/board';
import { CardGridItem } from '../CardGridItem';

export const GameBoard: React.FC = () => {
    const currentPlayer = useSelector<RootState, Player | null>(
        getCurrentPlayer
    );
    const otherPlayers = useSelector<RootState, Player[]>(getOtherPlayers);

    return (
        <div>
            Game started
            {currentPlayer && (
                <>
                    <li>
                        <b>{currentPlayer.name}</b>
                    </li>
                    {currentPlayer.hand.map((card) => (
                        <CardGridItem card={card} />
                    ))}
                </>
            )}
            {otherPlayers.map((player) => (
                <li key={player.name}>
                    <b>{player.name}</b>
                    <br />
                    Cards in Hand: {player.numCardsInHand}
                </li>
            ))}
        </div>
    );
};
