import { SpellCards } from '@/cardDb/spells';
import { Tokens, UnitCards } from '@/cardDb/units';
import { Effect } from '@/types/cards';
import {
    EffectType,
    getDefaultTargetForEffect,
    TargetTypes,
} from '@/types/effects';
import { RESOURCE_GLOSSARY } from '@/types/resources';

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
    return str[0].toUpperCase() + str.substring(1);
};

export const transformEffectToRulesText = (effect: Effect): string => {
    const {
        cardName,
        secondaryCardName,
        strength,
        target,
        resourceType,
        summonType,
        type,
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

    switch (effect.type) {
        case EffectType.BLOOM: {
            return `You may play ${strength} additional resource${pluralizationEffectStrength} this turn`;
        }
        case EffectType.BOUNCE: {
            return `Return ${targetName} back to ${
                isTargetTypePlural(target) ? "their owners'" : "its owner's"
            } hand`;
        }
        case EffectType.BUFF_ATTACK: {
            if (strength < 0)
                return `Decrease attack of ${targetName} by ${-strength}`;
            return `Increase attack of ${targetName} by ${strength}`;
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
        case EffectType.CURSE_HAND: {
            return `Increase cost of cards in hand by ${strength} (generic) for ${targetName}`;
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
        case EffectType.POLYMORPH: {
            return `Turn ${targetName} into a [${summonType.name}]`;
        }
        case EffectType.RAMP: {
            return `Increase ${resourceType.toLowerCase()} resources by ${strength}${forText}`;
        }
        case EffectType.RAMP_FOR_TURN: {
            return `Add ${strength} ${RESOURCE_GLOSSARY[resourceType].icon} this turn`;
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
            return `Summon ${strength} ${summonType.name}${pluralizationEffectStrength} - ${summonType.attack} ?????? ${summonType.totalHp} ????${forText}`;
        }
        case EffectType.TRANSMUTE: {
            return `Turn ${
                strength || 'all'
            } [${cardName}] card${pluralizationEffectStrength} in hand into [${secondaryCardName}]${forText}`;
        }
        default: {
            return '';
        }
    }
};
