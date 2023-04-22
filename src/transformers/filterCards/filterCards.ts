import isEqual from 'lodash.isequal';
import { Card, CardRarity, CardType, UnitType } from '@/types/cards';
import { Filters, MatchStrategy, ResourceCost } from '@/types/deckBuilder';
import { ORDERED_RESOURCES, Resource } from '@/types/resources';
import { getTypeForUnitCard } from '../getTypeForUnitCard';
import { transformEffectToRulesText } from '../transformEffectsToRulesText';
import { isCardLegendary } from '../isCardLegendary';

const cardMatchesText = (card: Card, text: string): boolean => {
    const nameIncludes = card.name.toLowerCase().includes(text.toLowerCase());
    if (nameIncludes) return true;
    if (card.cardType === CardType.RESOURCE) return false;
    let rules: string[] = [];
    if (card.cardType === CardType.SPELL) {
        rules = [
            ...card.effects.map((effect) => transformEffectToRulesText(effect)),
        ];
    }

    if (card.cardType === CardType.UNIT) {
        rules = [
            ...card.enterEffects.map((effect) =>
                transformEffectToRulesText(effect)
            ),
            ...card.passiveEffects,
        ];
    }
    return rules.some((rule) =>
        rule.toLowerCase().includes(text.toLowerCase())
    );
};

const getResourcesForCard = (card: Card): Resource[] => {
    if (card.cardType === CardType.RESOURCE) {
        if (!card.isAdvanced || !card.secondaryResourceType) {
            return [card.resourceType].filter(
                (resource) => resource !== Resource.GENERIC
            );
        }
        return [card.resourceType, card.secondaryResourceType].filter(
            (resource) => resource !== Resource.GENERIC
        );
    }
    const toReturn: Resource[] = [];
    ORDERED_RESOURCES.forEach((r) => {
        if (r === Resource.GENERIC) return;
        if (card.cost[r]) toReturn.push(r);
    });
    return toReturn;
};

export const cardMatchesResources = (
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
        // At least one color matches on the card
        case MatchStrategy.LOOSE: {
            return resources.every((resource) =>
                resourcesToMatch.includes(resource)
            );
        }
        default: {
            return true;
        }
    }
};

const cardMatchesResourceCosts = (
    card: Card,
    resourceCosts: ResourceCost[]
): boolean => {
    if (!resourceCosts.length) return true;
    let resourceCost = 0;
    if (card.cardType !== CardType.RESOURCE) {
        resourceCost = Object.values(card.cost).reduce((a, b) => a + b, 0);
    }
    if (resourceCost < 7) return resourceCosts.includes(resourceCost);
    return resourceCosts.includes('7+');
};

const cardMatchesUnitTypes = (card: Card, unitTypes: UnitType[]): boolean => {
    if (unitTypes.length === 0) return true;
    if (card.cardType !== CardType.UNIT) return false;
    return unitTypes.includes(getTypeForUnitCard(card));
};

const cardMatchesRarities = (card: Card, rarities: CardRarity[]): boolean => {
    if (rarities.length === 0) return true;
    return rarities.includes(card.rarity);
};

const cardMatchesLegendaryStatus = (
    card: Card,
    isLegendaryFilter: boolean | null
): boolean => {
    if (isLegendaryFilter === null) return true;
    const isLegend = isCardLegendary(card);
    return isLegendaryFilter ? isLegend : !isLegend;
};

/**
 * @param cards - cards to filter
 * @param filters - see @/types/Filters
 * @returns - cards that match the criteria
 */
export const filterCards = (
    cards: Card[],
    {
        freeText,
        resourceCosts,
        resources,
        resourceMatchStrategy,
        unitTypes,
        rarities,
        isLegendary,
    }: Filters
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
    const cardsFilteredByResourceCosts = cardsFilteredByUnitType.filter(
        (card) => cardMatchesResourceCosts(card, resourceCosts)
    );
    const cardsFilteredByRarities = cardsFilteredByResourceCosts.filter(
        (card) => cardMatchesRarities(card, rarities)
    );
    const cardsFilteredByLegendaryStatus = cardsFilteredByRarities.filter(
        (card) => cardMatchesLegendaryStatus(card, isLegendary)
    );
    return cardsFilteredByLegendaryStatus;
};
