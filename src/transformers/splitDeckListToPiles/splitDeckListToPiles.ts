import { AdvancedResourceCards } from '@/cardDb/resources/advancedResources';
import { SpellCards } from '@/cardDb/spells';
import { UnitCards } from '@/cardDb/units';
import { makeCard, makeResourceCard } from '@/factories/cards';
import {
    Card,
    CardType,
    PileOfCards,
    SpellCard,
    UnitCard,
} from '@/types/cards';
import { ORDERED_RESOURCES, Resource } from '@/types/resources';

// Helps with sorting cards by color
const getColorRanking = (card: UnitCard | SpellCard): number => {
    const { cost } = card;
    const resources = Object.keys(cost) as Resource[];
    if (resources.length === 0) return 0;
    const colors = resources
        .filter((resource) => resource !== Resource.GENERIC)
        .sort((resource1, resource2) => {
            return (
                ORDERED_RESOURCES.indexOf(resource1) -
                ORDERED_RESOURCES.indexOf(resource2)
            );
        });
    let totalRank = 0;
    colors.forEach((color) => {
        const index = ORDERED_RESOURCES.indexOf(color);
        totalRank += totalRank * 10 + index;
    });
    return totalRank;
};

const compareCards = (
    card1: UnitCard | SpellCard,
    card2: UnitCard | SpellCard
) => {
    // First compare by mana cost
    const totalCost1 = Object.values(card1.cost).reduce(
        (prev, curr) => prev + curr,
        0
    );
    const totalCost2 = Object.values(card2.cost).reduce(
        (prev, curr) => prev + curr,
        0
    );
    if (totalCost1 - totalCost2 !== 0) {
        return totalCost1 - totalCost2;
    }

    const totalColorRanking1 = getColorRanking(card1);
    const totalColorRanking2 = getColorRanking(card2);

    if (totalColorRanking1 - totalColorRanking2 !== 0)
        return totalColorRanking1 - totalColorRanking2;

    // last compare by name
    return card1.name.toLowerCase().localeCompare(card2.name.toLowerCase());
};

/**
 * @param deck - deck to split apart for display purposes
 * @returns {Object} pile of cards - returns multiple piles of cards
 * under various titles, such as 'Resources', 'Units', and 'Spells'
 */
export const splitDeckListToPiles = (deck: Card[]): PileOfCards[] => {
    const piles: PileOfCards[] = [];

    // Resource Cards
    const resourcePile: PileOfCards = {
        title: 'Resources',
        cards: new Map(),
    };
    // Basic resources
    ORDERED_RESOURCES.forEach((resource) => {
        const resourceCards = deck.filter(
            (card) =>
                card.cardType === CardType.RESOURCE &&
                card.resourceType === resource &&
                !card.isAdvanced
        );
        if (resourceCards.length > 0)
            resourcePile.cards.set(
                makeResourceCard(resource),
                resourceCards.length
            );
    });

    // Advanced resources
    const advancedResourceCards = Object.values(AdvancedResourceCards);
    advancedResourceCards.sort((a, b) => {
        const totalPriorityA =
            ORDERED_RESOURCES.indexOf(a.resourceType) +
            ORDERED_RESOURCES.indexOf(a.secondaryResourceType) * 0.1;
        const totalPriorityB =
            ORDERED_RESOURCES.indexOf(b.resourceType) +
            ORDERED_RESOURCES.indexOf(b.secondaryResourceType) * 0.1;

        return totalPriorityA - totalPriorityB;
    });
    advancedResourceCards.forEach((resourceCard) => {
        const matchingCards = deck.filter(
            (card) =>
                card.cardType === CardType.RESOURCE &&
                card.name === resourceCard.name
        );
        if (matchingCards.length > 0)
            resourcePile.cards.set(
                makeCard(resourceCard),
                matchingCards.length
            );
    });

    if (resourcePile.cards.size > 0) piles.push(resourcePile);

    // Unit Cards
    const unitsPile: PileOfCards = {
        title: 'Units',
        cards: new Map(),
    };
    const unitCards = Object.values(UnitCards);
    unitCards.sort(compareCards);
    unitCards.forEach((unitCard) => {
        const matchingCards = deck.filter(
            (card) =>
                card.cardType === CardType.UNIT && card.name === unitCard.name
        );
        if (matchingCards.length > 0)
            unitsPile.cards.set(makeCard(unitCard), matchingCards.length);
    });
    if (unitsPile.cards.size > 0) piles.push(unitsPile);

    // Unit Cards
    const spellsPile: PileOfCards = {
        title: 'Spells',
        cards: new Map(),
    };

    const spellCards = Object.values(SpellCards);
    spellCards.sort(compareCards);
    spellCards.forEach((spellCard) => {
        const matchingCards = deck.filter(
            (card) =>
                card.cardType === CardType.SPELL && card.name === spellCard.name
        );
        if (matchingCards.length > 0)
            spellsPile.cards.set(makeCard(spellCard), matchingCards.length);
    });
    if (spellsPile.cards.size > 0) piles.push(spellsPile);
    return piles;
};
