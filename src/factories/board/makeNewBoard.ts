import { Board, GameState } from '@/types/board';
import { SAMPLE_DECKLIST_1 } from '../deck';
import { makeNewPlayer } from '../player';

export const makeNewBoard = (playerNames: string[]): Board => {
    return {
        chatLog: [],
        gameState: GameState.PLAYING,
        players: playerNames.map((playerName) =>
            makeNewPlayer(playerName, SAMPLE_DECKLIST_1)
        ),
    };
};
