import shuffle from 'lodash.shuffle';

import { Player } from '@/types/board';
import { DeckList, UnitCard } from '@/types/cards';
import { makeDeck } from '../deck';
import { PlayerConstants } from '@/constants/gameConstants';
import { Format } from '@/types/games';
import { isCardLegendary } from '@/transformers';

type NewPlayerArgs = {
    avatarUrl?: string;
    decklist: DeckList;
    format?: Format;
    name: string;
};

export const makeNewPlayer = ({
    name,
    decklist,
    avatarUrl = '',
    format = Format.STANDARD,
}: NewPlayerArgs): Player => {
    const { STARTING_HAND_SIZE, STARTING_HEALTH } = PlayerConstants;
    const isLegendaryLeague = format === Format.LEGENDARY_LEAGUE;
    let legendaryLeader: UnitCard;
    let deck = makeDeck(decklist);

    if (isLegendaryLeague && deck.find(isCardLegendary)) {
        legendaryLeader = deck.find(isCardLegendary) as UnitCard;
        legendaryLeader.isLegendaryLeader = true;
        deck = deck.filter((card) => card !== legendaryLeader);
    }
    const shuffledDeck = shuffle(deck);
    const activeDeck = shuffledDeck.slice(STARTING_HAND_SIZE);
    const hand = shuffledDeck.slice(0, STARTING_HAND_SIZE);
    return {
        avatar: avatarUrl,
        cemetery: [],
        deck: activeDeck,
        deckBuildingPool: [],
        effectQueue: [],
        hand,
        health: STARTING_HEALTH,
        isActivePlayer: false,
        isAlive: true,
        isLegendaryLeaderDeployed: false,
        legendaryLeader,
        legendaryLeaderExtraCost: 0,
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
