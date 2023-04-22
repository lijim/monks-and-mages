import { Resource } from '@/types/resources';
import { makeCard, makeResourceCard } from '../cards';
import { makeNewPlayer } from './makeNewPlayer';
import { DeckList } from '@/types/cards';
import { UnitCards } from '@/cardDb/units';
import { Format } from '@/types/games';

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

    it('always separates the legendary leader', () => {
        const decklist: DeckList = {
            mainBoard: [
                { card: makeResourceCard(Resource.IRON), quantity: 9 },
                {
                    card: makeCard(UnitCards.JOAN_OF_ARC_FOLK_HERO),
                    quantity: 1,
                },
            ],
            sideBoard: [],
        };
        const player1 = makeNewPlayer({
            name: 'Minnie Mouse',
            decklist,
            format: Format.LEGENDARY_LEAGUE,
        });
        expect(player1.legendaryLeader.name).toBe('Joan of Arc, Folk Hero');
        expect(player1.legendaryLeader.isLegendaryLeader).toBe(true);
    });
});
