import { DeckListSelections } from '@/constants/lobbyConstants';
import { Board, GameState } from '@/types/board';
import { SAMPLE_DECKLIST_1, SAMPLE_DECKLIST_2 } from '../deck';
import { makeNewPlayer } from '../player';

export type MakeNewBoardParams = {
    playerDeckListSelections?: DeckListSelections[];
    playerNames: string[];
    startingPlayerIndex?: number;
};

export const makeNewBoard = ({
    playerDeckListSelections,
    playerNames,
    startingPlayerIndex = Math.floor(Math.random() * playerNames.length),
}: MakeNewBoardParams): Board => {
    let i = 0;
    const players = playerNames.map((playerName) => {
        const deckList =
            playerDeckListSelections &&
            playerDeckListSelections[i] === DeckListSelections.MAGES
                ? SAMPLE_DECKLIST_2
                : SAMPLE_DECKLIST_1;
        i += 1;
        return makeNewPlayer(playerName, deckList);
    });

    players[startingPlayerIndex].isActivePlayer = true;
    return {
        chatLog: [],
        gameState: GameState.PLAYING,
        players,
    };
};
