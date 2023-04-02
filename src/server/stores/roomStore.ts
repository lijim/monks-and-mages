import { Server } from 'socket.io';
import {
    DEFAULT_ROOM_NAMES,
    DeckListSelections,
    PLAYER_ROOM_PREFIX,
    SPECTATOR_ROOM_PREFIX,
} from '@/constants/lobbyConstants';
import {
    ClientToServerEvents,
    DetailedRoom,
    DetailedRoomWithBoard,
    ResolveEffectParams,
    ServerToClientEvents,
} from '@/types';
import { Format, GameResult } from '@/types/games';
import { ExtendedSocket } from '../authorize';
import { createMemorySessionStore } from './sessionStore';
import { obscureBoardInfo } from '../obscureBoardInfo';
import { Card, Skeleton } from '@/types/cards';
import {
    calculateGameResult,
    makeNewBoard,
    makeSystemChatMessage,
} from '@/factories';
import { GameState } from '@/types/board';
import { applyGameAction, applyWinState, passTurn } from '../gameEngine';
import { GameAction } from '@/types/gameActions';
import { resolveEffect } from '../resolveEffect';

const createRoomFromScratch = (roomName: string): DetailedRoomWithBoard => ({
    roomName,
    players: [],
    hasStartedGame: false,
    spectators: [],
    board: null,
    avatarsForPlayers: {},
    format: Format.STANDARD,
});

type CreateRoomStoreArgs = {
    io: Server<ClientToServerEvents, ServerToClientEvents>;
    sessionStore: ReturnType<typeof createMemorySessionStore>;
};

