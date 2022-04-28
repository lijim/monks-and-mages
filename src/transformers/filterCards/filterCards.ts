import isEqual from 'lodash.isequal';
import { Card, CardType, UnitType } from '@/types/cards';
import { Filters, MatchStrategy } from '@/types/deckBuilder';
import { ORDERED_RESOURCES, Resource } from '@/types/resources';
import { getTypeForUnitCard } from '../getTypeForUnitCard';

const cardMatchesText = (card: Card, text: string): boolean => {
    return card.name.toLowerCase().includes(text.toLowerCase());
};

const getResourcesForCard = (card: Card): Resource[] => {
    if (card.cardType === CardType.RESOURCE) {
        if (!card.isAdvanced || !card.secondaryResourceType)
            return [card.resourceType];
        return [card.resourceType, card.secondaryResourceType];
    }
    const toReturn: Resource[] = [];
    ORDERED_RESOURCES.forEach((r) => {
        if (r === Resource.GENERIC) return;
        if (card.cost[r]) toReturn.push(r);
    });
    return toReturn;
};

const cardMatchesResources = (
    card: Card,
    resourcesToMatch: Resource[],
    resourceMatchStrategy: MatchStrategy
) => {
    if (resourcesToMatch.length === 0) return true;
    const resources = getResourcesForCard(card);
    switch (resourceMatchStrategy) {
        // all filtered resources match the card's resources exactly, 1 for 1
        case MatchStrategy.EXACT: {
            return isEqual(
                resourcesToMatch.slice().sort(),
                resources.slice().sort()
            );
        }
        // all filtered resources match
        case MatchStrategy.STRICT: {
            let toReturn = true;
            resourcesToMatch.forEach((r) => {
                if (resources.indexOf(r) === -1) toReturn = false;
            });
            return toReturn;
        }
        // At least one color matches on the card
        case MatchStrategy.LOOSE: {
            let toReturn = false;
            resourcesToMatch.forEach((r) => {
                if (resources.indexOf(r) > -1) toReturn = true;
            });
            return toReturn;
        }
        default: {
            return true;
        }
    }
};

const cardMatchesUnitTypes = (card: Card, unitTypes: UnitType[]): boolean => {
    if (unitTypes.length === 0) return true;
    if (card.cardType !== CardType.UNIT) return false;
    return unitTypes.includes(getTypeForUnitCard(card));
};

/**
 * Note: unit tests omitted temporarily in favor of an integration test on DeckBuilder
 * @param cards - cards to filter
 * @param filters - see @/types/Filters
 * @returns - cards that match the criteria
 */
export const filterCards = (
    cards: Card[],
    { freeText, resources, resourceMatchStrategy, unitTypes }: Filters
): Card[] => {
    const cardsFilteredByFreeText = freeText
        ? cards.filter((card) => cardMatchesText(card, freeText))
        : cards;

    const cardsFilteredByResource = cardsFilteredByFreeText.filter((card) =>
        cardMatchesResources(card, resources, resourceMatchStrategy)
    );

    const cardsFilteredByUnitType = cardsFilteredByResource.filter((card) =>
        cardMatchesUnitTypes(card, unitTypes)
    );
    return cardsFilteredByUnitType;
};
