import { repeat } from 'lodash';
import { SpellCards } from '@/cardDb/spells';
import { Tokens, UnitCards } from '@/cardDb/units';
import {
    Effect,
    EffectRequirement,
    EffectRequirementsType,
} from '@/types/cards';
import {
    EffectType,
    getDefaultTargetForEffect,
    TargetTypes,
} from '@/types/effects';
import {
    ORDERED_RESOURCES,
    RESOURCE_GLOSSARY,
    Resource,
} from '@/types/resources';
import { joinPhrases } from '../joinPhrases/joinPhrases';
import { assertUnreachable } from '@/types/assertUnreachable';

const TARGET_TYPES_TO_RULES_TEXT = {
    [TargetTypes.ALL_OPPONENTS]: 'all opponents',
    [TargetTypes.ALL_OPPOSING_UNITS]: 'all opposing units',
    [TargetTypes.ALL_PLAYERS]: 'all players',
    [TargetTypes.ALL_SELF_UNITS_CEMETERY]: 'all units in your cemetery',
    [TargetTypes.ALL_SELF_UNITS]: 'all your units',
    [TargetTypes.ALL_UNITS]: 'all units',
    [TargetTypes.ANY]: 'any target',
    [TargetTypes.OPPONENT]: 'any opponent',
    [TargetTypes.OPPOSING_UNIT]: 'any opposing unit',
    [TargetTypes.OWN_UNIT]: 'any unit controlled by you',
    [TargetTypes.PLAYER]: 'any player',
    [TargetTypes.SELF_PLAYER]: 'yourself',
    [TargetTypes.UNIT]: 'any unit',
};

const TARGET_TYPES_FOR_LEADOFF = {
    ...TARGET_TYPES_TO_RULES_TEXT,
    [TargetTypes.ALL_OPPONENTS]: 'each opponent',
    [TargetTypes.ALL_OPPOSING_UNITS]: 'each opposing units',
    [TargetTypes.ALL_PLAYERS]: 'each players',
    [TargetTypes.ALL_SELF_UNITS_CEMETERY]: 'all units in your cemetery',
    [TargetTypes.ALL_SELF_UNITS]: 'all your units',
    [TargetTypes.ALL_UNITS]: 'all units',
    [TargetTypes.ANY]: 'any target',
    [TargetTypes.OPPONENT]: 'any opponent',
    [TargetTypes.OPPOSING_UNIT]: 'any opposing unit',
    [TargetTypes.OWN_UNIT]: 'any unit controlled by you',
    [TargetTypes.PLAYER]: 'any player',
    [TargetTypes.SELF_PLAYER]: 'yourself',
    [TargetTypes.UNIT]: 'any unit',
};

const TARGET_TYPES_TO_RULES_TEXT_NON_SOLDIERS = {
    ...TARGET_TYPES_TO_RULES_TEXT,
    [TargetTypes.ALL_OPPOSING_UNITS]: 'all opposing non-soldier units',
    [TargetTypes.ALL_SELF_UNITS_CEMETERY]:
        'all non-soldier units in your cemetery',
    [TargetTypes.ALL_SELF_UNITS]: 'all your non-soldier units',
    [TargetTypes.ALL_UNITS]: 'all non-soldier units',
    [TargetTypes.OPPOSING_UNIT]: 'any opposing non-soldier unit',
    [TargetTypes.OWN_UNIT]: 'any non-soldier unit controlled by you',
    [TargetTypes.UNIT]: 'any non-soldier unit',
};

