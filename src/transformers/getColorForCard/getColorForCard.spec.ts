import { SpellCards } from '@/cardDb/spells';
import { UnitCards } from '@/cardDb/units';
import { makeCard, makeResourceCard } from '@/factories/cards';
import { Resource, RESOURCE_GLOSSARY } from '@/types/resources';
import { getColorForCard, GOLD_COLOR, RESOURCE_COLOR } from './getColorForCard';

describe('getColorForCard', () => {
    it('returns white for a resource card', () => {
        expect(getColorForCard(makeResourceCard(Resource.BAMBOO))).toEqual(
            RESOURCE_COLOR
        );
    });

    it('returns gold for a multi-colored card', () => {
        expect(getColorForCard(makeCard(UnitCards.BOUNTY_COLLECTOR))).toEqual(
            GOLD_COLOR
        );
    });

    it('does not return gold for CRYSTAL+WATER multi-colored cards', () => {
        expect(getColorForCard(makeCard(UnitCards.WATER_GUARDIAN))).toEqual(
            RESOURCE_GLOSSARY[Resource.WATER].primaryColor
        );
    });

    it('returns a primary color for CRYSTAL cards (ignoring generic mana)', () => {
        expect(
            getColorForCard(makeCard(UnitCards.MAGICIANS_APPRENTICE))
        ).toEqual(RESOURCE_GLOSSARY[Resource.CRYSTAL].primaryColor);
    });

    it('returns a primary color for FIRE cards', () => {
        expect(getColorForCard(makeCard(SpellCards.CURSE_HAND))).toEqual(
            RESOURCE_GLOSSARY[Resource.FIRE].primaryColor
        );
    });
});
