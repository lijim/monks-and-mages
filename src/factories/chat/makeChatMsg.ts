import { v4 as uuidv4 } from 'uuid';

import { SystemChat } from '@/types/chat';

export const makeSystemChatMsg = (message: string): SystemChat => {
    return {
        message,
        isFromSystem: true,
        dateTime: new Date(),
        id: uuidv4(),
    };
};