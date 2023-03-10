import { UnitCards } from '@/mocks/units';
import { getImgSrcForCard } from './getImgSrcForCard';

describe('getImgSrcForCard', () => {
    it('slugifies and removes apostrophes', () => {
        const src = getImgSrcForCard(UnitCards.MAGICIANS_APPRENTICE);
        expect(src).toEqual('/images/units/magicians-apprentice.avif');
    });

    it('constructs a webp src', () => {
        const src = getImgSrcForCard(UnitCards.MAGICIANS_APPRENTICE, 'webp');
        expect(src).toEqual('/images/units/magicians-apprentice.webp');
    });
});
