import { Socket, io } from 'socket.io-client';

import { store, AppDispatch, RootState } from '@/client/redux/store';
import { makeNewBoard } from '@/factories/board';
import { makeCard } from '@/factories/cards';
import { ClientToServerEvents, ServerToClientEvents } from '@/types';
import { GameActionTypes } from '@/types/gameActions';
import { UnitCards } from '@/cardDb/units';
import { performAttack } from '@/client/redux/clientSideGameExtras';
import { handleClickOnPlayer } from './handleClickPlayer';

describe('handle click on player', () => {
    let dispatch: AppDispatch;
    let state: RootState;
    let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

    beforeEach(() => {
        dispatch = jest.fn();
        socket = io();
        socket.emit = jest.fn();
        state = store.getState();
        state.user = {
            id: 'MltecQjEx2YGDNo_AAAH',
            isDisconnected: false,
            name: 'Cleopatra',
        };
        state.board = makeNewBoard(['Cleopatra', 'Marc Antony'], 0);
    });

    describe('Perform attack', () => {
        it('performs an attack with a unit', () => {
            const unitCard = makeCard(UnitCards.LANCER);
            unitCard.numAttacksLeft = 1;
            state.board.players[0].units.push(unitCard);
            state.clientSideGameExtras = { attackingUnit: unitCard.id };

            handleClickOnPlayer({
                player: state.board.players[1],
                dispatch,
                state,
                socket,
            });

            expect(dispatch).toHaveBeenCalledWith(performAttack());
            expect(socket.emit).toHaveBeenCalledWith('takeGameAction', {
                type: GameActionTypes.PERFORM_ATTACK,
                cardId: unitCard.id,
                playerTarget: 'Marc Antony',
            });
        });
    });
});
