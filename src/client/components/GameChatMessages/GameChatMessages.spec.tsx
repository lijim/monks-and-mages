import { fireEvent, screen } from '@testing-library/react';
import React from 'react';

import { RootState } from '@/client/redux/store';
import { makeNewBoard } from '@/factories/board';
import { makePlayerChatMessage, makeSystemChatMessage } from '@/factories/chat';
import { render } from '@/test-utils';
import { GameChatMessages } from './GameChatMessages';

describe('Game Chat Messages', () => {
    it('displays chat messages', () => {
        const board = makeNewBoard({
            playerNames: ['Tommy', 'Timmy'],
        });
        board.chatLog = [
            makeSystemChatMessage('Tommy played [[Lancer]]'),
            makePlayerChatMessage({
                message: 'This Lancer was so good',
                playerName: 'Tommy',
            }),
        ];

        const preloadedState: Partial<RootState> = {
            user: {
                name: 'Tommy',
            },
            board,
        };
        render(<GameChatMessages />, { preloadedState });

        expect(screen.getByText('Tommy played [[Lancer]]')).toBeInTheDocument();

        expect(
            screen.getByText('Tommy: This Lancer was so good')
        ).toBeInTheDocument();
    });

    it('submits a chat message', () => {
        const board = makeNewBoard({
            playerNames: ['Tommy', 'Timmy'],
        });
        const preloadedState: Partial<RootState> = {
            user: {
                name: 'Tommy',
            },
            board,
        };
        const { webSocket } = render(<GameChatMessages />, { preloadedState });

        fireEvent.change(screen.getByRole('textbox'), {
            target: { value: 'Why is this lancer so expensive' },
        });

        fireEvent.click(screen.getByRole('button'));

        expect(webSocket.sendChatMessage).toHaveBeenCalledWith(
            'Why is this lancer so expensive'
        );
    });
});
