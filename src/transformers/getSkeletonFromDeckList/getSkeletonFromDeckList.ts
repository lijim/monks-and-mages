import { DeckList, Skeleton } from '@/types/cards';

export const getSkeletonFromDeckList = (decklist: DeckList): Skeleton => {
    return decklist.map(({ card, quantity }) => ({
        card: card.name,
        quantity,
    }));
};
