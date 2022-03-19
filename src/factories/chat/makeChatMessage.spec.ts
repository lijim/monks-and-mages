import { makeSystemChatMessage } from './makeChatMessage';

describe('Make chat message', () => {
    it('makes a chat message', () => {
        const message = makeSystemChatMessage(
            'Make sure to walk around outside and drink water'
        );
        expect(message.message).toBe(
            'Make sure to walk around outside and drink water'
        );
        expect(message.isFromSystem).toBe(true);
    });
});
