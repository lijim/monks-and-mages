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
import { GameChatMessages } from '../GameChatMessages';

const GameGrid = styled.div`
    width: 100%;
    min-height: 700px;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 185px;
    background-color: gainsboro;
`;

type CenterColumnsProps = {
    isSpectating: boolean;
};

const CenterColumn = styled.div<CenterColumnsProps>`
    display: grid;
    grid-template-rows: 1fr ${({ isSpectating }) =>
            isSpectating ? '100px' : ''};

    section {
        zoom: 0.7;
        grid-gap: 8px;
        place-self: center;
    }
    section.left {
        margin-left: 8px;
    }
    section.right {
        margin-right: 8px;
    }
    .hand-of-cards {
        padding-left: 32px;
    }
`;

const TwoPlayerBoard = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 8px;
`;

// used in 3 / 4 player boards
const TwoBoardsOnSameRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 8px;
`;

const MultiPlayerBoard = styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: 1fr 1fr;
    grid-gap: 8px;
`;

const RightColumn = styled.div`
    margin: 4px;
    display: grid;
    grid-template-rows: auto 1fr;
    overflow-y: hidden;
`;

const EmphText = styled.span`
    display: block;
    text-align: center;
    padding: 10px;
    background: brown;
    color: white;
`;

type GameBoardProps = {
    otherPlayers: Player[];
    selfPlayer: Player;
};

type SpectatorBoardProps = {
    otherPlayers: Player[];
};

const SpectatorBoard: React.FC<SpectatorBoardProps> = ({ otherPlayers }) => {
    if (otherPlayers.length <= 1) {
        return <></>;
    }

    // 2 players
    if (otherPlayers.length === 2) {
        return (
            <TwoPlayerBoard>
                <section className="left">
                    <OtherPlayerInfo
                        key={otherPlayers[0].name}
                        player={otherPlayers[0]}
                    />
                </section>
                <PlayerBoardSection player={otherPlayers[0]} />
                <section className="left">
                    <OtherPlayerInfo
                        key={otherPlayers[1].name}
                        player={otherPlayers[1]}
                    />
                </section>
                <PlayerBoardSection player={otherPlayers[1]} isSelfPlayer />
            </TwoPlayerBoard>
        );
    }

    // 3 players
    if (otherPlayers.length === 3) {
        return (
            <MultiPlayerBoard>
                <section className="left">
                    <OtherPlayerInfo
                        key={otherPlayers[0].name}
                        player={otherPlayers[0]}
                    />
                </section>
                <TwoBoardsOnSameRow>
                    <PlayerBoardSection player={otherPlayers[0]} />
                    <PlayerBoardSection player={otherPlayers[1]} />
                </TwoBoardsOnSameRow>
                <section className="right">
                    <OtherPlayerInfo
                        key={otherPlayers[1].name}
                        player={otherPlayers[1]}
                    />
                </section>
                <section className="left">
                    <OtherPlayerInfo
                        key={otherPlayers[2].name}
                        player={otherPlayers[2]}
                    />
                </section>
                <PlayerBoardSection player={otherPlayers[2]} isSelfPlayer />
            </MultiPlayerBoard>
        );
    }

    if (otherPlayers.length === 4) {
        return (
            <MultiPlayerBoard>
                <section className="left">
                    <OtherPlayerInfo
                        key={otherPlayers[0].name}
                        player={otherPlayers[0]}
                    />
                </section>
                <TwoBoardsOnSameRow>
                    <PlayerBoardSection player={otherPlayers[0]} />
                    <PlayerBoardSection player={otherPlayers[1]} />
                </TwoBoardsOnSameRow>
                <section className="right">
                    <OtherPlayerInfo
                        key={otherPlayers[1].name}
                        player={otherPlayers[1]}
                    />
                </section>
                <section className="left">
                    <OtherPlayerInfo
                        key={otherPlayers[3].name}
                        player={otherPlayers[3]}
                    />
                </section>
                <TwoBoardsOnSameRow>
                    <PlayerBoardSection player={otherPlayers[3]} isSelfPlayer />
                    <PlayerBoardSection player={otherPlayers[2]} />
                </TwoBoardsOnSameRow>

                <section className="left">
                    <OtherPlayerInfo
                        key={otherPlayers[2].name}
                        player={otherPlayers[2]}
                    />
                </section>
            </MultiPlayerBoard>
        );
    }

    return <></>;
};

const GameBoard: React.FC<GameBoardProps> = ({ otherPlayers, selfPlayer }) => {
    if (otherPlayers.length === 0) {
        return <PlayerBoardSection player={selfPlayer} isSelfPlayer />;
    }

    // 2 players
    if (otherPlayers.length === 1) {
        return (
            <TwoPlayerBoard>
                <section className="left">
                    <OtherPlayerInfo
                        key={otherPlayers[0].name}
                        player={otherPlayers[0]}
                    />
                </section>
                <PlayerBoardSection player={otherPlayers[0]} />
                <section className="left">
                    <SelfPlayerInfo />
                </section>
                <PlayerBoardSection player={selfPlayer} isSelfPlayer />
            </TwoPlayerBoard>
        );
    }

    // 3 players
    if (otherPlayers.length === 2) {
        return (
            <MultiPlayerBoard>
                <section className="left">
                    <OtherPlayerInfo
                        key={otherPlayers[0].name}
                        player={otherPlayers[0]}
                    />
                </section>
                <TwoBoardsOnSameRow>
                    <PlayerBoardSection player={otherPlayers[0]} />
                    <PlayerBoardSection player={otherPlayers[1]} />
                </TwoBoardsOnSameRow>
                <section className="right">
                    <OtherPlayerInfo
                        key={otherPlayers[1].name}
                        player={otherPlayers[1]}
                    />
                </section>
                <section className="left">
                    <SelfPlayerInfo />
                </section>
                <PlayerBoardSection player={selfPlayer} isSelfPlayer />
            </MultiPlayerBoard>
        );
    }

    if (otherPlayers.length === 3) {
        return (
            <MultiPlayerBoard>
                <section className="left">
                    <OtherPlayerInfo
                        key={otherPlayers[0].name}
                        player={otherPlayers[0]}
                    />
                </section>
                <TwoBoardsOnSameRow>
                    <PlayerBoardSection player={otherPlayers[0]} />
                    <PlayerBoardSection player={otherPlayers[1]} />
                </TwoBoardsOnSameRow>
                <section className="right">
                    <OtherPlayerInfo
                        key={otherPlayers[1].name}
                        player={otherPlayers[1]}
                    />
                </section>
                <section className="left">
                    <SelfPlayerInfo />
                </section>
                <TwoBoardsOnSameRow>
                    <PlayerBoardSection player={selfPlayer} isSelfPlayer />
                    <PlayerBoardSection player={otherPlayers[2]} />
                </TwoBoardsOnSameRow>

                <section className="left">
                    <OtherPlayerInfo
                        key={otherPlayers[2].name}
                        player={otherPlayers[2]}
                    />
                </section>
            </MultiPlayerBoard>
        );
    }

    return <></>;
};

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

    return (
        <GameGrid>
            <CenterColumn isSpectating={!!selfPlayer}>
                {selfPlayer ? (
                    <GameBoard
                        otherPlayers={otherPlayers}
                        selfPlayer={selfPlayer}
                    />
                ) : (
                    <SpectatorBoard otherPlayers={otherPlayers} />
                )}

                <CenterPromptBox />
                <HandOfCards />
            </CenterColumn>
            <RightColumn>
                <div>
                    {lastEffect && (
                        <EmphText>
                            Resolving: {transformEffectToRulesText(lastEffect)}
                        </EmphText>
                    )}
                </div>
                <GameChatMessages />
            </RightColumn>
        </GameGrid>
    );
};
