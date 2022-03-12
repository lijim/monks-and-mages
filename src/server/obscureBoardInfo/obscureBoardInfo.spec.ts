import { PlayerConstants } from '@/constants/gameConstants';
import { makeNewBoard } from '@/factories/board';
import { obscureBoardInfo } from './obscureBoardInfo';

describe('Obscure board info', () => {
    it('provides hints as to the number of cards in hand / deck', () => {
        const board = makeNewBoard({ playerNames: ['Timmy', 'Tommy'] });
        const boardTommySees = obscureBoardInfo(board, 'Tommy');
        const timmy = boardTommySees.players.find(
            (player) => player.name === 'Timmy'
        );
        const tommy = boardTommySees.players.find(
            (player) => player.name === 'Tommy'
        );
        expect(timmy.numCardsInDeck).not.toEqual(0);
        expect(tommy.numCardsInDeck).not.toEqual(0);
        expect(timmy.numCardsInHand).toEqual(
            PlayerConstants.STARTING_HAND_SIZE
        );
        expect(tommy.numCardsInHand).toEqual(
            PlayerConstants.STARTING_HAND_SIZE
        );
    });

    it("hides other players' hands", () => {
        const board = makeNewBoard({ playerNames: ['Timmy', 'Tommy'] });
        const boardTommySees = obscureBoardInfo(board, 'Tommy');
        expect(
            boardTommySees.players.find((player) => player.name === 'Timmy')
                .hand
        ).toEqual([]);
    });

    it('does not hide your own hand', () => {
        const board = makeNewBoard({ playerNames: ['Timmy', 'Tommy'] });
        const boardTommySees = obscureBoardInfo(board, 'Tommy');
        expect(
            boardTommySees.players.find((player) => player.name === 'Tommy')
                .hand
        ).not.toEqual([]);
    });

    it('hides decks', () => {
        const board = makeNewBoard({ playerNames: ['Timmy', 'Tommy'] });
        const boardTommySees = obscureBoardInfo(board, 'Tommy');
        expect(
            boardTommySees.players.find((player) => player.name === 'Tommy')
                .deck
        ).toEqual([]);

        expect(
            boardTommySees.players.find((player) => player.name === 'Timmy')
                .deck
        ).toEqual([]);
    });
});
