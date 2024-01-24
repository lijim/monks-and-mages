import { Card, DeckList, Skeleton } from '@/types/cards';
import { RootState } from '../store';
import { getSkeletonFromDeckList } from '@/transformers/getSkeletonFromDeckList';
import { getSelfPlayer } from './selectors';

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

export const getNumberLeft =
    (cardToFind: Card) =>
    (state: Partial<RootState>): number => {
        const self = getSelfPlayer(state);
        if (!self?.deckBuildingPool) {
            return 0;
        }

        const quantityInPool =
            self.deckBuildingPool.filter(
                (card) => card.name === cardToFind.name
            ).length || 0;
        const usedSoFar =
            state.deckBuilder.decklist.mainBoard.find(
                ({ card }) => card.name === cardToFind.name
            )?.quantity || 0;
        const usedSoFarInSideboard =
            state.deckBuilder.decklist.sideBoard.find(
                ({ card }) => card.name === cardToFind.name
            )?.quantity || 0;

        return quantityInPool - usedSoFar - usedSoFarInSideboard;
    };
