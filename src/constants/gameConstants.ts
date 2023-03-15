export enum PlayerConstants {
    MAX_DECK_SIZE = 200,
    STARTING_HEALTH = 20,
    STARTING_HAND_SIZE = 7,
    STARTING_DECK_SIZE = 60,
    STARTING_DECK_SIZE_LIMITED = 40,
}

export const AUTO_RESOLVE_LINGER_DURATION = 1000;

export const DRAFT_PACKS_BY_PLAYER_COUNT: Record<number, number> = {
    2: 9,
    3: 13,
    4: 18,
};

export const DRAFT_PILE_QUANTITY = 4;
export const DRAFT_PILE_STARTING_SIZE = 3;

export const SEALED_PACK_QUANTITY = 7;
