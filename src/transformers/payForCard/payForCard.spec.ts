import { makeCard, UnitCards } from '@/cardDb/units';
import { SAMPLE_DECKLIST_1 } from '@/factories/deck';
import { makeNewPlayer } from '@/factories/player';
import { Resource } from '@/types/resources';
import { payForCard } from './payForCard';

describe('pay for card', () => {
    it('returns true if the player has enough resources (including for the generic cost)', () => {
        const player = makeNewPlayer('Georgia', SAMPLE_DECKLIST_1);
        player.resourcePool = {
            [Resource.FIRE]: 3,
            [Resource.IRON]: 2,
        };
        const cannonCard = makeCard(UnitCards.CANNON); // costs 1 fire, 2 iron, 2 generic
        expect(payForCard(player, cannonCard).resourcePool).toEqual({
            [Resource.FIRE]: 0,
            [Resource.IRON]: 0,
        });
    });

    it('returns false if the player lacks the resources', () => {
        const player = makeNewPlayer('Georgia', SAMPLE_DECKLIST_1);
        player.resourcePool = {
            [Resource.FIRE]: 4,
            [Resource.IRON]: 1,
        };
        const cannonCard = makeCard(UnitCards.CANNON); // costs 1 fire, 2 iron, 2 generic
        expect(payForCard(player, cannonCard).resourcePool).toEqual({
            [Resource.FIRE]: 4,
            [Resource.IRON]: 1,
        });
    });
});
