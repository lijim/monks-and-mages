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
import { RESOURCE_GLOSSARY, Resource } from '@/types/resources';

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
];
const isTargetTypePlural = (targetType: TargetTypes): boolean =>
    PLURAL_TARGET_TYPES.indexOf(targetType) > -1;

const titleize = (str: string): string => {
    return str[0].toLocaleUpperCase() + str.substring(1);
};
const unTitleize = (str: string): string => {
    return str[0].toLocaleLowerCase() + str.substring(1);
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
        target,
        resourceType,
        summonType,
        type,
        passiveEffect,
    } = effect;
    const targetName =
        TARGET_TYPES_TO_RULES_TEXT[target || getDefaultTargetForEffect(type)];
    const targetNamePossessive =
        TARGET_TYPES_TO_RULES_TEXT_POSSESIVE[
            target || getDefaultTargetForEffect(type)
        ];
    const pluralizationEffectStrength = strength > 1 ? 's' : '';

    let forText = '';
    if (target && target !== TargetTypes.SELF_PLAYER) {
        forText = ` for ${targetName}`;
    }

    const controllerPossessiveText =
        TARGET_TYPES_TO_RULES_TEXT_CONTROLLER_POSSESIVE[
            target || getDefaultTargetForEffect(type)
        ];

    const getEffectRulesSummary = () => {
        switch (effect.type) {
            case EffectType.BLOOM: {
                return `You may play ${strength} additional resource${pluralizationEffectStrength} this turn`;
            }
            case EffectType.BOUNCE: {
                return `Return ${targetName} back to ${controllerPossessiveText} hand`;
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
            case EffectType.BUFF_HAND_ATTACK: {
                return `Increase attack of non-magical units in your hand by ${strength}`;
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
            case EffectType.BUFF_TEAM_MAGIC: {
                if (strength < 0)
                    return `Decrease attack of ${targetNamePossessive} magic units by ${-strength}`;
                return `Increase attack of ${targetNamePossessive} magic units by ${strength}`;
            }
            case EffectType.BUFF_TEAM_GENERIC_UNITS: {
                return `Increase attack and HP of ${targetNamePossessive} units without any text by ${strength}`;
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
            case EffectType.DEAL_DAMAGE: {
                return `Deal ${strength} damage to ${targetName}`;
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
            case EffectType.EXTRACT_CARD: {
                if (!target) {
                    return `Extract ${strength} ${cardName} card${pluralizationEffectStrength} from your deck`;
                }
                return `Extract ${strength} ${cardName} card${pluralizationEffectStrength} from ${targetNamePossessive} deck`;
            }
            case EffectType.FLICKER: {
                return `Remove ${targetName} from the game, then return ${
                    isTargetTypePlural(target) ? 'them' : 'it'
                } to the board`;
            }

            case EffectType.GRANT_PASSIVE_EFFECT: {
                return `Give ${targetName} [${passiveEffect}]`;
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
            case EffectType.MILL: {
                return `Put ${strength} ${
                    strength > 1 ? 'cards' : 'card'
                } from ${targetNamePossessive.replace('all', 'each')} ${
                    isTargetTypePlural(target) ? 'libraries' : 'library'
                } into ${controllerPossessiveText} ${
                    isTargetTypePlural(target) ? 'graveyards' : 'graveyard'
                }`;
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
            case EffectType.RETURN_FROM_CEMETERY: {
                return `Return ${strength} ${cardName} card${pluralizationEffectStrength} from your cemetery`;
            }
            case EffectType.REVIVE: {
                return `Revive ${targetName}`;
            }
            case EffectType.SHUFFLE_FROM_HAND: {
                return `Shuffle ${
                    strength || 'all'
                } [${cardName}] card${pluralizationEffectStrength} in hand into ${targetNamePossessive} deck${
                    isTargetTypePlural(target) ? '' : 's'
                }`;
            }
            case EffectType.SUMMON_UNITS: {
                return `Summon ${strength} ${summonType.name}${pluralizationEffectStrength} - ${summonType.attack} ⚔️ ${summonType.totalHp} 💙${forText}`;
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
