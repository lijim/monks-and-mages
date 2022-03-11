import { Player } from '@/types/board';
import { Effect } from '@/types/cards';
import { TargetTypes } from '@/types/effects';
import { RootState } from './store';

export const isUserInitialized = (state: Partial<RootState>): boolean =>
    !!state.user.name;

// get the Player
export const getSelfPlayer = (state: Partial<RootState>): Player | null => {
    if (!state.board?.players) return null;

    return (state.board.players || []).find(
        (player) => player.name === state.user.name
    );
};

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

    switch (lastEffect.target) {
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
