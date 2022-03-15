import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { Player } from '@/types/board';
import { Colors } from '@/constants/colors';
import { CardGridItem } from '../CardGridItem';
import { getHighlightableCards } from '@/client/redux/selectors/getHighlightableCards';

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
    box-shadow: 0 2px 2px rgb(0 0 0 / 50%);
`;

export const PlayerBoardSection: React.FC<PlayerBoardSectionProps> = ({
    isSelfPlayer,
    player,
}) => {
    const highlightableUnits = useSelector(getHighlightableCards);

    if (!player?.units || !player?.resources) {
        return <PlayerBoardSectionContainer isSelfPlayer={isSelfPlayer} />;
    }
    const { units, resources } = player;
    const unitsSection = (
        <div>
            {units.map((unitCard) => (
                <CardGridItem
                    card={unitCard}
                    isHighlighted={highlightableUnits.indexOf(unitCard.id) > -1}
                    key={unitCard.id}
                    hasOnClick
                    hasTooltip
                    isOnBoard
                    zoomLevel={0.6}
                />
            ))}
        </div>
    );
    const resourcesSection = (
        <div>
            {resources.map((resourceCard) => (
                <CardGridItem
                    card={resourceCard}
                    key={resourceCard.id}
                    hasOnClick
                    zoomLevel={0.6}
                />
            ))}
        </div>
    );
    return (
        <PlayerBoardSectionContainer isSelfPlayer={isSelfPlayer}>
            {!isSelfPlayer && resourcesSection}
            {/* for other players, display resources above units */}
            {unitsSection}
            {isSelfPlayer && resourcesSection}
        </PlayerBoardSectionContainer>
    );
};
