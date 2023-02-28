import { DeckList, Skeleton } from '@/types/cards';
import { RootState } from '../store';
import { getSkeletonFromDeckList } from '@/transformers/getSkeletonFromDeckList';

export const getCurrentSavedDeckName = (state: Partial<RootState>): string =>
    state.deckBuilder.currentSavedDeckName;

export const getCurrentSavedDeckId = (state: Partial<RootState>): string =>
    state.deckBuilder.currentSavedDeckId;

export const getDeckList = (state: Partial<RootState>): DeckList =>
    state.deckBuilder.decklist;

export const getSkeleton = (state: Partial<RootState>): Skeleton =>
    getSkeletonFromDeckList(state.deckBuilder.decklist);

export const getIsSavedDeckAltered = (state: Partial<RootState>): boolean =>
    state.deckBuilder.isSavedDeckAltered;
