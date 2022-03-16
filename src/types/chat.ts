type Chat = {
    dateTime: Date;
    id: string;
    message: string;
};

export interface SystemChat extends Chat {
    isFromSystem: true;
}

interface PlayerChat extends Chat {
    isFromSystem: false;
    playerName: string;
}

export type ChatLog = (SystemChat | PlayerChat)[];