const TARGET_TYPES_TO_RULES_TEXT_POSSESIVE = {
    [TargetTypes.ALL_OPPONENTS]: "all opponents'",
    [TargetTypes.ALL_OPPOSING_UNITS]: "all opposing units'",
    [TargetTypes.ALL_PLAYERS]: "all players'",
    [TargetTypes.ALL_SELF_UNITS_CEMETERY]: "all your cemetery units'",
    [TargetTypes.ALL_SELF_UNITS]: "all your units'",
    [TargetTypes.ALL_UNITS]: "all units'",
    [TargetTypes.ANY]: "any target's",
    [TargetTypes.OPPONENT]: "any opponent's",
    [TargetTypes.OPPOSING_UNIT]: "any opposing unit's",
    [TargetTypes.OWN_UNIT]: "any of your unit's",
    [TargetTypes.PLAYER]: "any player's",
    [TargetTypes.SELF_PLAYER]: 'your',
    [TargetTypes.UNIT]: "any unit's",
};

const TARGET_TYPES_TO_RULES_TEXT_CONTROLLER_POSSESIVE = {
    [TargetTypes.ALL_OPPONENTS]: 'their',
    [TargetTypes.ALL_OPPOSING_UNITS]: "their controllers'",
    [TargetTypes.ALL_PLAYERS]: 'their',
    [TargetTypes.ALL_SELF_UNITS_CEMETERY]: 'your',
    [TargetTypes.ALL_SELF_UNITS]: 'your',
    [TargetTypes.ALL_UNITS]: "their controllers'",
    [TargetTypes.ANY]: "its controller's",
    [TargetTypes.OPPONENT]: 'their',
    [TargetTypes.OPPOSING_UNIT]: "its controller's",
    [TargetTypes.OWN_UNIT]: 'your',
    [TargetTypes.PLAYER]: 'their',
    [TargetTypes.SELF_PLAYER]: 'your',
    [TargetTypes.UNIT]: "its controller's",
};

// requirements
const ACTIVE_REQUIREMENT_TYPES: EffectRequirementsType[] = [
    EffectRequirementsType.DISCARD_CARD,
    EffectRequirementsType.RETURN_LOWEST_COST_UNIT_TO_HAND,
];

const PLURAL_TARGET_TYPES = [
    TargetTypes.ALL_OPPONENTS,
    TargetTypes.ALL_OPPOSING_UNITS,
    TargetTypes.ALL_PLAYERS,
    TargetTypes.ALL_SELF_UNITS,
    TargetTypes.ALL_SELF_UNITS_CEMETERY,
    TargetTypes.ALL_UNITS,
];
const isTargetTypePlural = (targetType: TargetTypes): boolean =>
    PLURAL_TARGET_TYPES.indexOf(targetType) > -1;

const titleize = (str: string): string => {
    return str[0].toLocaleUpperCase() + str.substring(1);
};
const unTitleize = (str: string): string => {
    return str[0].toLocaleLowerCase() + str.substring(1);
};

const formatCardCost = (cost: Effect['cost']) => {
    const costs: string[] = [];
    ORDERED_RESOURCES.forEach((resource) => {
        if (!(resource in cost)) {
            return;
        }
        const number = cost[resource];
        const castingSymbol = RESOURCE_GLOSSARY[resource].icon;
        if (resource === Resource.GENERIC) {
            costs.push(`${number}`);
        } else {
            costs.push(repeat(castingSymbol, number));
        }
    });
    return costs.join('');
};

