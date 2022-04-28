import cloneDeep from 'lodash.clonedeep';

import { Player } from '@/types/board';
import { SpellCard, UnitCard } from '@/types/cards';
import { ORDERED_RESOURCES, Resource } from '@/types/resources';

/**
 * @param {Object} player - player attempting to pay for a card
 * @param {Object} card - a unit card or spell card
 * @returns {boolean} - whether the card can be paid for
 */
export const payForCard = (
    player: Player,
    card: UnitCard | SpellCard
): Player => {
    const clonedPlayer = cloneDeep(player);
    const resourcePool = cloneDeep(clonedPlayer.resourcePool);
    const { cost } = card;
    let canCast = true;

    let costLeftForGeneric = cost[Resource.GENERIC] || 0;

    if (resourcePool.Generic > 0) {
        const remainingForGeneric = Math.min(
            costLeftForGeneric,
            resourcePool.Generic
        );

        costLeftForGeneric -= remainingForGeneric;
        resourcePool.Generic -= remainingForGeneric;
    }

    ORDERED_RESOURCES.forEach((resource) => {
        if (resource === Resource.GENERIC) return;
        const resourceCost = cost[resource] || 0;
        const resourcesToPayWith = resourcePool[resource] || 0;
        if (resourceCost > resourcesToPayWith) canCast = false;
        else resourcePool[resource] = resourcesToPayWith - resourceCost;
        const remainingForGeneric = Math.min(
            costLeftForGeneric,
            resourcePool[resource]
        );

        costLeftForGeneric -= remainingForGeneric;
        resourcePool[resource] -= remainingForGeneric;
    });

    if (costLeftForGeneric) {
        canCast = false;
    }
    if (canCast) {
        clonedPlayer.resourcePool = resourcePool;
    }
    return clonedPlayer;
};
