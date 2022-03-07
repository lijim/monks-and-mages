import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { getOtherPlayers, getSelfPlayer } from '@/client/redux/selectors';
import { RootState } from '@/client/redux/store';
import { Colors } from '@/constants/colors';
import { Player } from '@/types/board';
import { SelfPlayerInfo } from '../SelfPlayerInfo';
import { OtherPlayerInfo } from '../OtherPlayerInfo';
import { HandOfCards } from '../HandOfCards';
import { PlayerBoardSection } from '../PlayerBoardSection';

const GameGrid = styled.div`
    width: 100%;
    min-height: 700px;
    height: 100vh;
    display: grid;
    grid-template-columns: 185px 1fr 185px;
`;

const LeftColumn = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr 100px;
    place-items: center;
    z-index: 1;
    background: white;
`;

const CenterColumn = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr 100px;
`;

const RightColumn = styled.div`
    border: 1px solid ${Colors.DARK_BROWN};
`;

export const GameDisplay: React.FC = () => {
    const selfPlayer = useSelector<RootState, Player>(getSelfPlayer);
    const otherPlayers = useSelector<RootState, Player[]>(getOtherPlayers);

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
                <PlayerBoardSection player={selfPlayer} isSelfPlayer />
                <HandOfCards />
            </CenterColumn>
            <RightColumn>Right Chat Column</RightColumn>
        </GameGrid>
    );
};
