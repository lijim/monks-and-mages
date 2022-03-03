import cloneDeep from 'lodash.clonedeep';

import { Board } from '@/types/board';

/**
 * @param board - players, game state, and chat log
 * @param forPlayerName - the player name to not hide information for (e.g. don't hide the player's hand)
 */
export const obscureBoardInfo = (
    board: Board,
    forPlayerName: string
): Board => {
    const obscuredBoard = cloneDeep(board);

    obscuredBoard.players
        .filter((player) => player.name !== forPlayerName)
        .forEach((player) => {
            player.hand = [];
        });

    obscuredBoard.players.forEach((player) => {
        player.deck = [];
    });
    return obscuredBoard;
};
