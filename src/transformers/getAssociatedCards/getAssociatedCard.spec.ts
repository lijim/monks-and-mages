import { AdvancedResourceCards } from '@/cardDb/resources/advancedResources';
import { getAssociatedCards } from './getAssociatedCard';
import { SpellCards } from '@/cardDb/spells';
import { Tokens, UnitCards } from '@/cardDb/units';

describe('get associated card', () => {
    it('returns tea for Fertile Fields', () => {
        expect(
            getAssociatedCards(AdvancedResourceCards.FERTILE_FIELDS)[0]
        ).toMatchObject(SpellCards.TEA);
    });

    it('returns Smolder for Autumn Shaman (extract)', () => {
        expect(getAssociatedCards(UnitCards.AUTUMN_SHAMAN)[0]).toMatchObject(
            SpellCards.SMOLDER
        );
    });

    it('returns Spectral Genesis for Spirit Tender (damage player)', () => {
        expect(getAssociatedCards(UnitCards.SPIRIT_TENDER)[0]).toMatchObject(
            SpellCards.SPECTRAL_GENESIS
        );
    });

    it('returns Shark for Forest Spirit (polymorph)', () => {
        expect(getAssociatedCards(UnitCards.FOREST_SPIRIT)[0]).toMatchObject(
            Tokens.SHARK
        );
    });

    it('returns Distort Reality for Novice Astronomer (add spell to hand)', () => {
        expect(
            getAssociatedCards(UnitCards.NOVICE_ASTRONOMER)[0]
        ).toMatchObject(SpellCards.DISTORT_REALITY);
    });

    it('returns nothing for waving fisherman (self-referencing)', () => {
        expect(getAssociatedCards(UnitCards.WAVING_FISHERMAN)).toHaveLength(0);
    });

    it('returns a single card for Elite Weapon Master (producing two of same card)', () => {
        expect(getAssociatedCards(UnitCards.ELITE_WEAPONS_MASTER)).toHaveLength(
            1
        );
    });
});
