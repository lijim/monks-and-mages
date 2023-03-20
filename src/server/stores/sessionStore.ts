import { DetailedRoomWithBoard } from '@/types';

type Session = {
    connected: boolean;
    userID: string;
    username: string;
};

export const createMemorySessionStore = () => {
    const sessions = new Map<string, Session>();

    const findSession = (sessionID: string) => {
        return sessions.get(sessionID);
    };

    const findUserNameForSession = (sessionID: string) => {
        return findSession(sessionID)?.username;
    };

    const saveSession = (sessionID: string, session: Session) => {
        sessions.set(sessionID, session);
    };

    const findAllSessions = () => {
        return Array.from(sessions.values());
    };

    const isEntireRoomDisconnected = (room: DetailedRoomWithBoard): boolean => {
        if (!room) {
            return false;
        }
        const sessions = findAllSessions();
        const { players } = room;
        console.log(players);
        players.forEach((player) => [
            console.log(
                sessions.find((session) => session.username === player)
            ),
        ]);
        return players.every(
            (player) =>
                !sessions.find((session) => session.username === player)
                    ?.connected
        );
    };

    return {
        findAllSessions,
        findSession,
        findUserNameForSession,
        saveSession,
        isEntireRoomDisconnected,
    };
};
