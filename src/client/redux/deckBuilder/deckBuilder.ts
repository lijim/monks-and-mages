import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { SavedDeck } from '@/types/deckBuilder';
import { Card, CardType, DeckList, Skeleton } from '@/types/cards';
import { getDeckListFromSkeleton } from '@/transformers/getDeckListFromSkeleton';
import { Format, isFormatConstructed } from '@/types/games';

type DeckBuilderState = {
    currentSavedDeckId: string;
    currentSavedDeckName: string;
    decklist: DeckList;
    format: Format;
};

const initialState: DeckBuilderState = {
    currentSavedDeckName: '',
    currentSavedDeckId: '',
    decklist: [],
    format: Format.STANDARD,
};

export const deckBuilderSlice = createSlice({
    name: 'deckList',
    initialState,
    reducers: {
        chooseSavedDeck(state, action: PayloadAction<SavedDeck>) {
            const { skeleton, name, id } = action.payload;
            state.currentSavedDeckName = name;
            state.currentSavedDeckId = id;

            const { decklist } = getDeckListFromSkeleton(skeleton);
            // if a valid decklist returned - sometimes it will be corrupted
            if (decklist) {
                state.decklist = decklist;
            }
        },
        loadDeck(state, action: PayloadAction<Skeleton>) {
            const { decklist } = getDeckListFromSkeleton(action.payload);

            if (decklist) {
                state.decklist = decklist;
            }
        },
        addCard(state, action: PayloadAction<Card>) {
            const card = action.payload;
            const isCardNotBasicResource = !(
                card.cardType === CardType.RESOURCE && !card.isAdvanced
            );
            const { decklist } = state;

            const matchingCardSlot = decklist.find(
                (cardSlot) => cardSlot.card.name === card.name
            );
            const isConstructed = isFormatConstructed(state.format);

            // on constructed mode, everything except basic resourcs is capped at 4
            if (
                isConstructed &&
                isCardNotBasicResource &&
                matchingCardSlot &&
                matchingCardSlot.quantity >= 4
            ) {
                return;
            }

            if (matchingCardSlot) {
                matchingCardSlot.quantity += 1;
            } else {
                decklist.push({ card, quantity: 1 });
            }
            state.decklist = decklist;
        },
        removeCard(state, action: PayloadAction<Card>) {
            const card = action.payload;
            const { decklist } = state;
            const matchingCardSlot = decklist.find(
                (cardSlot) => cardSlot.card.name === card.name
            );

            if (matchingCardSlot) {
                matchingCardSlot.quantity -= 1;
            }
            state.decklist = [
                ...decklist.filter((cardSlot) => cardSlot.quantity > 0),
            ];
        },
        clearDeck(state) {
            state.decklist = [];
        },
    },
});

export const deckBuilderReducer: Reducer<DeckBuilderState> =
    deckBuilderSlice.reducer;

export const { chooseSavedDeck, loadDeck, addCard, removeCard, clearDeck } =
    deckBuilderSlice.actions;
