import sampleSize from 'lodash.samplesize';
import { MONKS_DECKLIST, SAMPLE_DECKLIST_1 } from '@/constants/deckLists';
import {
    deckListMappings,
    DeckListSelections,
} from '@/constants/lobbyConstants';
import { Board, GameState } from '@/types/board';
import { makeNewPlayer } from '../player';
import { Skeleton } from '@/types/cards';
import { getDeckListFromSkeleton } from '@/transformers/getDeckListFromSkeleton/getDeckListFromSkeleton';
import { isDeckValidForFormat } from '@/transformers/isDeckValidForFomat';

export type MakeNewBoardParams = {
    nameToCustomDeckSkeleton?: Map<string, Skeleton>;
    playerDeckListSelections?: DeckListSelections[];
    playerNames: string[];
    startingPlayerIndex?: number;
    avatarsForPlayers?: Record<string, string>; // player name to avatar mapping
};

export const makeNewBoard = ({
    nameToCustomDeckSkeleton,
    playerDeckListSelections,
    playerNames,
    startingPlayerIndex = Math.floor(Math.random() * playerNames.length),
    avatarsForPlayers = {},
}: MakeNewBoardParams): Board => {
    let i = 0;
    const players = playerNames.map((playerName) => {
        const skeleton = nameToCustomDeckSkeleton?.get(playerName);
        if (skeleton) {
            const { decklist } = getDeckListFromSkeleton(skeleton);
            if (isDeckValidForFormat(decklist)) {
                return makeNewPlayer({ name: playerName, decklist });
            }
        }

        const selection = playerDeckListSelections?.[i];
        let decklist =
            (selection && deckListMappings[selection]) || MONKS_DECKLIST;
        if (selection === DeckListSelections.RANDOM) {
            [decklist] = sampleSize(
                Object.values(deckListMappings).filter(
                    (deck) => deck !== SAMPLE_DECKLIST_1
                ),
                1
            );
        }
        i += 1;
        return makeNewPlayer({ name: playerName, decklist });
    });

    players[startingPlayerIndex].isActivePlayer = true;
    return {
        chatLog: [],
        gameState: GameState.PLAYING,
        players,
        startingPlayerIndex,
    };
};
