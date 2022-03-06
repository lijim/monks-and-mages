import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { getOtherPlayers } from '@/client/redux/selectors';
import { RootState } from '@/client/redux/store';
import { Colors } from '@/constants/colors';
import { Player } from '@/types/board';
import { SelfPlayerInfo } from '../SelfPlayerInfo';
import { OtherPlayerInfo } from '../OtherPlayerInfo';
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

const OtherPlayerBoard = styled.div`
    background-color: ${Colors.FELT_GREEN};
`;

const SelfPlayerBoard = styled.div`
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
                        <OtherPlayerInfo key={player.name} player={player} />
                    ))}
                </section>
                <section>
                    <SelfPlayerInfo />
                </section>
                <section></section>
            </LeftColumn>
            <CenterColumn>
                <OtherPlayerBoard />
                <SelfPlayerBoard />
                <HandOfCards />
            </CenterColumn>
            <RightColumn>Right Chat Column</RightColumn>
        </GameGrid>
    );
};
