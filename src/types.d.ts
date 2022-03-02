interface ServerToClientEvents {
    confirmName: (name: string) => void;
    listRooms: (rooms: DetailedRoom[]) => void;
    startGame: () => void;
}

interface ClientToServerEvents {
    chooseName: (name: string) => void;
    getRooms: () => void;
    joinRoom: (roomName: string) => void;
    startGame: () => void;
}

type DetailedRoom = {
    hasStartedGame?: boolean;
    players: string[];
    roomName: string;
};
