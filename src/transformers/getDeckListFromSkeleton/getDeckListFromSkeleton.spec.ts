import { CardType } from '@/types/cards';
import { getDeckListFromSkeleton } from './getDeckListFromSkeleton';

describe('get decklist from skeleton', () => {
    it('extracts cards by name', () => {
        const { decklist, errors } = getDeckListFromSkeleton({
            mainBoard: [
                {
                    card: 'Lancer',
                    quantity: 4,
                },
                {
                    card: 'Iron',
                    quantity: 4,
                },
            ],
            sideBoard: [],
        });
        expect(decklist.mainBoard[0].card.name).toBe('Lancer');
        expect(decklist.mainBoard[0].quantity).toBe(4);
        expect(decklist.mainBoard[1].card.name).toBe('Iron');
        expect(decklist.mainBoard[1].card.cardType).toBe(CardType.RESOURCE);
        expect(decklist.mainBoard[1].quantity).toBe(4);
        expect(errors).toEqual([]);
    });

    it('skips over typos and bad inputs', () => {
        const { decklist, errors } = getDeckListFromSkeleton({
            mainBoard: [
                {
                    card: 'LancerZ',
                    quantity: 4,
                },
                {
                    card: 'Iron',
                    quantity: 4,
                },
            ],
            sideBoard: [],
        });
        expect(decklist.mainBoard[0].card.name).toBe('Iron');
        expect(decklist.mainBoard[0].card.cardType).toBe(CardType.RESOURCE);
        expect(decklist.mainBoard[0].quantity).toBe(4);
        expect(decklist.mainBoard).toHaveLength(1);
        expect(errors).toEqual(['Could not read "LancerZ"']);
    });
});
