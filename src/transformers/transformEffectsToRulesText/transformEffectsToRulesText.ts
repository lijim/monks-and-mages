import { SpellCards } from '@/cardDb/spells';
import { Tokens, UnitCards } from '@/cardDb/units';
import { Effect } from '@/types/cards';
import {
    EffectType,
    getDefaultTargetForEffect,
    TargetTypes,
} from '@/types/effects';

const TARGET_TYPES_TO_RULES_TEXT = {
    [TargetTypes.ALL_OPPONENTS]: 'all opponents',
    [TargetTypes.ALL_OPPOSING_UNITS]: 'all opposing units',
    [TargetTypes.ALL_PLAYERS]: 'all players',
    [TargetTypes.ALL_SELF_UNITS_CEMETERY]: 'all units in your cemetery',
    [TargetTypes.ALL_SELF_UNITS]: 'all your units',
    [TargetTypes.ALL_UNITS]: 'all units',
    [TargetTypes.ANY]: 'any target',
    [TargetTypes.OPPONENT]: 'any opponent',
    [TargetTypes.OPPOSING_UNIT]: 'any unit controlled by an opponent',
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
    [TargetTypes.OPPOSING_UNIT]: "any unit controlled by an opponent's",
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
    const { cardName, strength, target, resourceType, summonType, type } =
        effect;
    const targetName =
        TARGET_TYPES_TO_RULES_TEXT[target || getDefaultTargetForEffect(type)];
    const targetNamePossessive =
        TARGET_TYPES_TO_RULES_TEXT_POSSESIVE[
            target || getDefaultTargetForEffect(type)
        ];
    const pluralizationEffectStrength = strength > 1 ? 's' : '';
    switch (effect.type) {
        case EffectType.BOUNCE: {
            return `Return ${targetName} back to ${
                PLURAL_TARGET_TYPES.indexOf(target) > -1
                    ? "their owners'"
                    : "its owner's"
            } hand`;
        }
        case EffectType.BUFF_HAND_ATTACK: {
            return `Increase attack of units in your hand by ${strength}`;
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
            if (resourceType) {
                return `Destroy ${strength} of ${targetNamePossessive} [${resourceType}] resources`;
            }
            return `Destroy ${strength} of ${targetNamePossessive} resources at random`;
        }
        case EffectType.DISCARD_HAND: {
            if (strength === Number.MAX_SAFE_INTEGER) {
                return `Make ${targetName} discard all cards`;
            }
            return `Make ${targetName} discard ${strength} cards at random`;
        }
        case EffectType.DRAW: {
            if (!target || target === TargetTypes.SELF_PLAYER) {
                return `Draw ${strength} cards`;
            }
            return `${titleize(targetName)} draw${
                isTargetTypePlural(target) ? '' : 's'
            } ${strength} cards`;
        }
        case EffectType.DRAW_PER_UNIT: {
            if (!target) {
                return `Draw a card for every unit owned on board`;
            }
            return `${titleize(targetName)} draw${
                isTargetTypePlural(target) ? '' : 's'
            } a card for every unit owned on board`;
        }
        case EffectType.EXTRACT_CARD: {
            if (!target) {
                return `Extract ${strength} ${cardName} card${pluralizationEffectStrength} from your deck`;
            }
            return `Extract ${strength} ${cardName} card${pluralizationEffectStrength} from ${targetNamePossessive} deck`;
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
            return `Increase ${resourceType.toLowerCase()} resources by ${strength}`;
        }
        case EffectType.RETURN_FROM_CEMETERY: {
            return `Return ${strength} ${cardName} card${pluralizationEffectStrength} from your cemetery`;
        }
        case EffectType.REVIVE: {
            return `Revive ${targetName}`;
        }
        case EffectType.SUMMON_UNITS: {
            let forText = '';
            if (target && target !== TargetTypes.SELF_PLAYER) {
                forText = ` for ${targetName}`;
            }
            return `Summon ${strength} ${summonType.name}${pluralizationEffectStrength} - ${summonType.attack} ⚔️ ${summonType.totalHp} 💙${forText}`;
        }
        default: {
            return '';
        }
    }
};
