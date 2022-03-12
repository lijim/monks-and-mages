import { DeckListSelections } from '@/constants/lobbyConstants';
import { Board, GameState } from '@/types/board';
import {
    SAMPLE_DECKLIST_0,
    SAMPLE_DECKLIST_2,
    SAMPLE_DECKLIST_3,
    SAMPLE_DECKLIST_4,
} from '../deck';
import { makeNewPlayer } from '../player';

export type MakeNewBoardParams = {
    playerDeckListSelections?: DeckListSelections[];
    playerNames: string[];
    startingPlayerIndex?: number;
};

const deckListMappings = {
    [DeckListSelections.MONKS]: SAMPLE_DECKLIST_0,
    [DeckListSelections.MAGES_FIRE]: SAMPLE_DECKLIST_2,
    [DeckListSelections.MAGES_WATER]: SAMPLE_DECKLIST_3,
    [DeckListSelections.MAGES_WIND]: SAMPLE_DECKLIST_4,
};

export const makeNewBoard = ({
    playerDeckListSelections,
    playerNames,
    startingPlayerIndex = Math.floor(Math.random() * playerNames.length),
}: MakeNewBoardParams): Board => {
    let i = 0;
    const players = playerNames.map((playerName) => {
        const deckList =
            (playerDeckListSelections?.[i] &&
                deckListMappings[playerDeckListSelections?.[i]]) ||
            SAMPLE_DECKLIST_0;
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
