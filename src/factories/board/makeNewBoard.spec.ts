import { makeNewBoard } from './makeNewBoard';

describe('Make New Board', () => {
    it('makes a new board with players', () => {
        const board = makeNewBoard(['Hal', 'Orin']);
        expect(board.players[0].name).toEqual('Hal');
        expect(board.players[0].health).toEqual(15);
        expect(board.players[1].name).toEqual('Orin');
        expect(board.players[1].health).toEqual(15);
    });

    it('makes a random player the starting player', () => {
        const board = makeNewBoard(['Hal', 'Orin', 'Samus']);
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
