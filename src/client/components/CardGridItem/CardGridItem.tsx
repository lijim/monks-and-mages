import React, { useContext } from 'react';

import { Card, CardType } from '@/types/cards';
import { ResourceCardGridItem } from '../ResourceCardGridItem';
import { SpellGridItem } from '../SpellGridItem';
import { UnitGridItem } from '../UnitGridItem';
import { ClickOnCardContext } from '../WebSockets';

interface CardGridItemProps {
    card: Card;
    hasOnClick?: boolean;
}

export const CardGridItem: React.FC<CardGridItemProps> = ({
    card,
    hasOnClick,
}) => {
    const handleClickCard = useContext(ClickOnCardContext);
    const onClick = () => {
        handleClickCard(card.id);
    };
    if (card.cardType === CardType.RESOURCE) {
        return (
            <ResourceCardGridItem
                card={card}
                onClick={hasOnClick ? onClick : undefined}
            />
        );
    }
    if (card.cardType === CardType.SPELL) {
        return <SpellGridItem card={card} />;
    }
    if (card.cardType === CardType.UNIT) {
        return <UnitGridItem card={card} />;
    }
    return undefined;
};
