import { UnitCard } from '@/types/cards';
import { PassiveEffect } from '@/types/effects';

type Params = {
    unitCard: UnitCard;
    passiveEffect: PassiveEffect;
};

/**
 * Note - this mutates the unit card. Only use on cloned board objects - do not use
 * to construct pure functions
 * @param {Object} unitCard - unit card to modify
 * @param {Object} passiveEffect - passive effect to grant (if it doesn't already have it)
 * @returns the unit card with the new passive effect
 */
export const grantPassiveEffectForUnit = ({
    unitCard,
    passiveEffect,
}: Params) => {
    if (!unitCard.passiveEffects.includes(passiveEffect)) {
        unitCard.passiveEffects.push(passiveEffect);

        // handle adding attacks to units getting 'quick'
        if (passiveEffect === PassiveEffect.QUICK && unitCard.isFresh) {
            unitCard.numAttacksLeft = unitCard.numAttacks;
            unitCard.isFresh = false;
        }
    }
    return unitCard;
};
