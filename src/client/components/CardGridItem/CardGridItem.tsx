import React from 'react';

import { Card, CardType } from '@/types/cards';
import { ResourceCardGridItem } from '../ResourceCardGridItem';
import { SpellGridItem } from '../SpellGridItem';
import { UnitGridItem } from '../UnitGridItem';

interface CardGridItemProps {
    card: Card;
}

export const CardGridItem: React.FC<CardGridItemProps> = ({ card }) => {
    if (card.cardType === CardType.RESOURCE) {
        return <ResourceCardGridItem card={card} />;
    }
    if (card.cardType === CardType.SPELL) {
        return <SpellGridItem card={card} />;
    }
    if (card.cardType === CardType.UNIT) {
        return <UnitGridItem card={card} />;
    }
    return undefined;
};
