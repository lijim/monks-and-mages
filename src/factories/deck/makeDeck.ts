import { Card, CardType, DeckList } from '@/types/cards';
import { makeCard, makeResourceCard } from '../cards';
import { SAMPLE_DECKLIST_1 } from '@/constants/deckLists';

/**
 * Takes a list of cards / quantities of those cards and constructs a deck
 * @param decklist - represented via cards by quantiy
 * @returns an array of cards representing a deck
 */
export const makeDeck = (deckList: DeckList): Card[] => {
    const cards: Card[] = [];
    deckList.mainBoard.forEach(({ card, quantity }) => {
        [...new Array(quantity)].forEach(() => {
            if (card.cardType !== CardType.RESOURCE) {
                cards.push(makeCard(card));
                return;
            }
            if (card.isAdvanced) {
                cards.push(makeCard(card));
            } else {
                cards.push(makeResourceCard(card.resourceType));
            }
        });
    });
    return cards;
};

export const makeSampleDeck1 = (): Card[] => {
    const decklist = SAMPLE_DECKLIST_1;
    return makeDeck(decklist);
};
