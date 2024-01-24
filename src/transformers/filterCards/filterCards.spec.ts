import { makeCard } from '@/factories';
import { cardMatchesResources, filterCards } from './filterCards';
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

    it('filters by on damage effects', () => {
        expect(
            filterCards(
                [
                    makeCard(UnitCards.SPIRIT_TENDER),
                    makeCard(UnitCards.THIRD_YEAR_STUDENTS),
                ],
                {
                    freeText: 'Spectral',
                    isLegendary: null,
                    rarities: [],
                    resourceCosts: [],
                    resourceMatchStrategy: MatchStrategy.EXACT,
                    resources: [],
                    unitTypes: [],
                }
            )
        ).toHaveLength(1);
    });
});
