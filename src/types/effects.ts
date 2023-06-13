export enum TargetTypes {
    ALL_OPPONENTS = 'ALL_OPPONENTS',
    ALL_OPPOSING_UNITS = 'ALL_OPPOSING_UNITS',
    ALL_PLAYERS = 'ALL_PLAYERS',
    ALL_SELF_UNITS = 'ALL_SELF_UNITS',
    ALL_SELF_UNITS_CEMETERY = 'ALL_SELF_UNITS_CEMETERY',
    ALL_UNITS = 'ALL_UNITS',
    ANY = 'ANY',
    OPPONENT = 'OPPONENT',
    OPPOSING_UNIT = 'OPPOSING_UNIT',
    OWN_UNIT = 'OWN_UNIT',
    PLAYER = 'PLAYER',
    SELF_PLAYER = 'SELF_PLAYER',
    UNIT = 'UNIT',
}

export const AUTO_RESOLVING_TARGETS = [
    TargetTypes.ALL_OPPONENTS,
    TargetTypes.ALL_OPPOSING_UNITS,
    TargetTypes.ALL_PLAYERS,
    TargetTypes.ALL_SELF_UNITS,
    TargetTypes.ALL_SELF_UNITS_CEMETERY,
    TargetTypes.ALL_UNITS,
    TargetTypes.SELF_PLAYER,
];

/**
 * Effects that a card can have (both spells and units)
 */
export enum EffectType {
    BLOOM = 'Bloom', // "Summer Bloom" - you may play X additional resources this turn
    BOUNCE = 'Bounce', // to any target
    BOUNCE_UNITS_UNDER_THRESHOLD_ATTACK = 'Bounce units under threshold attack',
    BUFF_ATTACK = 'Buff attack', // increase/decrease attack of a single unit
    BUFF_ATTACK_FOR_CYCLE = 'Buff attack for cycle', // increase/decrease attack of a single unit
    BUFF_ATTACK_FOR_TURN = 'Buff attack for turn', // increase/decrease attack of a single unit
    BUFF_HAND_ATTACK = 'Buff hand attack',
    // give unit(s) a passive effect
    BUFF_HAND_ATTACK_WITH_FAILSAFE_LIFECHANGE = 'Buff hand attack with failsafe lifechange',
    // buffs all creatures in hand
    BUFF_MAGIC = 'Buff magic unit',
    BUFF_TEAM_ATTACK = 'Buff team attack',
    // increases attack for magic-units
    BUFF_TEAM_GENERIC_UNITS = 'Buff team generic units',
    // increases all attack for non-magic units
    BUFF_TEAM_HP = 'Buff team hp',
    // increases maxHp and hp for whole team
    BUFF_TEAM_LEGENDARY_UNITS = 'Buff team legendary units',
    // increase hp and attack for units with no effects text
    BUFF_TEAM_MAGIC = 'Buff team magic',
    // increase hp and attack for units with no effects text
    CURSE_HAND = 'Curse hand', // adds one generic cost to cards in hand
    CURSE_HAND_RESOURCE_TYPE = 'Curse hand for cards of a specific resource type',
    // adds one generic cost to cards in hand
    CURSE_HAND_SPELLS = 'Curse hand spells',
    DEAL_DAMAGE = 'Deal damage',
    DEAL_DAMAGE_TO_NON_SOLDIERS = 'Deal damage to non-soldier units', // if no cards, do X to life instead
    DEPLOY_LEGENDARY_LEADER = 'Deploy legendary leader', // without triggering enter board efffects
    DESTROY_RESOURCE = 'Destroy resource',
    DESTROY_RESOURCE_TO_GAIN_STATS = 'Destroy resource to gain stats', // destroy resource, gain +1, +1 for each resource destroyed
    DESTROY_UNIT = 'Destroy unit',
    DISCARD_HAND = 'Discard hand', // discard X cards at random
    DRAW = 'Draw',
    DRAW_MILL_WIN = 'Draw and win if no cards left',
    DRAW_PER_UNIT = 'Draw per unit',
    DRAW_UNTIL = 'Draw until',
    DRAW_UNTIL_MATCHING_OPPONENTS = 'Draw until matching opponents',
    EXTRACT_AND_SET_COST = 'Extract cards and set their costs',
    EXTRACT_CARD = 'Extract card', // extract X of {cardName} card from deck
    EXTRACT_SOLDIER_CARDS = 'Extract soldier cards',
    EXTRACT_SPELL_CARDS = 'Extract spell cards',
    /**
     * Flicker own card (needs to be own - don't want to do opposing units yet
     * b/c it would involve too much new code - we'd have to control for opposing active player
     * effect resolutions)
     */
    FLICKER = 'Flicker',
    GAIN_ATTACK = 'Gain attack', // buff the unit's attack
    GAIN_MAGICAL_HAND_AND_BOARD = 'Gain magical for hand and board units', // unit becomes magical
    GAIN_STATS = 'Gain stats', // buff the unit's attack + hp
    GAIN_STATS_AND_EFFECTS = 'Gain stats and effects', // buff the unit's attack + hp and gain passive effects
    GAIN_STATS_EQUAL_TO_COST = 'Gain stats equal to cost', // buff the unit's attack + hp by the cost of the unit
    GRANT_PASSIVE_EFFECT = 'Grant passive effect',
    // to any target
    HEAL = 'Heal', // to any target
    LEARN = 'Learn', // add spells / units to hand
    LOSE_MAGICAL_AND_RANGED = 'Lose magical and ranged',
    MILL = 'Mill',
    MODIFY_ATTACKS_PER_TURN = 'Modify attacks per turn',
    POLYMORPH = 'Polymorph', // polymorph a unit into a token type
    RAMP = 'Ramp', // add resources (tapped)
    RAMP_FOR_TURN = 'Ramp for turn',
    RAMP_FROM_HAND = 'Ramp from hand',
    REDUCE_CARDS_COSTING_OVER_AMOUNT = 'Reduce cards costing over a threshold amount',
    REDUCE_LEGENDARY_LEADER_COST = 'Reduce legendary leader cost',
    RETURN_FROM_CEMETERY = 'Return from cemetery',
    RETURN_RESOURCES_FROM_CEMETERY = 'Return resource cards from cemetery to hand',
    RETURN_SPELLS_AND_RESOURCES_FROM_CEMETERY = 'Return X spell cards and resource cards from cemetery',
    // Return X cards from cemetery -> board
    RETURN_SPELLS_FROM_CEMETERY = 'Return spell cards from cemetery to hand',
    REVIVE = 'Revive', // revive units from the cemetery -> board
    SHUFFLE_CEMETERY_INTO_DECK = 'Shuffle cemetery into deck',
    SHUFFLE_FROM_HAND = 'Shuffle from hand',
    SHUFFLE_HAND_INTO_DECK = 'Shuffle hand into deck',
    SUMMON_UNITS = 'Summon Units',
    // shuffle [all / N of] [X] card from hand into deck
    SWAP_CARDS = 'Swap cards',
    // turn [all/N of] [X] from hand into [Y]
    TRANSFORM_RESOURCE = 'Transform resource',
    // summon units from cemeteries
    TRANSMUTE = 'Transmute', // turn resources at random into [X] card or ([X] cards into [Y] cards)
    TUCK = 'Tuck', // put on top of the deck
    TUCK_BOTTOM_AND_DRAW = 'Tuck to bottom and draw', // put on bottom of deck - that player draws for each put on bottom this way
}

