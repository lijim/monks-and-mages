import React from 'react';

import { Player } from '@/types/board';
import { PlayerBriefInfo } from '../PlayerBriefInfo';

interface OtherPlayerInfoProps {
    player: Player;
}

/**
 * @returns {JSX.Element} - the other player's information (for the left hand side
 * of the GameDisplay)
 */
export const OtherPlayerInfo: React.FC<OtherPlayerInfoProps> = ({ player }) => {
    return <PlayerBriefInfo player={player}></PlayerBriefInfo>;
};
