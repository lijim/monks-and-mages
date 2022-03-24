import { v4 as uuidv4 } from 'uuid';

import { Board, GameState } from '@/types/board';
import { GameResult } from '@/types/games';

/**
 * Calculates between the previous game state and the current game state
 * to see if there was a change in .  If so, it returns a GameResult object
 * to represent the result of the game
 */
export const calculateGameResult = (
    prevGameState: GameState,
    newBoardState: Board
): GameResult | null => {
    const { gameState, players } = newBoardState;
    if (
        prevGameState === GameState.PLAYING &&
        (gameState === GameState.TIE || gameState === GameState.WIN)
    ) {
        return {
            result: gameState,
            nonWinners: players
                .filter((player) => !player.isAlive)
                .map((player) => player.name),
            winners: players
                .filter((player) => player.isAlive)
                .map((player) => player.name),
            id: uuidv4(),
        };
    }
    return null;
};
