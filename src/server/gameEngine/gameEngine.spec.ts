import { makeNewBoard } from '@/factories/board';
import { makeResourceCard } from '@/factories/cards';
import { Board, GameState } from '@/types/board';
import { GameActionTypes } from '@/types/gameActions';
import { Resource } from '@/types/resources';
import { applyGameAction } from './gameEngine';

describe('Game Action', () => {
    let board: Board;

    beforeEach(() => {
        board = makeNewBoard(['Timmy', 'Tommy', 'Bobby'], 0);
    });

    it('short-circuits if the player is not the active player', () => {
        const newBoardState = applyGameAction({
            board,
            gameAction: { type: GameActionTypes.PASS_TURN },
            playerName: 'Tommy',
        });
        expect(newBoardState).toEqual(board);
    });

    describe('Pass Turn', () => {
        it('passes the turn over to the next player', () => {
            const newBoardState = applyGameAction({
                board,
                gameAction: { type: GameActionTypes.PASS_TURN },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[0].isActivePlayer).toEqual(false);
            expect(newBoardState.players[1].isActivePlayer).toEqual(true);
        });

        it('makes the next player draw a card', () => {
            const cardsInDeckBefore = board.players[1].deck;
            const cardsInHandBefore = board.players[1].hand;
            const newBoardState = applyGameAction({
                board,
                gameAction: { type: GameActionTypes.PASS_TURN },
                playerName: 'Timmy',
            });

            const nextPlayer = newBoardState.players[1];

            expect(nextPlayer.numCardsInDeck).toEqual(
                cardsInDeckBefore.length - 1
            );
            expect(nextPlayer.numCardsInHand).toEqual(
                cardsInHandBefore.length + 1
            );
            expect(nextPlayer.deck).toEqual(
                cardsInDeckBefore.slice(0, cardsInDeckBefore.length - 1)
            );
            expect(nextPlayer.hand).toEqual([
                ...cardsInHandBefore,
                cardsInDeckBefore[cardsInDeckBefore.length - 1],
            ]);
        });

        it('makes the next player lose if there is nothing left to draw', () => {
            board.players[1].deck = [];
            const newBoardState = applyGameAction({
                board,
                gameAction: { type: GameActionTypes.PASS_TURN },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[1].isAlive).toBe(false);
        });

        it('skips to the 3rd player if the 2nd player loses by drawing out', () => {
            board.players[1].deck = [];
            const cardsInDeckBefore = board.players[2].deck;
            const newBoardState = applyGameAction({
                board,
                gameAction: { type: GameActionTypes.PASS_TURN },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[2].numCardsInDeck).toEqual(
                cardsInDeckBefore.length - 1
            );
        });

        it('ends the game if everyone draws out (except for the current player)', () => {
            board.players[1].deck = [];
            board.players[2].deck = [];
            const newBoardState = applyGameAction({
                board,
                gameAction: { type: GameActionTypes.PASS_TURN },
                playerName: 'Timmy',
            });
            expect(newBoardState.gameState).toBe(GameState.WIN);
        });

        it('lets the next player deploy a new resource', () => {
            board.players[1].resourcesLeftToDeploy = 0;
            const newBoardState = applyGameAction({
                board,
                gameAction: { type: GameActionTypes.PASS_TURN },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[1].resourcesLeftToDeploy).toBe(1);
        });
    });

    describe('Deploy Resource', () => {
        it('deploys a resource', () => {
            const resourceCard = makeResourceCard(Resource.BAMBOO);
            board.players[0].hand = [resourceCard];
            const newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.DEPLOY_RESOURCE,
                    cardId: resourceCard.id,
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[0].resources).toHaveLength(1);
            expect(newBoardState.players[0].resourcesLeftToDeploy).toBe(0);
        });

        it('limits to 1 per turn', () => {
            const resourceCard = makeResourceCard(Resource.BAMBOO);
            const resourceCard2 = makeResourceCard(Resource.FIRE);
            board.players[0].hand = [resourceCard, resourceCard2];
            let newBoardState = applyGameAction({
                board,
                gameAction: {
                    type: GameActionTypes.DEPLOY_RESOURCE,
                    cardId: resourceCard.id,
                },
                playerName: 'Timmy',
            });

            newBoardState = applyGameAction({
                board: newBoardState,
                gameAction: {
                    type: GameActionTypes.DEPLOY_RESOURCE,
                    cardId: resourceCard2.id,
                },
                playerName: 'Timmy',
            });
            expect(newBoardState.players[0].resources).toHaveLength(1);
            expect(newBoardState.players[0].resourcesLeftToDeploy).toBe(0);
        });
    });
});
