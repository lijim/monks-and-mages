import {
    makePlayerChatMessage,
    makeSystemChatMessage,
} from './makeChatMessage';

describe('Make chat message', () => {
    it('makes a system chat message', () => {
        const message = makeSystemChatMessage(
            'Make sure to walk around outside and drink water'
        );
        expect(message.message).toBe(
            'Make sure to walk around outside and drink water'
        );
        expect(message.isFromSystem).toBe(true);
    });

    it('makes a player chat message', () => {
        const message = makePlayerChatMessage({
            message: 'Get lots of exercise this week',
            playerName: 'Tommy',
        });
        expect(message).toEqual(
            expect.objectContaining({
                message: 'Get lots of exercise this week',
                isFromSystem: false,
                playerName: 'Tommy',
            })
        );
    });
});
