import { FIRE_MAGES_DECKLIST } from '@/constants/deckLists';
import {
    DRAFT_PACKS_BY_PLAYER_COUNT,
    DRAFT_PILE_QUANTITY,
    DRAFT_PILE_STARTING_SIZE,
    PlayerConstants,
} from '@/constants/gameConstants';
import { DeckListSelections } from '@/constants/lobbyConstants';
import { Skeleton } from '@/types/cards';
import { makeDeck } from '../deck';
import { makeNewBoard } from './makeNewBoard';
import { Format } from '@/types/games';

describe('Make New Board', () => {
    it('makes a new board with players', () => {
        const board = makeNewBoard({ playerNames: ['Hal', 'Orin'] });
        expect(board.players[0].name).toEqual('Hal');
        expect(board.players[0].health).toEqual(
            PlayerConstants.STARTING_HEALTH
        );
        expect(board.players[1].name).toEqual('Orin');
        expect(board.players[1].health).toEqual(
            PlayerConstants.STARTING_HEALTH
        );
    });

    it('makes a new board with avatars', () => {
        const board = makeNewBoard({
            playerNames: ['Hal', 'Orin'],
            avatarsForPlayers: {
                Hal: 'example.com/halgif1',
            },
        });
        expect(board.players[0].avatar).toEqual('example.com/halgif1');
        expect(board.players[1].avatar).toEqual('');
    });

    it('makes a new board with preferred starting decks', () => {
        const board = makeNewBoard({
            playerNames: ['Hal', 'Orin'],
            playerDeckListSelections: [DeckListSelections.MAGES_FIRE],
        });
        expect(
            [...board.players[0].deck, ...board.players[0].hand]
                .map((card) => card.name)
                .sort()
        ).toEqual(
            makeDeck(FIRE_MAGES_DECKLIST)
                .map((card) => card.name)
                .sort()
        );
    });

    it('makes a random player the starting player', () => {
        const board = makeNewBoard({ playerNames: ['Hal', 'Orin', 'Samus'] });
        expect(
            board.players[0].isActivePlayer ||
                board.players[1].isActivePlayer ||
                board.players[2].isActivePlayer
        ).toEqual(true);
        expect(
            board.players[0].isActivePlayer &&
                board.players[1].isActivePlayer &&
                board.players[2].isActivePlayer
        ).toEqual(false);
    });

    it('makes a board with custom decklists', () => {
        const nameToCustomDeckSkeleton = new Map<string, Skeleton>();
        nameToCustomDeckSkeleton.set('Hal', {
            mainBoard: [{ card: 'Assassin', quantity: 4 }],
            sideBoard: [],
        });
        const board = makeNewBoard({
            playerNames: ['Hal', 'Orin', 'Samus'],
            nameToCustomDeckSkeleton,
        });
        expect(board.players[0].hand[0].name).toEqual('Assassin');
    });

    it('makes a draft game', () => {
        const board = makeNewBoard({
            playerNames: ['Hal', 'Orin', 'Samus'],
            format: Format.DRAFT,
        });
        expect(board.draftPoolSize).toEqual(
            DRAFT_PACKS_BY_PLAYER_COUNT[3] * 15 -
                DRAFT_PILE_QUANTITY * DRAFT_PILE_STARTING_SIZE
        );
        expect(board.draftPiles).toHaveLength(DRAFT_PILE_QUANTITY);
        expect(board.draftPiles[0]).toHaveLength(DRAFT_PILE_STARTING_SIZE);
    });

    it('makes a sealed game', () => {
        const board = makeNewBoard({
            playerNames: ['Hal', 'Orin', 'Samus'],
            format: Format.SEALED,
        });
        expect(board.players[0].deckBuildingPool).toHaveLength(6 * 15);
    });
});
