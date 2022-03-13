import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { getOtherPlayers, getSelfPlayer } from '@/client/redux/selectors';
import { RootState } from '@/client/redux/store';
import { GameState, Player } from '@/types/board';
import { WebSocketContext } from '../WebSockets';
import { GameActionTypes } from '@/types/gameActions';
import { PrimaryColorButton, SecondaryColorButton } from '../Button';
import { Colors } from '@/constants/colors';

export const ACCEPT_MULLIGAN_COPY = 'This hand looks good';
export const REJECT_MULLIGAN_COPY = 'No, send it back (but have 1 fewer card)';

const MulliganPrompt: React.FC = () => {
    const { takeGameAction } = useContext(WebSocketContext);

    const selfPlayer = useSelector<RootState, Player>(getSelfPlayer);
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
    if (selfPlayer.isActivePlayer) {
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
            </>
        );
    }
    const mulliganingPlayer = otherPlayers.find(
        (player) => player.isActivePlayer
    );
    return <>{mulliganingPlayer.name} is deciding whether to keep their hand</>;
};

const CenterPromptBoxContainer = styled.div`
    position: fixed;
    width: 0;
    height: 0;
    display: grid;
    place-items: baseline;
    top: calc(50% - 50px);
    left: 50%;
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
