import { Card, CardType } from '@/types/cards';
import {
    ORDERED_RESOURCES,
    Resource,
    RESOURCE_GLOSSARY,
} from '@/types/resources';

export const RESOURCE_COLOR = 'rgb(200, 180, 210)'; // resources are generic brown
export const GOLD_COLOR = '#bf9c50'; // having two makes something gold

export const getColorForCard = (card: Card): string => {
    // Case: resource card
    if (card.cardType === CardType.RESOURCE) {
        return RESOURCE_COLOR;
    }

    // Next, check if there's only 1 color
    const costs = ORDERED_RESOURCES.map((resource) => {
        return { resource, cost: card.cost[resource] };
    });

    const nonZeroCosts = costs.filter(
        ({ resource, cost }) => !!cost && resource !== Resource.GENERIC
    );
    if (nonZeroCosts.length === 1) {
        const { resource } = nonZeroCosts[0];
        return RESOURCE_GLOSSARY[resource].primaryColor;
    }

    // if there's two colors, and one is Crystal / the other fire / water
    if (nonZeroCosts.length === 2) {
        const magicCosts = [Resource.WATER, Resource.FIRE];
        if (
            nonZeroCosts[0].resource === Resource.CRYSTAL &&
            magicCosts.indexOf(nonZeroCosts[1].resource) > -1
        ) {
            return RESOURCE_GLOSSARY[nonZeroCosts[1].resource].primaryColor;
        }
    }

    // Otherwise, return gold
    return GOLD_COLOR;
};

export const getSecondaryColorForCard = (card: Card): string | undefined => {
    // Case: resource card
    if (card.cardType === CardType.RESOURCE && card.isAdvanced) {
        return RESOURCE_GLOSSARY[card.secondaryResourceType]?.primaryColor;
    }
    return '';
};
