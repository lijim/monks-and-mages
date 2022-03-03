import { makeNewBoard } from '@/factories/board';
import { obscureBoardInfo } from './obscureBoardInfo';

describe('Obscure board info', () => {
    it("hides other players' hands", () => {
        const board = makeNewBoard(['Timmy', 'Tom']);
        const boardTommySees = obscureBoardInfo(board, 'Tom');
        expect(
            boardTommySees.players.find((player) => player.name === 'Timmy')
                .hand
        ).toEqual([]);
    });

    it('does not hide your own hand', () => {
        const board = makeNewBoard(['Timmy', 'Tom']);
        const boardTommySees = obscureBoardInfo(board, 'Tom');
        expect(
            boardTommySees.players.find((player) => player.name === 'Tom').hand
        ).not.toEqual([]);
    });

    it('hides decks', () => {
        const board = makeNewBoard(['Timmy', 'Tom']);
        const boardTommySees = obscureBoardInfo(board, 'Tom');
        expect(
            boardTommySees.players.find((player) => player.name === 'Tom').deck
        ).toEqual([]);

        expect(
            boardTommySees.players.find((player) => player.name === 'Timmy')
                .deck
        ).toEqual([]);
    });
});
