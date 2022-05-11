import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Card } from '@/types/cards';
import { CardGridItem } from '../CardGridItem';
import { RootState } from '@/client/redux/store';

const OuterContainer = styled.div`
    display: grid;
    place-items: center;
    span {
        color: white;
        background: cornflowerblue;
        padding: 4px 8px;
        border-radius: 3px;
        margin-bottom: 2px;
    }
`;

/**
 * @returns {JSX.Element} Component for rendering the last played spell card in a game,
 * if any have been played yet.
 */
export const LastPlayedCard: React.FC = () => {
    const lastPlayedCard = useSelector<RootState, Card>((state) => {
        const { lastPlayedCards } = state.clientSideGameExtras;
        if (!lastPlayedCards.length) return null;
        return lastPlayedCards[lastPlayedCards.length - 1];
    });

    if (!lastPlayedCard) {
        return <div></div>;
    }
    return (
        <OuterContainer>
            <span>Last Spell</span>
            <CardGridItem card={lastPlayedCard} hasTooltip zoomLevel={0.6} />
        </OuterContainer>
    );
};
