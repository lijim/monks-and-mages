import { SpellCards } from '@/cardDb/spells';
import { Tokens, UnitCards } from '@/cardDb/units';
import { DeckList } from '@/types/cards';
import { Resource } from '@/types/resources';
import { makeResourceCard } from '@/factories/cards';
import { AdvancedResourceCards } from '@/cardDb/resources/advancedResources';

// Bamboo + Iron - revised version (not used in mocks)
export const MONKS_DECKLIST: DeckList = [
    // 22 Resources
    { card: makeResourceCard(Resource.BAMBOO), quantity: 7 },
    { card: makeResourceCard(Resource.IRON), quantity: 7 },
    { card: AdvancedResourceCards.TANGLED_RUINS, quantity: 4 },
    { card: AdvancedResourceCards.PREFECTURE_CAPITAL, quantity: 4 },
    // 20 Soldiers
    { card: UnitCards.PIKEMAN, quantity: 4 },
    { card: UnitCards.LANCER, quantity: 4 },
    { card: UnitCards.INFANTRY_OFFICER, quantity: 4 },
    { card: UnitCards.SQUIRE, quantity: 3 },
    { card: UnitCards.ORCISH_CORPORAL, quantity: 2 },
    { card: UnitCards.MARTIAL_TRAINER, quantity: 3 },
    // 6 Assassins
    { card: UnitCards.ASSASSIN, quantity: 2 },
    { card: UnitCards.SHADOW_STRIKER, quantity: 2 },
    { card: UnitCards.BOUNTY_COLLECTOR, quantity: 2 },
    // 6 Ranged
    { card: UnitCards.JAVELINEER, quantity: 4 },
    { card: UnitCards.MERRY_RALLIER, quantity: 2 },
    // 6 Spells
    { card: SpellCards.THROW_SHURIKEN, quantity: 2 },
    { card: SpellCards.RAIN_OF_ARROWS, quantity: 4 },
];

