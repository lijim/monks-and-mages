import { uniq } from 'lodash';
import { Card, CardType, Effect } from '@/types/cards';
import { Resource } from '@/types/resources';
import { getAssociatedCards } from '../getAssociatedCards';

/**
 *
 * @param card - card to analyze
 * @param stopRecursion - since this function calls itself, we'll use this to avoid
 * infinite loops by setting it to false
 * @returns all associated colors for the card
 */
export const getColorIdentityForCard = (
    card: Card,
    stopRecursion = false
): Resource[] => {
    let resourceTypes: Resource[] = [];
    let effects: Effect[] = [];
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
        effects = effects.concat([
            ...(card.enterEffects || []),
            ...(card.damagePlayerEffects || []),
        ]);
    }
    if (card.cardType === CardType.SPELL) {
        resourceTypes = resourceTypes.concat(
            Object.keys(card.cost) as Resource[]
        );

        effects = card.effects;
    }

    // Add colors for associated cards
    const associatedCards = getAssociatedCards(card);
    if (!stopRecursion && associatedCards?.length) {
        associatedCards.forEach((associatedCard) => {
            resourceTypes = resourceTypes.concat(
                getColorIdentityForCard(associatedCard, true)
            );
        });
    }

    // Add effect-specific colors
    effects.forEach((effect) => {
        if (effect.resourceType) {
            resourceTypes.push(effect.resourceType);
        }
    });

    return uniq(
        resourceTypes.filter((resource) => resource !== Resource.GENERIC)
    );
};
