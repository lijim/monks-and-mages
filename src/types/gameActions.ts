export enum GameActionTypes {
    CAST_SPELL = 'CAST_SPELL',
    DEPLOY_RESOURCE = 'DEPLOY_RESOURCE',
    DEPLOY_UNIT = 'DEPLOY_UNIT',
    PASS_TURN = 'PASS_TURN',
    PERFORM_ATTACK = 'PERFORM_ATTACK',
    TAP_RESOURCE = 'TAP_RESOURCE',
}

export interface PassTurnAction {
    type: GameActionTypes.PASS_TURN;
}

export interface DeployResource {
    cardId: string;
    type: GameActionTypes.DEPLOY_RESOURCE;
}

export interface TapResource {
    cardId: string;
    type: GameActionTypes.TAP_RESOURCE;
}

export interface DeployUnit {
    cardId: string;
    type: GameActionTypes.DEPLOY_UNIT;
}

export interface CastSpell {
    cardId: string;
    playerTargets?: string[]; // player name's
    type: GameActionTypes.CAST_SPELL;
    unitTargets?: string[]; // card id's
}

export interface PerformAttack {
    cardId: string;
    playerTarget?: string; // player name's
    type: GameActionTypes.PERFORM_ATTACK;
    unitTarget?: string; // card id's
}

export type GameAction =
    | PassTurnAction
    | DeployResource
    | TapResource
    | DeployUnit
    | CastSpell
    | PerformAttack;
