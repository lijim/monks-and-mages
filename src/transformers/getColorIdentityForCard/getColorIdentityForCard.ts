import { uniq } from 'lodash';
import { Card, CardType, Effect } from '@/types/cards';
import { Resource } from '@/types/resources';
import { getAssociatedCards } from '../getAssociatedCards';
import { EffectType } from '@/types/effects';

// Effects where having a 'resourceType' indicates the rules text will use a
// symbol for the resource type, making it change the color identity of the card
const EFFECTS_WITH_RESOURCE_TYPE_SYMBOLS = [
    EffectType.RAMP_FOR_TURN,
    EffectType.EXTRACT_UNIT_AND_SET_COST,
];

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
        if (
            effect.resourceType &&
            EFFECTS_WITH_RESOURCE_TYPE_SYMBOLS.includes(effect.type)
        ) {
            resourceTypes.push(effect.resourceType);
        }
    });

    return uniq(
        resourceTypes.filter((resource) => resource !== Resource.GENERIC)
    );
};
