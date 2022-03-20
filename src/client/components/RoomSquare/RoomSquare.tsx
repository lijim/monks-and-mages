import React from 'react';
import styled from 'styled-components';

import { DetailedRoom } from '@/types';
import { SecondaryColorButton } from '../Button';

type RoomSquareProps = {
    detailedRoom: DetailedRoom;
    hasJoined?: boolean;
    isSpectacting?: boolean;
    joinRoom?: () => void;
    onStartGameClicked?: () => void;
    rejoinRoom?: () => void;
    spectateRoom?: () => void;
};

const PlayerList = styled.ul`
    list-style-type: none;
`;

/**
 * @returns component for a single room to be displayed on the main
 * Rooms component.  Should show the name of the group + players
 */
export const RoomSquare: React.FC<RoomSquareProps> = ({
    detailedRoom: { hasStartedGame, roomName, players, spectators },
    hasJoined,
    isSpectacting,
    joinRoom,
    onStartGameClicked,
    rejoinRoom,
    spectateRoom,
}) => {
    const normalizedRoomName = roomName.replace('public-', '');
    const shouldShowSpectate = !hasStartedGame && !isSpectacting;
    const shouldShowJoin = !hasJoined && !hasStartedGame && players.length < 4;
    return (
        <div>
            <h2>
                {normalizedRoomName}
                <span>
                    {' '}
                    {shouldShowJoin && (
                        <SecondaryColorButton onClick={joinRoom}>
                            Join
                        </SecondaryColorButton>
                    )}
                    {(hasJoined || isSpectacting) && hasStartedGame && (
                        <SecondaryColorButton onClick={rejoinRoom}>
                            Re-join game!
                        </SecondaryColorButton>
                    )}{' '}
                    {!hasStartedGame && players.length > 1 && hasJoined && (
                        <SecondaryColorButton onClick={onStartGameClicked}>
                            Start Game
                        </SecondaryColorButton>
                    )}{' '}
                    {shouldShowSpectate && (
                        <SecondaryColorButton onClick={spectateRoom}>
                            Spectate
                        </SecondaryColorButton>
                    )}
                </span>
            </h2>
            {hasStartedGame && <span>Started</span>}
            <div>
                <PlayerList>
                    {players.map((player) => (
                        <li key={player}>
                            👤 <span>{player}</span>
                        </li>
                    ))}
                    {spectators.map((spectator) => (
                        <li key={spectator}>
                            👤 <span>{spectator} (Spectating)</span>
                        </li>
                    ))}
                </PlayerList>
            </div>
        </div>
    );
};
