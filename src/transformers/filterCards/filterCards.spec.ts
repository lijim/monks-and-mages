import { makeCard } from '@/factories';
import { cardMatchesResources } from './filterCards';
import { UnitCards } from '@/cardDb/units';
import { Resource } from '@/types/resources';
import { MatchStrategy } from '@/types/deckBuilder';
import { AdvancedResourceCards } from '@/cardDb/resources/advancedResources';

describe('filter cards', () => {
    it('filters by resources loosely', () => {
        expect(
            cardMatchesResources(
                makeCard(UnitCards.ALADDIN),
                [Resource.CRYSTAL, Resource.WATER, Resource.FIRE],
                MatchStrategy.LOOSE
            )
        ).toEqual(true);
        expect(
            cardMatchesResources(
                makeCard(AdvancedResourceCards.TREACHEROUS_DESERT),
                [Resource.CRYSTAL, Resource.WATER, Resource.FIRE],
                MatchStrategy.LOOSE
            )
        ).toEqual(true);
    });
});
