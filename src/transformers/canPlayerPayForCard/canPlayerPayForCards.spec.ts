import { UnitCards } from '@/mocks/units';
import { SAMPLE_DECKLIST_1 } from '@/constants/deckLists';
import { makeNewPlayer } from '@/factories/player';
import { Resource } from '@/types/resources';
import { canPlayerPayForCard } from './canPlayerPayForCard';
import { makeCard } from '@/factories/cards';

describe('can player pay for card', () => {
    it('returns true if the player has enough resources (including for the generic cost)', () => {
        const player = makeNewPlayer('Georgia', SAMPLE_DECKLIST_1);
        player.resourcePool = {
            [Resource.FIRE]: 3,
            [Resource.IRON]: 2,
        };
        expect(canPlayerPayForCard(player, makeCard(UnitCards.CANNON))).toBe(
            true
        ); // costs 1 fire, 2 iron, 2 generic
    });

    it('returns true if the player has exactly enough resources (including for the generic cost)', () => {
        const player = makeNewPlayer('Georgia', SAMPLE_DECKLIST_1);
        player.resourcePool = {
            [Resource.BAMBOO]: 1,
            [Resource.IRON]: 1,
        };
        expect(
            canPlayerPayForCard(player, makeCard(UnitCards.LONGBOWMAN))
        ).toBe(true); // costs 1 bamboo, 1 generic
    });

    it('returns false if the player lacks the resources', () => {
        const player = makeNewPlayer('Georgia', SAMPLE_DECKLIST_1);
        player.resourcePool = {
            [Resource.FIRE]: 4,
            [Resource.IRON]: 1,
        };
        expect(canPlayerPayForCard(player, makeCard(UnitCards.CANNON))).toBe(
            false
        ); // costs 1 fire, 2 iron, 2 generic
    });

    it('returns false if the player lacks the resources (test case 2)', () => {
        const player = makeNewPlayer('Georgia', SAMPLE_DECKLIST_1);
        player.resourcePool = {
            [Resource.FIRE]: 2,
            [Resource.IRON]: 2,
        };
        expect(canPlayerPayForCard(player, makeCard(UnitCards.CANNON))).toBe(
            false
        ); // costs 1 fire, 2 iron, 2 generic
    });

    it('returns true if the player pays with generic resources', () => {
        const player = makeNewPlayer('Georgia', SAMPLE_DECKLIST_1);
        player.resourcePool = {
            [Resource.FIRE]: 1,
            [Resource.IRON]: 2,
            [Resource.GENERIC]: 2,
        };
        expect(canPlayerPayForCard(player, makeCard(UnitCards.CANNON))).toBe(
            true
        ); // costs 1 fire, 2 iron, 2 generic
    });
});
