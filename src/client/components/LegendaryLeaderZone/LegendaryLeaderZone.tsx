import React from 'react';
import { useSelector } from 'react-redux';
import { Player } from '@/types/board';
import { CardGridItem } from '../CardGridItem';
import { getSelfPlayer } from '@/client/redux/selectors';
import { canPlayerPayForCard } from '@/transformers';

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
    if (!player?.legendaryLeader) return null;

    const isDeployable =
        player.name === selfPlayer?.name && isLegendaryLeaderDeployable(player);

    return (
        <div style={{ textAlign: 'center' }}>
            <CardGridItem
                isOnBoard={false}
                isHighlighted={isDeployable}
                opacity={player.isLegendaryLeaderDeployed ? 0.5 : 1}
                card={player.legendaryLeader}
                zoomLevel={0.8}
                hasTooltip
            />
        </div>
    );
};
