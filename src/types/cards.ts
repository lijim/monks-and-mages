import { PartialRecord } from './generics';
import { PassiveEffect, TargetTypes, EffectType } from './effects';
import { Resource } from './resources';

export enum CardRarity {
    COMMON = 'Common',
    MYTHIC = 'Mythic',
    RARE = 'Rare',
    UNCOMMON = 'Uncommon',
}

export enum CardType {
    RESOURCE = 'Resource',
    SPELL = 'Spell',
    UNIT = 'Unit',
}

type CardBase = {
    artistName?: string;
    artistUrl?: string;
    id?: string;
    imgSrc?: string;
    isTokenOnly?: boolean; // true if the card should not show up in packs, e.g. 'Tea' / 'Landmark'
    rarity: CardRarity;
};

export interface ResourceCard extends CardBase {
    cardType: CardType.RESOURCE;
    comesInTapped?: boolean;
    enterEffects?: Effect[];
    isAdvanced?: boolean;
    isUsed: boolean; // if true, player has currently used up this resource for turn
    name: string;
    originalImagePage?: string;
    resourceType: Resource;
    secondaryResourceType?: Resource;
}

/**
 * Needs to be here due to circular dependencies
 */
export type Effect = {
    cardName?: string;
    passiveEffect?: PassiveEffect;
    requirements?: EffectRequirement[];
    resourceType?: Resource;
    secondaryCardName?: string;
    sourceId?: string;
    strength?: number;
    summonType?: UnitCard;
    target?: TargetTypes;
    type: EffectType;
};

export type EffectRequirement = {
    cardType?: CardType;
    resourceType?: Resource;
    strength?: number;
    type: EffectRequirementsType;
};

export enum EffectRequirementsType {
    DISCARD_CARD = 'Discard card',
    RETURN_LOWEST_COST_UNIT_TO_HAND = 'Return lowest cost unit to hand',
}

/**
 * Unit Base is the construct needed to construct a unit card.
 */
export interface UnitBase extends CardBase {
    attack: number;
    cost: PartialRecord<Resource, number>;
    damagePlayerEffects?: Effect[];
    description: string;
    enterEffects: Effect[];
    isLegendary?: boolean;
    // can attack without being hit back 🏹
    isMagical: boolean;
    // number of attacks per turn
    isRanged: boolean;
    // can attack non-soldiers first ✨
    isSoldier: boolean;
    name: string;
    // how much damage is inflicted per attack
    numAttacks: number;
    originalCost?: PartialRecord<Resource, number>;
    originalImagePage?: string;
    originalPassiveEffects?: PassiveEffect[];
    // all units except magic must attack soldiers first 🛡️
    passiveEffects: PassiveEffect[];
    totalHp: number; // max HP
}

/**
 * Represents the full Unit Card that has been made from a unit base.
 *
 * For instance, the unit base object lacks id's because
 * id's are generated with the makeCard factory.
 */
export interface UnitCard extends UnitBase {
    attackBuff: number;
    cardType: CardType.UNIT;
    hp: number; // current hp
    hpBuff: number;
    id?: string;
    isFresh: boolean;
    isLegendaryLeader: boolean;
    isSelected: boolean; // true if unit card has entered this past turn
    numAttacksLeft: number;
    oneCycleAttackBuff: number;
    // number of attack left this turn - starts at 0
    oneTurnAttackBuff: number;
}

export type UnitType = 'Magical' | 'Soldier' | 'Ranged' | 'None';

export interface SpellBase extends CardBase {
    cost: PartialRecord<Resource, number>;
    effects: Effect[];
    name: string;
    originalCost?: PartialRecord<Resource, number>;
    originalImagePage?: string;
}

export interface SpellCard extends SpellBase {
    cardType: CardType.SPELL;
    id?: string;
    isSelected: boolean;
}

export type Card = ResourceCard | UnitCard | SpellCard;

export type DeckList = {
    mainBoard: { card: Card; quantity: number }[];
    sideBoard: { card: Card; quantity: number }[];
};

/**
 * Used to store decklists as 'skeleton states' for imports + downloads.
 * (i.e.. they don't have the full card object, just the name)
 *
 * Can be easily stringified b/c this construct is so minimalistic:
 * just a card string and a number
 */
export type Skeleton = {
    mainBoard: { card: string; quantity: number }[];
    sideBoard: { card: string; quantity: number }[];
};

export type PileOfCards = {
    cards: Map<Card, number>;
    title: string;
};
