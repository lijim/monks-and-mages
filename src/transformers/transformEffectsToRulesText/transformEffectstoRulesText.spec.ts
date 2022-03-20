import { Tokens } from '@/cardDb/units';
import { Effect } from '@/types/cards';
import { EffectType, TargetTypes } from '@/types/effects';
import { Resource } from '@/types/resources';
import { transformEffectToRulesText } from './transformEffectsToRulesText';

describe('transformEffectstoRulesText', () => {
    it('displays rules for bouncing units (any unit, plural)', () => {
        const effect: Effect = {
            type: EffectType.BOUNCE,
            target: TargetTypes.UNIT,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Return any unit back to its owner's hand`
        );
    });

    it('displays rules for bouncing units (opposing unit, singular)', () => {
        const effect: Effect = {
            type: EffectType.BOUNCE,
            target: TargetTypes.OPPOSING_UNIT,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Return any unit controlled by an opponent back to its owner's hand`
        );
    });

    it('displays rules for bouncing units (opposing unit, plural)', () => {
        const effect: Effect = {
            type: EffectType.BOUNCE,
            target: TargetTypes.ALL_OPPOSING_UNITS,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Return all opposing units back to their owners' hand`
        );
    });

    it('displays rules for buffing your hand (attack)', () => {
        const effect: Effect = {
            type: EffectType.BUFF_HAND_ATTACK,
            strength: 5,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Increase attack of units in your hand by 5`
        );
    });

    it('displays rules for buffing your team attack', () => {
        const effect: Effect = {
            type: EffectType.BUFF_TEAM_ATTACK,
            strength: 5,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Increase attack of your non-magic units by 5`
        );
    });

    it('displays rules for buffing your team hp', () => {
        const effect: Effect = {
            type: EffectType.BUFF_TEAM_HP,
            strength: 5,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Increase HP of your units by 5`
        );
    });

    it('displays rules for buffing your team magic', () => {
        const effect: Effect = {
            type: EffectType.BUFF_TEAM_MAGIC,
            strength: 5,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Increase attack of your magic units by 5`
        );
    });

    it('displays rules for cursing a hand', () => {
        const effect: Effect = {
            type: EffectType.CURSE_HAND,
            strength: 5,
            target: TargetTypes.ALL_OPPONENTS,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Increase cost of cards in hand by 5 (generic) for all opponents`
        );
    });

    it('displays rules for dealing damage', () => {
        const effect: Effect = {
            type: EffectType.DEAL_DAMAGE,
            strength: 7,
            target: TargetTypes.ALL_UNITS,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Deal 7 damage to all units`
        );
    });

    it('displays rules for forcing hand discard', () => {
        const effect: Effect = {
            type: EffectType.DISCARD_HAND,
            strength: 3,
            target: TargetTypes.OPPONENT,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Make any opponent discard 3 cards at random`
        );
    });

    it('displays rules for forcing whole hand discard', () => {
        const effect: Effect = {
            type: EffectType.DISCARD_HAND,
            strength: Number.MAX_SAFE_INTEGER,
            target: TargetTypes.OPPONENT,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Make any opponent discard all cards`
        );
    });

    it('displays rules for drawing cards', () => {
        const effect: Effect = {
            type: EffectType.DRAW,
            strength: 3,
        };
        expect(transformEffectToRulesText(effect)).toEqual(`Draw 3 cards`);
    });

    it('displays rules for drawing cards (targeted) - plural', () => {
        const effect: Effect = {
            type: EffectType.DRAW,
            strength: 3,
            target: TargetTypes.ALL_PLAYERS,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `All players draw 3 cards`
        );
    });

    it('displays rules for drawing cards (targeted) - singular', () => {
        const effect: Effect = {
            type: EffectType.DRAW,
            strength: 3,
            target: TargetTypes.PLAYER,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Any player draws 3 cards`
        );
    });

    it('displays rules for drawing cards (per unit)', () => {
        const effect: Effect = {
            type: EffectType.DRAW_PER_UNIT,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Draw a card for every unit owned on board`
        );
    });

    it('displays rules for healing', () => {
        const effect: Effect = {
            type: EffectType.HEAL,
            strength: 4,
            target: TargetTypes.PLAYER,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Restore 4 HP to any player`
        );
    });

    it('displays rules for ramping bamboo', () => {
        const effect: Effect = {
            type: EffectType.RAMP,
            resourceType: Resource.BAMBOO,
            strength: 1,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Increase bamboo resources by 1`
        );
    });

    it('displays rules for ramping crystal', () => {
        const effect: Effect = {
            type: EffectType.RAMP,
            resourceType: Resource.CRYSTAL,
            strength: 1,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Increase crystal resources by 1`
        );
    });

    it('displays rules for ramping fire', () => {
        const effect: Effect = {
            type: EffectType.RAMP,
            resourceType: Resource.FIRE,
            strength: 3,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Increase fire resources by 3`
        );
    });

    it('displays rules for ramping iron', () => {
        const effect: Effect = {
            type: EffectType.RAMP,
            resourceType: Resource.IRON,
            strength: 3,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Increase iron resources by 3`
        );
    });

    it('displays rules for ramping water', () => {
        const effect: Effect = {
            type: EffectType.RAMP,
            resourceType: Resource.WATER,
            strength: 2,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Increase water resources by 2`
        );
    });

    it('displays rules for reviving', () => {
        const effect: Effect = {
            type: EffectType.REVIVE,
            target: TargetTypes.ALL_SELF_UNITS_GRAVEYARD,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Revive all units in your graveyard`
        );
    });
    it('displays rules for ramping water', () => {
        const effect: Effect = {
            type: EffectType.SUMMON_UNITS,
            strength: 2,
            summonType: Tokens.DEMON,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Summon 2 Demons (1 Attack, 1 HP)`
        );
    });
});
