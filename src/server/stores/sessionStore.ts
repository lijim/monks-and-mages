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

    return {
        findAllSessions,
        findSession,
        findUserNameForSession,
        saveSession,
    };
};
