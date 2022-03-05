import React from 'react';

import { Player } from '@/types/board';

interface OtherPlayerBoardProps {
    player: Player;
}

/**
 * @returns {JSX.Element} - returns another player's section of the board (not the self-player),
 * including all their units and resources
 */
export const OtherPlayerBoard: React.FC<OtherPlayerBoardProps> = ({
    player,
}) => {
    return (
        <li>
            <b>
                {player.name}
                {player.isActivePlayer && <div>Active Player</div>}
            </b>
            <br />
            Cards in Hand: {player.numCardsInHand}
        </li>
    );
};
