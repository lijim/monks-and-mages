import cloneDeep from 'lodash.clonedeep';

import { Board, GameState, Player } from '@/types/board';
import { GameAction, GameActionTypes } from '@/types/gameActions';

const getNextPlayer = (board: Board): Player => {
    const { players } = board;
    const activePlayer = players.find((player) => player.isActivePlayer);
    const activePlayerIndex = players.findIndex(
        (player) => player.isActivePlayer
    );
    for (
        let index = activePlayerIndex + 1;
        index < activePlayerIndex + players.length;
        index += 1
    ) {
        const nextPlayer = players[index % players.length];
        if (nextPlayer.isAlive) {
            return nextPlayer;
        }
    }
    return activePlayer;
};

const applyWinState = (board: Board): Board => {
    const { players } = board;
    if (players.filter((player) => player.isAlive).length === 1) {
        board.gameState = GameState.WIN;
    }
    if (players.filter((player) => player.isAlive).length === 0) {
        board.gameState = GameState.TIE;
    }
    return board;
};

type ApplyGameActionParams = {
    board: Board;
    gameAction: GameAction;
    playerName: string; // player name taking the action
};
export const applyGameAction = ({
    board,
    gameAction,
    playerName,
}: ApplyGameActionParams): Board => {
    const clonedBoard = cloneDeep(board);
    const { players } = clonedBoard;
    let activePlayer = players.find((player) => player.isActivePlayer);

    // Error out when event is being emitted by the non-active player
    if (activePlayer?.name !== playerName) {
        return board; // TODO: implement error UI
    }

    switch (gameAction.type) {
        case GameActionTypes.PASS_TURN: {
            // tries to loop through all players, in case one draws out of their deck
            // and loses the game
            for (let i = 0; i < players.length; i += 1) {
                const nextPlayer = getNextPlayer(clonedBoard);
                activePlayer.isActivePlayer = false;
                nextPlayer.isActivePlayer = true;

                // If you draw out of the deck, you lose the game
                if (nextPlayer.deck.length === 0) {
                    nextPlayer.isAlive = false;
                    applyWinState(clonedBoard);
                    if (board.gameState !== GameState.PLAYING)
                        return clonedBoard;
                    activePlayer = nextPlayer;
                } else {
                    nextPlayer.numCardsInDeck -= 1;
                    nextPlayer.numCardsInHand += 1;
                    nextPlayer.hand.push(nextPlayer.deck.pop());
                    return clonedBoard;
                }
            }

            return clonedBoard;
        }
        default:
            return board;
    }
};
