export interface PassTurnAction {
    type: 'PASS_TURN';
}

export interface DeployResource {
    cardId: string;
    type: 'DEPLOY_RESOURCE';
}

export interface TapResource {
    cardId: string;
    type: 'TAP_RESOURCE';
}

export interface DeployUnit {
    cardId: string;
    type: 'DEPLOY_UNIT';
}

export interface CastSpell {
    cardId: string;
    playerTargets?: string[]; // player name's
    type: 'CAST_SPELL';
    unitTargets?: string[]; // card id's
}

export interface PerformAttack {
    cardId: string;
    playerTarget?: string; // player name's
    type: 'PERFORM_ATTACK';
    unitTarget?: string; // card id's
}

export type GameAction =
    | PassTurnAction
    | DeployResource
    | TapResource
    | DeployUnit
    | CastSpell
    | PerformAttack;
