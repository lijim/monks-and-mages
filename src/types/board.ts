import { Card, Effect, ResourceCard, UnitCard } from './cards';
import { ChatLog } from './chat';
import { Format } from './games';
import { PartialRecord } from './generics';
import { Resource } from './resources';

export type Player = {
    avatar?: string;
    cemetery: Card[];
    deck: Card[];
    deckBuildingPool: Card[];
    effectQueue: Effect[];
    hand: Card[]; // defaults to 1 every turn
    health: number;
    isActivePlayer: boolean;
    isAlive: boolean;
    name: string;
    numCardsInDeck: number;
    numCardsInHand: number;
    readyToStart: boolean;
    resourcePool: PartialRecord<Resource, number>;
    resources: ResourceCard[];
    // queue of effects, with position 0 getting resolved first
    resourcesLeftToDeploy: number;
    units: UnitCard[];
};

export enum GameState {
    DECKBUILDING = 'DECKBUILDING',
    // players decide whether to keep their opening cards 1 at a time, with the active player
    // making a choice and passing
    DRAFTING = 'DRAFTING',
    MULLIGANING = 'MULLIGANING',
    PLAYING = 'PLAYING',
    TIE = 'TIE',
    WIN = 'WIN',
}

export type DraftPile = Card[];

// Board as it's experienced by server / client
export type Board = {
    chatLog: ChatLog;
    draftPiles: DraftPile[];
    draftPool: Card[];
    draftPoolSize: number;
    format: Format;
    gameState: GameState;
    players: Player[];
    startingPlayerIndex: number;
};

/**
 * Actions:
 * PASS_TURN
 * DRAW_CARD
 * SELECT_CARD
 * SELECT_RESOURCE
 * SELECT_TARGET: Player / Card
 * DEPLOY_UNIT (unit: UnitCard)
 * ATTACK_UNIT (unit: UnitCard)
 * QUEUE_EFFECT
 * RESOLVE_EFFECT
 * ATTACK_FACE - attack face with selected unit
 * DEPLOY_SPELL (spell: SpellCard, target: Player / UnitCard)
 * APPLY_EFFECTS
 * */