/**
 * Default targets of effects, e.g.
 */
export const getDefaultTargetForEffect = (
    effectType: EffectType
): TargetTypes => {
    return {
        [EffectType.BLOOM]: TargetTypes.SELF_PLAYER,
        [EffectType.BOUNCE]: TargetTypes.UNIT,
        [EffectType.BOUNCE_UNITS_UNDER_THRESHOLD_ATTACK]: TargetTypes.ALL_UNITS,
        [EffectType.BUFF_ATTACK]: TargetTypes.UNIT,
        [EffectType.BUFF_ATTACK_FOR_CYCLE]: TargetTypes.UNIT,
        [EffectType.BUFF_ATTACK_FOR_TURN]: TargetTypes.UNIT,
        [EffectType.BUFF_HAND_ATTACK]: TargetTypes.SELF_PLAYER,
        [EffectType.BUFF_HAND_ATTACK_WITH_FAILSAFE_LIFECHANGE]:
            TargetTypes.ALL_OPPONENTS,
        [EffectType.BUFF_MAGIC]: TargetTypes.UNIT,
        [EffectType.BUFF_TEAM_ATTACK]: TargetTypes.SELF_PLAYER,
        [EffectType.BUFF_TEAM_HP]: TargetTypes.SELF_PLAYER,
        [EffectType.BUFF_TEAM_MAGIC]: TargetTypes.SELF_PLAYER,
        [EffectType.BUFF_TEAM_GENERIC_UNITS]: TargetTypes.SELF_PLAYER,
        [EffectType.BUFF_TEAM_LEGENDARY_UNITS]: TargetTypes.SELF_PLAYER,
        [EffectType.CURSE_HAND]: TargetTypes.OPPONENT,
        [EffectType.CURSE_HAND_RESOURCE_TYPE]: TargetTypes.OPPONENT,
        [EffectType.CURSE_HAND_SPELLS]: TargetTypes.OPPONENT,
        [EffectType.DEAL_DAMAGE]: TargetTypes.ANY,
        [EffectType.DEAL_DAMAGE_TO_NON_SOLDIERS]: TargetTypes.UNIT,
        [EffectType.DEPLOY_LEGENDARY_LEADER]: TargetTypes.ALL_PLAYERS,
        [EffectType.DESTROY_RESOURCE]: TargetTypes.OPPONENT,
        [EffectType.DESTROY_RESOURCE_TO_GAIN_STATS]: TargetTypes.PLAYER,
        [EffectType.DESTROY_UNIT]: TargetTypes.OPPOSING_UNIT,
        [EffectType.DISCARD_HAND]: TargetTypes.OPPONENT,
        [EffectType.DRAW]: TargetTypes.SELF_PLAYER,
        [EffectType.DRAW_MILL_WIN]: TargetTypes.SELF_PLAYER,
        [EffectType.DRAW_PER_UNIT]: TargetTypes.SELF_PLAYER,
        [EffectType.DRAW_UNTIL]: TargetTypes.SELF_PLAYER,
        [EffectType.DRAW_UNTIL_MATCHING_OPPONENTS]: TargetTypes.SELF_PLAYER,
        [EffectType.EXTRACT_AND_SET_COST]: TargetTypes.SELF_PLAYER,
        [EffectType.EXTRACT_CARD]: TargetTypes.SELF_PLAYER,
        [EffectType.EXTRACT_SOLDIER_CARDS]: TargetTypes.SELF_PLAYER,
        [EffectType.EXTRACT_SPELL_CARDS]: TargetTypes.SELF_PLAYER,
        [EffectType.FLICKER]: TargetTypes.OWN_UNIT,
        [EffectType.GAIN_ATTACK]: TargetTypes.SELF_PLAYER,
        [EffectType.GAIN_MAGICAL_HAND_AND_BOARD]: TargetTypes.SELF_PLAYER,
        [EffectType.GAIN_STATS]: TargetTypes.SELF_PLAYER,
        [EffectType.GAIN_STATS_AND_EFFECTS]: TargetTypes.SELF_PLAYER,
        [EffectType.GAIN_STATS_EQUAL_TO_COST]: TargetTypes.SELF_PLAYER,
        [EffectType.GRANT_PASSIVE_EFFECT]: TargetTypes.UNIT,
        [EffectType.HEAL]: TargetTypes.ALL_SELF_UNITS_CEMETERY,
        [EffectType.LEARN]: TargetTypes.SELF_PLAYER,
        [EffectType.LOSE_MAGICAL_AND_RANGED]: TargetTypes.ALL_OPPOSING_UNITS,
        [EffectType.MILL]: TargetTypes.PLAYER,
        [EffectType.MODIFY_ATTACKS_PER_TURN]: TargetTypes.UNIT,
        [EffectType.POLYMORPH]: TargetTypes.UNIT,
        [EffectType.RAMP]: TargetTypes.SELF_PLAYER,
        [EffectType.RAMP_FOR_TURN]: TargetTypes.SELF_PLAYER,
        [EffectType.RAMP_FROM_HAND]: TargetTypes.SELF_PLAYER,
        [EffectType.REDUCE_CARDS_COSTING_OVER_AMOUNT]: TargetTypes.SELF_PLAYER,
        [EffectType.REDUCE_LEGENDARY_LEADER_COST]: TargetTypes.SELF_PLAYER,
        [EffectType.RETURN_FROM_CEMETERY]: TargetTypes.SELF_PLAYER,
        [EffectType.RETURN_RESOURCES_FROM_CEMETERY]: TargetTypes.SELF_PLAYER,
        [EffectType.RETURN_SPELLS_AND_RESOURCES_FROM_CEMETERY]:
            TargetTypes.SELF_PLAYER,
        [EffectType.RETURN_SPELLS_FROM_CEMETERY]: TargetTypes.SELF_PLAYER,
        [EffectType.REVIVE]: TargetTypes.ALL_SELF_UNITS_CEMETERY,
        [EffectType.SHUFFLE_CEMETERY_INTO_DECK]: TargetTypes.PLAYER,
        [EffectType.SHUFFLE_FROM_HAND]: TargetTypes.PLAYER,
        [EffectType.SHUFFLE_HAND_INTO_DECK]: TargetTypes.PLAYER,
        [EffectType.SWAP_CARDS]: TargetTypes.OPPONENT,
        [EffectType.SUMMON_UNITS]: TargetTypes.SELF_PLAYER,
        [EffectType.TRANSMUTE]: TargetTypes.SELF_PLAYER,
        [EffectType.TRANSFORM_RESOURCE]: TargetTypes.SELF_PLAYER,
        [EffectType.TUCK]: TargetTypes.OPPOSING_UNIT,
        [EffectType.TUCK_BOTTOM_AND_DRAW]: TargetTypes.UNIT,
    }[effectType];
};

/**
 * Passive effects of a unit
 */
export enum PassiveEffect {
    /**
        STRONG_VS_RANGED, // deal double damage to ranged units
        STRONG_VS_MAGIC, // deal double damage to magic units
        STRONG_VS_SOLDIER, // deal double damage to soldier units
        HEARTY, // cannot be taken down in 1 hit
    */
    ETHEREAL = 'Ethereal (cannot be damaged outside of direct combat)',
    HEARTY = 'Hearty (Rather than going to cemetery, lose hearty and go to 1 hp)',
    POISONED = 'Poisonous (deals lethal damage)', // deals lethal dmg to enemy units
    QUICK = 'Quick (can attack right away)',
    SNOW_BLINDED = 'Snow Blinded (Only able to attack players)',
    // no summoning sickness
    STEADY = "Steady (this unit's stats cannot be modified)",
}
