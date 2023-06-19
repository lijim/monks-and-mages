import { Board } from '@/types/board';

type Params = {
    board: Board;
    id: string;
};

export const findCardByIdOnBoard = ({ board, id }: Params) => {
    return board.players
        .flatMap((player) => [
            ...player.cemetery,
            ...player.hand,
            ...player.deck,
            ...player.units,
        ])
        .find((card) => card.id === id);
};
