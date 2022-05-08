import { AdvancedResourceCards } from '@/cardDb/resources/advancedResources';
import { SpellCards } from '@/cardDb/spells';
import { UnitCards } from '@/cardDb/units';
import { makeCard, makeResourceCard } from '@/factories/cards';
import { Resource, RESOURCE_GLOSSARY } from '@/types/resources';
import {
    getColorsForCard,
    getSecondaryColorForCard,
    GOLD_COLOR,
    RESOURCE_COLOR,
} from './getColorForCards';

describe('getColorsForCard', () => {
    it('returns white for a resource card', () => {
        expect(getColorsForCard(makeResourceCard(Resource.BAMBOO))).toEqual({
            primaryColor: RESOURCE_COLOR,
        });
    });

    it('returns 2 colors for a multi-colored card', () => {
        expect(getColorsForCard(makeCard(UnitCards.BOUNTY_COLLECTOR))).toEqual({
            primaryColor: RESOURCE_GLOSSARY[Resource.BAMBOO].primaryColor,
            secondaryColor: RESOURCE_GLOSSARY[Resource.IRON].primaryColor,
        });
    });

    it('returns gold for a tri-colored card', () => {
        expect(
            getColorsForCard(makeCard(UnitCards.AMPHIBIOUS_SHINOBI))
        ).toEqual({
            primaryColor: GOLD_COLOR,
        });
    });

    it('returns just water for CRYSTAL+WATER multi-colored cards', () => {
        expect(getColorsForCard(makeCard(UnitCards.WATER_GUARDIAN))).toEqual({
            primaryColor: RESOURCE_GLOSSARY[Resource.WATER].primaryColor,
        });
    });

    it('returns a primary color for CRYSTAL cards (ignoring generic mana)', () => {
        expect(
            getColorsForCard(makeCard(UnitCards.MAGICIANS_APPRENTICE))
        ).toEqual({
            primaryColor: RESOURCE_GLOSSARY[Resource.CRYSTAL].primaryColor,
        });
    });

    it('returns a primary color for FIRE cards', () => {
        expect(getColorsForCard(makeCard(SpellCards.CURSE_HAND))).toEqual({
            primaryColor: RESOURCE_GLOSSARY[Resource.FIRE].primaryColor,
        });
    });
});

describe('Secondary color for card', () => {
    expect(
        getSecondaryColorForCard(makeCard(AdvancedResourceCards.LUSH_REEF))
    ).toEqual(RESOURCE_GLOSSARY[Resource.BAMBOO].primaryColor);
});
