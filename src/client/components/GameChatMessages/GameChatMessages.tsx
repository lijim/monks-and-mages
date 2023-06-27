import React, { FormEvent, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Colors } from '@/constants/colors';
import { RootState } from '@/client/redux/store';
import { ChatLog } from '@/types/chat';
import { WebSocketContext } from '../WebSockets';

const ChatBox = styled.div`
    padding: 10px;
    margin: 4px;
    background: whitesmoke;
    color: ${Colors.VANTA_BLACK};
    box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
    font-family: 'Quattrocento', serif;
`;

const ChatContainer = styled.div`
    display: grid;
    grid-template-rows: 1fr auto;
    overflow-y: hidden;
    padding: 2px;
`;

const ChatMessages = styled.div`
    height: calc(100% - 40px);
    bottom: 0;
    display: flex;
    align-content: flex-end;
    align-items: flex-end;
    flex-direction: column;
    overflow-y: scroll;
    overscroll-behavior-y: contain;
    scroll-snap-type: y proximity;

    div:last-child {
        scroll-snap-align: end;
    }
`;

const ChatForm = styled.form`
    display: grid;
    gap: 4px;
`;

const ChatLabel = styled.label`
    color: ${Colors.VANTA_BLACK};
    background: white;
    padding: 3px;
`;

export const GameChatMessages: React.FC = () => {
    const { sendChatMessage } = useContext(WebSocketContext);
    const [playerMessage, setPlayerMessage] = useState('');
    const chats = useSelector<RootState, ChatLog>(
        (state) => state.board.chatLog || []
    );

    const submitPlayerMessage = (event: FormEvent) => {
        event.preventDefault();
        if (playerMessage) sendChatMessage(playerMessage);
        return false;
    };

    return (
        <ChatContainer>
            <ChatMessages>
                {chats.map(({ id, message, playerName }) => (
                    <ChatBox key={id}>
                        {playerName && `${playerName}: `}
                        {message}
                    </ChatBox>
                ))}
            </ChatMessages>
            <ChatForm onSubmit={submitPlayerMessage}>
                <ChatLabel htmlFor="chat">Enter Chat Messages:</ChatLabel>
                <input
                    id="chat"
                    type="text"
                    role="textbox"
                    value={playerMessage}
                    onChange={(event) => {
                        setPlayerMessage(event.target.value);
                    }}
                />
                <button type="submit" role="button">
                    Send
                </button>
            </ChatForm>
        </ChatContainer>
    );
};
