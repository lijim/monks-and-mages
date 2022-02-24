interface ServerToClientEvents {
    basicEmit: (a: number, b: string, c: Buffer) => void;
    chatMessage: (input: string) => void;
    noArg: () => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
    chatMessage: (input: string) => void;
    hello: () => void;
}

interface InterServerEvents {
    ping: () => void;
}
