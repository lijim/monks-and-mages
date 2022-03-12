import React from 'react';
import styled from 'styled-components';

import { DetailedRoom } from '@/types';
import { SecondaryColorButton } from '../Button';

type RoomSquareProps = {
    detailedRoom: DetailedRoom;
    hasJoined?: boolean;
    joinRoom?: () => void;
    onStartGameClicked?: () => void;
};

const PlayerList = styled.ul`
    list-style-type: none;
`;

/**
 * @returns component for a single room to be displayed on the main
 * Rooms component.  Should show the name of the group + players
 */
export const RoomSquare: React.FC<RoomSquareProps> = ({
    detailedRoom: { hasStartedGame, roomName, players },
    hasJoined,
    joinRoom,
    onStartGameClicked,
}) => {
    const normalizedRoomName = roomName.replace('public-', '');
    return (
        <div>
            <h1>
                {normalizedRoomName}
                <span>
                    {' '}
                    {!hasJoined && (
                        <SecondaryColorButton onClick={joinRoom}>
                            Join
                        </SecondaryColorButton>
                    )}
                    {!hasStartedGame && players.length > 1 && hasJoined && (
                        <SecondaryColorButton onClick={onStartGameClicked}>
                            Start Game
                        </SecondaryColorButton>
                    )}
                </span>
            </h1>
            {hasStartedGame && <span>Started</span>}
            <div>
                <PlayerList>
                    {players.map((player) => (
                        <li key={player}>
                            👤 <span>{player}</span>
                        </li>
                    ))}
                </PlayerList>
            </div>
        </div>
    );
};
