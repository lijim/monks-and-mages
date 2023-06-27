import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'redux-first-history';
import styled from 'styled-components';

import { getOtherPlayers, getSelfPlayer } from '@/client/redux/selectors';
import { RootState } from '@/client/redux/store';
import { GameState, Player } from '@/types/board';
import { WebSocketContext } from '../WebSockets';
import { GameActionTypes } from '@/types/gameActions';
import { PrimaryColorButton, SecondaryColorButton } from '../Button';
import { Colors } from '@/constants/colors';
import { PlayerConstants } from '@/constants/gameConstants';

export const ACCEPT_MULLIGAN_COPY = 'This hand looks good';
export const REJECT_MULLIGAN_COPY = 'No, send it back (but have 1 fewer card)';

const MulliganPrompt: React.FC = () => {
    const { takeGameAction } = useContext(WebSocketContext);

    const selfPlayer: Player = useSelector<RootState, Player>(getSelfPlayer);
    const otherPlayers = useSelector<RootState, Player[]>(getOtherPlayers);
    const isMulliganing = useSelector<RootState, boolean>(
        (state) => state.board.gameState === GameState.MULLIGANING
    );

    const acceptMulligan = () => {
        takeGameAction({
            type: GameActionTypes.ACCEPT_MULLIGAN,
        });
    };
    const rejectMulligan = () => {
        takeGameAction({
            type: GameActionTypes.REJECT_MULLIGAN,
        });
    };

    if (!isMulliganing) return null;
    if (selfPlayer?.isActivePlayer) {
        return (
            <>
                <div>
                    <PrimaryColorButton onClick={acceptMulligan}>
                        {ACCEPT_MULLIGAN_COPY}
                    </PrimaryColorButton>
                </div>
                <hr style={{ visibility: 'hidden' }} />
                <div>
                    <SecondaryColorButton onClick={rejectMulligan}>
                        {REJECT_MULLIGAN_COPY}
                    </SecondaryColorButton>
                </div>
                <hr style={{ visibility: 'hidden' }} />
                <span>
                    Players going to {PlayerConstants.STARTING_HAND_SIZE - 2}{' '}
                    cards or below draw an extra card to make up for their bad
                    luck
                </span>
            </>
        );
    }
    const mulliganingPlayer = otherPlayers.find(
        (player) => player.isActivePlayer
    );
    return (
        <>{mulliganingPlayer?.name} is deciding whether to keep their hand</>
    );
};

const GameOverPrompt: React.FC = () => {
    const dispatch = useDispatch();
    const { leaveRoom } = useContext(WebSocketContext);

    const gameWinner = useSelector<RootState, string>(
        (state) => state.board.players.find((player) => player.isAlive)?.name
    );

    const gameOverCopy = gameWinner
        ? `Game over - ${gameWinner} won`
        : 'Game over (tie)';
    const returnToLobby = () => {
        dispatch(push('/'));
        leaveRoom();
    };

    return (
        <>
            <div>
                {gameOverCopy}
                <br />
                <PrimaryColorButton onClick={returnToLobby}>
                    Return to Lobby
                </PrimaryColorButton>
            </div>
        </>
    );
};

const CenterPromptBoxContainer = styled.div`
    position: fixed;
    width: 0;
    height: 0;
    display: grid;
    place-items: baseline;
    top: calc(50% - 112.5px);
    left: calc(50% - 45px);
    text-align: center;
`;

const CenterPromptBoxInnerContainer = styled.div`
    padding: 20px;
    width: 550px;
    background: ${Colors.MAROON};
    color: white;
    transform: translateY(-50%) translateX(-50%); ;
`;

export const CenterPromptBox: React.FC = () => {
    const isMulliganing = useSelector<RootState, boolean>(
        (state) => state.board.gameState === GameState.MULLIGANING
    );

    const isGameOver = useSelector<RootState, boolean>(
        (state) =>
            state.board.gameState === GameState.WIN ||
            state.board.gameState === GameState.TIE
    );

    if (isGameOver) {
        return (
            <CenterPromptBoxContainer>
                <CenterPromptBoxInnerContainer>
                    <GameOverPrompt />
                </CenterPromptBoxInnerContainer>
            </CenterPromptBoxContainer>
        );
    }

    if (isMulliganing) {
        return (
            <CenterPromptBoxContainer>
                <CenterPromptBoxInnerContainer>
                    <MulliganPrompt />
                </CenterPromptBoxInnerContainer>
            </CenterPromptBoxContainer>
        );
    }
    return <></>;
};
