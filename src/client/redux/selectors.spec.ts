import { UnitCards } from '@/cardDb/units';
import { makeNewBoard } from '@/factories/board';
import { makeCard } from '@/factories/cards';
import { EffectType, TargetTypes } from '@/types/effects';
import {
    getSelfPlayer,
    getOtherPlayers,
    isUserInitialized,
    getAttackingUnit,
    getLastEffect,
    shouldLastEffectFizzle,
} from './selectors';

describe('selectors', () => {
    describe('isUserInitialized', () => {
        it('returns true if the user has a name selected', () => {
            expect(
                isUserInitialized({
                    user: { name: 'Maya the Bishop' },
                })
            ).toBe(true);
        });

        it('returns false if the user has no name yet', () => {
            expect(
                isUserInitialized({
                    user: { name: '' },
                })
            ).toBe(false);
        });
    });

    describe('getSelfPlayer', () => {
        it('returns the player that matches the name', () => {
            const state = {
                user: { name: 'Bruno' },
                board: makeNewBoard(['Bruno', 'Carla']),
            };
            expect(getSelfPlayer(state).name).toBe('Bruno');
        });
    });

    describe('getOtherPlayers', () => {
        it('returns all players for spectators', () => {
            const state = {
                user: { name: 'Bobby' },
                board: makeNewBoard(['Bruno', 'Carla', 'James']),
            };
            expect(getOtherPlayers(state).map((player) => player.name)).toEqual(
                ['Bruno', 'Carla', 'James']
            );
        });

        it('returns in rotating order (in the middle)', () => {
            const state = {
                user: { name: 'Bruno' },
                board: makeNewBoard(['Alex', 'Bruno', 'Carla', 'Dionne']),
            };
            expect(getOtherPlayers(state).map((player) => player.name)).toEqual(
                ['Carla', 'Dionne', 'Alex']
            );
        });

        it('returns in rotating order (first in board order)', () => {
            const state = {
                user: { name: 'Alex' },
                board: makeNewBoard(['Alex', 'Bruno', 'Carla', 'Dionne']),
            };
            expect(getOtherPlayers(state).map((player) => player.name)).toEqual(
                ['Bruno', 'Carla', 'Dionne']
            );
        });

        it('returns in rotating order (last in board order)', () => {
            const state = {
                user: { name: 'Dionne' },
                board: makeNewBoard(['Alex', 'Bruno', 'Carla', 'Dionne']),
            };
            expect(getOtherPlayers(state).map((player) => player.name)).toEqual(
                ['Alex', 'Bruno', 'Carla']
            );
        });
    });

    describe('getLastEffect', () => {
        it("returns the last effect on the player's queue", () => {
            const board = makeNewBoard(['Alex', 'Bruno', 'Carla', 'Dionne']);
            const state = {
                user: { name: 'Alex' },
                board,
            };
            board.players[0].effectQueue.push({
                type: EffectType.DRAW,
                strength: 2,
            });
            board.players[0].effectQueue.push({
                type: EffectType.DRAW,
                strength: 1,
            });
            expect(getLastEffect(state)).toEqual({
                type: EffectType.DRAW,
                strength: 1,
            });
        });
    });

    describe('shouldEffectFizzle', () => {
        it('fizzles effects that target units', () => {
            const board = makeNewBoard(['Alex', 'Bruno', 'Carla', 'Dionne']);
            const state = {
                user: { name: 'Alex' },
                board,
            };

            board.players[0].effectQueue = [
                { type: EffectType.BOUNCE, target: TargetTypes.OPPOSING_UNIT },
            ];
            expect(shouldLastEffectFizzle(state)).toEqual(true);
            board.players[0].effectQueue = [
                { type: EffectType.BOUNCE, target: TargetTypes.UNIT },
            ];
            expect(shouldLastEffectFizzle(state)).toEqual(true);
            board.players[0].effectQueue = [
                { type: EffectType.BOUNCE, target: TargetTypes.OWN_UNIT },
            ];
            expect(shouldLastEffectFizzle(state)).toEqual(true);
        });

        it('does not fizzle effects that target a valid unit', () => {
            const board = makeNewBoard(['Alex', 'Bruno', 'Carla', 'Dionne']);
            // Give each player units so the effects won't fizzle
            board.players.forEach((player) => {
                player.units = [makeCard(UnitCards.CAVALRY_ARCHER)];
            });
            const state = {
                user: { name: 'Alex' },
                board,
            };

            board.players[0].effectQueue = [
                { type: EffectType.BOUNCE, target: TargetTypes.OPPOSING_UNIT },
            ];
            expect(shouldLastEffectFizzle(state)).toEqual(false);
            board.players[0].effectQueue = [
                { type: EffectType.BOUNCE, target: TargetTypes.UNIT },
            ];
            expect(shouldLastEffectFizzle(state)).toEqual(false);
            board.players[0].effectQueue = [
                { type: EffectType.BOUNCE, target: TargetTypes.OWN_UNIT },
            ];
            expect(shouldLastEffectFizzle(state)).toEqual(false);
        });
    });
});
