import { Card, CardType } from '@/types/cards';
import { sum } from 'lodash';

export const getTotalCostForCard = (card: Card): number => {
    if (card.cardType === CardType.RESOURCE) {
        return 0;
    }
    return sum(Object.values(card.cost));
};
