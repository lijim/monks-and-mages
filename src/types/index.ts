import { DeckListSelections } from '../constants/lobbyConstants';
import { Board } from './board';
import { Card, Effect, Skeleton } from './cards';
import { ChatMessage } from './chat';
import { GameAction } from './gameActions';
import { GameResult } from './games';

export interface ServerToClientEvents {
    confirmCustomDeck: (skeleton: Skeleton) => void;
    confirmName: (name: string) => void;
    confirmPremadeDeckList: (deckListSelection?: DeckListSelections) => void;
    displayLastPlayedCard: (card: Card) => void;
    gameChatMessage: (message: ChatMessage) => void;
    listLatestGameResults: (gameResults: GameResult[]) => void;
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
    authorizeToken: (token: string) => void;
    chooseCustomDeck: (skeleton: Skeleton) => void;
    chooseDeck: (deckListSelection: DeckListSelections) => void;
    chooseName: (name: string) => void;
    getRooms: () => void;
    joinRoom: (roomName: string) => void;
    leaveRoom: () => void;
    login: (accessToken: string) => void; // leave the current room
    resolveEffect: ({
        effect,
        playerNames,
        unitCardIds,
    }: ResolveEffectParams) => void;
    sendChatMessage: (message: string) => void;
    spectateRoom: (roomName: string) => void;
    startGame: () => void;
    takeGameAction: (gameAction: GameAction) => void;
}

export type DetailedRoom = {
    hasStartedGame?: boolean;
    players: string[];
    roomName: string;
    spectators: string[];
};
