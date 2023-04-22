import React, { useContext } from 'react';
import styled from 'styled-components';

import { Player } from '@/types/board';
import { Colors } from '@/constants/colors';
import { CastingCostFrame } from '../CastingCost';
import { Resource, RESOURCE_GLOSSARY } from '@/types/resources';
import { GameManagerContext } from '../GameManager';
import { DEFAULT_AVATAR } from '@/types/players';
import { CardGridItem } from '../CardGridItem';
import { LegendaryLeaderZone } from '../LegendaryLeaderZone';

interface PlayerBriefInfoProps {
    player: Player;
}

interface PlayerBriefContainerProps {
    displayLegendaryLeader: boolean;
    isActivePlayer: boolean;
}

const PlayerBriefContainer = styled.div<PlayerBriefContainerProps>`
    width: 170px;
    height: ${({ displayLegendaryLeader }) =>
        displayLegendaryLeader ? 420 : 220}px;
    border: 6px solid
        ${({ isActivePlayer }) =>
            isActivePlayer ? Colors.FOCUS_BLUE : Colors.DARK_BROWN};
    display: grid;
    grid-auto-rows: ${({ displayLegendaryLeader }) =>
        displayLegendaryLeader ? 'auto auto auto auto' : 'auto 1fr auto'};
    cursor: pointer;
    background-color: whitesmoke;
`;

const UpperSection = styled.div`
    font-family: Courier;
    margin-right: 5px;
    text-align: right;
    display: grid;
`;

interface MiddleSectionProps {
    avatarUrl: string;
}

const MiddleSection = styled.div<MiddleSectionProps>`
    position: relative;
    height: 100px;
    margin: 5px;
    border: 3px solid ${Colors.DARK_BROWN};
    color: white;
    -webkit-text-stroke: 1px black;
    text-shadow: 0 1px 10px rgb(0, 0, 0, 0.7);
    font-size: 56px;
    display: grid;
    place-items: end;
    align-self: flex-end;
    z-index: 1;
    ::before {
        content: '';
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.1);
        z-index: -1;
    }
    ::after {
        content: '';
        position: absolute;
        inset: 0;
        background-image: url('${({ avatarUrl }) =>
            avatarUrl || DEFAULT_AVATAR}');
        background-size: cover;
        background-position: center;
        z-index: -2;
    }
`;

const LowerSection = styled.div`
    text-align: center;
    margin-bottom: 3px;
`;

export const PlayerBriefInfo: React.FC<PlayerBriefInfoProps> = ({ player }) => {
    const {
        resourcePool,
        numCardsInDeck,
        numCardsInHand,
        health,
        name,
        isActivePlayer,
        avatar,
    } = player;

    const { handleClickPlayer } = useContext(GameManagerContext) || {};

    const shouldShowResourcePool =
        Object.entries(resourcePool)
            .map(([, quantity]) => quantity)
            .reduce((a, b) => a + b, 0) > 0;
    return (
        <PlayerBriefContainer
            isActivePlayer={isActivePlayer}
            onClick={() => {
                handleClickPlayer(player);
            }}
            displayLegendaryLeader={!!player.legendaryLeader}
        >
            <UpperSection>
                <div>
                    <b>{numCardsInDeck}</b> <span>🂡 (Deck)</span>
                </div>
                <div>
                    <b>{numCardsInHand}</b> <span>🂡 (Hand)</span>
                </div>
                <div>
                    <b>{player.cemetery.length}</b> <span>🂡 (Cemetery)</span>
                </div>
                {shouldShowResourcePool && (
                    <div>
                        {Object.entries(resourcePool).map(
                            ([resource, quantity]) =>
                                !!quantity && (
                                    <span key={resource}>
                                        {resource !== Resource.GENERIC &&
                                            quantity}
                                        <CastingCostFrame>
                                            {resource === Resource.GENERIC
                                                ? quantity
                                                : RESOURCE_GLOSSARY[
                                                      resource as Resource
                                                  ].icon}
                                        </CastingCostFrame>
                                    </span>
                                )
                        )}
                    </div>
                )}
            </UpperSection>
            <MiddleSection avatarUrl={avatar}>{`${health}`}</MiddleSection>
            <LowerSection>{name}</LowerSection>
            <LegendaryLeaderZone player={player} />
        </PlayerBriefContainer>
    );
};
