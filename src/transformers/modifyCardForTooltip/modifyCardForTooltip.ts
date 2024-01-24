import { Card, CardType } from '@/types/cards';

export const modifyCardForTooltip = (card: Card) =>
    card?.cardType === CardType.RESOURCE ? { ...card, isUsed: false } : card;
