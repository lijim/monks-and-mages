import { Board, GameState } from '@/types/board';
import { SAMPLE_DECKLIST_1 } from '../deck';
import { makeNewPlayer } from '../player';

export type MakeNewBoardParams = {
    playerNames: string[];
    startingPlayerIndex?: number;
};

export const makeNewBoard = ({
    playerNames,
    startingPlayerIndex = Math.floor(Math.random() * playerNames.length),
}: MakeNewBoardParams): Board => {
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
