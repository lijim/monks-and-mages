import { v4 as uuidv4 } from 'uuid';

import { SystemChat, PlayerChat } from '@/types/chat';

export const makeSystemChatMessage = (message: string): SystemChat => {
    return {
        message,
        isFromSystem: true,
        dateTime: new Date(),
        id: uuidv4(),
    };
};

type MakePlayerChatMessageParams = {
    message: string;
    playerName: string;
};

export const makePlayerChatMessage = ({
    message,
    playerName,
}: MakePlayerChatMessageParams): PlayerChat => {
    return {
        message,
        isFromSystem: false,
        playerName,
        dateTime: new Date(),
        id: uuidv4(),
    };
};
