import { Player } from '@/types/board';
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
