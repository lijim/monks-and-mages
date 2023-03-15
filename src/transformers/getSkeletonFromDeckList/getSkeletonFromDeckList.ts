import { DeckList, Skeleton } from '@/types/cards';

export const getSkeletonFromDeckList = (decklist: DeckList): Skeleton => {
    return {
        mainBoard: decklist.mainBoard.map(({ card, quantity }) => ({
            card: card.name,
            quantity,
        })),
        sideBoard: decklist.sideBoard.map(({ card, quantity }) => ({
            card: card.name,
            quantity,
        })),
    };
};
