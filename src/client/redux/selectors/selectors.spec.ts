import { UnitCards } from '@/cardDb/units';
import { makeNewBoard } from '@/factories/board';
import { makeCard } from '@/factories/cards';
import { GameState } from '@/types/board';
import { EffectType, TargetTypes } from '@/types/effects';
import {
    getSelfPlayer,
    getOtherPlayers,
    isUserInitialized,
    getAttackingUnit,
    getLastEffect,
    shouldLastEffectFizzle,
    getLastEffectForActivePlayer,
    isBoardInteractable,
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

    describe('getAttackingUnit', () => {
        it('returns the id of the attacking unit, if any', () => {
            const state = {
                clientSideGameExtras: {
                    attackingUnit: 'a13f2-a2-4nm',
                },
            };
            expect(getAttackingUnit(state)).toBe('a13f2-a2-4nm');
        });
    });

    describe('getSelfPlayer', () => {
        it('returns the player that matches the name', () => {
            const state = {
                user: { name: 'Bruno' },
                board: makeNewBoard({ playerNames: ['Bruno', 'Carla'] }),
            };
            expect(getSelfPlayer(state).name).toBe('Bruno');
        });
    });

    describe('getOtherPlayers', () => {
        it('returns all players for spectators', () => {
            const state = {
                user: { name: 'Bobby' },
                board: makeNewBoard({
                    playerNames: ['Bruno', 'Carla', 'James'],
                }),
            };
            expect(getOtherPlayers(state).map((player) => player.name)).toEqual(
                ['Bruno', 'Carla', 'James']
            );
        });

        it('returns in rotating order (in the middle)', () => {
            const state = {
                user: { name: 'Bruno' },
                board: makeNewBoard({
                    playerNames: ['Alex', 'Bruno', 'Carla', 'Dionne'],
                }),
            };
            expect(getOtherPlayers(state).map((player) => player.name)).toEqual(
                ['Carla', 'Dionne', 'Alex']
            );
        });

        it('returns in rotating order (first in board order)', () => {
            const state = {
                user: { name: 'Alex' },
                board: makeNewBoard({
                    playerNames: ['Alex', 'Bruno', 'Carla', 'Dionne'],
                }),
            };
            expect(getOtherPlayers(state).map((player) => player.name)).toEqual(
                ['Bruno', 'Carla', 'Dionne']
            );
        });

        it('returns in rotating order (last in board order)', () => {
            const state = {
                user: { name: 'Dionne' },
                board: makeNewBoard({
                    playerNames: ['Alex', 'Bruno', 'Carla', 'Dionne'],
                }),
            };
            expect(getOtherPlayers(state).map((player) => player.name)).toEqual(
                ['Alex', 'Bruno', 'Carla']
            );
        });
    });

    describe('getLastEffect', () => {
        it("returns the last effect on the player's queue", () => {
            const board = makeNewBoard({
                playerNames: ['Alex', 'Bruno', 'Carla', 'Dionne'],
            });
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

    describe('getLastEffect', () => {
        it("returns the last effect on the player's queue", () => {
            const board = makeNewBoard({
                playerNames: ['Alex', 'Bruno', 'Carla', 'Dionne'],
                startingPlayerIndex: 0,
            });
            const state = {
                user: { name: 'Bruno' },
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
            expect(getLastEffectForActivePlayer(state)).toEqual({
                type: EffectType.DRAW,
                strength: 1,
            });
        });
    });

    describe('shouldEffectFizzle', () => {
        it('fizzles effects that target units', () => {
            const board = makeNewBoard({
                playerNames: ['Alex', 'Bruno', 'Carla', 'Dionne'],
            });
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
            const board = makeNewBoard({
                playerNames: ['Alex', 'Bruno', 'Carla', 'Dionne'],
            });
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

    describe('isBoardInteractable', () => {
        it('returns true for when players are actively alive and playing', () => {
            const board = makeNewBoard({
                playerNames: ['Alex', 'Bruno', 'Carla', 'Dionne'],
                startingPlayerIndex: 0,
            });
            const state = {
                user: { name: 'Alex' },
                board,
            };
            expect(isBoardInteractable(state)).toEqual(true);
        });

        it('returns false for when players are not the active player', () => {
            const board = makeNewBoard({
                playerNames: ['Alex', 'Bruno', 'Carla', 'Dionne'],
                startingPlayerIndex: 1,
            });
            const state = {
                user: { name: 'Alex' },
                board,
            };
            expect(isBoardInteractable(state)).toEqual(false);
        });

        it('returns false for when players are not alive', () => {
            const board = makeNewBoard({
                playerNames: ['Alex', 'Bruno', 'Carla', 'Dionne'],
                startingPlayerIndex: 0,
            });
            const state = {
                user: { name: 'Alex' },
                board,
            };
            board.players[0].isAlive = false;
            expect(isBoardInteractable(state)).toEqual(false);
        });

        it('returns false for when the game has not begun', () => {
            const board = makeNewBoard({
                playerNames: ['Alex', 'Bruno', 'Carla', 'Dionne'],
                startingPlayerIndex: 0,
            });
            const state = {
                user: { name: 'Alex' },
                board,
            };
            board.gameState = GameState.MULLIGANING;
            expect(isBoardInteractable(state)).toEqual(false);
        });

        it('returns false for when the game is over', () => {
            const board = makeNewBoard({
                playerNames: ['Alex', 'Bruno', 'Carla', 'Dionne'],
                startingPlayerIndex: 0,
            });
            board.gameState = GameState.TIE;
            const state = {
                user: { name: 'Alex' },
                board,
            };
            expect(isBoardInteractable(state)).toEqual(false);
        });
    });
});
