import { ALL_CARDS } from '@/constants/deckLists';
import { DeckList, Skeleton } from '@/types/cards';

type GetDeckListFromSkeltonReturn = {
    decklist: DeckList;
    errors: string[];
};

export const getDeckListFromSkeleton = (
    skeleton: Skeleton
): GetDeckListFromSkeltonReturn => {
    const decklist: DeckList = { mainBoard: [], sideBoard: [] };
    const errors: string[] = [];
    skeleton.mainBoard.forEach(({ card, quantity }) => {
        const matchingEntry = ALL_CARDS.mainBoard.find(
            (c) => c.card.name === card
        );
        if (matchingEntry) {
            decklist.mainBoard.push({
                card: matchingEntry.card,
                quantity,
            });
        } else {
            errors.push(`Could not read "${card}"`);
        }
    });
    skeleton.sideBoard.forEach(({ card, quantity }) => {
        const matchingEntry = ALL_CARDS.mainBoard.find(
            (c) => c.card.name === card
        );
        if (matchingEntry) {
            decklist.sideBoard.push({
                card: matchingEntry.card,
                quantity,
            });
        } else {
            errors.push(`Could not read "${card}"`);
        }
    });
    return { decklist, errors };
};
