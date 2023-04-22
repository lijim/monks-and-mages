import { Card, CardType } from '@/types/cards';

export const isCardLegendary = (card: Card) =>
    card.cardType === CardType.UNIT && card.isLegendary;
