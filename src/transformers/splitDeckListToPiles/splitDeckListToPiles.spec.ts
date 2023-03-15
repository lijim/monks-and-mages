import { AdvancedResourceCards } from '@/cardDb/resources/advancedResources';
import { makeResourceCard } from '@/factories/cards';
import { makeDeck, makeSampleDeck1 } from '@/factories/deck';
import { Resource } from '@/types/resources';
import { splitDeckListToPiles } from './splitDeckListToPiles';

describe('Split deck list to piles', () => {
    it('turns a decklist into a resources, units, and spells pile', () => {
        const piles = splitDeckListToPiles(makeSampleDeck1());
        expect(piles[0].title).toEqual('Resources');
        expect(piles[0].cards.size).toEqual(2);
        expect(piles[1].title).toEqual('Units');
        expect(piles[1].cards.size).toEqual(9);
    });

    it('splits apart advanced and basic resources', () => {
        const piles = splitDeckListToPiles(
            makeDeck({
                mainBoard: [
                    { card: makeResourceCard(Resource.CRYSTAL), quantity: 8 },
                    { card: makeResourceCard(Resource.IRON), quantity: 9 },
                    { card: AdvancedResourceCards.SAHARAN_DESERT, quantity: 4 },
                ],
                sideBoard: [],
            })
        );
        expect(piles[0].title).toEqual('Resources');
        expect(piles[0].cards.size).toEqual(3);
    });
});
