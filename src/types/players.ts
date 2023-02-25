export type Level = {
    image: string;
    level: number;
    name: string;
    xpRequired: number;
};

export type UserPlayer = {
    createdAt: string;
    exp: number;
    numberOfGamesWon: number;
    uid: string;
    username: string;
};
