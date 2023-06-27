import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { AnimatePresence, motion } from 'framer-motion';
import { getSelfPlayer } from '@/client/redux/selectors';
import { CardGridItem } from '../CardGridItem';
import { Card } from '@/types/cards';
import { canPlayerPayForCard } from '@/transformers/canPlayerPayForCard';
import { Player } from '@/types/board';

interface HandContainerProps {
    handSize: number;
}

/**
 * We use a dynamically recalculated grid-template-columns property in order to get
 * the appropriate size for how much space each card should take up in the HandOfCards
 * component.  We want the rightmost card to be 100% visible, with each subsequent card
 * taking equal space
 */
const HandContainer = styled.div<HandContainerProps>`
    display: grid;
    grid-template-columns:
        repeat(
            ${({ handSize }) => Math.max(1, handSize - 1)},
            minmax(5px, 160px)
        )
        260px;
    overflow-y: hidden;
    padding-top: 8px;
`;

const isCardDeployable = (card: Card, selfPlayer: Player) => {
    const playerHasCardsLeftToDeploy = selfPlayer.resourcesLeftToDeploy > 0;

    if (card.cardType === 'Resource') return playerHasCardsLeftToDeploy;
    return canPlayerPayForCard(selfPlayer, card);
};

interface CardInHandProps {
    card: Card;
    isDeployable?: boolean;
}
// one of the cards in the hand of cards
const CardInHand: React.FC<CardInHandProps> = ({ card, isDeployable }) => {
    return (
        <motion.div
            initial={{ opacity: 0.01, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <CardGridItem
                key={card.id}
                card={card}
                hasOnClick
                hasTooltip
                isHighlighted={isDeployable}
                zoomLevel={0.8}
            />
        </motion.div>
    );
};

export const HandOfCards: React.FC = () => {
    const selfPlayer = useSelector(getSelfPlayer);
    const handSize = selfPlayer?.hand?.length;

    return (
        <HandContainer className={`hand-of-cards`} handSize={handSize}>
            <AnimatePresence>
                {selfPlayer?.hand?.map((card) => (
                    <CardInHand
                        key={card.id}
                        card={card}
                        isDeployable={isCardDeployable(card, selfPlayer)}
                    />
                ))}
            </AnimatePresence>
        </HandContainer>
    );
};
