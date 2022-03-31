import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { Player } from '@/types/board';
import { Colors } from '@/constants/colors';
import { CardGridItem } from '../CardGridItem';
import { getHighlightableCards } from '@/client/redux/selectors/getHighlightableCards';
import { ORDERED_RESOURCES } from '@/types/resources';

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
    display: grid;
    align-items: center;
    grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
`;

const PlayerBoardSectionRow = styled.div`
    display: grid;
    grid-gap: 8px;
    padding: 0 12px;
    grid-template-columns: repeat(auto-fill, 117px);
    grid-auto-flow: column;
    overflow-x: auto;
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
    const sortedResources = [...resources].sort(
        (a, b) =>
            ORDERED_RESOURCES.indexOf(a.resourceType) -
            ORDERED_RESOURCES.indexOf(b.resourceType)
    );
    const unitsSection = (
        <PlayerBoardSectionRow>
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
        </PlayerBoardSectionRow>
    );
    const resourcesSection = (
        <PlayerBoardSectionRow>
            {sortedResources.map((resourceCard) => (
                <CardGridItem
                    card={resourceCard}
                    key={resourceCard.id}
                    hasTooltip
                    hasOnClick
                    zoomLevel={0.6}
                />
            ))}
        </PlayerBoardSectionRow>
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
