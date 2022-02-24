type Chat = {
    dateTime: Date;
    text: string;
};

interface SystemChat extends Chat {
    isFromSystem: true;
}

interface PlayerChat extends Chat {
    isFromSystem: false;
    playerName: string;
}

export type ChatLog = (SystemChat | PlayerChat)[];