// Bamboo + Iron (mock version, for mocks only)
export const SAMPLE_DECKLIST_1: DeckList = [
    // Resources
    { card: makeResourceCard(Resource.BAMBOO), quantity: 23 },
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
export const FIRE_MAGES_DECKLIST: DeckList = [
    // Resources
    { card: makeResourceCard(Resource.FIRE), quantity: 8 },
    { card: makeResourceCard(Resource.CRYSTAL), quantity: 6 },
    { card: AdvancedResourceCards.STRATOVOLCANO, quantity: 4 },
    { card: AdvancedResourceCards.LONE_TOWER, quantity: 4 },
    { card: AdvancedResourceCards.LAVA_RIVER, quantity: 2 },
    // Units
    { card: UnitCards.MAGICIANS_APPRENTICE, quantity: 4 },
    { card: UnitCards.MIDNIGHT_HELLSPAWN, quantity: 2 },
    { card: UnitCards.INFERNO_SORCEROR, quantity: 4 },
    // Spells
    { card: SpellCards.SUPERNOVA, quantity: 4 },
    { card: SpellCards.BEAM_ME_UP, quantity: 4 },
    { card: SpellCards.STRIKE_TWICE, quantity: 2 },
    { card: SpellCards.EMBER_SPEAR, quantity: 4 },
    { card: SpellCards.SPECTRAL_GENESIS, quantity: 2 },
    { card: SpellCards.DISTORT_REALITY, quantity: 2 },
    { card: SpellCards.VOLCANIC_INFERNO, quantity: 4 },
    { card: SpellCards.CAVE_IMPLOSION, quantity: 4 },
];

// Water + Crystal (Water Mage)
export const WATER_MAGES_DECKLIST: DeckList = [
    // Resources
    { card: makeResourceCard(Resource.WATER), quantity: 14 },
    { card: AdvancedResourceCards.COASTAL_CASTLE, quantity: 4 },
    { card: AdvancedResourceCards.CHILLY_BERG, quantity: 4 },
    // Units
    { card: UnitCards.FROST_WYRM, quantity: 1 },
    { card: UnitCards.GIANT_JELLY, quantity: 4 },
    { card: UnitCards.LAKE_ZOMBIE, quantity: 4 },
    { card: UnitCards.MEDITATION_EXPERT, quantity: 2 },
    { card: UnitCards.RELAXED_ROWBOATER, quantity: 4 },
    { card: UnitCards.MANTA_RAY_CONJURER, quantity: 2 },
    { card: UnitCards.RAIN_CHANNELER, quantity: 1 },
    { card: UnitCards.WAVING_FISHERMAN, quantity: 1 },
    { card: UnitCards.FROST_WALKER, quantity: 2 },
    { card: UnitCards.MISBEGOTTEN_MISTWALKER, quantity: 1 },
    { card: UnitCards.PEACE_BRINGER, quantity: 1 },
    { card: UnitCards.WATER_MAGE, quantity: 4 },
    { card: UnitCards.THUNDER_SCHEDULER, quantity: 3 },
    { card: UnitCards.MAELSTROM_SEEKER, quantity: 1 },

    // Spells
    { card: SpellCards.COLD_ISOLATION, quantity: 4 },
    { card: SpellCards.REFLECTION_OPPORTUNITY, quantity: 1 },
    { card: SpellCards.PIERCE_THE_HEAVENS, quantity: 2 },
];

// Water + Fire (aka wind)
export const WIND_MAGES_DECKLIST: DeckList = [
    // Resources
    { card: makeResourceCard(Resource.WATER), quantity: 8 },
    { card: makeResourceCard(Resource.FIRE), quantity: 8 },
    { card: AdvancedResourceCards.CLOUD_HAVEN, quantity: 4 },
    { card: AdvancedResourceCards.TROUBLED_PARADISE, quantity: 4 },
    { card: AdvancedResourceCards.CHILLY_BERG, quantity: 1 },
    // Units
    { card: UnitCards.FIRE_TECHNICIAN, quantity: 4 },
    { card: UnitCards.HEAVENLY_FERRIER, quantity: 2 },
    { card: UnitCards.FLUX_FIGHTER, quantity: 4 },
    { card: UnitCards.FERRY_OPERATOR, quantity: 4 },
    { card: UnitCards.WATER_MAGE, quantity: 3 },
    { card: UnitCards.WIND_MAGE, quantity: 2 },
    { card: UnitCards.ARCHANGEL, quantity: 3 },

    // Spells
    { card: SpellCards.EMBER_SPEAR, quantity: 4 },
    { card: SpellCards.A_GENTLE_GUST, quantity: 2 },
    { card: SpellCards.SOLFATARA, quantity: 2 },
    { card: SpellCards.A_THOUSAND_WINDS, quantity: 3 },
    { card: SpellCards.COLLOSAL_TSUNAMI, quantity: 2 },
];

// Bamboo + Iron - Farmer deck
export const FARMERS_DECKLIST: DeckList = [
    // Resources
    { card: makeResourceCard(Resource.BAMBOO), quantity: 7 },
    { card: makeResourceCard(Resource.IRON), quantity: 3 },
    { card: AdvancedResourceCards.TANGLED_RUINS, quantity: 4 },
    { card: AdvancedResourceCards.PREFECTURE_CAPITAL, quantity: 4 },
    { card: AdvancedResourceCards.SLAG_FIELDS, quantity: 4 },
    // Units
    { card: UnitCards.ALERT_FELINE, quantity: 4 },
    { card: UnitCards.ANGRY_HEN, quantity: 4 },
    { card: UnitCards.STONE_SLINGER, quantity: 4 },
    { card: UnitCards.SWORDS_MASTER, quantity: 4 },
    { card: UnitCards.BOUNTY_COLLECTOR, quantity: 4 },
    { card: UnitCards.CAVALRY_ARCHER, quantity: 4 },
    { card: UnitCards.CANYON_ELITE, quantity: 2 },
    { card: UnitCards.BAMBOO_FARMER, quantity: 4 },
    { card: UnitCards.ADVENTURER, quantity: 2 },
    { card: UnitCards.EXCELLENT_EQUESTRIAN, quantity: 2 },
    // Spells
    { card: SpellCards.CONCENTRATED_FOCUS, quantity: 3 },
    { card: SpellCards.FISH_MARKET_VISIT, quantity: 1 },
];

// Crystal + Iron - (Genie Deck)
export const GENIES_DECKLIST: DeckList = [
    // Resources
    { card: makeResourceCard(Resource.CRYSTAL), quantity: 6 },
    { card: makeResourceCard(Resource.IRON), quantity: 6 },
    { card: AdvancedResourceCards.SAHARAN_DESERT, quantity: 4 },
    { card: AdvancedResourceCards.DIVINE_PALACE, quantity: 4 },
    { card: AdvancedResourceCards.TREACHEROUS_DESERT, quantity: 2 },
    // Units
    { card: UnitCards.NOVICE_ASTRONOMER, quantity: 4 },
    { card: UnitCards.FORTUNE_PREDICTOR, quantity: 4 },
    { card: UnitCards.MAGICIANS_APPRENTICE, quantity: 4 },
    { card: UnitCards.CAPTAIN_OF_THE_GUARD, quantity: 4 },
    { card: UnitCards.ENERGY_ENHANCER, quantity: 2 },
    { card: UnitCards.SPIRIT_TENDER, quantity: 1 },
    { card: UnitCards.UNHOLY_VETERAN, quantity: 1 },
    { card: UnitCards.MAGI_RIDER, quantity: 4 },
    // Spells
    { card: SpellCards.DISTORT_REALITY, quantity: 2 },
    { card: SpellCards.DECAY, quantity: 1 },
    { card: SpellCards.OPEN_NEBULA, quantity: 1 },
    { card: SpellCards.SPECTRAL_GENESIS, quantity: 4 },
    { card: SpellCards.ZEN_STANCE, quantity: 4 },
    { card: SpellCards.SIGNAL_BEACON, quantity: 2 },
];

// Crystal + Water + Fire - (Sorceror Deck)
export const SORCERORS_DECKLIST: DeckList = [
    // Resources
    { card: makeResourceCard(Resource.CRYSTAL), quantity: 2 },
    { card: AdvancedResourceCards.CLOUD_HAVEN, quantity: 4 },
    { card: AdvancedResourceCards.SEASIDE_COVE, quantity: 4 },
    { card: AdvancedResourceCards.STRATOVOLCANO, quantity: 4 },
    { card: AdvancedResourceCards.LONE_TOWER, quantity: 4 },
    { card: AdvancedResourceCards.MYSTIFYING_LAKE, quantity: 4 },
    { card: AdvancedResourceCards.TROUBLED_PARADISE, quantity: 4 },
    // Magicians
    { card: UnitCards.MAGICIANS_APPRENTICE, quantity: 4 },
    { card: UnitCards.FIRE_MAGE, quantity: 1 },
    { card: UnitCards.WATER_MAGE, quantity: 1 },
    { card: UnitCards.ALADDIN, quantity: 2 },
    { card: UnitCards.BRIGHT_SCHOLAR, quantity: 2 },
    { card: UnitCards.INFERNO_SORCEROR, quantity: 1 },
    { card: UnitCards.CURIOUS_RESEARCHER, quantity: 2 },
    { card: UnitCards.WATER_GUARDIAN, quantity: 1 },
    // Spells
    { card: SpellCards.INCREDIBLE_DISCOVERY, quantity: 3 },
    { card: SpellCards.SCOUR_THE_LIBRARY, quantity: 3 },
    { card: SpellCards.HOLY_REVIVAL, quantity: 2 },
    { card: SpellCards.CONSTANT_REFILL, quantity: 2 },
    { card: SpellCards.SUMMON_DEMONS, quantity: 1 },
    { card: SpellCards.VOLCANIC_INFERNO, quantity: 3 },
    { card: SpellCards.EMBER_SPEAR, quantity: 2 },
    { card: SpellCards.BUBBLE_BLAST, quantity: 2 },
    { card: SpellCards.SPECTRAL_GENESIS, quantity: 2 },
];

// Water + Bamboo (Coral)
export const DIVERS_DECKLIST: DeckList = [
    // Resources
    { card: makeResourceCard(Resource.WATER), quantity: 8 },
    { card: makeResourceCard(Resource.BAMBOO), quantity: 8 },
    { card: AdvancedResourceCards.LUSH_REEF, quantity: 4 },
    { card: AdvancedResourceCards.ROYAL_RESIDENCE, quantity: 4 },
    // Units
    { card: UnitCards.BAMBOO_FARMER, quantity: 4 },
    { card: UnitCards.RELAXED_ROWBOATER, quantity: 4 },
    { card: UnitCards.SEASONAL_CROPHAND, quantity: 4 },
    { card: UnitCards.MANTA_RAY_CONJURER, quantity: 4 },
    { card: UnitCards.PASTURE_EXPLORER, quantity: 3 },
    { card: UnitCards.FALCON_RIDER, quantity: 4 },
    { card: UnitCards.MERRY_RALLIER, quantity: 4 },
    { card: UnitCards.DEEP_SEA_EXPLORER, quantity: 4 },
    { card: UnitCards.ICTHYOMANCER, quantity: 1 },

    // Spells
    { card: SpellCards.BUBBLE_BLAST, quantity: 1 },
    { card: SpellCards.RAIN_OF_ARROWS, quantity: 3 },
];

// Iron + Fire (Cannoneers)
export const CANNONEERS_DECKLIST: DeckList = [
    // Resources
    { card: makeResourceCard(Resource.IRON), quantity: 8 },
    { card: makeResourceCard(Resource.FIRE), quantity: 8 },
    { card: AdvancedResourceCards.SMELTING_FORGE, quantity: 4 },
    { card: AdvancedResourceCards.ORNATE_TEMPLE, quantity: 4 },
    // Units
    { card: UnitCards.FIRE_TECHNICIAN, quantity: 3 },
    { card: UnitCards.QUARRY_WORKER, quantity: 4 },
    { card: UnitCards.SQUIRE, quantity: 3 },
    { card: UnitCards.MARTIAL_TRAINER, quantity: 2 },
    { card: UnitCards.FIRE_MAGE, quantity: 4 },
    { card: UnitCards.CANNON, quantity: 4 },
    { card: UnitCards.ZEALOUS_ACOLYTE, quantity: 1 },
    { card: UnitCards.BANISHER_OF_MAGIC, quantity: 1 },

    // Spells
    { card: SpellCards.EMBER_SPEAR, quantity: 4 },
    { card: SpellCards.IGNITE_SPARKS, quantity: 4 },
    { card: SpellCards.FESTIVE_BAZAAR, quantity: 4 },
    { card: SpellCards.FIRE_AWAY, quantity: 1 },
    { card: SpellCards.BESIEGE_THE_CASTLE, quantity: 1 },
];

export const PIRATES_DECKLIST: DeckList = [
    { card: SpellCards.RAISE_THE_MASTS, quantity: 4 },
    { card: UnitCards.ELDER_PIRATE, quantity: 4 },
    { card: UnitCards.NOBLE_STEED, quantity: 4 },
    { card: UnitCards.SCHEMING_EXPLORER, quantity: 4 },
    { card: UnitCards.DARING_CORSAIR, quantity: 4 },
    { card: UnitCards.SHIP_COXSWAIN, quantity: 4 },
    { card: UnitCards.CUTLASS_CRUSADER, quantity: 2 },
    { card: UnitCards.SPELUNKER, quantity: 4 },
    { card: UnitCards.IRONSMITH, quantity: 2 },
    { card: UnitCards.QUESTING_DUO, quantity: 4 },
    { card: UnitCards.PIKEMAN, quantity: 2 },
    { card: makeResourceCard(Resource.IRON), quantity: 4 },
    { card: makeResourceCard(Resource.WATER), quantity: 4 },
    { card: AdvancedResourceCards.HARBOR_TOWN, quantity: 4 },
    { card: AdvancedResourceCards.CITY_CANALS, quantity: 4 },
    { card: AdvancedResourceCards.SLAG_FIELDS, quantity: 4 },
    { card: AdvancedResourceCards.OLD_FARMHOUSE, quantity: 2 },
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
    ...Object.values(SpellCards)
        .filter((card) => !card.isTokenOnly)
        .map((card) => {
            return { card, quantity: 1 };
        }),
    ...Object.values(UnitCards).map((card) => {
        return { card, quantity: 1 };
    }),
];

export const ALL_CARDS_AND_TOKENS: DeckList = [
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
    ...Object.values(Tokens).map((card) => {
        return { card, quantity: 1 };
    }),
];
