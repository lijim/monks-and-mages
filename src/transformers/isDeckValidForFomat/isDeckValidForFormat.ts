import { PlayerConstants } from '@/constants/gameConstants';
import { CardType, DeckList } from '@/types/cards';
import { Format } from '@/types/games';

const MAX_FOR_FORMATS = {
    [Format.SINGLETON]: 1,
    [Format.STANDARD]: 4,
    [Format.DRAFT]: Number.MAX_SAFE_INTEGER,
    [Format.SEALED]: Number.MAX_SAFE_INTEGER,
};

type ReturnValue = {
    isValid: boolean;
    reason?: string;
};

export const isDeckValidForFormat = (
    deck: DeckList,
    format = Format.STANDARD
): ReturnValue => {
    let numCards = 0;
    let isValid = true;
    const max = MAX_FOR_FORMATS[format];
    const minDeckSize = PlayerConstants.STARTING_DECK_SIZE;
    const maxDeckSize = PlayerConstants.MAX_DECK_SIZE;
    let reason: string;
    deck.forEach(({ card, quantity }) => {
        numCards += quantity;
        if (card.cardType === CardType.RESOURCE && !card.isAdvanced) {
            return;
        }
        if (quantity > max) {
            isValid = false;
            reason = `May have no more than ${max} of [${card.name}]`;
        }
    });
    if (numCards < minDeckSize) {
        return {
            isValid: false,
            reason: `Must have at least ${minDeckSize} cards in deck`,
        };
    }
    if (numCards > maxDeckSize) {
        return {
            isValid: false,
            reason: `Must have at most ${maxDeckSize} cards in deck`,
        };
    }
    return {
        isValid,
        reason,
    };
};
