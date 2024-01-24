import { Card, CardType } from '@/types/cards';
import {
    ORDERED_RESOURCES,
    Resource,
    RESOURCE_GLOSSARY,
} from '@/types/resources';

export const RESOURCE_COLOR = 'rgb(200, 180, 210)'; // resources are generic brown
export const GOLD_COLOR = '#bf9c50'; // having two makes something gold

type ColorPair = {
    primaryColor: string;
    secondaryColor?: string;
};

export const getColorsForCard = (card: Card): ColorPair => {
    // Case: resource card
    if (card.cardType === CardType.RESOURCE) {
        return { primaryColor: RESOURCE_COLOR };
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
        return { primaryColor: RESOURCE_GLOSSARY[resource].primaryColor };
    }

    // if there's two colors, and one is Crystal / the other fire / water
    if (nonZeroCosts.length === 2) {
        const firstResource = nonZeroCosts[0].resource;
        const secondResource = nonZeroCosts[1].resource;
        return {
            primaryColor: RESOURCE_GLOSSARY[firstResource].primaryColor,
            secondaryColor: RESOURCE_GLOSSARY[secondResource].primaryColor,
        };
    }

    // Otherwise, return gold
    return { primaryColor: GOLD_COLOR };
};

export const getSecondaryColorForCard = (card: Card): string | undefined => {
    // Case: resource card
    if (card.cardType === CardType.RESOURCE && card.isAdvanced) {
        return RESOURCE_GLOSSARY[card.secondaryResourceType]?.primaryColor;
    }
    return '';
};