const getRequirementText = (effectRequirement: EffectRequirement) => {
    const {
        resourceType,
        cardType,
        cardName,
        strength = 1,
    } = effectRequirement;
    switch (effectRequirement.type) {
        // Active requirements - have to do something active to have the effect go through
        case EffectRequirementsType.DISCARD_CARD: {
            if (resourceType) {
                return `you discard ${strength} [${resourceType}] card${
                    strength > 1 ? 's' : ''
                } at random`;
            }
            if (cardType) {
                return `you discard ${strength} [${cardType}] card${
                    strength > 1 ? 's' : ''
                } at random`;
            }
            return `you discard ${strength} [${cardType}] card${
                strength > 1 ? 's' : ''
            } at random`;
        }
        case EffectRequirementsType.RETURN_LOWEST_COST_UNIT_TO_HAND: {
            return `you return your ${strength} lowest costed unit${
                strength > 1 ? 's' : ''
            } to your hand (chosen at random)`;
        }

        // Passive requirements - just have to be satisfying them to have the effect go through
        case EffectRequirementsType.ARE_AT_LIFE_AT_OR_ABOVE_THRESHOLD: {
            return `you are at a life total of ${strength} or higher`;
        }
        case EffectRequirementsType.ARE_AT_LIFE_BELOW_OR_EQUAL_THRESHOLD: {
            return `you are at a life total of ${strength} or lower`;
        }
        case EffectRequirementsType.ARE_HOLDING_A_SPECIFIC_CARDNAME: {
            if (strength === 0) {
                return `you are holding no [[${cardName}]] cards`;
            }
            if (strength === 1) {
                return `you are holding a [[${cardName}]] card`;
            }
            return `you are holding at least [[${cardName}]] cards`;
        }
        case EffectRequirementsType.CONTROL_A_GENERIC_PRODUCING_RESOURCE: {
            if (strength === 0) {
                return `you control no resource cards that produce generic mana`;
            }
            if (strength === 1) {
                return `you control a resource card that produces generic mana`;
            }
            return `you control at least ${strength} resource cards that produce generic mana`;
        }
        case EffectRequirementsType.CONTROL_A_LEGENDARY_LEADER: {
            return `you control a legendary leader`;
        }
        case EffectRequirementsType.CONTROL_RANGED_AND_MAGICAL: {
            return `you control a ranged unit and a magical unit`;
        }
        case EffectRequirementsType.HAVE_AT_LEAST_THRESHOLD_CARDS_IN_CEMETERY: {
            return `you have at least ${strength} card${
                strength > 1 ? 's' : ''
            } in your cemetery`;
        }
        case EffectRequirementsType.HAVE_MINIMUM_ATTACK_ON_A_UNIT: {
            return `you have a unit with at least ${strength} attack`;
        }
        case EffectRequirementsType.HAVE_NO_CARDS_IN_HAND: {
            return `you have no cards in hand`;
        }
        case EffectRequirementsType.HAVE_NO_UNIT_CARDS_IN_DECK: {
            return `you have no unit cards in your deck`;
        }
        default: {
            return '';
        }
    }
};

const combineRequirementsText = (requirementTexts: string[]) => {
    if (requirementTexts.length === 1) {
        return requirementTexts[0];
    }

    const nonLastRequirements = requirementTexts.slice(
        0,
        requirementTexts.length - 1
    );
    const lastRequirement = requirementTexts.at(requirementTexts.length - 1);
    return `${nonLastRequirements.join(', ')} and ${lastRequirement}`;
};

const getRequirementsRulesText = (
    effectRequirements: EffectRequirement[],
    rulesSummary: string
) => {
    const requirementsTexts = effectRequirements.map((requirement) =>
        getRequirementText(requirement)
    );

    const everyRequirementIsAPassiveCheck = effectRequirements.every(
        (requirement) => !ACTIVE_REQUIREMENT_TYPES.includes(requirement.type)
    );
    // e.g. 'If you have more than 4 cards, draw 3 cards'
    if (everyRequirementIsAPassiveCheck) {
        return `If ${combineRequirementsText(requirementsTexts)}, ${unTitleize(
            rulesSummary
        )}`;
    }

    // e.g. 'Draw 3 cards.  Do this only if you '
    return `${rulesSummary}. Do this only if ${combineRequirementsText(
        requirementsTexts
    )}`;
};

