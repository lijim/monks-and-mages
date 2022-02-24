export enum TargetTypes {
    ALL_OPPONENTS = 'ALL_OPPONENTS',
    ALL_OPPOSING_UNITS = 'ALL_OPPOSING_UNITS',
    ALL_PLAYERS = 'ALL_PLAYERS',
    ALL_SELF_UNITS = 'ALL_SELF_UNITS',
    ALL_SELF_UNITS_GRAVEYARD = 'ALL_SELF_UNITS_GRAVEYARD',
    ALL_UNITS = 'ALL_UNITS',
    ANY = 'ANY',
    OPPONENT = 'OPPONENT',
    OPPOSING_UNIT = 'OPPOSING_UNIT',
    OWN_UNIT = 'OWN_UNIT',
    PLAYER = 'PLAYER',
    SELF_PLAYER = 'SELF_PLAYER',
    UNIT = 'UNIT',
}

/**
 * Effects that a card can have (both spells and units)
 */
export enum EffectType {
    DRAW,
    DEAL_DAMAGE, // to any target
    CURSE_HAND, // adds one generic cost to
    DISCARD_HAND,
    RAMP_CRYSTAL,
    RAMP_BAMBOO,
    RAMP_WATER,
    RAMP_IRON,
    RAMP_FIRE,
    REVIVE,
    SUMMON_UNITS,
    HEAL, // to any target
    BOUNCE, // to any target
    BUFF_TEAM_ATTACK, // increases all attack for non-magic units
    // BUFF_FIRE_ATTACK // increases all fire-based units attack
    // BUFF_WATER_ATTACK
    BUFF_TEAM_MAGIC, // increases attack for magic-units
    BUFF_TEAM_HP, // increases maxHp and hp for whole team
    BUFF_HAND_ATTACK, // buffs all creatures in hand
}

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
