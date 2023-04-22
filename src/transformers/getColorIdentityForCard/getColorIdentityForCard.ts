import { uniq } from 'lodash';
import { Card, CardType } from '@/types/cards';
import { Resource } from '@/types/resources';

export const getColorIdentityForCard = (card: Card): Resource[] => {
    let resourceTypes: Resource[] = [];
    if (card.cardType === CardType.RESOURCE) {
        if (card.resourceType) {
            resourceTypes.push(card.resourceType);
        }
        if (card.secondaryResourceType) {
            resourceTypes.push(card.secondaryResourceType);
        }
    }
    if (card.cardType === CardType.UNIT) {
        resourceTypes = resourceTypes.concat(
            Object.keys(card.cost) as Resource[]
        );
    }
    if (card.cardType === CardType.SPELL) {
        resourceTypes = resourceTypes.concat(
            Object.keys(card.cost) as Resource[]
        );
    }

    return uniq(
        resourceTypes.filter((resource) => resource !== Resource.GENERIC)
    );
};
