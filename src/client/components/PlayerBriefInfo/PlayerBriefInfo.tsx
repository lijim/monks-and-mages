import React from 'react';
import styled from 'styled-components';

import { Player } from '@/types/board';
import { Colors } from '@/constants/colors';

interface PlayerBriefInfoProps {
    player: Player;
}

interface PlayerBriefBorderProps {
    isActivePlayer: boolean;
}

const PlayerBriefBorder = styled.div<PlayerBriefBorderProps>`
    width: 170px;
    height: 170px;
    border: 6px solid
        ${({ isActivePlayer }) =>
            isActivePlayer ? Colors.FOCUS_BLUE : Colors.DARK_BROWN};
    display: grid;
    grid-auto-rows: auto 1fr auto;
`;

const UpperSection = styled.div`
    font-family: Courier;
    margin-right: 5px;
    text-align: right;
`;

const MiddleSection = styled.div`
    position: relative;
    margin: 5px;
    border: 3px solid ${Colors.DARK_BROWN};
    color: white;
    -webkit-text-stroke: 1px black;
    text-shadow: 0 1px 10px rgb(0, 0, 0, 0.7);
    font-size: 56px;
    display: grid;
    place-items: end;
    ::before {
        content: '';
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: -1;
    }
    ::after {
        content: '';
        position: absolute;
        inset: 0;
        background-image: url('https://images.unsplash.com/photo-1509587961360-de7aff9a662a');
        background-size: contain;
        z-index: -2;
    }
`;

const LowerSection = styled.div`
    text-align: center;
    margin-bottom: 3px;
`;

export const PlayerBriefInfo: React.FC<PlayerBriefInfoProps> = ({ player }) => {
    return (
        <PlayerBriefBorder isActivePlayer={player.isActivePlayer}>
            <UpperSection>
                <b>{player.numCardsInDeck}</b> <span>🂡 (Deck)</span>
                <br></br>
                <b>{player.numCardsInHand}</b> <span>🂡 (Hand)</span>
            </UpperSection>
            <MiddleSection>{`${player.health}`}</MiddleSection>
            <LowerSection>{player.name}</LowerSection>
        </PlayerBriefBorder>
    );
};
