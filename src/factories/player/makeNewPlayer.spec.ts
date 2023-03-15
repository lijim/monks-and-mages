import { Resource } from '@/types/resources';
import { makeResourceCard } from '../cards';
import { makeNewPlayer } from './makeNewPlayer';
import { DeckList } from '@/types/cards';

describe('Make New Player', () => {
    it('generates distinct decks for players', () => {
        const decklist: DeckList = {
            mainBoard: [
                { card: makeResourceCard(Resource.BAMBOO), quantity: 9 },
            ],
            sideBoard: [],
        };
        const player1 = makeNewPlayer({ name: 'Minnie Mouse', decklist });
        const player2 = makeNewPlayer({ name: 'Donald Duck', decklist });
        expect(player1.name).toBe('Minnie Mouse');
        expect(player1.deck).not.toBe(player2.deck);
    });
});
