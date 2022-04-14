import sampleSize from 'lodash.samplesize';
import { SAMPLE_DECKLIST_0, SAMPLE_DECKLIST_1 } from '@/constants/deckLists';
import {
    deckListMappings,
    DeckListSelections,
} from '@/constants/lobbyConstants';
import { Board, GameState } from '@/types/board';
import { makeNewPlayer } from '../player';
import { Skeleton } from '@/types/cards';
import { getDeckListFromSkeleton } from '@/transformers/getDeckListFromSkeleton/getDeckListFromSkeleton';

export type MakeNewBoardParams = {
    nameToCustomDeckSkeleton?: Map<string, Skeleton>;
    playerDeckListSelections?: DeckListSelections[];
    playerNames: string[];
    startingPlayerIndex?: number;
};

export const makeNewBoard = ({
    nameToCustomDeckSkeleton,
    playerDeckListSelections,
    playerNames,
    startingPlayerIndex = Math.floor(Math.random() * playerNames.length),
}: MakeNewBoardParams): Board => {
    let i = 0;
    const players = playerNames.map((playerName) => {
        const skeleton = nameToCustomDeckSkeleton?.get(playerName);
        if (skeleton) {
            return makeNewPlayer(
                playerName,
                getDeckListFromSkeleton(skeleton).decklist
            );
        }

        const selection = playerDeckListSelections?.[i];
        let deckList =
            (selection && deckListMappings[selection]) || SAMPLE_DECKLIST_0;
        if (selection === DeckListSelections.RANDOM) {
            [deckList] = sampleSize(
                Object.values(deckListMappings).filter(
                    (deck) => deck !== SAMPLE_DECKLIST_1
                ),
                1
            );
        }
        i += 1;
        return makeNewPlayer(playerName, deckList);
    });

    players[startingPlayerIndex].isActivePlayer = true;
    return {
        chatLog: [],
        gameState: GameState.PLAYING,
        players,
        startingPlayerIndex,
    };
};
