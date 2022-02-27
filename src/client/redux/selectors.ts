import { RootState } from './store';

export const isUserInitialized = (state: Partial<RootState>): boolean =>
    !!state.user.name;
