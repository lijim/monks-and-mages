import sampleSize from 'lodash.samplesize';

import { sum } from 'lodash';
import { Board } from '@/types/board';
import {
    Card,
    CardType,
    EffectRequirement,
    EffectRequirementsType,
    UnitCard,
} from '@/types/cards';
import { resetUnitCard } from '../gameEngine';
import { Resource } from '@/types/resources';

type PerformEffectRequirementParams = {
    addSystemChat?: (message: string) => void;
    board: Board;
    effectRequirement: EffectRequirement;
    playerName: string;
};

/**
 * Effectful code that mutates and performs an effect requirement given a board state
 * @returns {Object} - the board state object, with mutations from the effect requirement
 */
export const performEffectRequirement = ({
    board,
    playerName,
    effectRequirement,
    addSystemChat,
}: PerformEffectRequirementParams) => {
    const activePlayer = board.players.find(
        (player) => player.name === playerName
    );
    const { type, resourceType, cardType, strength = 1 } = effectRequirement;
    switch (type) {
        // Active requirements - have to do something active to have the effect go through
        case EffectRequirementsType.DISCARD_CARD: {
            let cardsToDiscard: Card[] = [];
            if (resourceType) {
                cardsToDiscard = sampleSize(
                    activePlayer.hand.filter(
                        (card) =>
                            card.cardType === CardType.RESOURCE &&
                            card.name === resourceType
                    ),
                    strength
                );
            } else if (cardType) {
                cardsToDiscard = sampleSize(
                    activePlayer.hand.filter(
                        (card) => card.cardType === cardType
                    ),
                    strength
                );
            } else {
                cardsToDiscard = sampleSize(activePlayer.hand, strength);
            }

            if (cardsToDiscard.length < strength) {
                throw new Error('there were not enough cards to discard');
            }

            activePlayer.hand = activePlayer.hand.filter(
                (card) => !cardsToDiscard.includes(card)
            );
            addSystemChat?.(
                `${activePlayer} discarded: ${cardsToDiscard
                    .map((card) => `[[${card.name}]]`)
                    .join(', ')}`
            );
            break;
        }
        case EffectRequirementsType.RETURN_LOWEST_COST_UNIT_TO_HAND: {
            if (activePlayer.units.length < strength) {
                throw new Error(
                    'there were not enough units to return to hand'
                );
            }
            const unitsByCost: Map<number, UnitCard[]> = new Map();

            activePlayer.units.forEach((unit) => {
                const totalCost = sum(
                    Object.values(unit.originalAttributes.cost)
                );
                if (unitsByCost.has(totalCost)) {
                    unitsByCost.get(totalCost).push(unit);
                } else {
                    unitsByCost.set(totalCost, [unit]);
                }
            });

            let unitsToReturn: UnitCard[] = [];
            let unitsLeftToReturn = strength;

            [...unitsByCost.entries()]
                .sort()
                .forEach(([, unitsWithSpecificCost]) => {
                    if (unitsLeftToReturn <= unitsWithSpecificCost.length) {
                        const sample = sampleSize(
                            unitsWithSpecificCost,
                            unitsLeftToReturn
                        );
                        unitsToReturn = [...unitsToReturn, ...sample];
                        unitsLeftToReturn -= sample.length;
                    }
                });

            unitsToReturn.forEach((unit) => resetUnitCard(unit));
            activePlayer.hand = [...activePlayer.hand, ...unitsToReturn];
            activePlayer.units = activePlayer.units.filter(
                (unit) => !unitsToReturn.includes(unit)
            );

            addSystemChat?.(
                `${activePlayer} returned to hand: ${unitsToReturn
                    .map((card) => `[[${card.name}]]`)
                    .join(', ')}`
            );

            break;
        }

        // Passive requirements - just have to be satisfying them to have the effect go through
        case EffectRequirementsType.ARE_AT_LIFE_AT_OR_ABOVE_THRESHOLD: {
            if (activePlayer.health < strength) {
                throw new Error(
                    `their life total (${activePlayer.health}) was lower than ${strength}`
                );
            }
            break;
        }
        case EffectRequirementsType.ARE_AT_LIFE_BELOW_OR_EQUAL_THRESHOLD: {
            if (activePlayer.health > strength) {
                throw new Error(
                    `their life total (${activePlayer.health}) was higher than ${strength}`
                );
            }
            break;
        }
        case EffectRequirementsType.ARE_HOLDING_A_SPECIFIC_CARDNAME: {
            const { cardName } = effectRequirement;

            const numMatchingCardNames = activePlayer.hand.map(
                (card) => card.name === cardName
            ).length;

            if (strength === 0 && numMatchingCardNames > 0) {
                throw new Error(`they are holding at least 1 [[${cardName}]]`);
            }
            if (strength === 1 && numMatchingCardNames < 1) {
                throw new Error(`they are not holding a [[${cardName}]] card`);
            }
            if (strength > 1 && numMatchingCardNames < strength) {
                throw new Error(
                    `they are not holding at least ${strength} [[${cardName}]] cards`
                );
            }
            break;
        }
        case EffectRequirementsType.CONTROL_A_GENERIC_PRODUCING_RESOURCE: {
            const numGenericProducingResources = activePlayer.resources.map(
                (card) =>
                    card.resourceType === Resource.GENERIC ||
                    card.secondaryResourceType === Resource.GENERIC
            ).length;

            if (strength === 0 && numGenericProducingResources > 0) {
                return `they control a resource cards that produces generic mana`;
            }
            if (strength === 1 && numGenericProducingResources < 1) {
                return `they don't control a resource card that produces generic mana`;
            }

            if (strength > 1 && numGenericProducingResources < strength) {
                throw new Error(
                    `they don't control at least ${strength} resource cards that produce generic mana`
                );
            }
            break;
        }
        case EffectRequirementsType.CONTROL_A_LEGENDARY_LEADER: {
            if (!activePlayer.isLegendaryLeaderDeployed) {
                throw new Error(`they don't control a legendary leader`);
            }
            break;
        }
        case EffectRequirementsType.CONTROL_RANGED_AND_MAGICAL: {
            const numRangedUnits = activePlayer.units.map(
                (card) => card.isRanged && !card.isMagical
            ).length;
            const numMagicalUnits = activePlayer.units.map(
                (card) => card.isMagical
            ).length;
            if (numRangedUnits < 1 || numMagicalUnits < 1) {
                throw new Error(
                    `they don't control a ranged unit and a magical unit`
                );
            }
            break;
        }
        case EffectRequirementsType.HAVE_AT_LEAST_THRESHOLD_CARDS_IN_CEMETERY: {
            const numCemeteryCards = activePlayer.cemetery.length;
            if (numCemeteryCards < strength) {
                throw new Error(
                    `they don't have ${strength} cards in the cemetery`
                );
            }
            break;
        }
        case EffectRequirementsType.HAVE_MINIMUM_ATTACK_ON_A_UNIT: {
            const hasUnitWithMinimumAttack = activePlayer.units.some(
                (card) =>
                    card.attack +
                        card.attackBuff +
                        card.oneTurnAttackBuff +
                        card.oneCycleAttackBuff >=
                    strength
            );

            if (!hasUnitWithMinimumAttack) {
                throw new Error(
                    `they don't have a unit with at least ${strength} attack`
                );
            }
            break;
        }
        case EffectRequirementsType.HAVE_NO_CARDS_IN_HAND: {
            if (activePlayer.hand.length > 0) {
                throw new Error(`they don't have an empty hand`);
            }
            break;
        }
        case EffectRequirementsType.HAVE_NO_UNIT_CARDS_IN_DECK: {
            const numUnitCardsInDeck = activePlayer.deck.filter(
                (card) => card.cardType === CardType.UNIT
            ).length;
            if (numUnitCardsInDeck > 0) {
                throw new Error(`they have at least 1 unit card in their deck`);
            }
            break;
        }

        default: {
            break;
        }
    }

    return board;
};
