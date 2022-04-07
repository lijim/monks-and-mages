import { SpellCards } from '@/cardDb/spells';
import { UnitCards } from '@/cardDb/units';
import { DeckList } from '@/types/cards';
import { Resource } from '@/types/resources';
import { makeResourceCard } from '@/factories/cards';
import { AdvancedResourceCards } from '@/cardDb/resources/advancedResources';

// Bamboo + Iron - revised version (not used in mocks)
export const SAMPLE_DECKLIST_0: DeckList = [
    // Resources
    { card: makeResourceCard(Resource.BAMBOO), quantity: 8 },
    { card: makeResourceCard(Resource.IRON), quantity: 9 },
    { card: AdvancedResourceCards.TANGLED_RUINS, quantity: 4 },
    // Soldiers
    { card: UnitCards.SQUIRE, quantity: 2 },
    { card: UnitCards.LANCER, quantity: 4 },
    { card: UnitCards.MARTIAL_TRAINER, quantity: 3 },
    // Assassins
    { card: UnitCards.ASSASSIN, quantity: 2 },
    { card: UnitCards.SHADOW_STRIKER, quantity: 2 },
    { card: UnitCards.BOUNTY_COLLECTOR, quantity: 2 },
    // Ranged
    { card: UnitCards.JAVELINEER, quantity: 4 },
    { card: UnitCards.MERRY_RALLIER, quantity: 4 },
    // Spells
    { card: SpellCards.THROW_SHURIKEN, quantity: 2 },
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

// Fire + Crystal (Fire Mage)
export const SAMPLE_DECKLIST_2: DeckList = [
    // Resources
    { card: makeResourceCard(Resource.FIRE), quantity: 9 },
    { card: makeResourceCard(Resource.CRYSTAL), quantity: 8 },
    { card: AdvancedResourceCards.STRATOVOLCANO, quantity: 4 },
    // Units
    { card: UnitCards.FIRE_TECHNICIAN, quantity: 3 },
    { card: UnitCards.MAGICIANS_APPRENTICE, quantity: 4 },
    { card: UnitCards.FIRE_MAGE, quantity: 4 },
    { card: UnitCards.INFERNO_SORCEROR, quantity: 2 },
    // Spells
    { card: SpellCards.EMBER_SPEAR, quantity: 4 },
    { card: SpellCards.LIGHTNING_SLICK, quantity: 2 },
    { card: SpellCards.VOLCANIC_INFERNO, quantity: 2 },
    { card: SpellCards.CURSE_HAND, quantity: 2 },
    { card: SpellCards.SUMMON_DEMONS, quantity: 4 },
];

// Water + Crystal (Water Mage)
export const SAMPLE_DECKLIST_3: DeckList = [
    // Resources
    { card: makeResourceCard(Resource.WATER), quantity: 8 },
    { card: makeResourceCard(Resource.CRYSTAL), quantity: 7 },
    { card: AdvancedResourceCards.SEASIDE_TOWN, quantity: 4 },
    // Units
    { card: UnitCards.RELAXED_ROWBOATER, quantity: 4 },
    { card: UnitCards.MAGICIANS_APPRENTICE, quantity: 4 },
    { card: UnitCards.TINY_MERMAID, quantity: 4 },
    { card: UnitCards.MANTA_RAY_CONJURER, quantity: 4 },
    { card: UnitCards.WATER_MAGE, quantity: 3 },
    { card: UnitCards.WATER_GUARDIAN, quantity: 2 },

    // Spells
    { card: SpellCards.BUBBLE_BLAST, quantity: 2 },
    { card: SpellCards.GENEROUS_GEYSER, quantity: 1 },
    { card: SpellCards.SUMMON_SHARKS, quantity: 2 },
    { card: SpellCards.RAGING_WHIRLPOOL, quantity: 2 },
    { card: SpellCards.CONSTANT_REFILL, quantity: 1 },
];

// Water + Fire (aka wind)
export const SAMPLE_DECKLIST_4: DeckList = [
    // Resources
    { card: makeResourceCard(Resource.WATER), quantity: 8 },
    { card: makeResourceCard(Resource.FIRE), quantity: 8 },
    { card: AdvancedResourceCards.CLOUD_HAVEN, quantity: 4 },
    // Units
    { card: UnitCards.FIRE_TECHNICIAN, quantity: 4 },
    { card: UnitCards.RELAXED_ROWBOATER, quantity: 2 },
    { card: UnitCards.FIRE_MAGE, quantity: 4 },
    { card: UnitCards.MANTA_RAY_CONJURER, quantity: 4 },
    { card: UnitCards.WATER_MAGE, quantity: 3 },
    { card: UnitCards.WIND_MAGE, quantity: 2 },

    // Spells
    { card: SpellCards.EMBER_SPEAR, quantity: 4 },
    { card: SpellCards.A_GENTLE_GUST, quantity: 2 },
    { card: SpellCards.A_THOUSAND_WINDS, quantity: 3 },
];

// Bamboo + Iron - Farmer deck
export const SAMPLE_DECKLIST_5: DeckList = [
    // Resources
    { card: makeResourceCard(Resource.BAMBOO), quantity: 9 },
    { card: makeResourceCard(Resource.IRON), quantity: 6 },
    { card: AdvancedResourceCards.TANGLED_RUINS, quantity: 4 },
    // Other
    { card: UnitCards.BAMBOO_FARMER, quantity: 4 },
    // Soldiers
    { card: UnitCards.TEMPLE_GUARDIAN, quantity: 3 },
    // Ranged
    { card: UnitCards.LONGBOWMAN, quantity: 3 },
    { card: UnitCards.JAVELINEER, quantity: 3 },
    { card: UnitCards.CAVALRY_ARCHER, quantity: 3 },
    { card: UnitCards.FALCON_RIDER, quantity: 2 },
    { card: UnitCards.MERRY_RALLIER, quantity: 4 },
    // Spells
    { card: SpellCards.FEED_TEAM, quantity: 4 },
    { card: SpellCards.RAIN_OF_ARROWS, quantity: 3 },
];

// Crystal + Iron - (Genie Deck)
export const SAMPLE_DECKLIST_6: DeckList = [
    // Resources
    { card: makeResourceCard(Resource.CRYSTAL), quantity: 8 },
    { card: makeResourceCard(Resource.IRON), quantity: 9 },
    { card: AdvancedResourceCards.SAHARAN_DESERT, quantity: 4 },
    // Other
    { card: UnitCards.FORTUNE_PREDICTOR, quantity: 4 },
    // Magicians
    { card: UnitCards.MAGICIANS_APPRENTICE, quantity: 4 },
    // Soldiers
    { card: UnitCards.CAPTAIN_OF_THE_GUARD, quantity: 4 },
    { card: UnitCards.LANCER, quantity: 3 },
    { card: UnitCards.KNIGHT_TEMPLAR, quantity: 2 },
    // Spells
    { card: SpellCards.DISTORT_REALITY, quantity: 4 },
    { card: SpellCards.OPEN_NEBULA, quantity: 2 },
    { card: SpellCards.SPECTRAL_GENESIS, quantity: 4 },
];

// Crystal + Water + Fire - (Sorceror Deck)
export const SAMPLE_DECKLIST_7: DeckList = [
    // Resources
    { card: makeResourceCard(Resource.CRYSTAL), quantity: 4 },
    { card: makeResourceCard(Resource.WATER), quantity: 2 },
    { card: makeResourceCard(Resource.FIRE), quantity: 4 },
    { card: AdvancedResourceCards.CLOUD_HAVEN, quantity: 4 },
    { card: AdvancedResourceCards.SEASIDE_TOWN, quantity: 3 },
    { card: AdvancedResourceCards.STRATOVOLCANO, quantity: 3 },
    // Magicians
    { card: UnitCards.MAGICIANS_APPRENTICE, quantity: 3 },
    { card: UnitCards.FIRE_MAGE, quantity: 2 },
    { card: UnitCards.WATER_MAGE, quantity: 1 },
    { card: UnitCards.BRIGHT_SCHOLAR, quantity: 3 },
    { card: UnitCards.INFERNO_SORCEROR, quantity: 1 },
    { card: UnitCards.WIND_MAGE, quantity: 1 },
    // Spells
    { card: SpellCards.HOLY_REVIVAL, quantity: 3 },
    { card: SpellCards.CONSTANT_REFILL, quantity: 2 },
    { card: SpellCards.SUMMON_DEMONS, quantity: 1 },
    { card: SpellCards.VOLCANIC_INFERNO, quantity: 3 },
    { card: SpellCards.EMBER_SPEAR, quantity: 4 },
    { card: SpellCards.BUBBLE_BLAST, quantity: 2 },
    { card: SpellCards.SPECTRAL_GENESIS, quantity: 2 },
];

// Water + Bamboo (Coral)
export const SAMPLE_DECKLIST_8: DeckList = [
    // Resources
    { card: makeResourceCard(Resource.WATER), quantity: 8 },
    { card: makeResourceCard(Resource.BAMBOO), quantity: 8 },
    { card: AdvancedResourceCards.LUSH_REEF, quantity: 4 },
    // Units
    { card: UnitCards.BAMBOO_FARMER, quantity: 4 },
    { card: UnitCards.RELAXED_ROWBOATER, quantity: 4 },
    { card: UnitCards.MANTA_RAY_CONJURER, quantity: 4 },
    { card: UnitCards.FALCON_RIDER, quantity: 4 },
    { card: UnitCards.MERRY_RALLIER, quantity: 4 },
    { card: UnitCards.DEEP_SEA_EXPLORER, quantity: 4 },

    // Spells
    { card: SpellCards.BUBBLE_BLAST, quantity: 1 },
    { card: SpellCards.RAIN_OF_ARROWS, quantity: 3 },
];

// Iron + Fire (Cannoneers)
export const SAMPLE_DECKLIST_9: DeckList = [
    // Resources
    { card: makeResourceCard(Resource.IRON), quantity: 8 },
    { card: makeResourceCard(Resource.FIRE), quantity: 8 },
    { card: AdvancedResourceCards.SMELTING_FORGE, quantity: 4 },
    // Units
    { card: UnitCards.FIRE_TECHNICIAN, quantity: 3 },
    { card: UnitCards.QUARRY_WORKER, quantity: 4 },
    { card: UnitCards.SQUIRE, quantity: 3 },
    { card: UnitCards.MARTIAL_TRAINER, quantity: 2 },
    { card: UnitCards.FIRE_MAGE, quantity: 4 },
    { card: UnitCards.CANNON, quantity: 4 },

    // Spells
    { card: SpellCards.EMBER_SPEAR, quantity: 4 },
    { card: SpellCards.IGNITE_SPARKS, quantity: 4 },
];

// For debugging / gamebuilding purposes
export const ALL_CARDS: DeckList = [
    { card: makeResourceCard(Resource.BAMBOO), quantity: 1 },
    { card: makeResourceCard(Resource.CRYSTAL), quantity: 1 },
    { card: makeResourceCard(Resource.FIRE), quantity: 1 },
    { card: makeResourceCard(Resource.IRON), quantity: 1 },
    { card: makeResourceCard(Resource.WATER), quantity: 1 },
    ...Object.values(AdvancedResourceCards).map((card) => {
        return { card, quantity: 1 };
    }),
    ...Object.values(SpellCards).map((card) => {
        return { card, quantity: 1 };
    }),
    ...Object.values(UnitCards).map((card) => {
        return { card, quantity: 1 };
    }),
];
