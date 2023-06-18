import { Tokens } from '@/cardDb/units';
import { CardType, Effect, EffectRequirementsType } from '@/types/cards';
import { EffectType, PassiveEffect, TargetTypes } from '@/types/effects';
import { Resource } from '@/types/resources';
import { transformEffectToRulesText } from './transformEffectsToRulesText';

describe('transformEffectstoRulesText', () => {
    describe('Bloom effect', () => {
        const effect: Effect = {
            type: EffectType.BLOOM,
            strength: 3,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `You may play 3 additional resources this turn`
        );
    });

    describe('Bounce', () => {
        it('displays rules for bouncing units (any unit, plural)', () => {
            const effect: Effect = {
                type: EffectType.BOUNCE,
                target: TargetTypes.UNIT,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Return any unit back to its controller's hand`
            );
        });

        it('displays rules for bouncing units (opposing unit, singular)', () => {
            const effect: Effect = {
                type: EffectType.BOUNCE,
                target: TargetTypes.OPPOSING_UNIT,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Return any opposing unit back to its controller's hand`
            );
        });

        it('displays rules for bouncing units (opposing unit, plural)', () => {
            const effect: Effect = {
                type: EffectType.BOUNCE,
                target: TargetTypes.ALL_OPPOSING_UNITS,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Return all opposing units back to their controllers' hand`
            );
        });

        it('displays rules for bouncing units under a threshold', () => {
            const effect: Effect = {
                type: EffectType.BOUNCE_UNITS_UNDER_THRESHOLD_ATTACK,
                target: TargetTypes.ALL_OPPOSING_UNITS,
                strength: 2,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Return all opposing units with 2 attack or lower back to their controllers' hand`
            );
        });
    });

    describe('Buff attack / nerf attack', () => {
        it('displays rules for buffing a unit', () => {
            const effect: Effect = {
                type: EffectType.BUFF_ATTACK,
                strength: 5,
                target: TargetTypes.UNIT,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Increase attack of any unit by 5`
            );
        });

        it("displays rules for nerfing a unit's attack", () => {
            const effect: Effect = {
                type: EffectType.BUFF_ATTACK,
                strength: -5,
                target: TargetTypes.UNIT,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Decrease attack of any unit by 5`
            );
        });
    });

    describe('Buff attack / nerf attack (temp, for turn cycle)', () => {
        it('displays rules for buffing a unit', () => {
            const effect: Effect = {
                type: EffectType.BUFF_ATTACK_FOR_CYCLE,
                strength: 5,
                target: TargetTypes.UNIT,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Increase attack of any unit by 5 until its controller's next turn`
            );
        });

        it("displays rules for nerfing a unit's attack", () => {
            const effect: Effect = {
                type: EffectType.BUFF_ATTACK_FOR_CYCLE,
                strength: -5,
                target: TargetTypes.UNIT,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Decrease attack of any unit by 5 until its controller's next turn`
            );
        });
    });

    describe('Buff attack / nerf attack (temp, for turn)', () => {
        it('displays rules for buffing a unit', () => {
            const effect: Effect = {
                type: EffectType.BUFF_ATTACK_FOR_TURN,
                strength: 5,
                target: TargetTypes.UNIT,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Increase attack of any unit by 5 until end of turn`
            );
        });

        it("displays rules for nerfing a unit's attack", () => {
            const effect: Effect = {
                type: EffectType.BUFF_ATTACK_FOR_TURN,
                strength: -5,
                target: TargetTypes.UNIT,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Decrease attack of any unit by 5 until end of turn`
            );
        });
    });

    describe('Buff Magic', () => {
        it('displays rules for buffing a magic unit', () => {
            const effect: Effect = {
                type: EffectType.BUFF_MAGIC,
                strength: 5,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Increase attack/HP of any unit by 5 if it is magical`
            );
        });

        it('displays rules for buffing a magic unit (multiple)', () => {
            const effect: Effect = {
                type: EffectType.BUFF_MAGIC,
                strength: 5,
                target: TargetTypes.ALL_SELF_UNITS,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Increase attack/HP of all your units by 5 if they are magical`
            );
        });

        it('displays rules for debuffing a magic unit', () => {
            const effect: Effect = {
                type: EffectType.BUFF_MAGIC,
                strength: -5,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Decrease attack/HP of any unit by 5 if it is magical`
            );
        });

        it('displays rules for debuffing a magic unit (multiple)', () => {
            const effect: Effect = {
                type: EffectType.BUFF_MAGIC,
                strength: -5,
                target: TargetTypes.ALL_SELF_UNITS,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Decrease attack/HP of all your units by 5 if they are magical`
            );
        });
    });

    describe('Buffing generic units', () => {
        const effect: Effect = {
            type: EffectType.BUFF_TEAM_GENERIC_UNITS,
            strength: 5,
            target: TargetTypes.SELF_PLAYER,
        };
        expect(transformEffectToRulesText(effect)).toEqual(
            `Increase attack and HP of your units without any text by 5`
        );
    });

    describe('other buffing effects', () => {
        it('displays rules for buffing your hand (attack)', () => {
            const effect: Effect = {
                type: EffectType.BUFF_HAND_NON_MAGIC_ATTACK,
                target: TargetTypes.SELF_PLAYER,
                strength: 5,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Increase attack of non-magical units in your hand by 5`
            );
        });

        it("displays rules for debuffing your opponents' hand with a failsafe", () => {
            const effect: Effect = {
                type: EffectType.BUFF_HAND_ATTACK_WITH_FAILSAFE_LIFECHANGE,
                target: TargetTypes.ALL_OPPONENTS,
                strength: -3,
                secondaryStrength: 3,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Decrease attack of units in all opponents' hand by 3. If no units are changed this way, gain 3 life`
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

        it("displays rules for buffing your team's hp", () => {
            const effect: Effect = {
                type: EffectType.BUFF_TEAM_HP,
                target: TargetTypes.SELF_PLAYER,
                strength: 5,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Increase HP of your units by 5`
            );
        });

        it("displays rules for buffing your team's magic", () => {
            const effect: Effect = {
                type: EffectType.BUFF_TEAM_MAGIC,
                target: TargetTypes.SELF_PLAYER,
                strength: 5,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Increase attack of your magic units by 5`
            );
        });

        it("displays rules for buffing your team's legendary unit", () => {
            const effect: Effect = {
                type: EffectType.BUFF_TEAM_LEGENDARY_UNITS,
                target: TargetTypes.SELF_PLAYER,
                strength: 5,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Increase attack and HP of your legendary units by 5`
            );
        });
    });

    describe('Curse hand', () => {
        it('displays rules for cursing a hand', () => {
            const effect: Effect = {
                type: EffectType.CURSE_HAND,
                strength: 5,
                target: TargetTypes.ALL_OPPONENTS,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Increase cost of cards in all opponents' hands by 5 (generic)`
            );
        });

        it('displays rules for reducing costs from a hand', () => {
            const effect: Effect = {
                type: EffectType.CURSE_HAND,
                strength: -5,
                target: TargetTypes.SELF_PLAYER,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Decrease cost of cards in your hand by 5 (generic)`
            );
        });

        it('displays rules for increasing costs from a hand (for specific resource types)', () => {
            const effect: Effect = {
                type: EffectType.CURSE_HAND_RESOURCE_TYPE,
                strength: 5,
                resourceType: Resource.CRYSTAL,
                target: TargetTypes.SELF_PLAYER,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Increase cost of purple cards in your hand by 5 (generic)`
            );
        });

        it('displays rules for increasing costs from a hand (for specific resource types)', () => {
            const effect: Effect = {
                type: EffectType.CURSE_HAND_SPELLS,
                strength: 5,
                target: TargetTypes.SELF_PLAYER,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Increase cost of spell cards in your hand by 5 (generic)`
            );
        });
    });

    describe('Destroy resource', () => {
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

        it('displays rules destroying a resource (all)', () => {
            const effect: Effect = {
                type: EffectType.DESTROY_RESOURCE,
                strength: Number.MAX_SAFE_INTEGER,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Destroy all of any opponent's resources`
            );
        });

        it('displays rules destroying a resource (all) - with feasting', () => {
            const effect: Effect = {
                type: EffectType.DESTROY_RESOURCE_TO_GAIN_STATS,
                strength: Number.MAX_SAFE_INTEGER,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Destroy all of any player's resources.  Gain +1/+1 for each resource destroyed this way`
            );
        });
    });

    describe('Destroy unit', () => {
        it('displays rules for destroying units', () => {
            const effect: Effect = {
                type: EffectType.DESTROY_UNIT,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Destroy any opposing unit`
            );
        });
    });

    describe('Dealing damage', () => {
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

        it('displays rules for dealing damage to non-soldier units', () => {
            const effect: Effect = {
                type: EffectType.DEAL_DAMAGE_TO_NON_SOLDIERS,
                strength: 7,
                target: TargetTypes.ALL_UNITS,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Deal 7 damage to all non-soldier units`
            );
        });
    });

    describe('Deploy legendary leaders', () => {
        it('displays rules for forcing players to deploy legendary leaders', () => {
            const effect: Effect = {
                type: EffectType.DEPLOY_LEGENDARY_LEADER,
                target: TargetTypes.ALL_PLAYERS,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Deploy all players' legendary leaders onto the board. Don't trigger any enter the board effects`
            );
        });
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

    describe('Draw effects', () => {
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

        it('displays rules for drawing cards (until a limit)', () => {
            const effect: Effect = {
                type: EffectType.DRAW_UNTIL,
                strength: 3,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `If you have less than 3 cards, draw until you have 3`
            );
        });

        it('displays rules for drawing cards (until equal to greatest for opponents) - all players', () => {
            const effect: Effect = {
                type: EffectType.DRAW_UNTIL_MATCHING_OPPONENTS,
                target: TargetTypes.ALL_PLAYERS,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `All players draw cards until they have X cards, where X is the greatest amount of cards in hand amongst all opponents`
            );
        });
    });

    describe('Extracting cards', () => {
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

        it('displays rules for extracting cards from a deck', () => {
            const effect: Effect = {
                type: EffectType.EXTRACT_UNIT_AND_SET_COST,
                strength: 2,
                cost: {
                    Generic: 1,
                    Bamboo: 2,
                },
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Extract 2 unit cards from your deck and set their costs to 1🎋🎋`
            );
        });

        it('displays rules for extracting soldier cards from a deck', () => {
            const effect: Effect = {
                type: EffectType.EXTRACT_SOLDIER_CARDS,
                strength: 2,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Extract 2 soldier cards from your deck`
            );
        });

        it('displays rules for extracting spell cards from a deck', () => {
            const effect: Effect = {
                type: EffectType.EXTRACT_SPELL_CARDS,
                strength: 2,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Extract 2 spell cards from your deck`
            );
        });
    });

    describe('Flicker', () => {
        it('displays rules for flickering a single unit', () => {
            const effect: Effect = {
                type: EffectType.FLICKER,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Remove any unit controlled by you from the game, then return it to the board`
            );
        });
        it('displays rules for flickering a single unit', () => {
            const effect: Effect = {
                type: EffectType.FLICKER,
                target: TargetTypes.ALL_SELF_UNITS,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Remove all your units from the game, then return them to the board`
            );
        });
    });

    describe('Gaining stats and effects', () => {
        it('displays rules for gaining attack', () => {
            const effect: Effect = {
                type: EffectType.GAIN_ATTACK,
                target: TargetTypes.ALL_SELF_UNITS,
                strength: 3,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `All your units gain 3 attack`
            );
        });

        it('displays rules for gaining attack until a threshold amount', () => {
            const effect: Effect = {
                type: EffectType.GAIN_ATTACK_UNTIL,
                target: TargetTypes.ALL_UNITS,
                strength: 3,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `All units gain attack until they are at least 3 attack`
            );
        });

        it('displays rules for gaining magical for units on both hand and board', () => {
            const effect: Effect = {
                type: EffectType.GAIN_MAGICAL_HAND_AND_BOARD,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Your units in hand and board become magical units`
            );
        });

        it('displays rules for gaining stats', () => {
            const effect: Effect = {
                type: EffectType.GAIN_STATS,
                strength: 3,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Gain 3 attack and HP`
            );
        });

        it('displays rules for gaining stats and passive effects', () => {
            const effect: Effect = {
                type: EffectType.GAIN_STATS_AND_EFFECTS,
                strength: 3,
                passiveEffects: [
                    PassiveEffect.HEARTY,
                    PassiveEffect.SNOW_BLINDED,
                ],
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Gain 3 attack/HP, [Hearty (Rather than going to cemetery, lose hearty and go to 1 hp)], and [Snow Blinded (Only able to attack players)]`
            );
        });

        it('displays rules for gaining stats equal to cost', () => {
            const effect: Effect = {
                type: EffectType.GAIN_STATS_EQUAL_TO_COST,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Gain attack/HP equal to the total cost of this card`
            );
        });
    });

    describe('Granting passive effects', () => {
        it('displays rules for granting effects', () => {
            const effect: Effect = {
                type: EffectType.GRANT_PASSIVE_EFFECT,
                target: TargetTypes.ALL_SELF_UNITS,
                passiveEffects: [PassiveEffect.POISONED],
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Give all your units [Poisonous (deals lethal damage)]`
            );
        });
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

    describe('Losing properties', () => {
        it('displays rules for losing magical and ranged', () => {
            const effect: Effect = {
                type: EffectType.LOSE_MAGICAL_AND_RANGED,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `All opposing units' units lose magical/ranged`
            );
        });
    });

    describe('Mill', () => {
        it('displays rules for milling all players', () => {
            const effect: Effect = {
                type: EffectType.MILL,
                target: TargetTypes.ALL_PLAYERS,
                strength: 5,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Put 5 cards from each players' libraries into their graveyards`
            );
        });

        it('displays rules for milling 1 player', () => {
            const effect: Effect = {
                type: EffectType.MILL,
                target: TargetTypes.SELF_PLAYER,
                strength: 1,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Put 1 card from your library into your graveyard`
            );
        });
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

    describe('Modifying attacks per turn', () => {
        it('displays rules for setting attacks per turn', () => {
            const effect: Effect = {
                type: EffectType.MODIFY_ATTACKS_PER_TURN,
                target: TargetTypes.ALL_UNITS,
                strength: 1,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Set all units to have 1 attack per turn`
            );
        });
    });

    describe('Ramp', () => {
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

        it('displays rules for ramping crystal for opponents', () => {
            const effect: Effect = {
                type: EffectType.RAMP,
                resourceType: Resource.CRYSTAL,
                target: TargetTypes.ALL_OPPONENTS,
                strength: 1,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Increase crystal resources by 1 for all opponents`
            );
        });
    });

    describe('Ramp for Turn', () => {
        it('displays rules for bamboo to resource pool', () => {
            const effect: Effect = {
                type: EffectType.RAMP_FOR_TURN,
                resourceType: Resource.BAMBOO,
                strength: 1,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Add 1 🎋 this turn`
            );
        });
    });

    describe('Ramp from Hand', () => {
        it('displays rules for deploying bamboo from hand', () => {
            const effect: Effect = {
                type: EffectType.RAMP_FROM_HAND,
                resourceType: Resource.BAMBOO,
                strength: 1,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Deploy 1 Bamboo card from your hand tapped`
            );
        });
    });

    describe('Reducing costs', () => {
        it('displays rules for reducing costs with a minimum floor', () => {
            const effect: Effect = {
                type: EffectType.REDUCE_CARDS_COSTING_OVER_AMOUNT,
                strength: 3,
                secondaryStrength: 2,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Decrease cost of cards in your hand by 3 (generic).  Cards reduced this way cannot be reduced below 2 total cost`
            );
        });
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

    describe('Shuffle from hand', () => {
        it("displays rules for shuffling into a player's deck", () => {
            const effect: Effect = {
                type: EffectType.SHUFFLE_FROM_HAND,
                strength: 2,
                cardName: 'Tea',
                target: TargetTypes.OPPONENT,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Shuffle 2 [Tea] cards in hand into any opponent's decks`
            );
        });
    });

    describe('Summon units', () => {
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

        it('displays rules for summoning units (opponents)', () => {
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

    describe('Transmute', () => {
        it('displays rules for transmuting cards', () => {
            const effect: Effect = {
                type: EffectType.TRANSMUTE,
                strength: 2,
                cardName: 'Tea',
                target: TargetTypes.SELF_PLAYER,
                secondaryCardName: 'Poison Mushroom',
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Turn 2 [Tea] cards in hand into [Poison Mushroom]`
            );
        });

        it('displays rules for transmuting cards (all players)', () => {
            const effect: Effect = {
                type: EffectType.TRANSMUTE,
                strength: 3,
                cardName: 'Tea',
                target: TargetTypes.ALL_PLAYERS,
                secondaryCardName: 'Poison Mushroom',
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Turn 3 [Tea] cards in hand into [Poison Mushroom] for all players`
            );
        });
    });

    describe('Tuck', () => {
        it('displays rules for tucking units', () => {
            const effect: Effect = {
                type: EffectType.TUCK,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Put any opposing unit on top of its controller's library`
            );
        });

        it('displays rules for tucking units to bottom and drawing', () => {
            const effect: Effect = {
                type: EffectType.TUCK_BOTTOM_AND_DRAW,
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Any unit goes to the bottom of its controller's library.  For each unit returned this way, the unit's controller draw a card`
            );
        });
    });

    describe('Effect Requirements', () => {
        it('displays rules for active requirements', () => {
            const effect: Effect = {
                type: EffectType.DEAL_DAMAGE,
                strength: 3,
                requirements: [
                    {
                        type: EffectRequirementsType.RETURN_LOWEST_COST_UNIT_TO_HAND,
                        strength: 4,
                    },
                    {
                        type: EffectRequirementsType.DISCARD_CARD,
                        strength: 2,
                        cardType: CardType.RESOURCE,
                    },
                ],
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Deal 3 damage to any target. Do this only if you return your 4 lowest costed units to your hand (chosen at random) and you discard 2 [Resource] cards at random`
            );
        });

        it('displays rules for passive requirements', () => {
            const effect: Effect = {
                type: EffectType.DEAL_DAMAGE,
                strength: 3,
                requirements: [
                    {
                        type: EffectRequirementsType.ARE_HOLDING_A_SPECIFIC_CARDNAME,
                        strength: 1,
                        cardName: 'Tea',
                    },
                ],
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `If you are holding a [[Tea]] card, deal 3 damage to any target`
            );
        });

        it('displays rules for mixing active + passive requirements', () => {
            const effect: Effect = {
                type: EffectType.DEAL_DAMAGE,
                strength: 3,
                requirements: [
                    {
                        type: EffectRequirementsType.CONTROL_A_GENERIC_PRODUCING_RESOURCE,
                        strength: 1,
                    },
                    {
                        type: EffectRequirementsType.DISCARD_CARD,
                        strength: 2,
                        cardType: CardType.RESOURCE,
                    },
                ],
            };
            expect(transformEffectToRulesText(effect)).toEqual(
                `Deal 3 damage to any target. Do this only if you control a resource card that produces generic mana and you discard 2 [Resource] cards at random`
            );
        });
    });
});
