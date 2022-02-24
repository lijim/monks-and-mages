import cloneDeep from 'lodash.clonedeep';
import { Card, CardType, ResourceCard } from '@/types/cards';
import { Resource } from '@/types/resources';

export const makeResourceCard = (resource: Resource): ResourceCard => ({
    cardType: CardType.RESOURCE,
    name: resource,
    resourceType: resource,
    isUsed: false,
});

export const makeCard = <T = Card>(card: T): T => {
    return cloneDeep(card);
};
