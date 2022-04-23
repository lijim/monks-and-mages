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
            target: TargetTypes.SELF_PLAYER,
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

    it("displays rules for debuffing your opponents' attack", () => {
        const effect: Effect = {
            type: EffectType.BUFF_TEAM_ATTACK,
            strength: -2,
            target: TargetTypes.ALL_OPPONENTS,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Decrease attack of all opponents' non-magic units by 2`
        );
    });

    it('displays rules for buffing your team hp', () => {
        const effect: Effect = {
            type: EffectType.BUFF_TEAM_HP,
            target: TargetTypes.SELF_PLAYER,
            strength: 5,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Increase HP of your units by 5`
        );
    });

    it('displays rules for buffing your team magic', () => {
        const effect: Effect = {
            type: EffectType.BUFF_TEAM_MAGIC,
            target: TargetTypes.SELF_PLAYER,
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

    it('displays rules destroying a resource', () => {
        const effect: Effect = {
            type: EffectType.DESTROY_RESOURCE,
            target: TargetTypes.ALL_OPPONENTS,
            strength: 1,
            resourceType: Resource.BAMBOO,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Destroy 1 of all opponents' [Bamboo] resources`
        );
    });

    it('displays rules destroying a resource (any type)', () => {
        const effect: Effect = {
            type: EffectType.DESTROY_RESOURCE,
            strength: 1,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Destroy 1 of any opponent's resources at random`
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

    it('displays rules for extracting cards from a deck', () => {
        const effect: Effect = {
            type: EffectType.EXTRACT_CARD,
            strength: 2,
            cardName: 'Iron',
            target: TargetTypes.OPPONENT,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Extract 2 Iron cards from any opponent's deck`
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

    it('displays rules for learning a card (spells)', () => {
        const effect: Effect = {
            type: EffectType.LEARN,
            strength: 4,
            cardName: 'EMBER_SPEAR',
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Add 4 Ember Spear cards to your hand`
        );
    });

    it('displays rules for learning a card (u its)', () => {
        const effect: Effect = {
            type: EffectType.LEARN,
            strength: 1,
            cardName: 'LANCER',
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Add 1 Lancer card to your hand`
        );
    });

    it('displays rules for polymorphing', () => {
        const effect: Effect = {
            type: EffectType.POLYMORPH,
            target: TargetTypes.ALL_UNITS,
            summonType: Tokens.FROG,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Turn all units into a [Frog]`
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

    it('displays rules for returning from cemetery', () => {
        const effect: Effect = {
            type: EffectType.RETURN_FROM_CEMETERY,
            strength: 3,
            cardName: 'Ember Spear',
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Return 3 Ember Spear cards from your cemetery`
        );
    });

    it('displays rules for reviving', () => {
        const effect: Effect = {
            type: EffectType.REVIVE,
            target: TargetTypes.ALL_SELF_UNITS_CEMETERY,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Revive all units in your cemetery`
        );
    });

    it('displays rules for summoning units', () => {
        const effect: Effect = {
            type: EffectType.SUMMON_UNITS,
            strength: 2,
            summonType: Tokens.DEMON,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Summon 2 Demons - 1 ⚔️ 1 💙`
        );
    });

    it('displays rules for summoning units', () => {
        const effect: Effect = {
            type: EffectType.SUMMON_UNITS,
            strength: 2,
            target: TargetTypes.OPPONENT,
            summonType: Tokens.DEMON,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Summon 2 Demons - 1 ⚔️ 1 💙 for any opponent`
        );
    });
});
