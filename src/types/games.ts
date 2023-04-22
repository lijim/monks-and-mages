export type GameResult = {
    id: string;
    nonWinners: string[];
    result: 'TIE' | 'WIN';
    winners: string[];
};

export enum Format {
    DRAFT = 'Draft',
    LEGENDARY_LEAGUE = 'Legendary League 🎖️',
    SEALED = 'Sealed',
    SINGLETON = 'Singleton',
    STANDARD = 'Standard',
}

export const isFormatConstructed = (format: Format) =>
    [Format.SINGLETON, Format.STANDARD, Format.LEGENDARY_LEAGUE].includes(
        format
    );
