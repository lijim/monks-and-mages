export enum PlayerConstants {
    MAX_DECK_SIZE = 200,
    STARTING_HEALTH = 20,
    STARTING_HAND_SIZE = 7,
    STARTING_DECK_SIZE = 60,
}

export const AUTO_RESOLVE_LINGER_DURATION = 1000;

export const DRAFT_PACKS_BY_PLAYER_COUNT: Record<number, number> = {
    2: 6,
    3: 10,
    4: 15,
};

export const DRAFT_PILE_QUANTITY = 4;
export const DRAFT_PILE_STARTING_SIZE = 3;

export const SEALED_PACK_QUANTITY = 6;
