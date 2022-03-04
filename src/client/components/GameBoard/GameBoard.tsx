import React from 'react';
import { useSelector } from 'react-redux';

import { getCurrentPlayer, getOtherPlayers } from '@/client/redux/selectors';
import { RootState } from '@/client/redux/store';
import { Player } from '@/types/board';
import { CardGridItem } from '../CardGridItem';

interface CurrentPlayerBoardProps {
    currentPlayer: Player;
}

const CurrentPlayerBoard: React.FC<CurrentPlayerBoardProps> = ({
    currentPlayer,
}) => {
    if (!currentPlayer) return null;
    return (
        <>
            <li>
                <b>{currentPlayer.name}</b>
            </li>
            {currentPlayer.hand.map((card) => (
                <CardGridItem card={card} />
            ))}
        </>
    );
};

interface OtherPlayerBoardProps {
    player: Player;
}

const OtherPlayerBoard: React.FC<OtherPlayerBoardProps> = ({ player }) => {
    return (
        <li>
            <b>{player.name}</b>
            <br />
            Cards in Hand: {player.numCardsInHand}
        </li>
    );
};

export const GameBoard: React.FC = () => {
    const currentPlayer = useSelector<RootState, Player | null>(
        getCurrentPlayer
    );
    const otherPlayers = useSelector<RootState, Player[]>(getOtherPlayers);

    return (
        <div>
            Game started
            <CurrentPlayerBoard currentPlayer={currentPlayer} />
            {otherPlayers.map((player) => (
                <OtherPlayerBoard key={player.name} player={player} />
            ))}
        </div>
    );
};
