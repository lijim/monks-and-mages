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

export const AutoResolvingTargets = [
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
    BUFF_ATTACK = 'Buff attack', // increase/decrease attack of a single unit
    BUFF_HAND_ATTACK = 'Buff hand attack', // buffs all creatures in hand
    BUFF_MAGIC = 'Buff magic unit',
    BUFF_TEAM_ATTACK = 'Buff team attack', // increases all attack for non-magic units
    BUFF_TEAM_HP = 'Buff team hp', // increases maxHp and hp for whole team
    BUFF_TEAM_MAGIC = 'Buff team magic', // increases attack for magic-units
    CURSE_HAND = 'Curse Hand', // adds one generic cost to cards in hand
    DEAL_DAMAGE = 'Deal Damage', // to any target
    DESTROY_RESOURCE = 'Destroy Resource',
    DESTROY_UNIT = 'Destroy Unit',
    DISCARD_HAND = 'Discard Hand', // discard X cards at random
    DRAW = 'Draw',
    DRAW_MILL_WIN = 'Draw Mill Win',
    DRAW_PER_UNIT = 'Draw Per Unit',
    DRAW_UNTIL = 'Draw Until',
    EXTRACT_CARD = 'Extract Card', // extract X of {cardName} card from deck
    /**
     * Flicker own card (needs to be own - don't want to do opposing units yet
     * b/c it would involve too much new code - we'd have to control for opposing active player
     * effect resolutions)
     */
    FLICKER = 'Flicker',
    HEAL = 'Heal', // to any target
    LEARN = 'Learn', // add spells / units to hand
    POLYMORPH = 'Polymorph', // polymorph a unit into a token type
    RAMP = 'Ramp', // add resources (tapped)
    RAMP_FOR_TURN = 'Ramp for Turn',
    RAMP_FROM_HAND = 'Ramp from Hand',
    RETURN_FROM_CEMETERY = 'Return from cemetry', // Return X cards from cemetery -> board
    REVIVE = 'Revive', // revive units from the cemetery -> board
    SHUFFLE_FROM_HAND = 'Shuffle from hand', // shuffle [all / N of] [X] card from hand into deck
    SUMMON_UNITS = 'Summon Units', // summon units from cemeteries
    TRANSMUTE = 'Transmute', // turn [all/N of] [X] from hand into [Y]
    TUCK = 'Tuck', // put on top of the deck
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
        [EffectType.BUFF_ATTACK]: TargetTypes.UNIT,
        [EffectType.BUFF_HAND_ATTACK]: TargetTypes.SELF_PLAYER,
        [EffectType.BUFF_MAGIC]: TargetTypes.UNIT,
        [EffectType.BUFF_TEAM_ATTACK]: TargetTypes.SELF_PLAYER,
        [EffectType.BUFF_TEAM_HP]: TargetTypes.SELF_PLAYER,
        [EffectType.BUFF_TEAM_MAGIC]: TargetTypes.SELF_PLAYER,
        [EffectType.CURSE_HAND]: TargetTypes.OPPONENT,
        [EffectType.DEAL_DAMAGE]: TargetTypes.ANY,
        [EffectType.DESTROY_RESOURCE]: TargetTypes.OPPONENT,
        [EffectType.DESTROY_UNIT]: TargetTypes.OPPOSING_UNIT,
        [EffectType.DISCARD_HAND]: TargetTypes.OPPONENT,
        [EffectType.DRAW]: TargetTypes.SELF_PLAYER,
        [EffectType.DRAW_MILL_WIN]: TargetTypes.SELF_PLAYER,
        [EffectType.DRAW_PER_UNIT]: TargetTypes.SELF_PLAYER,
        [EffectType.DRAW_UNTIL]: TargetTypes.SELF_PLAYER,
        [EffectType.EXTRACT_CARD]: TargetTypes.SELF_PLAYER,
        [EffectType.FLICKER]: TargetTypes.OWN_UNIT,
        [EffectType.HEAL]: TargetTypes.ALL_SELF_UNITS_CEMETERY,
        [EffectType.LEARN]: TargetTypes.SELF_PLAYER,
        [EffectType.POLYMORPH]: TargetTypes.UNIT,
        [EffectType.RAMP]: TargetTypes.SELF_PLAYER,
        [EffectType.RAMP_FOR_TURN]: TargetTypes.SELF_PLAYER,
        [EffectType.RAMP_FROM_HAND]: TargetTypes.SELF_PLAYER,
        [EffectType.REVIVE]: TargetTypes.ALL_SELF_UNITS_CEMETERY,
        [EffectType.RETURN_FROM_CEMETERY]: TargetTypes.SELF_PLAYER,
        [EffectType.SHUFFLE_FROM_HAND]: TargetTypes.PLAYER,
        [EffectType.SUMMON_UNITS]: TargetTypes.SELF_PLAYER,
        [EffectType.TRANSMUTE]: TargetTypes.SELF_PLAYER,
        [EffectType.TUCK]: TargetTypes.OPPOSING_UNIT,
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
    HEARTY = 'Hearty (Rather than going to cemetery, lose hearty and go to 1 hp)',
    POISONED = 'Poisonous (deals lethal damage)', // deals lethal dmg to enemy units
    QUICK = 'Quick (can attack right away)', // no summoning sickness
}
