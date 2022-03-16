import { makeSystemChatMsg } from './makeChatMsg';

describe('Make chat message', () => {
    it('makes a chat message', () => {
        const msg = makeSystemChatMsg(
            'Make sure to walk around outside and drink water'
        );
        expect(msg.message).toBe(
            'Make sure to walk around outside and drink water'
        );
        expect(msg.isFromSystem).toBe(true);
    });
});
