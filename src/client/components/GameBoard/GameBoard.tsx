import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { getOtherPlayers } from '@/client/redux/selectors';
import { RootState } from '@/client/redux/store';
import { Player } from '@/types/board';
import { SelfPlayerBoard } from '../SelfPlayerBoard';
import { OtherPlayerBoard } from '../OtherPlayerBoard';

const GameGrid = styled.div`
    width: 100%;
    min-height: 700px;
    height: 100vh;
    display: grid;
    grid-auto-rows: 1fr 1fr;
`;

// TODO: reanme to GameDisplay
export const GameBoard: React.FC = () => {
    const otherPlayers = useSelector<RootState, Player[]>(getOtherPlayers);

    return (
        <GameGrid>
            <section>
                {otherPlayers.map((player) => (
                    <OtherPlayerBoard key={player.name} player={player} />
                ))}
            </section>
            <section>
                <SelfPlayerBoard />
            </section>
        </GameGrid>
    );
};
