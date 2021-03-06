import { Socket, io } from 'socket.io-client';

import { store, AppDispatch, RootState } from '@/client/redux/store';
import { makeNewBoard } from '@/factories/board';
import { makeCard, makeResourceCard } from '@/factories/cards';
import { Resource } from '@/types/resources';
import { handleClickOnCard } from './handleClickOnCard';
import { ClientToServerEvents, ServerToClientEvents } from '@/types';
import { GameActionTypes } from '@/types/gameActions';
import { UnitCards } from '@/mocks/units';
import {
    cancelAttackingUnit,
    performAttack,
    selectAttackingUnit,
} from '@/client/redux/clientSideGameExtras';
import { SpellCards } from '@/mocks/spells';
import { GameState } from '@/types/board';
import { playAudio } from '@/audioHelpers/playAudio';
import { Sounds } from '@/constants/sounds';

jest.mock('@/audioHelpers/playAudio', () => ({
    __esModule: true,
    default: 'mockedDefaultExport',
    playAudio: jest.fn(),
}));

describe('handle click on card', () => {
    let dispatch: AppDispatch;
    let state: RootState;
    let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

    beforeEach((done) => {
        jest.clearAllMocks();
        dispatch = jest.fn();
        socket = io();
        socket.emit = jest.fn();
        state = store.getState();
        state.user = {
            id: 'MltecQjEx2YGDNo_AAAH',
            isDisconnected: false,
            name: 'Cleopatra',
        };
        state.board = makeNewBoard({
            playerNames: ['Cleopatra', 'Marc Antony'],
            startingPlayerIndex: 0,
        });
        state.board.gameState = GameState.PLAYING;
        done();
    });

    afterEach((done) => {
        socket.close();
        done();
    });

    it('does nothing for mulligan phase', () => {
        state.board.gameState = GameState.MULLIGANING;
        const resourceCard = makeResourceCard(Resource.CRYSTAL);
        state.board.players[0].hand.push(resourceCard);

        handleClickOnCard({
            cardId: resourceCard.id,
            dispatch,
            state,
            socket,
        });

        expect(socket.emit).not.toHaveBeenCalled();
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

    describe('Spells', () => {
        it('casts a spell', () => {
            const spellCard = makeCard(SpellCards.EMBER_SPEAR);
            state.board.players[0].hand.push(spellCard);
            state.board.players[0].resourcePool = { [Resource.FIRE]: 1 };

            handleClickOnCard({
                cardId: spellCard.id,
                dispatch,
                state,
                socket,
            });

            expect(socket.emit).toHaveBeenCalledWith('takeGameAction', {
                type: GameActionTypes.CAST_SPELL,
                cardId: spellCard.id,
            });
        });

        it('cancels attacks while spellcasting', () => {
            const spellCard = makeCard(SpellCards.EMBER_SPEAR);
            state.board.players[0].hand.push(spellCard);
            state.board.players[0].resourcePool = { [Resource.FIRE]: 1 };

            handleClickOnCard({
                cardId: spellCard.id,
                dispatch,
                state,
                socket,
            });

            expect(dispatch).toHaveBeenCalledWith(cancelAttackingUnit());
        });
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

        it('plays a sound', () => {
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

            expect(playAudio).toHaveBeenCalledWith(Sounds.ATTACK);
        });
    });

    describe('Effects resolutions', () => {
        it('blocks clicking on a card if an effect is in play', () => {
            const resourceCard = makeResourceCard(Resource.BAMBOO);
            const spellCard = makeCard(SpellCards.A_GENTLE_GUST);
            state.board.players[0].hand = [resourceCard];
            state.board.players[0].effectQueue = spellCard.effects;

            handleClickOnCard({
                cardId: resourceCard.id,
                dispatch,
                state,
                socket,
            });

            expect(socket.emit).toHaveBeenCalledTimes(0);
        });

        it('emits an effects resolution if clicking on a unit card', () => {
            const unitCard = makeCard(UnitCards.LANCER);
            const spellCard = makeCard(SpellCards.EMBER_SPEAR);
            state.board.players[0].units = [unitCard];
            state.board.players[0].effectQueue = spellCard.effects;

            handleClickOnCard({
                cardId: unitCard.id,
                dispatch,
                state,
                socket,
            });

            expect(socket.emit).toHaveBeenCalledWith('resolveEffect', {
                effect: spellCard.effects[0],
                unitCardIds: [unitCard.id],
            });
        });

        it('emits no effects resolution if clicking on a wrong target (enemy units)', () => {
            const unitCard = makeCard(UnitCards.LANCER);
            // Lightning slick can only target opposing units
            const spellCard = makeCard(SpellCards.LIGHTNING_SLICK);
            state.board.players[0].units = [unitCard];
            state.board.players[0].effectQueue = spellCard.effects;

            handleClickOnCard({
                cardId: unitCard.id,
                dispatch,
                state,
                socket,
            });

            expect(socket.emit).toHaveBeenCalledTimes(0);
        });

        it('emits an effects resolution if clicking on a proper target (enemy units)', () => {
            const unitCard = makeCard(UnitCards.LANCER);
            // Lightning slick can only target opposing units
            const spellCard = makeCard(SpellCards.LIGHTNING_SLICK);
            state.board.players[1].units = [unitCard];
            state.board.players[0].effectQueue = spellCard.effects;

            handleClickOnCard({
                cardId: unitCard.id,
                dispatch,
                state,
                socket,
            });

            expect(socket.emit).toHaveBeenCalledWith('resolveEffect', {
                effect: spellCard.effects[0],
                unitCardIds: [unitCard.id],
            });
        });
    });
});
