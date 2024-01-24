import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
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
            <AnimatePresence>
                {units.map((unitCard) => (
                    <motion.div
                        initial={{ opacity: 0.01, scale: 0.75 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        key={unitCard.id}
                    >
                        <CardGridItem
                            card={unitCard}
                            isHighlighted={
                                highlightableUnits.indexOf(unitCard.id) > -1
                            }
                            hasOnClick
                            hasTooltip
                            isOnBoard
                            zoomLevel={0.6}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </PlayerBoardSectionRow>
    );
    const resourcesSection = (
        <PlayerBoardSectionRow>
            <AnimatePresence>
                {sortedResources.map((resourceCard) => (
                    <motion.div
                        initial={{ opacity: 0.01, scale: 0.75 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        key={resourceCard.id}
                    >
                        <CardGridItem
                            card={resourceCard}
                            hasTooltip
                            hasOnClick
                            isOnBoard
                            zoomLevel={0.6}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
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
