import { UnitCards } from '@/cardDb/units';
import { getColorIdentityForCard } from './getColorIdentityForCard';
import { Resource } from '@/types/resources';

describe('color identities for cards', () => {
    it('returns with 4 colors (including blue) for the monkey king because it extracts bubble blast', () => {
        expect(getColorIdentityForCard(UnitCards.THE_MONKEY_KING)).toEqual([
            Resource.BAMBOO,
            Resource.CRYSTAL,
            Resource.FIRE,
            Resource.WATER,
        ]);
    });

    it('returns 3 colors for the Arti because his enter the board effect includes a water symbol', () => {
        expect(getColorIdentityForCard(UnitCards.ARTI_THE_CHANNELER)).toEqual([
            Resource.BAMBOO,
            Resource.FIRE,
            Resource.WATER,
        ]);
    });
});
