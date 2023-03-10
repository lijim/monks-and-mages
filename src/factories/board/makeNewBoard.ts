import sampleSize from 'lodash.samplesize';
import { MONKS_DECKLIST, SAMPLE_DECKLIST_1 } from '@/constants/deckLists';
import {
    DECKLIST_MAPPINGS,
    DeckListSelections,
} from '@/constants/lobbyConstants';
import { Board, GameState } from '@/types/board';
import { makeNewPlayer } from '../player';
import { Skeleton } from '@/types/cards';
import { getDeckListFromSkeleton } from '@/transformers/getDeckListFromSkeleton/getDeckListFromSkeleton';
import { isDeckValidForFormat } from '@/transformers/isDeckValidForFomat';
import { Format } from '@/types/games';

export type MakeNewBoardParams = {
    avatarsForPlayers?: Record<string, string>;
    // player name to avatar mapping
    format?: Format;
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
    avatarsForPlayers = {},
    format = Format.STANDARD,
}: MakeNewBoardParams): Board => {
    const players = playerNames.map((playerName, playerIndex) => {
        const skeleton = nameToCustomDeckSkeleton?.get(playerName);
        if (skeleton) {
            const { decklist } = getDeckListFromSkeleton(skeleton);
            if (isDeckValidForFormat(decklist)) {
                return makeNewPlayer({ name: playerName, decklist });
            }
        }

        const selection = playerDeckListSelections?.[playerIndex];
        let decklist =
            (selection && DECKLIST_MAPPINGS[selection]) || MONKS_DECKLIST;
        if (selection === DeckListSelections.RANDOM) {
            [decklist] = sampleSize(
                Object.values(DECKLIST_MAPPINGS).filter(
                    (deck) => deck !== SAMPLE_DECKLIST_1
                ),
                1
            );
        }
        const avatarUrl = avatarsForPlayers[playerName];
        return makeNewPlayer({ name: playerName, decklist, avatarUrl });
    });

    players[startingPlayerIndex].isActivePlayer = true;
    return {
        chatLog: [],
        gameState: GameState.PLAYING,
        players,
        startingPlayerIndex,
        format,
    };
};
