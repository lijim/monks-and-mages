import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/client/redux/store';
import { Player } from '@/types/board';

export const GameBoard: React.FC = () => {
    const players = useSelector<RootState, Player[]>(
        (state) => state.board?.players || []
    );

    return (
        <div>
            Game started
            {players.map((player) => (
                <li key={player.name}>{player.name}</li>
            ))}
        </div>
    );
};
