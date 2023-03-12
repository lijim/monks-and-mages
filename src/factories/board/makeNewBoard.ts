import sampleSize from 'lodash.samplesize';
import { MONKS_DECKLIST, SAMPLE_DECKLIST_1 } from '@/constants/deckLists';
import {
    DECKLIST_MAPPINGS,
    DeckListSelections,
} from '@/constants/lobbyConstants';
import { Board, DraftPile, GameState } from '@/types/board';
import { makeNewPlayer } from '../player';
import { Card, Skeleton } from '@/types/cards';
import { getDeckListFromSkeleton } from '@/transformers/getDeckListFromSkeleton/getDeckListFromSkeleton';
import { isDeckValidForFormat } from '@/transformers/isDeckValidForFomat';
import { Format } from '@/types/games';
import { makePack } from '../pack';
import {
    DRAFT_PACKS_BY_PLAYER_COUNT,
    DRAFT_PILE_QUANTITY,
    DRAFT_PILE_STARTING_SIZE,
    SEALED_PACK_QUANTITY,
} from '@/constants/gameConstants';
import shuffle from 'lodash.shuffle';

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
        const player = makeNewPlayer({ name: playerName, decklist, avatarUrl });

        if (format === Format.SEALED) {
            [...Array(SEALED_PACK_QUANTITY)].forEach(() => {
                player.deckBuildingPool = [
                    ...player.deckBuildingPool,
                    ...makePack(),
                ];
            });
        }

        return player;
    });

    players[startingPlayerIndex].isActivePlayer = true;

    let draftPool: Card[] = [];
    const draftPiles: DraftPile[] = [...Array(DRAFT_PILE_QUANTITY)].map(
        () => []
    );

    if (format === Format.DRAFT) {
        const numberOfPacks = DRAFT_PACKS_BY_PLAYER_COUNT[playerNames.length];
        [...Array(numberOfPacks)].forEach(() => {
            draftPool = [...draftPool, ...makePack()];
        });
        draftPool = shuffle(draftPool);

        draftPiles.forEach((pile) => {
            [...Array(DRAFT_PILE_STARTING_SIZE)].forEach(() => {
                pile.push(draftPool.pop());
            });
        });
    }

    return {
        chatLog: [],
        gameState: GameState.PLAYING,
        players,
        startingPlayerIndex,
        format,
        draftPool,
        draftPoolSize: draftPool.length,
        draftPiles,
    };
};
