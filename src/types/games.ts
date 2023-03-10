export type GameResult = {
    id: string;
    nonWinners: string[];
    result: 'TIE' | 'WIN';
    winners: string[];
};

export enum Format {
    DRAFT = 'Draft',
    SEALED = 'Sealed',
    SINGLETON = 'Singleton',
    STANDARD = 'Standard',
}

export const isFormatConstructed = (format: Format) =>
    [Format.SINGLETON, Format.STANDARD].includes(format);
