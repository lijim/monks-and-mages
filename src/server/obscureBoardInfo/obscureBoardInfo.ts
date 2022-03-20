import cloneDeep from 'lodash.clonedeep';

import { Board } from '@/types/board';

/**
 * @param board - players, game state, and chat log
 * @param forPlayerName - the player name to not hide information for (e.g. don't hide the player's hand)
 */
export const obscureBoardInfo = (
    board: Board,
    forPlayerName?: string
): Board => {
    const obscuredBoard = cloneDeep(board);

    obscuredBoard.players.forEach((player) => {
        player.numCardsInHand = player.hand.length;
        player.numCardsInDeck = player.deck.length;
        player.deck = [];
    });

    obscuredBoard.players
        .filter((player) => player.name !== forPlayerName)
        .forEach((player) => {
            player.hand = [];
        });

    return obscuredBoard;
};
