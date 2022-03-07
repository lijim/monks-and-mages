import React from 'react';
import styled from 'styled-components';

import { Player } from '@/types/board';
import { Colors } from '@/constants/colors';
import { CardGridItem } from '../CardGridItem';

interface PlayerBoardSectionProps {
    isSelfPlayer?: boolean;
    player: Player;
}

interface PlayerBoardSectionContainerProps {
    isSelfPlayer: boolean;
}

const PlayerBoardSectionContainer = styled.div<PlayerBoardSectionContainerProps>`
    background-color: ${({ isSelfPlayer }) =>
        isSelfPlayer ? Colors.FELT_GREEN_ALT : Colors.FELT_GREEN};
    zoom: 0.6;
`;

export const PlayerBoardSection: React.FC<PlayerBoardSectionProps> = ({
    isSelfPlayer,
    player,
}) => {
    if (!player?.units || !player?.resources) {
        return <PlayerBoardSectionContainer isSelfPlayer={isSelfPlayer} />;
    }
    const { units, resources } = player;
    return (
        <PlayerBoardSectionContainer isSelfPlayer={isSelfPlayer}>
            <div>
                {units.map((unitCard) => (
                    <CardGridItem
                        card={unitCard}
                        key={unitCard.id}
                        hasOnClick
                    />
                ))}
            </div>
            <div>
                {resources.map((resourceCard) => (
                    <CardGridItem
                        card={resourceCard}
                        key={resourceCard.id}
                        hasOnClick
                    />
                ))}
            </div>
        </PlayerBoardSectionContainer>
    );
};
