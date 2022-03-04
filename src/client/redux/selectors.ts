import { Player } from '@/types/board';
import { RootState } from './store';

export const isUserInitialized = (state: Partial<RootState>): boolean =>
    !!state.user.name;

// get the Player
export const getCurrentPlayer = (state: Partial<RootState>): Player | null => {
    if (!state.board?.players) return null;

    return (state.board.players || []).find(
        (player) => player.name === state.user.name
    );
};

// get other players, by turn order
export const getOtherPlayers = (state: Partial<RootState>): Player[] => {
    if (!state.board?.players) return [];

    const indexOfCurrentPlayer = state.board.players.findIndex(
        (player) => player?.name === state.user.name
    );
    if (indexOfCurrentPlayer === -1) {
        return state.board.players;
    }
    const nextPlayers = state.board.players.slice(indexOfCurrentPlayer + 1);
    const prevPlayers = state.board.players.slice(0, indexOfCurrentPlayer);
    return [...nextPlayers, ...prevPlayers];
};
