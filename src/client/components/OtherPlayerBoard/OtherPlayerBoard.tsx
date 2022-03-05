import React from 'react';

import { Player } from '@/types/board';
import { PlayerBriefInfo } from '../PlayerBriefInfo';

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
    return <PlayerBriefInfo player={player}></PlayerBriefInfo>;
};
