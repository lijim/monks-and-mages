import { SpellCards } from '@/cardDb/spells';
import { UnitCards } from '@/cardDb/units';
import { Card, CardType, DeckList } from '@/types/cards';
import { Resource } from '@/types/resources';
import { makeCard, makeResourceCard } from '../cards';

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
    const decklist = [
        { card: makeResourceCard(Resource.BAMBOO), quantity: 9 },
        { card: makeResourceCard(Resource.IRON), quantity: 9 },
        { card: makeResourceCard(Resource.FIRE), quantity: 4 },
        { card: makeCard(UnitCards.SQUIRE), quantity: 3 },
        { card: makeCard(UnitCards.LANCER), quantity: 3 },
        { card: makeCard(UnitCards.MARTIAL_TRAINER), quantity: 3 },
        { card: makeCard(UnitCards.CANNON), quantity: 3 },
        { card: makeCard(UnitCards.LONGBOWMAN), quantity: 3 },
        { card: makeCard(UnitCards.JAVELINEER), quantity: 3 },
        { card: makeCard(UnitCards.KNIGHT_TEMPLAR), quantity: 3 },
        { card: makeCard(UnitCards.BOUNTY_COLLECTOR), quantity: 3 },
        { card: makeCard(SpellCards.EMBER_SPEAR), quantity: 2 },
    ];
    return makeDeck(decklist);
};
