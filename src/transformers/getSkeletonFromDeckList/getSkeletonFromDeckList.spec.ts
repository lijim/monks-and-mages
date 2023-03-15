import {
    AdvancedResourceCards,
    makeAdvancedResourceCard,
} from '@/cardDb/resources/advancedResources';
import { DeckList } from '@/types/cards';
import { getSkeletonFromDeckList } from './getSkeletonFromDeckList';

describe('get skeleton from decklist', () => {
    it('transforms a deck list into a skeleton object', () => {
        const decklist: DeckList = {
            mainBoard: [
                {
                    card: makeAdvancedResourceCard(
                        AdvancedResourceCards.CLOUD_HAVEN
                    ),
                    quantity: 4,
                },
                {
                    card: makeAdvancedResourceCard(
                        AdvancedResourceCards.SEASIDE_COVE
                    ),
                    quantity: 2,
                },
            ],
            sideBoard: [
                {
                    card: makeAdvancedResourceCard(
                        AdvancedResourceCards.SEASIDE_COVE
                    ),
                    quantity: 2,
                },
            ],
        };

        expect(getSkeletonFromDeckList(decklist)).toEqual({
            mainBoard: [
                {
                    card: 'Cloud Haven',
                    quantity: 4,
                },
                {
                    card: 'Seaside Cove',
                    quantity: 2,
                },
            ],
            sideBoard: [
                {
                    card: 'Seaside Cove',
                    quantity: 2,
                },
            ],
        });
    });
});
