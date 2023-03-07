import uniqBy from 'lodash.uniqby';
import { SpellCards } from '@/cardDb/spells';
import { Tokens, UnitCards } from '@/cardDb/units';
import { makeCard } from '@/factories/cards';
import { Card, CardType, Effect } from '@/types/cards';

const getCardByName = (cardName: string) => {
    let cardToReturn;
    const cardPool = { ...SpellCards, ...UnitCards, ...Tokens };

    Object.entries(cardPool).forEach(([key, card]) => {
        if (key === cardName || card.name === cardName) {
            cardToReturn = card;
        }
    });
    return cardToReturn;
};

const getCardsForEffect = (effect: Effect): Card[] => {
    const cards = [];
    if (effect.summonType) {
        cards.push(makeCard(effect.summonType));
    }
    if (effect.cardName && getCardByName(effect.cardName)) {
        cards.push(makeCard(getCardByName(effect.cardName)));
    }
    if (effect.secondaryCardName && getCardByName(effect.secondaryCardName)) {
        cards.push(makeCard(getCardByName(effect.secondaryCardName)));
    }
    return cards;
};

/**
 * @param {Object} card - card to look at
 * @returns {Object[]} all cards associated to display in the tooltip
 * of the card, e.g. Novice Astronomer adds a "Distort Reality" card, so we
 * should display that
 */
export const getAssociatedCards = (card: Card): Card[] => {
    let associatedCards: Card[] = [];
    if (card.cardType === CardType.RESOURCE) {
        const effects = card.enterEffects;
        // any summoned units
        associatedCards = associatedCards.concat(
            effects?.flatMap((effect) => getCardsForEffect(effect))
        );
    }

    if (card.cardType === CardType.SPELL) {
        const { effects } = card;
        // any summoned units
        associatedCards = associatedCards.concat(
            effects?.flatMap((effect) => getCardsForEffect(effect))
        );
    }

    if (card.cardType === CardType.UNIT) {
        const effects = [
            ...(card.enterEffects ?? []),
            ...(card.damagePlayerEffects ?? []),
        ];
        // any summoned units
        associatedCards = associatedCards.concat(
            effects?.flatMap((effect) => getCardsForEffect(effect))
        );
    }
    return uniqBy(
        associatedCards.filter(
            (associatedCard) =>
                !!associatedCard && associatedCard.name !== card.name
        ),
        'name'
    );
};
