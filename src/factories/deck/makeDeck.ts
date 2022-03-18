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
    deckList.forEach(({ card, quantity }) => {
        [...new Array(quantity)].forEach(() => {
            const newCard =
                card.cardType === CardType.RESOURCE
                    ? makeResourceCard(card.resourceType)
                    : makeCard(card);
            cards.push(newCard);
        });
    });
    return cards;
};

export const makeSampleDeck1 = (): Card[] => {
    const decklist = SAMPLE_DECKLIST_1;
    return makeDeck(decklist);
};
