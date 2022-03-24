import { GameState } from '@/types/board';
import { makeNewBoard } from '../board';
import { calculateGameResult } from './calculateGameResult';

describe('calculateGameResult', () => {
    it('returns null if the game was already over', () => {
        const board = makeNewBoard({ playerNames: ['Jojo', 'Britney'] });
        board.gameState = GameState.WIN;
        const result = calculateGameResult(GameState.WIN, board);
        expect(result).toBeNull();
    });

    it('returns null if the game was won off a disconnect during mulligan phase', () => {
        const board = makeNewBoard({ playerNames: ['Jojo', 'Britney'] });
        board.gameState = GameState.WIN;
        const result = calculateGameResult(GameState.MULLIGANING, board);
        expect(result).toBeNull();
    });

    it('returns null if the game has not been won or tied yet', () => {
        const board = makeNewBoard({ playerNames: ['Jojo', 'Britney'] });
        board.gameState = GameState.PLAYING;
        const result = calculateGameResult(GameState.PLAYING, board);
        expect(result).toBeNull();
    });

    it('returns winners when the game is won', () => {
        const board = makeNewBoard({ playerNames: ['Jojo', 'Britney'] });
        board.gameState = GameState.WIN;
        board.players[0].isAlive = false;
        const result = calculateGameResult(GameState.PLAYING, board);
        expect(result).toEqual(
            expect.objectContaining({
                nonWinners: ['Jojo'],
                result: 'WIN',
                winners: ['Britney'],
            })
        );
    });

    it('returns a tie', () => {
        const board = makeNewBoard({ playerNames: ['Jojo', 'Britney'] });
        board.gameState = GameState.TIE;
        board.players[0].isAlive = false;
        board.players[1].isAlive = false;
        const result = calculateGameResult(GameState.PLAYING, board);
        expect(result).toEqual(
            expect.objectContaining({
                nonWinners: ['Jojo', 'Britney'],
                result: 'TIE',
                winners: [],
            })
        );
    });
});
