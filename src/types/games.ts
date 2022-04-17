export type GameResult = {
    id: string;
    nonWinners: string[];
    result: 'TIE' | 'WIN';
    winners: string[];
};

export enum Format {
    SINGLETON = 'SINGLETON',
    STANDARD = 'STANDARD',
}
