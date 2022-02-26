import { isUserInitialized } from './selectors';

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
            ).toBe(true);
        });
    });
});
