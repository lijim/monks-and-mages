import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import { getCurrentPlayer, getOtherPlayers } from '@/client/redux/selectors';
import { RootState } from '@/client/redux/store';
import { Player } from '@/types/board';
import { CardGridItem } from '../CardGridItem';
import { WebSocketContext } from '../WebSockets';
import { GameActionTypes } from '@/types/gameActions';

interface CurrentPlayerBoardProps {
    currentPlayer: Player;
}

const CurrentPlayerBoard: React.FC<CurrentPlayerBoardProps> = ({
    currentPlayer,
}) => {
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
