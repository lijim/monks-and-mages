import { Socket, io } from 'socket.io-client';

import { store, AppDispatch, RootState } from '@/client/redux/store';
import { makeNewBoard } from '@/factories/board';
import { makeCard, makeResourceCard } from '@/factories/cards';
import { Resource } from '@/types/resources';
import { handleClickOnCard } from './handleClickOnCard';
import { ClientToServerEvents, ServerToClientEvents } from '@/types';
import { GameActionTypes } from '@/types/gameActions';
import { UnitCards } from '@/cardDb/units';
import {
    performAttack,
    selectAttackingUnit,
} from '@/client/redux/clientSideGameExtras';

describe('handle click on card', () => {
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

    it('deploys a resource if in hand', () => {
        const resourceCard = makeResourceCard(Resource.CRYSTAL);
        state.board.players[0].hand.push(resourceCard);

        handleClickOnCard({
            cardId: resourceCard.id,
            dispatch,
            state,
            socket,
        });

        expect(socket.emit).toHaveBeenCalledWith('takeGameAction', {
            type: GameActionTypes.DEPLOY_RESOURCE,
            cardId: resourceCard.id,
        });
    });

    it('taps a resource', () => {
        const resourceCard = makeResourceCard(Resource.CRYSTAL);
        state.board.players[0].resources.push(resourceCard);

        handleClickOnCard({
            cardId: resourceCard.id,
            dispatch,
            state,
            socket,
        });

        expect(socket.emit).toHaveBeenCalledWith('takeGameAction', {
            type: GameActionTypes.TAP_RESOURCE,
            cardId: resourceCard.id,
        });
    });

    it('pays for a deployable unit card', () => {
        const unitCard = makeCard(UnitCards.LANCER);
        state.board.players[0].hand.push(unitCard);
        state.board.players[0].resourcePool = { [Resource.IRON]: 1 };

        handleClickOnCard({
            cardId: unitCard.id,
            dispatch,
            state,
            socket,
        });

        expect(socket.emit).toHaveBeenCalledWith('takeGameAction', {
            type: GameActionTypes.DEPLOY_UNIT,
            cardId: unitCard.id,
        });
    });

    it('does not deploy an unit card that is too expensive', () => {
        const unitCard = makeCard(UnitCards.LANCER);
        state.board.players[0].hand.push(unitCard);
        state.board.players[0].resourcePool = { [Resource.BAMBOO]: 1 };

        handleClickOnCard({
            cardId: unitCard.id,
            dispatch,
            state,
            socket,
        });

        expect(socket.emit).toHaveBeenCalledTimes(0);
    });

    describe('Perform attack', () => {
        it('selects a unit to attack with', () => {
            const unitCard = makeCard(UnitCards.LANCER);
            unitCard.numAttacksLeft = 1;
            state.board.players[0].units.push(unitCard);

            handleClickOnCard({
                cardId: unitCard.id,
                dispatch,
                state,
                socket,
            });

            expect(dispatch).toHaveBeenCalledWith(
                selectAttackingUnit(unitCard.id)
            );
        });

        it('performs an attack with a unit', () => {
            const unitCard = makeCard(UnitCards.LANCER);
            const defender = makeCard(UnitCards.INFERNO_SORCEROR);
            unitCard.numAttacksLeft = 1;
            state.board.players[0].units.push(unitCard);
            state.board.players[1].units.push(defender);
            state.clientSideGameExtras = { attackingUnit: unitCard.id };

            handleClickOnCard({
                cardId: defender.id,
                dispatch,
                state,
                socket,
            });

            expect(dispatch).toHaveBeenCalledWith(performAttack());
            expect(socket.emit).toHaveBeenCalledWith('takeGameAction', {
                type: GameActionTypes.PERFORM_ATTACK,
                cardId: unitCard.id,
                unitTarget: defender.id,
            });
        });
    });
});
