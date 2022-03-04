import { Board } from './types/board';
import { GameAction } from './types/gameActions';

export interface ServerToClientEvents {
    confirmName: (name: string) => void;
    listRooms: (rooms: DetailedRoom[]) => void;
    startGame: () => void;
    updateBoard: (board: Board) => void;
}

export interface ClientToServerEvents {
    chooseName: (name: string) => void;
    getRooms: () => void;
    joinRoom: (roomName: string) => void;
    startGame: () => void;
    takeGameAction: (gameAction: GameAction) => void;
}

export type DetailedRoom = {
    hasStartedGame?: boolean;
    players: string[];
    roomName: string;
};
