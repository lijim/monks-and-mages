import { UnitCards } from '@/mocks/units';
import { SAMPLE_DECKLIST_1 } from '@/constants/deckLists';
import { makeNewPlayer } from '@/factories/player';
import { Resource } from '@/types/resources';
import { payForCard } from './payForCard';
import { makeCard } from '@/factories/cards';

describe('pay for card', () => {
    it('pays for the card if the player has enough resources (including for the generic cost)', () => {
        const player = makeNewPlayer('Georgia', SAMPLE_DECKLIST_1);
        player.resourcePool = {
            [Resource.FIRE]: 3,
            [Resource.IRON]: 2,
        };
        const cannonCard = makeCard(UnitCards.CANNON); // costs 1 fire, 2 iron, 2 generic
        expect(payForCard(player, cannonCard).resourcePool).toMatchObject({
            [Resource.FIRE]: 0,
            [Resource.IRON]: 0,
        });
    });

    it('pays for the card if the player has exactly enough resources', () => {
        const player = makeNewPlayer('Georgia', SAMPLE_DECKLIST_1);
        player.resourcePool = {
            [Resource.IRON]: 1,
            [Resource.BAMBOO]: 1,
        };
        const cannonCard = makeCard(UnitCards.LONGBOWMAN); // costs 1 bamboo, 1 generic
        expect(payForCard(player, cannonCard).resourcePool).toMatchObject({
            [Resource.IRON]: 0,
            [Resource.BAMBOO]: 0,
        });
    });

    it('does not pay if the player lacks the resources', () => {
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

    it('does not pay if the player lacks the resources (2)', () => {
        const player = makeNewPlayer('Georgia', SAMPLE_DECKLIST_1);
        player.resourcePool = {
            [Resource.FIRE]: 2,
            [Resource.IRON]: 2,
        };
        const cannonCard = makeCard(UnitCards.CANNON); // costs 1 fire, 2 iron, 2 generic
        expect(payForCard(player, cannonCard).resourcePool).toEqual({
            [Resource.FIRE]: 2,
            [Resource.IRON]: 2,
        });
    });

    it('pays with generic resources', () => {
        const player = makeNewPlayer('Georgia', SAMPLE_DECKLIST_1);
        player.resourcePool = {
            [Resource.FIRE]: 1,
            [Resource.IRON]: 2,
            [Resource.GENERIC]: 2,
        };
        const cannonCard = makeCard(UnitCards.CANNON); // costs 1 fire, 2 iron, 2 generic
        expect(payForCard(player, cannonCard).resourcePool).toMatchObject({
            [Resource.FIRE]: 0,
            [Resource.IRON]: 0,
            [Resource.GENERIC]: 0,
        });
    });

    it('pays with generic resources first', () => {
        const player = makeNewPlayer('Georgia', SAMPLE_DECKLIST_1);
        player.resourcePool = {
            [Resource.FIRE]: 2,
            [Resource.IRON]: 3,
            [Resource.GENERIC]: 2,
        };
        const cannonCard = makeCard(UnitCards.CANNON); // costs 1 fire, 2 iron, 2 generic
        expect(payForCard(player, cannonCard).resourcePool).toMatchObject({
            [Resource.FIRE]: 1,
            [Resource.IRON]: 1,
            [Resource.GENERIC]: 0,
        });
    });
});
