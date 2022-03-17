import { Effect } from '@/types/cards';
import { EffectType, TargetTypes } from '@/types/effects';

const TARGET_TYPES_TO_RULES_TEXT = {
    [TargetTypes.ALL_OPPONENTS]: 'all opponents',
    [TargetTypes.ALL_OPPOSING_UNITS]: 'all opposing units',
    [TargetTypes.ALL_PLAYERS]: 'all players',
    [TargetTypes.ALL_SELF_UNITS_GRAVEYARD]: 'all units in your graveyard',
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

const PLURAL_TARGET_TYPES = [
    TargetTypes.ALL_OPPONENTS,
    TargetTypes.ALL_OPPOSING_UNITS,
    TargetTypes.ALL_PLAYERS,
    TargetTypes.ALL_SELF_UNITS,
    TargetTypes.ALL_SELF_UNITS_GRAVEYARD,
];
const isTargetTypePlural = (targetType: TargetTypes): boolean =>
    PLURAL_TARGET_TYPES.indexOf(targetType) > -1;

const titleize = (str: string): string => {
    return str[0].toUpperCase() + str.substring(1);
};

export const transformEffectToRulesText = (effect: Effect): string => {
    const { strength, target, resourceType, summonType } = effect;
    const targetName = TARGET_TYPES_TO_RULES_TEXT[target || TargetTypes.ANY];
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
            return `Increase attack of your non-magic units by ${strength}`;
        }
        case EffectType.BUFF_TEAM_HP: {
            return `Increase HP of your units by ${strength}`;
        }
        case EffectType.BUFF_TEAM_MAGIC: {
            return `Increase attack of your magic units by ${strength}`;
        }
        case EffectType.CURSE_HAND: {
            return `Increase cost of cards in hand by ${strength} (generic) for ${targetName}`;
        }
        case EffectType.DEAL_DAMAGE: {
            return `Deal ${strength} damage to ${targetName}`;
        }
        case EffectType.DISCARD_HAND: {
            if (strength === Number.MAX_SAFE_INTEGER) {
                return `Make ${targetName} discard all cards`;
            }
            return `Make ${targetName} discard ${strength} cards at random`;
        }
        case EffectType.DRAW: {
            if (!target) {
                return `Draw ${strength} cards`;
            }
            return `${titleize(targetName)} draw${
                isTargetTypePlural(target) ? '' : 's'
            } ${strength} cards`;
        }
        case EffectType.HEAL: {
            return `Restore ${strength} HP to ${targetName}`;
        }
        case EffectType.RAMP: {
            return `Increase ${resourceType.toLowerCase()} resources by ${strength}`;
        }
        case EffectType.REVIVE: {
            return `Revive ${targetName}`;
        }
        case EffectType.SUMMON_UNITS: {
            return `Summon ${strength} ${summonType.name}s (${summonType.attack} Attack, ${summonType.totalHp} HP)`;
        }
        default: {
            return '';
        }
    }
};
