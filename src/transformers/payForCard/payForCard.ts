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

    ORDERED_RESOURCES.forEach((resource) => {
        if (resource === Resource.GENERIC) return;
        if (!cost[resource]) return;
        if (cost[resource] > resourcePool[resource] || 0) canCast = false;
        else resourcePool[resource] -= cost[resource];
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
