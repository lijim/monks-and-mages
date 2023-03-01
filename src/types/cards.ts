import { PartialRecord } from './generics';
import { PassiveEffect, TargetTypes, EffectType } from './effects';
import { Resource } from './resources';

export enum CardType {
    RESOURCE = 'Resource',
    SPELL = 'Spell',
    UNIT = 'Unit',
}

export type ResourceCard = {
    artistName?: string;
    artistUrl?: string;
    cardType: CardType.RESOURCE;
    comesInTapped?: boolean;
    enterEffects?: Effect[];
    id?: string;
    imgSrc?: string;
    isAdvanced?: boolean;
    isUsed: boolean; // if true, player has currently used up this resource for turn
    name: string;
    originalImagePage?: string;
    resourceType: Resource;
    secondaryResourceType?: Resource;
};

/**
 * Needs to be here due to circular dependencies
 */
export type Effect = {
    artistName?: string;
    artistUrl?: string;
    cardName?: string;
    resourceType?: Resource;
    secondaryCardName?: string;
    strength?: number;
    summonType?: UnitCard;
    target?: TargetTypes;
    type: EffectType;
};

/**
 * Unit Base is the construct needed to construct a unit card.
 */
export type UnitBase = {
    artistName?: string;
    artistUrl?: string;
    attack: number;
    cost: PartialRecord<Resource, number>;
    damagePlayerEffects?: Effect[];
    description: string;
    enterEffects: Effect[];
    imgSrc?: string;
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
};

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
    isSelected: boolean;
    numAttacksLeft: number; // number of attack left this turn - starts at 0
}

export type UnitType = 'Magical' | 'Soldier' | 'Ranged' | 'None';

export type SpellBase = {
    artistName?: string;
    artistUrl?: string;
    cost: PartialRecord<Resource, number>;
    effects: Effect[];
    imgSrc?: string;
    name: string;
    originalCost?: PartialRecord<Resource, number>;
    originalImagePage?: string;
};

export interface SpellCard extends SpellBase {
    cardType: CardType.SPELL;
    id?: string;
    isSelected: boolean;
}

export type Card = ResourceCard | UnitCard | SpellCard;

export type DeckList = { card: Card; quantity: number }[];

/**
 * Used to store decklists as 'skeleton states' for imports + downloads.
 * (i.e.. they don't have the full card object, just the name)
 *
 * Can be easily stringified b/c this construct is so minimalistic:
 * just a card string and a number
 */
export type Skeleton = { card: string; quantity: number }[];

export type PileOfCards = {
    cards: Map<Card, number>;
    title: string;
};
