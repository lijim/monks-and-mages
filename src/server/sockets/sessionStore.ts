type Session = {
    connected: boolean;
    userID: string;
    username: string;
};

export const createMemorySessionStore = () => {
    const sessions = new Map<string, Session>();

    const findSession = (id: string) => {
        return sessions.get(id);
    };

    const saveSession = (id: string, session: Session) => {
        sessions.set(id, session);
    };

    const findAllSessions = () => {
        return Array.from(sessions.values());
    };

    return { findSession, saveSession, findAllSessions };
};
