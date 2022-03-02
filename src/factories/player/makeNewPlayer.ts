import { Player } from '@/types/board';
import { DeckList } from '@/types/cards';
import { makeDeck } from '../deck';

export const makeNewPlayer = (
    playerName: string,
    decklist: DeckList
): Player => {
    const deck = makeDeck(decklist);
    return {
        cemetery: [],
        deck,
        effectQueue: [],
        hand: [],
        health: 15,
        isActivePlayer: false,
        isAlive: true,
        name: playerName,
        numCardsInDeck: deck.length,
        numCardsInHand: 0,
        resourcePool: {},
        resources: [],
        resourcesLeftToDeploy: 1,
        units: [],
    };
};
