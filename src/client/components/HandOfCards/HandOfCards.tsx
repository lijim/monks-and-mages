import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { getSelfPlayer } from '@/client/redux/selectors';
import { CardGridItem } from '../CardGridItem';

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
        repeat(${({ handSize }) => Math.max(1, handSize - 1)}, 1fr)
        260px;
    overflow-y: hidden;
`;

// This widthless parent container is a CSS trick to prevent the 1fr units from expanding completely
const WidthLessContainer = styled.div`
    width: 0;
`;

export const HandOfCards: React.FC = () => {
    const selfPlayer = useSelector(getSelfPlayer);
    const handSize = selfPlayer?.hand?.length;
    if (!handSize) return <></>;
    return (
        <HandContainer handSize={handSize}>
            {selfPlayer.hand.map((card) => (
                <WidthLessContainer key={card.id}>
                    <CardGridItem key={card.id} card={card} />
                </WidthLessContainer>
            ))}
        </HandContainer>
    );
};
