import shuffle from 'lodash.shuffle';

import { Player } from '@/types/board';
import { DeckList } from '@/types/cards';
import { makeDeck } from '../deck';
import { PlayerConstants } from '@/constants/gameConstants';

type NewPlayerArgs = {
    avatarUrl?: string;
    decklist: DeckList;
    name: string;
};

export const makeNewPlayer = ({
    name,
    decklist,
    avatarUrl = '',
}: NewPlayerArgs): Player => {
    const { STARTING_HAND_SIZE, STARTING_HEALTH } = PlayerConstants;
    const deck = makeDeck(decklist);
    const shuffledDeck = shuffle(deck);
    const activeDeck = shuffledDeck.slice(STARTING_HAND_SIZE);
    const hand = shuffledDeck.slice(0, STARTING_HAND_SIZE);
    return {
        avatar: avatarUrl,
        cemetery: [],
        deck: activeDeck,
        effectQueue: [],
        hand,
        health: STARTING_HEALTH,
        isActivePlayer: false,
        isAlive: true,
        name,
        numCardsInDeck: activeDeck.length,
        numCardsInHand: hand.length,
        readyToStart: false,
        resourcePool: {},
        resources: [],
        resourcesLeftToDeploy: 1,
        units: [],
    };
};
