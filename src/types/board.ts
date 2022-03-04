import { Card, Effect, ResourceCard, UnitCard } from './cards';
import { ChatLog } from './chat';
import { PartialRecord } from './generics';
import { Resource } from './resources';

export type Player = {
    cemetery: Card[];
    deck: Card[];
    effectQueue: Effect[];
    hand: Card[]; // defaults to 1 every turn
    health: number;
    isActivePlayer: boolean;
    isAlive: boolean;
    name: string;
    numCardsInDeck: number;
    numCardsInHand: number;
    resourcePool: PartialRecord<Resource, number>;
    resources: ResourceCard[];
    // queue of effects, with position 0 getting resolved first
    resourcesLeftToDeploy: number;
    units: UnitCard[];
};

export enum GameState {
    PLAYING = 'PLAYING',
    TIE = 'TIE',
    WIN = 'WIN',
}

// Board as it's experienced by server / client
export type Board = {
    chatLog: ChatLog;
    gameState: GameState;
    players: Player[];
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
