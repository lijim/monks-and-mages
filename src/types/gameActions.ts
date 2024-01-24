import { Skeleton } from './cards';
import { Resource } from './resources';

export enum GameActionTypes {
    ACCEPT_MULLIGAN = 'ACCEPT_MULLIGAN',
    CAST_SPELL = 'CAST_SPELL',
    DEPLOY_LEGENDARY_LEADER = 'DEPLOY_LEGENDARY_LEADER',
    DEPLOY_RESOURCE = 'DEPLOY_RESOURCE',
    DEPLOY_UNIT = 'DEPLOY_UNIT',
    PASS_TURN = 'PASS_TURN',
    PERFORM_ATTACK = 'PERFORM_ATTACK',
    REJECT_MULLIGAN = 'REJECT_MULLIGAN',
    START_DECKBUILDING = 'START_DECKBUILDING',
    SUBMIT_DECK = 'SUBMIT_DECK',
    TAKE_DRAFT_PILE = 'TAKE_DRAFT_PILE',
    TAP_RESOURCE = 'TAP_RESOURCE',
}

export interface AcceptMulliganAction {
    type: GameActionTypes.ACCEPT_MULLIGAN;
}

export interface CastSpell {
    cardId: string;
    playerTargets?: string[]; // player name's
    type: GameActionTypes.CAST_SPELL;
    unitTargets?: string[]; // card id's
}
export interface DeployLegendaryLeader {
    type: GameActionTypes.DEPLOY_LEGENDARY_LEADER;
}

export interface DeployResource {
    cardId: string;
    type: GameActionTypes.DEPLOY_RESOURCE;
}

export interface DeployUnit {
    cardId: string;
    type: GameActionTypes.DEPLOY_UNIT;
}

export interface PassTurnAction {
    type: GameActionTypes.PASS_TURN;
}

export interface PerformAttack {
    cardId: string;
    playerTarget?: string; // player name's
    type: GameActionTypes.PERFORM_ATTACK;
    unitTarget?: string; // card id's
}

export interface RejectMulliganAction {
    type: GameActionTypes.REJECT_MULLIGAN;
}

export interface StartDeckbuilding {
    type: GameActionTypes.START_DECKBUILDING;
}

export interface SubmitDeck {
    skeleton: Skeleton;
    type: GameActionTypes.SUBMIT_DECK;
}

export interface TakeDraftPile {
    draftPileIndex: number;
    type: GameActionTypes.TAKE_DRAFT_PILE;
}

export interface TapResource {
    cardId: string;
    resourceType?: Resource;
    type: GameActionTypes.TAP_RESOURCE;
}

export type GameAction =
    | AcceptMulliganAction
    | CastSpell
    | DeployLegendaryLeader
    | DeployResource
    | DeployUnit
    | PassTurnAction
    | PerformAttack
    | RejectMulliganAction
    | StartDeckbuilding
    | SubmitDeck
    | TakeDraftPile
    | TapResource;
