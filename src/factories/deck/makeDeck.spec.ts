import { UnitCards } from '@/cardDb/units';
import { CardType, DeckList } from '@/types/cards';
import { Resource } from '@/types/resources';
import { makeCard, makeResourceCard } from '../cards';
import { makeDeck } from './makeDeck';

describe('Make Deck', () => {
    it('takes a decklist and makes a deck', () => {
        const deckList: DeckList = [
            {
                card: makeResourceCard(Resource.BAMBOO),
                quantity: 20,
            },
            {
                card: makeCard(UnitCards.LONGBOWMAN),
                quantity: 4,
            },
        ];

        const deck = makeDeck(deckList);
        expect(
            deck.filter((card) => card.cardType === CardType.RESOURCE).length
        ).toEqual(20);
    });
});
