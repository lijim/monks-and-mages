import { PartialRecord } from './generics';
import { PassiveEffect, TargetTypes, EffectType } from './effects';
import { Resource } from './resources';

export enum CardType {
    RESOURCE = 'Resource',
    SPELL = 'Spell',
    UNIT = 'Unit',
}

export type ResourceCard = {
    cardType: CardType.RESOURCE;
    id?: string;
    isUsed: boolean;
    name: string;
    resourceType: Resource; // if true, player has currently used up this resource for turn
};

/**
 * Needs to be here due to circular dependencies
 */
export type Effect = {
    resourceType?: Resource;
    strength?: number;
    summonType?: UnitCard;
    target?: TargetTypes;
    type: EffectType;
};

export type UnitBase = {
    // max hp
    attack: number;
    cost: PartialRecord<Resource, number>;
    description: string;
    enterEffects: Effect[];
    imgSrc?: string;
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
    // all units except magic must attack soldiers first 🛡️
    passiveEffects: PassiveEffect[];
    totalHp: number;
};

export interface UnitCard extends UnitBase {
    attackBuff: number;
    cardType: CardType.UNIT;
    hp: number;
    hpBuff: number;
    id?: string;
    // number of attack left this turn - starts at 0
    isSelected: boolean;
    // current hp
    numAttacksLeft: number;
}

export type SpellBase = {
    cost: PartialRecord<Resource, number>;
    effects: Effect[];
    imgSrc?: string;
    name: string;
    originalCost?: PartialRecord<Resource, number>;
};

export interface SpellCard extends SpellBase {
    cardType: CardType.SPELL;
    id?: string;
    isSelected: boolean;
}

export type Card = ResourceCard | UnitCard | SpellCard;

export type DeckList = { card: Card; quantity: number }[];

export type PileOfCards = {
    cards: Map<Card, number>;
    title: string;
};
