import { PlayerConstants } from '@/constants/gameConstants';
import { CardType, DeckList } from '@/types/cards';
import { Format, isFormatConstructed } from '@/types/games';
import { getColorIdentityForCard } from '../getColorIdentityForCard';

export const MAX_DUPLICATES_FOR_FORMATS = {
    [Format.SINGLETON]: 1,
    [Format.LEGENDARY_LEAGUE]: 1,
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
    const max = MAX_DUPLICATES_FOR_FORMATS[format];
    const minDeckSize = isFormatConstructed(format)
        ? PlayerConstants.STARTING_DECK_SIZE
        : PlayerConstants.STARTING_DECK_SIZE_LIMITED;
    const maxDeckSize = PlayerConstants.MAX_DECK_SIZE;
    let reason: string;
    deck.mainBoard.forEach(({ card, quantity }) => {
        numCards += quantity;
        if (card.cardType === CardType.RESOURCE && !card.isAdvanced) {
            return;
        }
        if (quantity > max) {
            isValid = false;
            reason = `May have no more than ${max} of [${card.name}]`;
        }
    });
    if (!isValid) {
        return { isValid, reason };
    }

    const legendaries = deck.mainBoard.filter(
        ({ card }) => card.cardType === CardType.UNIT && card.isLegendary
    );
    if (format === Format.LEGENDARY_LEAGUE) {
        if (legendaries.length !== 1) {
            return {
                isValid: false,
                reason: `Must have exactly 1 legendary unit as your leader`,
            };
        }
        const [{ card: legendaryUnit }] = legendaries;
        const legendaryColorIdentity = getColorIdentityForCard(legendaryUnit);

        if (
            // each card in the mainboard needs to match the color identity of the legendary
            !deck.mainBoard.every(({ card }) =>
                getColorIdentityForCard(card).every((color) =>
                    legendaryColorIdentity.includes(color)
                )
            )
        ) {
            return {
                isValid: false,
                reason: `Every card must match the color identify of your legendary leader`,
            };
        }
    }

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
