import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { SavedDeck } from '@/types/deckBuilder';
import { Card, CardType, DeckList, Skeleton } from '@/types/cards';
import { getDeckListFromSkeleton } from '@/transformers/getDeckListFromSkeleton';
import { Format, isFormatConstructed } from '@/types/games';
import { MAX_DUPLICATES_FOR_FORMATS } from '@/transformers';

type DeckBuilderState = {
    currentSavedDeckId: string;
    currentSavedDeckName: string;
    decklist: DeckList;
    format: Format;
    isSavedDeckAltered: boolean;
};

const initialState: DeckBuilderState = {
    currentSavedDeckName: '',
    currentSavedDeckId: '',
    decklist: { mainBoard: [], sideBoard: [] },
    format: Format.STANDARD,
    isSavedDeckAltered: false,
};

export const deckBuilderSlice = createSlice({
    name: 'deckList',
    initialState,
    reducers: {
        chooseFormat(state, action: PayloadAction<Format>) {
            state.format = action.payload;
        },
        chooseSavedDeck(state, action: PayloadAction<SavedDeck>) {
            const { skeleton, name, id } = action.payload;
            state.currentSavedDeckName = name;
            state.currentSavedDeckId = id;

            const { decklist } = getDeckListFromSkeleton(skeleton);
            // if a valid decklist returned - sometimes it will be corrupted
            if (decklist) {
                state.decklist = decklist;
            }
            state.isSavedDeckAltered = false;
        },
        loadDeck(state, action: PayloadAction<Skeleton>) {
            const { decklist, errors } = getDeckListFromSkeleton(
                action.payload
            );
            if (errors.length > 0) {
                throw new Error(errors[0]);
            }

            if (decklist) {
                state.decklist = decklist;
            }
            state.currentSavedDeckName = '';
            state.currentSavedDeckId = '';
            state.isSavedDeckAltered = false;
        },
        saveNewDeck(state, action: PayloadAction<SavedDeck>) {
            const { name, id } = action.payload;
            state.currentSavedDeckName = name;
            state.currentSavedDeckId = id;
            state.isSavedDeckAltered = false;
        },
        saveOldDeck(state, action: PayloadAction<SavedDeck>) {
            const { name, id } = action.payload;
            state.currentSavedDeckName = name;
            state.currentSavedDeckId = id;
            state.isSavedDeckAltered = false;
        },
        addCard(state, action: PayloadAction<Card>) {
            const card = action.payload;
            const isCardNotBasicResource = !(
                card.cardType === CardType.RESOURCE && !card.isAdvanced
            );
            const { decklist } = state;

            const matchingCardSlot = decklist.mainBoard.find(
                (cardSlot) => cardSlot.card.name === card.name
            );
            const isConstructed = isFormatConstructed(state.format);

            // on constructed mode, everything except basic resourcs is capped at 4
            if (
                isConstructed &&
                isCardNotBasicResource &&
                matchingCardSlot &&
                matchingCardSlot.quantity >=
                    MAX_DUPLICATES_FOR_FORMATS[state.format]
            ) {
                return;
            }

            if (matchingCardSlot) {
                matchingCardSlot.quantity += 1;
            } else {
                decklist.mainBoard.push({ card, quantity: 1 });
            }
            state.decklist = decklist;
            if (state.currentSavedDeckName) {
                state.isSavedDeckAltered = true;
            }
        },
        removeCard(state, action: PayloadAction<Card>) {
            const card = action.payload;
            const { decklist } = state;
            const matchingCardSlot = decklist.mainBoard.find(
                (cardSlot) => cardSlot.card.name === card.name
            );

            if (matchingCardSlot) {
                matchingCardSlot.quantity -= 1;
            }
            state.decklist.mainBoard = [
                ...decklist.mainBoard.filter(
                    (cardSlot) => cardSlot.quantity > 0
                ),
            ];
            if (state.currentSavedDeckName) {
                state.isSavedDeckAltered = true;
            }
        },
        clearDeck(state) {
            state.decklist.mainBoard = [];
            if (state.currentSavedDeckName) {
                state.isSavedDeckAltered = true;
            }
        },
    },
});

export const deckBuilderReducer: Reducer<DeckBuilderState> =
    deckBuilderSlice.reducer;

export const {
    chooseFormat,
    chooseSavedDeck,
    loadDeck,
    addCard,
    removeCard,
    clearDeck,
    saveNewDeck,
    saveOldDeck,
} = deckBuilderSlice.actions;
