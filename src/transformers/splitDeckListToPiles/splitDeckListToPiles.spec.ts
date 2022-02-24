import { makeSampleDeck1 } from '@/factories/deck';
import { splitDeckListToPiles } from './splitDeckListToPiles';

describe('Split deck list to piles', () => {
    it('turns a decklist into a resources, units, and spells pile', () => {
        const piles = splitDeckListToPiles(makeSampleDeck1());
        expect(piles[0].title).toEqual('Resources');
        expect(piles[0].cards.size).toEqual(3);
        expect(piles[1].title).toEqual('Units');
        expect(piles[1].cards.size).toEqual(8);
        expect(piles[2].title).toEqual('Spells');
        expect(piles[2].cards.size).toEqual(1);
    });
});
