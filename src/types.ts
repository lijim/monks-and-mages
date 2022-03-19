import { DeckListSelections } from './constants/lobbyConstants';
import { Board } from './types/board';
import { Effect } from './types/cards';
import { ChatMessage } from './types/chat';
import { GameAction } from './types/gameActions';

export interface ServerToClientEvents {
    confirmName: (name: string) => void;
    gameChatMessage: (message: ChatMessage) => void;
    listRooms: (rooms: DetailedRoom[]) => void;
    startGame: () => void;
    updateBoard: (board: Board) => void;
}

export interface ResolveEffectParams {
    effect: Effect;
    playerNames?: string[];
    unitCardIds?: string[];
}

export interface ClientToServerEvents {
    chooseDeck: (deckListSelection: DeckListSelections) => void;
    chooseName: (name: string) => void;
    getRooms: () => void;
    joinRoom: (roomName: string) => void;
    resolveEffect: ({
        effect,
        playerNames,
        unitCardIds,
    }: ResolveEffectParams) => void;
    startGame: () => void;
    takeGameAction: (gameAction: GameAction) => void;
}

export type DetailedRoom = {
    hasStartedGame?: boolean;
    players: string[];
    roomName: string;
};
