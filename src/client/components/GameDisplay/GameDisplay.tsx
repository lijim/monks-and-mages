import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import {
    getLastEffectForActivePlayer,
    getOtherPlayers,
    getSelfPlayer,
} from '@/client/redux/selectors';
import { RootState } from '@/client/redux/store';
import { Player } from '@/types/board';
import { SelfPlayerInfo } from '../SelfPlayerInfo';
import { OtherPlayerInfo } from '../OtherPlayerInfo';
import { HandOfCards } from '../HandOfCards';
import { PlayerBoardSection } from '../PlayerBoardSection';
import { Effect } from '@/types/cards';
import { transformEffectToRulesText } from '@/transformers/transformEffectsToRulesText';
import { CenterPromptBox } from '../CenterPromptBox';
import { Colors } from '@/constants/colors';
import { ChatLog } from '@/types/chat';

const GameGrid = styled.div`
    width: 100%;
    min-height: 700px;
    height: 100vh;
    display: grid;
    grid-template-columns: 185px 1fr 185px;
    background-color: gainsboro;
`;

const LeftColumn = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr 100px;
    place-items: center;
    z-index: 1;
    background-color: gainsboro;
`;

const CenterColumn = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr 100px;
`;

const RightColumn = styled.div`
    margin: 4px;
`;

const EmphText = styled.span`
    display: block;
    text-align: center;
    padding: 10px;
    background: brown;
    color: white;
`;

const ChatBox = styled.div`
    padding: 10px;
    margin: 4px;
    background: whitesmoke;
    color: ${Colors.VANTA_BLACK};
    box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
`;

const ChatMessages = styled.div`
    position: absolute;
    height: auto;
    bottom: 0;
    display: flex;
    align-content: flex-end;
    align-items: flex-end;
    flex-direction: column;
    padding: 20px 4px;
    overflow-y: scroll;
`;

/**
 * Shows the entire game board + player information + any visual effects / chat messages
 * needed for the player to understand the game state
 * @returns
 */
export const GameDisplay: React.FC = () => {
    const selfPlayer = useSelector<RootState, Player>(getSelfPlayer);
    const otherPlayers = useSelector<RootState, Player[]>(getOtherPlayers);
    const lastEffect = useSelector<RootState, Effect>(
        getLastEffectForActivePlayer
    );
    const chats = useSelector<RootState, ChatLog>(
        (state) => state.board.chatLog
    );

    return (
        <GameGrid>
            <LeftColumn>
                <section>
                    {otherPlayers.map((player) => (
                        <OtherPlayerInfo key={player.name} player={player} />
                    ))}
                </section>
                <section>
                    <SelfPlayerInfo />
                </section>
                <section></section>
            </LeftColumn>
            <CenterColumn>
                {otherPlayers.map((player) => (
                    <PlayerBoardSection key={player.name} player={player} />
                ))}
                <CenterPromptBox />
                <PlayerBoardSection player={selfPlayer} isSelfPlayer />
                <HandOfCards />
            </CenterColumn>
            <RightColumn>
                {lastEffect && (
                    <EmphText>
                        Resolving: {transformEffectToRulesText(lastEffect)}
                    </EmphText>
                )}
                <ChatMessages>
                    {chats.map(({ id, message }) => (
                        <ChatBox key={id}>{message}</ChatBox>
                    ))}
                </ChatMessages>
            </RightColumn>
        </GameGrid>
    );
};
