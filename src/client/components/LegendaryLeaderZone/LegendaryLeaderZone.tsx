import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Player } from '@/types/board';
import { CardGridItem } from '../CardGridItem';
import { getSelfPlayer } from '@/client/redux/selectors';
import { canPlayerPayForCard } from '@/transformers';
import { WebSocketContext } from '../WebSockets';
import { GameActionTypes } from '@/types/gameActions';

type Props = {
    player: Player;
};

const isLegendaryLeaderDeployable = (player: Player) => {
    if (player.isLegendaryLeaderDeployed) {
        return false;
    }
    const { legendaryLeader } = player;
    return canPlayerPayForCard(player, legendaryLeader);
};

export const LegendaryLeaderZone = ({ player }: Props) => {
    const selfPlayer = useSelector(getSelfPlayer);
    const webSocket = useContext(WebSocketContext);
    if (!player?.legendaryLeader) return null;

    const isDeployable =
        player.name === selfPlayer?.name &&
        selfPlayer?.isActivePlayer &&
        isLegendaryLeaderDeployable(player);

    const onClick = () => {
        if (!isDeployable) {
            return;
        }
        webSocket.takeGameAction({
            type: GameActionTypes.DEPLOY_LEGENDARY_LEADER,
        });
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <CardGridItem
                isOnBoard={false}
                isHighlighted={isDeployable}
                opacity={player.isLegendaryLeaderDeployed ? 0.7 : 1}
                card={player.legendaryLeader}
                onClick={onClick}
                zoomLevel={0.8}
                hasTooltip
            />
        </div>
    );
};
