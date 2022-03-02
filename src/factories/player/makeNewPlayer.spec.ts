import { Resource } from '@/types/resources';
import { makeResourceCard } from '../cards';
import { makeNewPlayer } from './makeNewPlayer';

describe('Make New Player', () => {
    it('generates distinct decks for players', () => {
        const decklist = [
            { card: makeResourceCard(Resource.BAMBOO), quantity: 9 },
        ];
        const player1 = makeNewPlayer('Minnie Mouse', decklist);
        const player2 = makeNewPlayer('Donald Duck', decklist);
        expect(player1.name).toBe('Minnie Mouse');
        expect(player1.deck).not.toBe(player2.deck);
    });
});
