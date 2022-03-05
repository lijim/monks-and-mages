import React from 'react';
import { useSelector } from 'react-redux';

import { getOtherPlayers } from '@/client/redux/selectors';
import { RootState } from '@/client/redux/store';
import { Player } from '@/types/board';
import { SelfPlayerBoard } from '../SelfPlayerBoard';
import { OtherPlayerBoard } from '../OtherPlayerBoard';

export const GameBoard: React.FC = () => {
    const otherPlayers = useSelector<RootState, Player[]>(getOtherPlayers);

    return (
        <div>
            Game started
            {otherPlayers.map((player) => (
                <OtherPlayerBoard key={player.name} player={player} />
            ))}
            <SelfPlayerBoard />
        </div>
    );
};
