export type GameResult = {
    id: string;
    nonWinners: string[];
    result: 'TIE' | 'WIN';
    winners: string[];
};
