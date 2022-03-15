import { RootState } from '@/client/redux/store';
import { getDefaultTargetForEffect, TargetTypes } from '@/types/effects';
import {
    getAttackingUnit,
    getLastEffect,
    getOtherPlayers,
    getSelfPlayer,
    isBoardInteractable,
} from '../selectors';

// returns highlightable cards, but only the string id's for them
export const getHighlightableCards = (state: Partial<RootState>): string[] => {
    if (!isBoardInteractable(state)) return [];

    const lastEffect = getLastEffect(state);
    const selfPlayer = getSelfPlayer(state);
    const otherPlayers = getOtherPlayers(state).filter(
        (player) => player.isAlive
    );
    const otherUnits = otherPlayers
        .flatMap((otherPlayer) => otherPlayer.units)
        .map((unit) => unit.id);

    if (lastEffect) {
        const target =
            lastEffect.target || getDefaultTargetForEffect(lastEffect.type);
        const ownUnits = selfPlayer.units.map((unit) => unit.id);

        switch (target) {
            case TargetTypes.OPPOSING_UNIT: {
                return otherUnits;
            }
            case TargetTypes.OWN_UNIT: {
                return ownUnits;
            }
            case TargetTypes.ANY:
            case TargetTypes.UNIT: {
                return [...ownUnits, ...otherUnits];
            }
            default: {
                return [];
            }
        }
    }

    const attackingUnit = getAttackingUnit(state);
    const matchingAttackingUnit = selfPlayer.units.find(
        (unit) => unit.id === attackingUnit
    );

    if (matchingAttackingUnit) {
        if (matchingAttackingUnit.isMagical) {
            return otherUnits;
        }
        return otherPlayers
            .flatMap((otherPlayer) => {
                const { units } = otherPlayer;
                // if there are soldiers, they take defender priority
                if (units.find((unit) => unit.isSoldier)) {
                    return units.filter((unit) => unit.isSoldier);
                }
                return units;
            })
            .map((unit) => unit.id);
    }

    const ownUnitsWithAttacksLeft = selfPlayer.units
        .filter(
            (unit) =>
                unit.numAttacksLeft > 0 &&
                // exclude the presently attacking unit in highlight calculations
                unit.id !== attackingUnit
        )
        .map((unit) => unit.id);

    return ownUnitsWithAttacksLeft;
};
