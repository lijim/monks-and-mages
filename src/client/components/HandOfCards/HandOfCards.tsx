import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

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
            minmax(5px, 199px)
        )
        260px;
    overflow-y: hidden;
    padding-top: 8px;
`;

type WidthLessContainerProps = {
    isDeployable?: boolean;
};

// This widthless parent container is a CSS trick to prevent the 1fr units from expanding completely
const WidthLessContainer = styled.div<WidthLessContainerProps>`
    width: 0;

    animation: fadein 1s;

    @keyframes fadein {
        from {
            opacity: 0.01;
        }
        to {
            opacity: 1;
        }
    }
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
        <WidthLessContainer key={card.id} isDeployable={isDeployable}>
            <CardGridItem
                key={card.id}
                card={card}
                hasOnClick
                hasTooltip
                isHighlighted={isDeployable}
            />
        </WidthLessContainer>
    );
};

export const HandOfCards: React.FC = () => {
    const selfPlayer = useSelector(getSelfPlayer);
    const handSize = selfPlayer?.hand?.length;

    if (!handSize) return <></>;
    return (
        <HandContainer handSize={handSize}>
            {selfPlayer.hand.map((card) => (
                <CardInHand
                    key={card.id}
                    card={card}
                    isDeployable={isCardDeployable(card, selfPlayer)}
                />
            ))}
        </HandContainer>
    );
};
