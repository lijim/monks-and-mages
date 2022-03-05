import { makeNewBoard } from '@/factories/board';
import { getSelfPlayer, getOtherPlayers, isUserInitialized } from './selectors';

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
});