export const transformEffectToRulesText = (
    effect: Effect,
    withoutRequirements?: boolean
): string => {
    const {
        cardName,
        secondaryCardName,
        strength,
        secondaryStrength,
        target,
        resourceType,
        summonType,
        type,
        passiveEffects = [],
        cost,
        includesExtraRulesText = false,
    } = effect;
    const targetOrDefault = target || getDefaultTargetForEffect(type);
    const targetName = TARGET_TYPES_TO_RULES_TEXT[targetOrDefault];
    const leadOffForText = TARGET_TYPES_FOR_LEADOFF[targetOrDefault];
    const targetNamePossessive =
        TARGET_TYPES_TO_RULES_TEXT_POSSESIVE[targetOrDefault];
    const pluralizationEffectStrength = strength > 1 ? 's' : '';

    let forText = '';
    if (target && target !== TargetTypes.SELF_PLAYER) {
        forText = ` for ${targetName}`;
    }

    const controllerPossessiveText =
        TARGET_TYPES_TO_RULES_TEXT_CONTROLLER_POSSESIVE[targetOrDefault];

    const passiveEffectsText = joinPhrases(
        passiveEffects.map((passiveEffect) => `[${passiveEffect}]`)
    );

    const getEffectRulesSummary = () => {
        switch (effect.type) {
            case EffectType.BLOOM: {
                return `You may play ${strength} additional resource${pluralizationEffectStrength} this turn`;
            }
            case EffectType.BOUNCE: {
                return `Return ${targetName} back to ${controllerPossessiveText} hand`;
            }
            case EffectType.BOUNCE_UNITS_UNDER_THRESHOLD_ATTACK: {
                return `Return ${targetName} with ${strength} attack or lower back to ${controllerPossessiveText} hand`;
            }
            case EffectType.BUFF_ATTACK: {
                if (strength < 0)
                    return `Decrease attack of ${targetName} by ${-strength}`;
                return `Increase attack of ${targetName} by ${strength}`;
            }
            case EffectType.BUFF_ATTACK_FOR_CYCLE: {
                if (strength < 0)
                    return `Decrease attack of ${targetName} by ${-strength} until ${controllerPossessiveText} next turn`;
                return `Increase attack of ${targetName} by ${strength} until ${controllerPossessiveText} next turn`;
            }
            case EffectType.BUFF_ATTACK_FOR_TURN: {
                if (strength < 0)
                    return `Decrease attack of ${targetName} by ${-strength} until end of turn`;
                return `Increase attack of ${targetName} by ${strength} until end of turn`;
            }
            case EffectType.BUFF_HAND_NON_MAGIC_ATTACK: {
                return `Increase attack of non-magical units in your hand by ${strength}`;
            }
            case EffectType.BUFF_HAND_ATTACK_WITH_FAILSAFE_LIFECHANGE: {
                const mainText = `${
                    strength > 0 ? 'Increase' : 'Decrease'
                } attack of units in ${targetNamePossessive} hand by ${Math.abs(
                    strength
                )}.`;
                const subject =
                    target === TargetTypes.ALL_OPPONENTS ? 'they' : 'you';
                const failSafeText =
                    secondaryStrength !== 0
                        ? ` If ${subject} have no cards afected this way, ${subject} ${
                              secondaryStrength > 0 ? 'gain' : 'lose'
                          } ${Math.abs(secondaryStrength)} life`
                        : '';
                return `${mainText}${failSafeText}`;
            }
            case EffectType.BUFF_MAGIC: {
                if (strength < 0)
                    return `Decrease attack/HP of ${targetName} by ${-strength} if ${
                        isTargetTypePlural(target) ? 'they are' : 'it is'
                    } magical`;
                return `Increase attack/HP of ${targetName} by ${strength} if ${
                    isTargetTypePlural(target) ? 'they are' : 'it is'
                } magical`;
            }
            case EffectType.BUFF_TEAM_ATTACK: {
                if (strength < 0)
                    return `Decrease attack of ${targetNamePossessive} non-magic units by ${-strength}`;
                return `Increase attack of ${targetNamePossessive} non-magic units by ${strength}`;
            }
            case EffectType.BUFF_TEAM_HP: {
                if (strength < 0)
                    return `Decrease HP of ${targetNamePossessive} units by ${-strength}`;
                return `Increase HP of ${targetNamePossessive} units by ${strength}`;
            }
            case EffectType.BUFF_TEAM_GENERIC_UNITS: {
                return `Increase attack and HP of ${targetNamePossessive} units without any text by ${strength}`;
            }
            case EffectType.BUFF_TEAM_MAGIC: {
                if (strength < 0)
                    return `Decrease attack of ${targetNamePossessive} magic units by ${-strength}`;
                return `Increase attack of ${targetNamePossessive} magic units by ${strength}`;
            }
            case EffectType.BUFF_TEAM_LEGENDARY_UNITS: {
                return `${
                    strength > 0 ? 'Increase' : 'Decrease'
                } attack and HP of ${targetNamePossessive} legendary units by ${Math.abs(
                    strength
                )}`;
            }
            case EffectType.CURSE_HAND: {
                if (strength < 0)
                    return `Decrease cost of cards in ${targetNamePossessive} ${
                        isTargetTypePlural(target) ? 'hands' : 'hand'
                    } by ${-strength} (generic)`;

                return `Increase cost of cards in ${targetNamePossessive} ${
                    isTargetTypePlural(target) ? 'hands' : 'hand'
                } by ${strength} (generic)`;
            }
            case EffectType.CURSE_HAND_RESOURCE_TYPE: {
                if (strength < 0)
                    return `Decrease cost of ${
                        RESOURCE_GLOSSARY[resourceType].explicitColorName
                    } cards in ${targetNamePossessive} ${
                        isTargetTypePlural(target) ? 'hands' : 'hand'
                    } by ${-strength} (generic)`;

                return `Increase cost of ${
                    RESOURCE_GLOSSARY[resourceType].explicitColorName
                } cards in ${targetNamePossessive} ${
                    isTargetTypePlural(target) ? 'hands' : 'hand'
                } by ${strength} (generic)`;
            }
            case EffectType.CURSE_HAND_SPELLS: {
                if (strength < 0)
                    return `Decrease cost of spell cards in ${targetNamePossessive} ${
                        isTargetTypePlural(target) ? 'hands' : 'hand'
                    } by ${-strength} (generic)`;

                return `Increase cost of spell cards in ${targetNamePossessive} ${
                    isTargetTypePlural(target) ? 'hands' : 'hand'
                } by ${strength} (generic)`;
            }
            case EffectType.DEAL_DAMAGE: {
                return `Deal ${strength} damage to ${targetName}`;
            }
            case EffectType.DEAL_DAMAGE_TO_NON_SOLDIERS: {
                return `Deal ${strength} damage to ${TARGET_TYPES_TO_RULES_TEXT_NON_SOLDIERS[target]}`;
            }
            case EffectType.DEPLOY_LEGENDARY_LEADER: {
                return `Deploy ${targetNamePossessive} ${
                    isTargetTypePlural(target)
                        ? 'legendary leaders'
                        : 'legendary leader'
                } onto the board. Don't trigger any enter the board effects`;
            }
            case EffectType.DESTROY_RESOURCE: {
                const numToDestroy =
                    strength === Number.MAX_SAFE_INTEGER ? 'all' : strength;
                if (resourceType) {
                    return `Destroy ${numToDestroy} of ${targetNamePossessive} [${resourceType}] resources`;
                }
                return `Destroy ${numToDestroy} of ${targetNamePossessive} resources${
                    numToDestroy === 'all' ? '' : ' at random'
                }`;
            }
            case EffectType.DESTROY_RESOURCE_TO_GAIN_STATS: {
                const numToDestroy =
                    strength === Number.MAX_SAFE_INTEGER ? 'all' : strength;
                if (resourceType) {
                    return `Destroy ${numToDestroy} of ${targetNamePossessive} [${resourceType}] resources.  Gain +1/+1 for each resource destroyed this way`;
                }
                return `Destroy ${numToDestroy} of ${targetNamePossessive} resources${
                    numToDestroy === 'all' ? '' : ' at random'
                }.  Gain +1/+1 for each resource destroyed this way`;
            }
            case EffectType.DESTROY_UNIT: {
                return `Destroy ${targetName}`;
            }
            case EffectType.DISCARD_HAND: {
                if (strength === Number.MAX_SAFE_INTEGER) {
                    return `Make ${targetName} discard all cards`;
                }
                return `Make ${targetName} discard ${strength} card${pluralizationEffectStrength} at random`;
            }
            case EffectType.DRAW: {
                if (!target || target === TargetTypes.SELF_PLAYER) {
                    return `Draw ${strength} card${pluralizationEffectStrength}`;
                }
                return `${titleize(targetName)} draw${
                    isTargetTypePlural(target) ? '' : 's'
                } ${strength} card${pluralizationEffectStrength}`;
            }
            case EffectType.DRAW_MILL_WIN: {
                if (strength) {
                    return `Draw ${strength} cards - if your deck is empty, win the game`;
                }
                return 'If your deck is empty, win the game';
            }
            case EffectType.DRAW_PER_UNIT: {
                if (!target) {
                    return `Draw a card for every unit owned on board`;
                }
                return `${titleize(targetName)} draw${
                    isTargetTypePlural(target) ? '' : 's'
                } a card for every unit owned on board`;
            }
            case EffectType.DRAW_UNTIL: {
                if (!target) {
                    return `If you have less than ${strength} cards, draw until you have ${strength}`;
                }
                return `If under ${strength} cards in hand, ${targetName} draw${
                    isTargetTypePlural(target) ? '' : 's'
                } cards until having ${strength} in hand`;
            }
            case EffectType.DRAW_UNTIL_MATCHING_OPPONENTS: {
                if (!target) {
                    return `Draw until you have X cards in hand, where X is the greatest amount of cards in hand amongst all opponents`;
                }
                return `${titleize(targetName)} draw${
                    isTargetTypePlural(target) ? '' : 's'
                } cards until they have X cards, where X is the greatest amount of cards in hand amongst all opponents`;
            }
            case EffectType.EXTRACT_CARD: {
                if (!target) {
                    return `Extract ${strength} ${cardName} card${pluralizationEffectStrength} from your deck`;
                }
                return `Extract ${strength} ${cardName} card${pluralizationEffectStrength} from ${targetNamePossessive} deck`;
            }
            case EffectType.EXTRACT_SOLDIER_CARDS: {
                return `Extract ${strength} soldier card${pluralizationEffectStrength} from ${targetNamePossessive} deck`;
            }
            case EffectType.EXTRACT_SPELL_CARDS: {
                return `Extract ${strength} spell card${pluralizationEffectStrength} from ${targetNamePossessive} deck`;
            }
            case EffectType.EXTRACT_UNIT_AND_SET_COST: {
                return `Extract ${strength} unit card${pluralizationEffectStrength} from ${targetNamePossessive} deck and set ${
                    strength > 1 ? 'their costs' : 'its cost'
                } to ${formatCardCost(cost)}`;
            }
            case EffectType.FLICKER: {
                return `Remove ${targetName} from the game, then return ${
                    isTargetTypePlural(target) ? 'them' : 'it'
                } to the board`;
            }
            case EffectType.GAIN_ATTACK: {
                if (!target) {
                    return `Gain ${strength} attack`;
                }
                return `${titleize(targetName)} ${
                    isTargetTypePlural(target) ? 'gain' : 'gains'
                } ${strength} attack`;
            }
            case EffectType.GAIN_ATTACK_UNTIL: {
                if (!target) {
                    return `Gain attack until this unit has at least ${strength} attack`;
                }
                return `${titleize(targetName)} ${
                    isTargetTypePlural(target) ? 'gain' : 'gains'
                } attack until ${
                    isTargetTypePlural(target) ? 'they are' : 'it is'
                } at least ${strength} attack`;
            }
            case EffectType.GAIN_MAGICAL_HAND_AND_BOARD: {
                return `${titleize(
                    targetNamePossessive
                )} units in hand and board become magical units`;
            }
            case EffectType.GAIN_STATS: {
                if (!target) {
                    return `Gain ${strength} attack and HP`;
                }
                return `${titleize(targetName)} ${
                    isTargetTypePlural(target) ? 'gain' : 'gains'
                } ${strength} attack and HP`;
            }
            case EffectType.GAIN_STATS_AND_EFFECTS: {
                let statsOrEffectsToGain: string[] = [];

                if (strength > 0) {
                    statsOrEffectsToGain.push(`${strength} attack/HP`);
                }
                statsOrEffectsToGain = [
                    ...statsOrEffectsToGain,
                    ...passiveEffects.map(
                        (passiveEffect) => passiveEffect.split(' (')[0]
                    ),
                ];

                if (!target) {
                    return `Gain ${joinPhrases(statsOrEffectsToGain)}`;
                }
                return `${titleize(targetName)} ${
                    isTargetTypePlural(target) ? 'gain' : 'gains'
                } ${joinPhrases(statsOrEffectsToGain)}`;
            }
            case EffectType.GAIN_STATS_EQUAL_TO_COST: {
                if (!target) {
                    return `Gain attack/HP equal to the total cost of this card`;
                }
                return `${titleize(targetName)} ${
                    isTargetTypePlural(target) ? 'each gain' : 'gains'
                } attack/HP equal to ${
                    isTargetTypePlural(target)
                        ? 'their respective total costs'
                        : 'its total cost'
                }`;
            }
            case EffectType.GRANT_PASSIVE_EFFECT: {
                return `Give ${targetName} ${passiveEffectsText}`;
            }
            case EffectType.HEAL: {
                return `Restore ${strength} HP to ${targetName}`;
            }
            case EffectType.LEARN: {
                let sanitizedCardName = '';
                const cardPool = { ...SpellCards, ...UnitCards, ...Tokens };
                Object.entries(cardPool).forEach(([key, card]) => {
                    if (key === cardName) {
                        sanitizedCardName = card.name;
                    }
                });
                return `Add ${strength} ${sanitizedCardName} ${
                    strength > 1 ? 'cards' : 'card'
                } to your hand`;
            }
            case EffectType.LOSE_MAGICAL_AND_RANGED: {
                return `${titleize(
                    targetNamePossessive
                )} units lose magical/ranged`;
            }
            case EffectType.MILL: {
                return `Put ${strength} ${
                    strength > 1 ? 'cards' : 'card'
                } from ${targetNamePossessive.replace('all', 'each')} ${
                    isTargetTypePlural(target) ? 'libraries' : 'library'
                } into ${controllerPossessiveText} ${
                    isTargetTypePlural(target) ? 'cemeteries' : 'cemetery'
                }`;
            }
            case EffectType.MODIFY_ATTACKS_PER_TURN: {
                return `Set ${targetName} to have ${strength} attack${
                    strength === 1 ? '' : 's'
                } per turn`;
            }
            case EffectType.POLYMORPH: {
                return `Turn ${targetName} into a [${summonType.name}]`;
            }
            case EffectType.RAMP: {
                return `Increase ${resourceType.toLowerCase()} resources by ${strength}${forText}`;
            }
            case EffectType.RAMP_FOR_TURN: {
                let resourcesToDisplay = `${strength} ${RESOURCE_GLOSSARY[resourceType].icon}`;
                if (resourceType === Resource.GENERIC) {
                    resourcesToDisplay = `${strength} generic mana`;
                }
                return `Add ${resourcesToDisplay} this turn`;
            }
            case EffectType.RAMP_FROM_HAND: {
                return `Deploy ${strength} ${resourceType} card${pluralizationEffectStrength} from your hand tapped`;
            }
            case EffectType.REDUCE_CARDS_COSTING_OVER_AMOUNT: {
                return `Decrease cost of cards in ${targetNamePossessive} ${
                    isTargetTypePlural(target) ? 'hands' : 'hand'
                } by ${strength} (generic).  Cards reduced this way cannot be reduced below ${secondaryStrength} total cost`;
            }
            case EffectType.REDUCE_LEGENDARY_LEADER_COST: {
                return `Decrease cost of ${targetNamePossessive} ${
                    isTargetTypePlural(target)
                        ? 'legendary leaders'
                        : 'legendary leader'
                } by ${strength} (generic).  Cards reduced this way cannot be reduced below their original costs`;
            }
            case EffectType.RETURN_FROM_CEMETERY: {
                return `Return ${strength} ${cardName} card${pluralizationEffectStrength} from your cemetery`;
            }
            case EffectType.RETURN_RESOURCES_FROM_CEMETERY: {
                return `Return ${strength} resource card${pluralizationEffectStrength} at random from your cemetery`;
            }
            case EffectType.RETURN_SPELLS_AND_RESOURCES_FROM_CEMETERY: {
                return `Return ${strength} resource card${pluralizationEffectStrength} and ${strength} spell card${pluralizationEffectStrength} at random from your cemetery`;
            }
            case EffectType.RETURN_SPELLS_FROM_CEMETERY: {
                return `Return ${strength} spell card${pluralizationEffectStrength} at random from your cemetery${
                    includesExtraRulesText
                        ? '.  This card cannot return itself from cemetery'
                        : ''
                }`;
            }
            case EffectType.REVIVE: {
                return `Revive ${targetName}`;
            }
            case EffectType.SHUFFLE_CEMETERY_INTO_DECK: {
                return `${titleize(targetName)} ${
                    isTargetTypePlural(target)
                        ? `shuffle cards in ${controllerPossessiveText} cemetery into ${controllerPossessiveText} decks`
                        : `shuffles cards in ${controllerPossessiveText} cemetery into ${controllerPossessiveText} deck`
                }`;
            }
            case EffectType.SHUFFLE_FROM_HAND: {
                return `Shuffle ${
                    strength || 'all'
                } [${cardName}] card${pluralizationEffectStrength} in hand into ${targetNamePossessive} deck${
                    isTargetTypePlural(target) ? '' : 's'
                }`;
            }
            case EffectType.SHUFFLE_HAND_INTO_DECK: {
                return `${titleize(targetName)} ${
                    isTargetTypePlural(target)
                        ? `shuffle cards in ${controllerPossessiveText} hand into ${controllerPossessiveText} decks`
                        : `shuffles cards in ${controllerPossessiveText} hand into ${controllerPossessiveText} deck`
                }`;
            }
            case EffectType.SUMMON_UNITS: {
                return `Summon ${strength} ${summonType.name}${pluralizationEffectStrength} - ${summonType.attack} ⚔️ ${summonType.totalHp} 💙${forText}`;
            }
            case EffectType.SWAP_CARDS: {
                if (strength === 1) {
                    return `Swap a card at random with ${targetName}.  If a player in this exchange has zero cards, don't swap any cards`;
                }
                return `Swap ${strength} cards at random with ${targetName}.  If a player has fewer cards, swap up to ${strength} cards instead`;
            }
            case EffectType.TRANSFORM_RESOURCE: {
                return `For ${leadOffForText}, turn ${
                    strength || 'all'
                } of their ${
                    cardName
                        ? `[${cardName}]`
                        : `non-[${secondaryCardName}] resource`
                } cards into [${secondaryCardName}]${
                    strength === undefined ? '' : ' at random'
                }`;
            }
            case EffectType.TRANSMUTE: {
                return `Turn ${
                    strength || 'all'
                } [${cardName}] card${pluralizationEffectStrength} in hand into [${secondaryCardName}]${forText}`;
            }
            case EffectType.TUCK: {
                return `Put ${targetName} on top of ${controllerPossessiveText} library`;
            }
            case EffectType.TUCK_BOTTOM_AND_DRAW: {
                return `${titleize(
                    targetName
                )} goes to the bottom of ${controllerPossessiveText} library.  For each unit returned this way, the unit's controller draw a card`;
            }
            default: {
                assertUnreachable(effect.type);
                return '';
            }
        }
    };

    const rulesSummary = getEffectRulesSummary();

    if (!effect.requirements || withoutRequirements) {
        return rulesSummary;
    }

    return getRequirementsRulesText(effect.requirements, rulesSummary);
};
