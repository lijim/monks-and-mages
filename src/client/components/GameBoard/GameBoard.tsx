import React from 'react';
import { useSelector } from 'react-redux';

import { getOtherPlayers } from '@/client/redux/selectors';
import { RootState } from '@/client/redux/store';
import { Player } from '@/types/board';
import { SelfPlayerBoard } from '../SelfPlayerBoard';

interface OtherPlayerBoardProps {
    player: Player;
}

const OtherPlayerBoard: React.FC<OtherPlayerBoardProps> = ({ player }) => {
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

export const GameBoard: React.FC = () => {
    const otherPlayers = useSelector<RootState, Player[]>(getOtherPlayers);

    return (
        <div>
            Game started
            <SelfPlayerBoard />
            {otherPlayers.map((player) => (
                <OtherPlayerBoard key={player.name} player={player} />
            ))}
        </div>
    );
};
