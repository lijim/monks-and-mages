export type GameResult = {
    id: string;
    nonWinners: string[];
    result: 'TIE' | 'WIN';
    winners: string[];
};

export enum Format {
    DRAFT = 'DRAFT',
    SEALED = 'SEALED',
    SINGLETON = 'SINGLETON',
    STANDARD = 'STANDARD',
}

export const isFormatConstructed = (format: Format) =>
    [Format.SINGLETON, Format.STANDARD].includes(format);
