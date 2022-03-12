import { SpellCards } from '@/cardDb/spells';
import { UnitCards } from '@/cardDb/units';
import { Card, CardType, DeckList } from '@/types/cards';
import { Resource } from '@/types/resources';
import { makeCard, makeResourceCard } from '../cards';

/**
 * Takes a list of cards / quantities of those cards and constructs a deck
 * @param decklist - represented via cards by quantiy
 * @returns an array of cards representing a deck
 */
export const makeDeck = (deckList: DeckList): Card[] => {
    const cards: Card[] = [];
    deckList.forEach(({ card, quantity }) => {
        [...new Array(quantity)].forEach(() => {
            const newCard =
                card.cardType === CardType.RESOURCE
                    ? makeResourceCard(card.resourceType)
                    : makeCard(card);
            cards.push(newCard);
        });
    });
    return cards;
};

// Bamboo + Iron - revised version (not used in mocks)
export const SAMPLE_DECKLIST_0: DeckList = [
    // Resources
    { card: makeResourceCard(Resource.BAMBOO), quantity: 11 },
    { card: makeResourceCard(Resource.IRON), quantity: 12 },
    // Soldiers
    { card: UnitCards.SQUIRE, quantity: 3 },
    { card: UnitCards.LANCER, quantity: 2 },
    { card: UnitCards.MARTIAL_TRAINER, quantity: 2 },
    { card: UnitCards.KNIGHT_TEMPLAR, quantity: 2 },
    { card: UnitCards.TEMPLE_GUARDIAN, quantity: 1 },
    // Assassins
    { card: UnitCards.ASSASSIN, quantity: 2 },
    { card: UnitCards.SHADOW_STRIKER, quantity: 2 },
    { card: UnitCards.BOUNTY_COLLECTOR, quantity: 2 },
    // Ranged
    { card: UnitCards.LONGBOWMAN, quantity: 2 },
    { card: UnitCards.JAVELINEER, quantity: 2 },
    // Spells
    { card: SpellCards.THROW_SHURIKEN, quantity: 3 },
    { card: SpellCards.RAIN_OF_ARROWS, quantity: 3 },
];

// Bamboo + Iron (mock version, for mocks only)
export const SAMPLE_DECKLIST_1: DeckList = [
    // Resources
    { card: makeResourceCard(Resource.BAMBOO), quantity: 11 },
    { card: makeResourceCard(Resource.IRON), quantity: 12 },
    // Soldiers
    { card: UnitCards.SQUIRE, quantity: 3 },
    { card: UnitCards.LANCER, quantity: 3 },
    { card: UnitCards.MARTIAL_TRAINER, quantity: 3 },
    { card: UnitCards.KNIGHT_TEMPLAR, quantity: 3 },
    // Assassins
    { card: UnitCards.ASSASSIN, quantity: 2 },
    { card: UnitCards.SHADOW_STRIKER, quantity: 2 },
    { card: UnitCards.BOUNTY_COLLECTOR, quantity: 3 },
    // Ranged
    { card: UnitCards.LONGBOWMAN, quantity: 3 },
    { card: UnitCards.JAVELINEER, quantity: 3 },
];

export const makeSampleDeck1 = (): Card[] => {
    const decklist = SAMPLE_DECKLIST_1;
    return makeDeck(decklist);
};

// Fire + Crystal
export const SAMPLE_DECKLIST_2: DeckList = [
    // Resources
    { card: makeResourceCard(Resource.FIRE), quantity: 14 },
    { card: makeResourceCard(Resource.CRYSTAL), quantity: 8 },
    // Units
    { card: UnitCards.FIRE_TECHNICIAN, quantity: 4 },
    { card: UnitCards.MAGICIANS_APPRENTICE, quantity: 4 },
    { card: UnitCards.FIRE_MAGE, quantity: 4 },
    { card: UnitCards.INFERNO_SORCEROR, quantity: 2 },
    // Spells
    { card: SpellCards.EMBER_SPEAR, quantity: 4 },
    { card: SpellCards.LIGHTNING_SLICK, quantity: 2 },
    { card: SpellCards.CURSE_HAND, quantity: 2 },
    { card: SpellCards.SUMMON_DEMONS, quantity: 4 },
];

// Water + Crystal
export const SAMPLE_DECKLIST_3: DeckList = [
    // Resources
    { card: makeResourceCard(Resource.WATER), quantity: 14 },
    { card: makeResourceCard(Resource.CRYSTAL), quantity: 8 },
    // Units
    { card: UnitCards.MAGICIANS_APPRENTICE, quantity: 4 },
    { card: UnitCards.MANTA_RAY_CONJURER, quantity: 4 },
    { card: UnitCards.WATER_MAGE, quantity: 4 },
    { card: UnitCards.WATER_GUARDIAN, quantity: 2 },

    // Spells
    { card: SpellCards.BUBBLE_BLAST, quantity: 3 },
    { card: SpellCards.GENEROUS_GEYSER, quantity: 3 },
    { card: SpellCards.SUMMON_SHARKS, quantity: 4 },
    { card: SpellCards.CONSTANT_REFILL, quantity: 2 },
];

// Water + Fire (aka wind)
export const SAMPLE_DECKLIST_4: DeckList = [
    // Resources
    { card: makeResourceCard(Resource.WATER), quantity: 12 },
    { card: makeResourceCard(Resource.FIRE), quantity: 10 },
    // Units
    { card: UnitCards.FIRE_TECHNICIAN, quantity: 4 },
    { card: UnitCards.FIRE_MAGE, quantity: 4 },
    { card: UnitCards.MANTA_RAY_CONJURER, quantity: 4 },
    { card: UnitCards.WATER_MAGE, quantity: 2 },
    { card: UnitCards.WIND_MAGE, quantity: 2 },

    // Spells
    { card: SpellCards.BUBBLE_BLAST, quantity: 2 },
    { card: SpellCards.EMBER_SPEAR, quantity: 4 },
    { card: SpellCards.A_GENTLE_GUST, quantity: 2 },
    { card: SpellCards.A_THOUSAND_WINDS, quantity: 2 },
];