export const createRoomStore = ({ sessionStore, io }: CreateRoomStoreArgs) => {
    let detailedRooms: DetailedRoomWithBoard[] = DEFAULT_ROOM_NAMES.map(
        (roomName) => createRoomFromScratch(roomName)
    );

    const namesToAvatars = new Map<string, string>(); // usernames to avatars chosen
    const nameToDeckListSelection = new Map<string, DeckListSelections>();
    const nameToCustomDeckSkeleton = new Map<string, Skeleton>();

    const getRoomNameForSocket = (
        socket: ExtendedSocket<ClientToServerEvents, ServerToClientEvents>
    ): string | null => {
        return detailedRooms.find(
            (room) =>
                room.players.includes(socket.username) ||
                room.spectators.includes(socket.username)
        )?.roomName;
    };

    const getDetailedRooms = (): DetailedRoom[] => {
        return detailedRooms.map((room) => {
            const { board, ...rest } = room;
            return rest;
        });
    };

    const getDeckListSelectionsFromNames = (playerNames: string[]) => {
        return playerNames.map((playerName) =>
            nameToDeckListSelection.get(playerName)
        );
    };

    const broadcastRooms = () => {
        io.emit('listRooms', getDetailedRooms());
    };

    const broadcastRoomsForSocket = (
        socket: ExtendedSocket<ClientToServerEvents, ServerToClientEvents>
    ) => {
        socket.emit('listRooms', getDetailedRooms());
    };

    const broadcastBoardForRoom = async (roomName: string) => {
        const board = detailedRooms.find(
            (room) => room.roomName === roomName
        )?.board;
        if (!board) {
            return;
        }
        const allSocketsInRoom = await io
            .in(`${PLAYER_ROOM_PREFIX}${roomName}`)
            .fetchSockets();
        allSocketsInRoom.forEach((socket) => {
            const name = (
                socket as unknown as ExtendedSocket<
                    ClientToServerEvents,
                    ServerToClientEvents
                >
            ).username;
            if (!name) return;
            io.to(socket.id).emit('updateBoard', obscureBoardInfo(board, name));
        });
        // broadcast to spectators as well
        io.to(`${SPECTATOR_ROOM_PREFIX}${roomName}`).emit(
            'updateBoard',
            obscureBoardInfo(board)
        );
    };

    const sendChatMessageForRoom =
        (socket: ExtendedSocket<ClientToServerEvents, ServerToClientEvents>) =>
        (chatMessage: string) => {
            const roomName = getRoomNameForSocket(socket);
            const systemMessage = makeSystemChatMessage(chatMessage);
            io.sockets
                .in(`${PLAYER_ROOM_PREFIX}${roomName}`)
                .emit('gameChatMessage', systemMessage);
            io.to(`${SPECTATOR_ROOM_PREFIX}${roomName}`).emit(
                'gameChatMessage',
                systemMessage
            );
        };

    const displayLastPlayedCardForRoom =
        (socket: ExtendedSocket<ClientToServerEvents, ServerToClientEvents>) =>
        (card: Card) => {
            const roomName = getRoomNameForSocket(socket);
            io.sockets
                .in(`${PLAYER_ROOM_PREFIX}${roomName}`)
                .emit('displayLastPlayedCard', card);
            io.to(`${SPECTATOR_ROOM_PREFIX}${roomName}`).emit(
                'displayLastPlayedCard',
                card
            );
        };

    const getCurrentRoom = (
        socket: ExtendedSocket<ClientToServerEvents, ServerToClientEvents>
    ) => {
        const username = sessionStore.findUserNameForSession(socket.sessionID);
        if (!username) {
            return null;
        }
        return detailedRooms.find(
            (room) =>
                room.players.includes(username) ||
                room.spectators.includes(username)
        );
    };

    const chooseGameFormat = (
        socket: ExtendedSocket<ClientToServerEvents, ServerToClientEvents>,
        format: Format
    ) => {
        const room = getCurrentRoom(socket);
        room.format = format;
    };

    const disconnectSocketFromRoom = (
        socket: ExtendedSocket<ClientToServerEvents, ServerToClientEvents>
    ) => {
        const roomNameToLeave = getRoomNameForSocket(socket);
        socket.leave(`${PLAYER_ROOM_PREFIX}${roomNameToLeave}`);
        socket.leave(`${SPECTATOR_ROOM_PREFIX}${roomNameToLeave}`);

        const room = getCurrentRoom(socket);
        const username = sessionStore.findUserNameForSession(socket.sessionID);
        if (!room || !username) {
            return;
        }
        room.players = room.players.filter(
            (playerName) => playerName !== username
        );
        room.spectators = room.spectators.filter(
            (spectatorName) => spectatorName !== username
        );
        const { roomName } = room;

        if (room.players.length === 0 && room.spectators.length === 0) {
            // remove room
            detailedRooms = detailedRooms.filter(
                (detailedRoom) => detailedRoom.roomName !== roomName
            );
            // create the default room again
            if (DEFAULT_ROOM_NAMES.includes(roomName)) {
                detailedRooms.push(createRoomFromScratch(roomName));
            }
        }
    };

    type JoinRoomParams = {
        asSpectator: boolean;
        roomName: string;
        socket: ExtendedSocket<ClientToServerEvents, ServerToClientEvents>;
    };
    const joinRoom = ({ socket, roomName, asSpectator }: JoinRoomParams) => {
        const username = sessionStore.findUserNameForSession(socket.sessionID);
        if (!username) {
            return;
        }
        // first disconnect from previous rooms
        const prevRoom = getCurrentRoom(socket);
        if (prevRoom) {
            disconnectSocketFromRoom(socket);
        }

        // create or connect to a new room
        const matchingRoom = detailedRooms.find(
            (room) => room.roomName === roomName
        );
        if (matchingRoom) {
            const arrayToPushTo = asSpectator
                ? matchingRoom.spectators
                : matchingRoom.players;
            arrayToPushTo.push(username);
        } else {
            const newRoom = createRoomFromScratch(roomName);
            const arrayToPushTo = asSpectator
                ? newRoom.spectators
                : newRoom.players;
            arrayToPushTo.push(username);
            detailedRooms.push(newRoom);
        }
    };

    const startGameForSocket = async (
        socket: ExtendedSocket<ClientToServerEvents, ServerToClientEvents>
    ) => {
        const room = getCurrentRoom(socket);
        if (!room) return;

        const playerNames = room.players;

        const avatarsForPlayers = {} as DetailedRoom['avatarsForPlayers'];
        playerNames.forEach((player) => {
            avatarsForPlayers[player] = namesToAvatars.get(player);
        });
        const playerDeckListSelections =
            getDeckListSelectionsFromNames(playerNames);
        const { format } = room;

        const board = makeNewBoard({
            playerDeckListSelections,
            playerNames,
            nameToCustomDeckSkeleton,
            avatarsForPlayers,
            format,
        });

        if (format === Format.DRAFT) {
            board.gameState = GameState.DRAFTING;
        } else if (format === Format.SEALED) {
            board.gameState = GameState.DECKBUILDING;
        } else {
            board.gameState = GameState.MULLIGANING;
        }

        room.board = board;
        room.hasStartedGame = true;
        io.to(`${PLAYER_ROOM_PREFIX}${room.roomName}`).emit('startGame');
        io.to(`${SPECTATOR_ROOM_PREFIX}${room.roomName}`).emit('startGame');
        await broadcastBoardForRoom(room.roomName);
    };

    type TakeGameActionParams = {
        addGameResult: (gameResult: GameResult | null) => void;
        gameAction: GameAction;
        recordGameResultToDatabase: (
            gameResult: GameResult | null
        ) => Promise<void>;
        socket: ExtendedSocket<ClientToServerEvents, ServerToClientEvents>;
    };
    const takeGameAction = async ({
        socket,
        gameAction,
        addGameResult,
        recordGameResultToDatabase,
    }: TakeGameActionParams) => {
        const room = getCurrentRoom(socket);
        if (!room) return;
        const { board } = room;
        const playerName = socket.username;
        if (!board || !playerName) {
            // TODO: add error handling emits down to the client, display via error toasts
            return;
        }

        const prevGameState = board.gameState;

        if (
            prevGameState === GameState.WIN ||
            prevGameState === GameState.TIE
        ) {
            return;
        }

        const newBoardState = applyGameAction({
            board,
            gameAction,
            playerName,
            addChatMessage: sendChatMessageForRoom(socket),
            displayLastCard: displayLastPlayedCardForRoom(socket),
        }); // calculate new state after actions is taken
        const gameResult = calculateGameResult(prevGameState, newBoardState);
        if (gameResult) {
            addGameResult(gameResult);
            recordGameResultToDatabase(gameResult);
        }

        // TODO: add error handling when user tries to take an invalid action
        room.board = newBoardState; // apply state changes to in-memory storage of boards
        await broadcastBoardForRoom(room.roomName);
    };

    type ResolveEffectForSocketParams = {
        addGameResult: (gameResult: GameResult | null) => void;
        effectParams: ResolveEffectParams;
        recordGameResultToDatabase: (
            gameResult: GameResult | null
        ) => Promise<void>;
        socket: ExtendedSocket<ClientToServerEvents, ServerToClientEvents>;
    };
    const resolveEffectForSocket = async ({
        socket,
        effectParams,
        addGameResult,
        recordGameResultToDatabase,
    }: ResolveEffectForSocketParams) => {
        const room = getCurrentRoom(socket);
        if (!room) return;
        const { board } = room;
        const playerName = socket.username;

        if (!board) return;

        const prevGameState = board.gameState;

        if (
            prevGameState === GameState.WIN ||
            prevGameState === GameState.TIE
        ) {
            return;
        }

        const newBoardState = resolveEffect(
            board,
            effectParams,
            playerName,
            true,
            sendChatMessageForRoom(socket)
        );

        if (newBoardState) {
            const gameResult = calculateGameResult(
                prevGameState,
                newBoardState
            );
            if (gameResult) {
                addGameResult(gameResult);
                recordGameResultToDatabase(gameResult);
            }
        }

        // TODO: add error handling when user tries to take an invalid action
        if (newBoardState) {
            room.board = newBoardState; // apply state changes to in-memory storage of boards
        }
        await broadcastBoardForRoom(room.roomName);
    };

    type DisconnectFromGameParams = {
        addGameResult: (gameResult: GameResult | null) => void;
        socket: ExtendedSocket<ClientToServerEvents, ServerToClientEvents>;
    };
    const disconnectFromGame = async ({
        socket,
        addGameResult,
    }: DisconnectFromGameParams) => {
        const room = getCurrentRoom(socket);
        if (!room) {
            return;
        }
        const { board, roomName } = room;
        const name = socket.username;
        if (board) {
            const player = board.players.find((p) => p.name === name);

            if (player) {
                sendChatMessageForRoom(socket)(
                    `${player.name} has left the game`
                );
                player.health = 0;
                player.isAlive = false;
                player.effectQueue = [];
            }

            if (player?.isActivePlayer) {
                passTurn(board);
            }

            const playerLeft = board.players.find((p) => p.isAlive);
            // update win state if there are only 1 players alive left
            const prevGameState = board.gameState;
            applyWinState(board);
            const gameResult = calculateGameResult(prevGameState, board);
            addGameResult(gameResult);
            if (!playerLeft) {
                room.hasStartedGame = false;
                room.board = null;
            } else {
                await broadcastBoardForRoom(roomName);
            }
        }
    };

    /**
     * Remove an entire room, including the boards and players associated with it
     * @param roomName - room name to remove
     */
    const removeRoomEntirely = (roomName: string) => {
        const matchingRoomIndex = detailedRooms.findIndex(
            (room) => room.roomName === roomName
        );
        if (matchingRoomIndex < 0) {
            return;
        }
        if (DEFAULT_ROOM_NAMES.includes(roomName)) {
            detailedRooms[matchingRoomIndex] = createRoomFromScratch(roomName);
        } else {
            detailedRooms = detailedRooms.splice(matchingRoomIndex, 1);
        }
    };

    return {
        joinRoom,
        broadcastRooms,
        broadcastRoomsForSocket,
        broadcastBoardForRoom,
        disconnectSocketFromRoom,
        getRoomNameForSocket,
        getCurrentRoom,
        chooseGameFormat,
        namesToAvatars,
        nameToDeckListSelection,
        nameToCustomDeckSkeleton,
        startGameForSocket,
        takeGameAction,
        resolveEffectForSocket,
        disconnectFromGame,
        removeRoomEntirely,
    };
};
