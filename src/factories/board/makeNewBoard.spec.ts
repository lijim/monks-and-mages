import { DeckListSelections } from '@/constants/lobbyConstants';
import { makeDeck, SAMPLE_DECKLIST_2 } from '../deck';
import { makeNewBoard } from './makeNewBoard';

describe('Make New Board', () => {
    it('makes a new board with players', () => {
        const board = makeNewBoard({ playerNames: ['Hal', 'Orin'] });
        expect(board.players[0].name).toEqual('Hal');
        expect(board.players[0].health).toEqual(15);
        expect(board.players[1].name).toEqual('Orin');
        expect(board.players[1].health).toEqual(15);
    });

    it('makes a new board with preferred starting decks', () => {
        const board = makeNewBoard({
            playerNames: ['Hal', 'Orin'],
            playerDeckListSelections: [DeckListSelections.MAGES],
        });
        expect(
            [...board.players[0].deck, ...board.players[0].hand]
                .map((card) => card.name)
                .sort()
        ).toEqual(
            makeDeck(SAMPLE_DECKLIST_2)
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

    it.todo('caps at 4 players and makes everyone else a spectator');
});
