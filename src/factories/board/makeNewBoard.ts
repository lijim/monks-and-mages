import { Board, GameState } from '@/types/board';
import { SAMPLE_DECKLIST_1 } from '../deck';
import { makeNewPlayer } from '../player';

export const makeNewBoard = (
    playerNames: string[],
    startingPlayerIndex: number = Math.floor(Math.random() * playerNames.length)
): Board => {
    const players = playerNames.map((playerName) =>
        makeNewPlayer(playerName, SAMPLE_DECKLIST_1)
    );

    players[startingPlayerIndex].isActivePlayer = true;
    return {
        chatLog: [],
        gameState: GameState.PLAYING,
        players,
    };
};
