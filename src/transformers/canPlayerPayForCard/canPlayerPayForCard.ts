import cloneDeep from 'lodash.clonedeep';

import { Player } from '@/types/board';
import { SpellCard, UnitCard } from '@/types/cards';
import { ORDERED_RESOURCES, Resource } from '@/types/resources';

/**
 * @param {Object} player - player attempting to pay for a card
 * @param {Object} card - a unit card or spell card
 * @returns {boolean} - whether the card can be paid for
 */
export const canPlayerPayForCard = (
    player: Player,
    card: UnitCard | SpellCard
): boolean => {
    const resourcePool = cloneDeep(player.resourcePool);
    const { cost } = card;
    let canCast = true;
    let remainingForGeneric = 0;

    ORDERED_RESOURCES.forEach((resource) => {
        if (resource === Resource.GENERIC) return;
        const resourceCost = cost[resource] || 0;
        const currentResources = resourcePool[resource] || 0;
        if (resourceCost > currentResources) canCast = false;
        else resourcePool[resource] = currentResources - resourceCost;
        remainingForGeneric += resourcePool[resource];
    });

    if (cost[Resource.GENERIC] && canCast) {
        canCast =
            cost[Resource.GENERIC] <=
            remainingForGeneric + (resourcePool[Resource.GENERIC] || 0);
    }
    return canCast;
};
