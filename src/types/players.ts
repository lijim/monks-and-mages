/**
 * All things related to the player construct (from the DB)
 * used in managing the Profile page, player engagement features (like avatars, etc.)
 */

export type Level = {
    image: string;
    level: number;
    name: string;
    xpRequired: number;
};

export type UserPlayer = {
    avatarUrl: string;
    createdAt: string;
    exp: number;
    numberOfGamesWon: number;
    uid: string;
    username: string;
};

export const DEFAULT_AVATAR =
    'https://monksandmages.com/images/units/alert-feline.webp';
