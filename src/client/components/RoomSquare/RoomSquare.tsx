import React, { useContext } from 'react';
import styled from 'styled-components';

import { DetailedRoom } from '@/types';
import { SecondaryColorButton } from '../Button';
import { Format } from '@/types/games';
import { WebSocketContext } from '../WebSockets';
import { PLAYER_ROOM_PREFIX } from '@/constants/lobbyConstants';

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
    detailedRoom: { hasStartedGame, roomName, players, spectators, format },
    hasJoined,
    isSpectacting,
    joinRoom,
    onStartGameClicked,
    rejoinRoom,
    spectateRoom,
}) => {
    const webSocket = useContext(WebSocketContext);
    const normalizedRoomName = roomName.replace(PLAYER_ROOM_PREFIX, '');
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
                            {hasJoined ? 'Switch to spectating' : 'Spectate'}
                        </SecondaryColorButton>
                    )}{' '}
                    {hasJoined ? (
                        <select
                            value={format}
                            onChange={(event) => {
                                webSocket.chooseGameFormat(
                                    event.target.value as Format
                                );
                            }}
                            style={{ zoom: 1.7 }}
                        >
                            <option value={Format.STANDARD}>Standard</option>
                            <option value={Format.SINGLETON}>Singleton</option>
                            <option value={Format.DRAFT}>Draft</option>
                            <option value={Format.SEALED}>Sealed</option>
                        </select>
                    ) : (
                        format
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
