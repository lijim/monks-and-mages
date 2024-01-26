export const XP_PER_GAME_PLAYED = 1;
export const XP_PER_GAME_WON = 3;

export type Level = {
    image: string;
    level: number;
    name: string;
    xpRequired: number;
};

export const LEVELS: Level[] = [
    {
        name: 'Angry Hen',
        level: 1,
        xpRequired: 0,
        image: 'https://monksandmages.com/images/units/angry-hen.webp',
    },
    {
        name: 'Manta Ray',
        level: 2,
        xpRequired: 10,
        image: 'https://monksandmages.com/images/units/manta-ray.webp',
    },
    {
        name: 'Sambar Deer',
        level: 3,
        xpRequired: 20,
        image: 'https://monksandmages.com/images/units/sambar-deer.webp',
    },
    {
        name: 'Giant Jelly',
        level: 4,
        xpRequired: 30,
        image: 'https://monksandmages.com/images/units/giant-jelly.webp',
    },
    {
        name: 'Old Troll',
        level: 5,
        xpRequired: 45,
        image: 'https://monksandmages.com/images/units/old-troll.webp',
    },
    {
        name: 'Bamboo Farmer',
        level: 6,
        xpRequired: 60,
        image: 'https://monksandmages.com/images/units/bamboo-farmer.webp',
    },
    {
        name: 'Relaxed Rowboater',
        level: 7,
        xpRequired: 75,
        image: 'https://monksandmages.com/images/units/relaxed-rowboater.webp',
    },
    {
        name: 'Quarry Worker',
        level: 8,
        xpRequired: 90,
        image: 'https://monksandmages.com/images/units/quarry-worker.webp',
    },
    {
        name: "Magician's Apprentice",
        level: 9,
        xpRequired: 120,
        image: 'https://monksandmages.com/images/units/magicians-apprentice.webp',
    },
    {
        name: 'Fire Technician',
        level: 10,
        xpRequired: 150,
        image: 'https://monksandmages.com/images/units/fire-technician.webp',
    },
    {
        name: 'Gargoyle',
        level: 11,
        xpRequired: 180,
        image: 'https://monksandmages.com/images/units/gargoyle.webp',
    },

    {
        name: 'Lancer',
        level: 12,
        xpRequired: 210,
        image: 'https://monksandmages.com/images/units/lancer.webp',
    },
    {
        name: 'Dragon Tamer',
        level: 13,
        xpRequired: 240,
        image: 'https://monksandmages.com/images/units/dragon-tamer.webp',
    },
    {
        name: 'Coven Novice',
        level: 14,
        xpRequired: 270,
        image: 'https://monksandmages.com/images/units/coven-novice.webp',
    },
    {
        name: 'Squire',
        level: 15,
        xpRequired: 300,
        image: 'https://monksandmages.com/images/units/squire.webp',
    },
    {
        name: 'Hearty Stag',
        level: 16,
        xpRequired: 340,
        image: 'https://monksandmages.com/images/units/hearty-stag.webp',
    },
    {
        name: 'Frost Walker',
        level: 17,
        xpRequired: 380,
        image: 'https://monksandmages.com/images/units/frost-walker.webp',
    },
    {
        name: 'Fishing Gnome',
        level: 18,
        xpRequired: 420,
        image: 'https://monksandmages.com/images/units/fishing-gnome.webp',
    },
    {
        name: 'Fire Mage',
        level: 19,
        xpRequired: 460,
        image: 'https://monksandmages.com/images/units/fire-mage.webp',
    },
    {
        name: 'Baby Dragon',
        level: 20,
        xpRequired: 500,
        image: 'https://monksandmages.com/images/units/baby-dragon.webp',
    },
    {
        name: 'Spirit Guardian',
        level: 21,
        xpRequired: 550,
        image: 'https://monksandmages.com/images/units/spirit-guardian.webp',
    },
    {
        name: 'Water Mage',
        level: 22,
        xpRequired: 600,
        image: 'https://monksandmages.com/images/units/water-mage.webp',
    },
    {
        name: 'Fortune Predictor',
        level: 23,
        xpRequired: 650,
        image: 'https://monksandmages.com/images/units/fortune-predictor.webp',
    },
    {
        name: 'Flux Fighter',
        level: 24,
        xpRequired: 700,
        image: 'https://monksandmages.com/images/units/flux-fighter.webp',
    },
    {
        name: 'Elder Pirate',
        level: 25,
        xpRequired: 750,
        image: 'https://monksandmages.com/images/units/elder-pirate.webp',
    },
    {
        name: 'Inconspicuous Crab',
        level: 26,
        xpRequired: 800,
        image: 'https://monksandmages.com/images/units/inconspicuous-crab.webp',
    },
    {
        name: 'Wind Mage',
        level: 27,
        xpRequired: 850,
        image: 'https://monksandmages.com/images/units/wind-mage.webp',
    },
    {
        name: 'Falcon Rider',
        level: 28,
        xpRequired: 900,
        image: 'https://monksandmages.com/images/units/falcon-rider.webp',
    },
    {
        name: 'Ruler of the Jungle',
        level: 29,
        xpRequired: 950,
        image: 'https://monksandmages.com/images/units/ruler-of-the-jungle.webp',
    },
    {
        name: 'Inferno Sorceror',
        level: 30,
        xpRequired: 1000,
        image: 'https://monksandmages.com/images/units/inferno-sorceror.webp',
    },
    {
        name: 'Bog Warlock',
        level: 31,
        xpRequired: 1100,
        image: 'https://monksandmages.com/images/units/bog-warlock.webp',
    },
    {
        name: 'Maelstrom Seeker',
        level: 32,
        xpRequired: 1200,
        image: 'https://monksandmages.com/images/units/maelstrom-seeker.webp',
    },
    {
        name: 'Temple Guardian',
        level: 33,
        xpRequired: 1300,
        image: 'https://monksandmages.com/images/units/temple-guardian.webp',
    },
    {
        name: 'Bright Scholar',
        level: 34,
        xpRequired: 1400,
        image: 'https://monksandmages.com/images/units/bright-scholar.webp',
    },
    {
        name: 'Dragon Mist Warrior',
        level: 35,
        xpRequired: 1500,
        image: 'https://monksandmages.com/images/units/dragon-mist-warrior.webp',
    },
    {
        name: 'Raven Knight',
        level: 36,
        xpRequired: 1600,
        image: 'https://monksandmages.com/images/units/raven-knight.webp',
    },
    {
        name: 'Confucius',
        level: 37,
        xpRequired: 1700,
        image: 'https://monksandmages.com/images/units/confucius.webp',
    },
    {
        name: 'King Tut',
        level: 38,
        xpRequired: 1800,
        image: 'https://monksandmages.com/images/units/king-tut.webp',
    },
    {
        name: 'Generous Buddha',
        level: 39,
        xpRequired: 1900,
        image: 'https://monksandmages.com/images/units/generous-buddha.webp',
    },
    {
        name: 'Mahadev',
        level: 40,
        xpRequired: 2000,
        image: 'https://monksandmages.com/images/units/mahadev.webp',
    },
];
