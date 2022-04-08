import { ALL_CARDS } from '@/constants/deckLists';
import { DeckList, Skeleton } from '@/types/cards';

type GetDeckListFromSkeltonReturn = {
    decklist: DeckList;
    errors: string[];
};

export const getDeckListFromSkeleton = (
    skeleton: Skeleton
): GetDeckListFromSkeltonReturn => {
    const decklist: DeckList = [];
    const errors: string[] = [];
    skeleton.forEach(({ card, quantity }) => {
        const matchingEntry = ALL_CARDS.find((c) => c.card.name === card);
        if (matchingEntry) {
            decklist.push({
                card: matchingEntry.card,
                quantity,
            });
        } else {
            errors.push(`Could not read "${card}"`);
        }
    });
    return { decklist, errors };
};
