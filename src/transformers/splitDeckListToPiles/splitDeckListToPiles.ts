import { SpellCards } from '@/cardDb/spells';
import { UnitCards } from '@/cardDb/units';
import { makeCard, makeResourceCard } from '@/factories/cards';
import { Card, CardType, PileOfCards } from '@/types/cards';
import { ORDERED_RESOURCES } from '@/types/resources';

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
    ORDERED_RESOURCES.forEach((resource) => {
        const resourceCards = deck.filter(
            (card) =>
                card.cardType === CardType.RESOURCE &&
                card.resourceType === resource
        );
        if (resourceCards.length > 0)
            resourcePile.cards.set(
                makeResourceCard(resource),
                resourceCards.length
            );
    });
    if (resourcePile.cards.size > 0) piles.push(resourcePile);

    // Unit Cards
    const unitsPile: PileOfCards = {
        title: 'Units',
        cards: new Map(),
    };
    Object.values(UnitCards).forEach((unitCard) => {
        const unitCards = deck.filter(
            (card) =>
                card.cardType === CardType.UNIT && card.name === unitCard.name
        );
        if (unitCards.length > 0)
            unitsPile.cards.set(makeCard(unitCards[0]), unitCards.length);
    });
    if (unitsPile.cards.size > 0) piles.push(unitsPile);

    // Unit Cards
    const spellsPile: PileOfCards = {
        title: 'Spells',
        cards: new Map(),
    };
    Object.values(SpellCards).forEach((spellCard) => {
        const spellCards = deck.filter(
            (card) =>
                card.cardType === CardType.SPELL && card.name === spellCard.name
        );
        if (spellCards.length > 0)
            spellsPile.cards.set(makeCard(spellCards[0]), spellCards.length);
    });
    if (spellsPile.cards.size > 0) piles.push(spellsPile);
    return piles;
};
