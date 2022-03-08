import shuffle from 'lodash.shuffle';

import { Player } from '@/types/board';
import { DeckList } from '@/types/cards';
import { makeDeck } from '../deck';
import { PlayerConstants } from '@/constants/gameConstants';

export const makeNewPlayer = (
    playerName: string,
    decklist: DeckList
): Player => {
    const deck = makeDeck(decklist);
    const shuffledDeck = shuffle(deck);
    const activeDeck = shuffledDeck.slice(7);
    const hand = shuffledDeck.slice(0, 7);
    return {
        cemetery: [],
        deck: activeDeck,
        effectQueue: [],
        hand,
        health: PlayerConstants.STARTING_HEALTH,
        isActivePlayer: false,
        isAlive: true,
        name: playerName,
        numCardsInDeck: activeDeck.length,
        numCardsInHand: hand.length,
        resourcePool: {},
        resources: [],
        resourcesLeftToDeploy: 1,
        units: [],
    };
};
