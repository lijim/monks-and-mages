import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { getOtherPlayers } from '@/client/redux/selectors';
import { RootState } from '@/client/redux/store';
import { Colors } from '@/constants/colors';
import { Player } from '@/types/board';
import { SelfPlayerBoard } from '../SelfPlayerBoard';
import { OtherPlayerBoard } from '../OtherPlayerBoard';
import { HandOfCards } from '../HandOfCards';

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
`;

const CenterColumn = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr 100px;
`;

// TODO: rename OtherPlayerBoard to OtherPlayerInfo, rename OtherPlayerBoardSection to OtherPlayerBoard
const OtherPlayerBoardSection = styled.div`
    background-color: ${Colors.FELT_GREEN};
`;

// TODO: rename SelfPlayerBoard to SelfPlayerInfo, rename SelfPlayerBoardSection to SelfPlayerBoard
const SelfPlayerBoardSection = styled.div`
    background-color: ${Colors.FELT_GREEN_ALT};
`;

const RightColumn = styled.div`
    border: 1px solid ${Colors.DARK_BROWN};
`;

export const GameDisplay: React.FC = () => {
    const otherPlayers = useSelector<RootState, Player[]>(getOtherPlayers);

    return (
        <GameGrid>
            <LeftColumn>
                <section>
                    {otherPlayers.map((player) => (
                        <OtherPlayerBoard key={player.name} player={player} />
                    ))}
                </section>
                <section>
                    <SelfPlayerBoard />
                </section>
                <section></section>
            </LeftColumn>
            <CenterColumn>
                <OtherPlayerBoardSection>
                    Other Player Board
                </OtherPlayerBoardSection>
                <SelfPlayerBoardSection>
                    Self Player Board
                </SelfPlayerBoardSection>
                <HandOfCards />
            </CenterColumn>
            <RightColumn>Right Chat Column</RightColumn>
        </GameGrid>
    );
};
