import { DraftPile, GameState, Player } from '@/types/board';
import { Card, Effect } from '@/types/cards';
import { TargetTypes, getDefaultTargetForEffect } from '@/types/effects';
import { RootState } from '../store';
import { Format } from '@/types/games';

export const isUserInitialized = (state: Partial<RootState>): boolean =>
    !!state.user.name;

export const getCleanName = (state: Partial<RootState>): string =>
    state.user.name || '';

// get the Player
export const getSelfPlayer = (state: Partial<RootState>): Player | null => {
    if (!state.board?.players) return null;

    return (state.board.players || []).find(
        (player) => player.name === state.user.name
    );
};

export const getGameState = (state: RootState): GameState =>
    state.board.gameState;

export const getGameFormat = (state: RootState): Format => state.board?.format;

export const getDraftPiles = (state: RootState): DraftPile[] =>
    state.board.draftPiles;

export const getDeckbuildingPoolForPlayer =
    (playerName: string) =>
    (state: RootState): Card[] => {
        if (!state.board?.players) return [];

        const matchingPlayer = (state.board.players || []).find(
            (player) => player.name === playerName
        );
        if (!matchingPlayer) {
            return [];
        }
        return matchingPlayer.deckBuildingPool;
    };

export const getDraftPoolSize = (state: RootState): number =>
    state.board.draftPoolSize;

export const isActivePlayer = (state: RootState): boolean => {
    const self = getSelfPlayer(state);
    if (!self) {
        return false;
    }
    return self.isActivePlayer;
};

export const getAuth0Id = (state: RootState) => state.user.auth0Id;

// get other players, by turn order
export const getOtherPlayers = (state: Partial<RootState>): Player[] => {
    if (!state.board?.players) return [];

    const indexOfSelfPlayer = state.board.players.findIndex(
        (player) => player?.name === state.user.name
    );
    if (indexOfSelfPlayer === -1) {
        return state.board.players;
    }
    const nextPlayers = state.board.players.slice(indexOfSelfPlayer + 1);
    const prevPlayers = state.board.players.slice(0, indexOfSelfPlayer);
    return [...nextPlayers, ...prevPlayers];
};

export const getAttackingUnit = (
    state: Partial<RootState>
): string | undefined => state.clientSideGameExtras?.attackingUnit;

export const getLastEffect = (
    state: Partial<RootState>
): Effect | undefined => {
    const selfPlayer = getSelfPlayer(state);
    if (!selfPlayer) return undefined;
    const { effectQueue } = selfPlayer;
    if (effectQueue.length === 0) return undefined;
    return effectQueue[effectQueue.length - 1];
};

export const getLastEffectForActivePlayer = (
    state: Partial<RootState>
): Effect | undefined => {
    const activePlayer = state.board?.players?.find(
        (player) => player.isActivePlayer
    );
    if (!activePlayer) return undefined;
    const { effectQueue } = activePlayer;
    if (effectQueue.length === 0) return undefined;
    return effectQueue[effectQueue.length - 1];
};

/**
 * @param state
 * @returns {boolean} - return true if and only if there is an effect in the queue
 * and the last effect on the effectQueue array is invalid given the current board
 * state, e.g. it tries to target an opposing unit when there are none
 */
export const shouldLastEffectFizzle = (state: Partial<RootState>): boolean => {
    const lastEffect = getLastEffect(state);
    if (!lastEffect) return false;
    const otherPlayers = getOtherPlayers(state);
    const selfPlayer = getSelfPlayer(state);
    const players = [...otherPlayers, selfPlayer];

    switch (lastEffect.target || getDefaultTargetForEffect(lastEffect.type)) {
        case TargetTypes.OPPOSING_UNIT: {
            return otherPlayers.every((player) => player.units.length === 0);
        }
        case TargetTypes.OWN_UNIT: {
            return selfPlayer.units.length === 0;
        }
        case TargetTypes.UNIT: {
            return players.every((player) => player.units.length === 0);
        }
        default:
            return false;
    }
};

/**
 * returns whether you can interact with the main elements of the board, e.g. their hand,
 * opponents' faces, etc.
 */
export const isBoardInteractable = (state: Partial<RootState>): boolean => {
    const player = getSelfPlayer(state);
    if (!player) return false;
    return !!(
        player.isAlive &&
        player.isActivePlayer &&
        state.board?.gameState === GameState.PLAYING
    );
};
