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
    BOUNCE = 'Bounce', // to any target
    BUFF_HAND_ATTACK = 'Buff hand attack', // buffs all creatures in hand
    BUFF_TEAM_ATTACK = 'Buff team attack', // increases all attack for non-magic units
    BUFF_TEAM_HP = 'Buff team hp', // increases maxHp and hp for whole team
    BUFF_TEAM_MAGIC = 'Buff team magic', // increases attack for magic-units
    CURSE_HAND = 'Curse Hand', // adds one generic cost to cards in hand
    DEAL_DAMAGE = 'Deal Damage', // to any target
    DISCARD_HAND = 'Discard Hand', // discard X cards at random
    DRAW = 'Draw',
    DRAW_PER_UNIT = 'Draw Per Unit',
    EXTRACT_CARD = 'Extract Card', // extract X of {cardName} card from deck
    HEAL = 'Heal', // to any target
    LEARN = 'Learn', // add spells / units to hand
    RAMP = 'Ramp', // add resources (tapped)
    RETURN_FROM_CEMETERY = 'Return from cemetry', // Return X cards from cemetery -> board
    REVIVE = 'Revive', // revive units from the cemetery -> board
    SUMMON_UNITS = 'Summon Units', //
}

/**
 * Default targets of effects, e.g.
 */
export const getDefaultTargetForEffect = (
    effectType: EffectType
): TargetTypes => {
    return {
        [EffectType.BOUNCE]: TargetTypes.UNIT,
        [EffectType.BUFF_HAND_ATTACK]: TargetTypes.SELF_PLAYER,
        [EffectType.BUFF_TEAM_ATTACK]: TargetTypes.SELF_PLAYER,
        [EffectType.BUFF_TEAM_HP]: TargetTypes.SELF_PLAYER,
        [EffectType.BUFF_TEAM_MAGIC]: TargetTypes.SELF_PLAYER,
        [EffectType.CURSE_HAND]: TargetTypes.OPPONENT,
        [EffectType.DEAL_DAMAGE]: TargetTypes.ANY,
        [EffectType.DISCARD_HAND]: TargetTypes.OPPONENT,
        [EffectType.DRAW_PER_UNIT]: TargetTypes.SELF_PLAYER,
        [EffectType.DRAW]: TargetTypes.SELF_PLAYER,
        [EffectType.EXTRACT_CARD]: TargetTypes.SELF_PLAYER,
        [EffectType.HEAL]: TargetTypes.ALL_SELF_UNITS_CEMETERY,
        [EffectType.LEARN]: TargetTypes.SELF_PLAYER,
        [EffectType.RAMP]: TargetTypes.SELF_PLAYER,
        [EffectType.REVIVE]: TargetTypes.ALL_SELF_UNITS_CEMETERY,
        [EffectType.RETURN_FROM_CEMETERY]: TargetTypes.SELF_PLAYER,
        [EffectType.SUMMON_UNITS]: TargetTypes.SELF_PLAYER,
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
    POISONED = 'Poisonous (deals lethal damage)', // deals lethal dmg to enemy units
    QUICK = 'Quick (can attack right away)', // no summoning sickness
}
