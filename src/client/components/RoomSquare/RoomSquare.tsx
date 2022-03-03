import React from 'react';

import { DetailedRoom } from '@/types';

type RoomSquareProps = {
    detailedRoom: DetailedRoom;
    onStartGameClicked?: () => void;
};

/**
 * @returns component for a single room to be displayed on the main
 * Rooms component.  Should show the name of the group + players
 */
export const RoomSquare: React.FC<RoomSquareProps> = ({
    detailedRoom: { hasStartedGame, roomName, players },
    onStartGameClicked,
}) => {
    const normalizedRoomName = roomName.replace('public-', '');
    return (
        <div>
            <h1>{normalizedRoomName}</h1>
            {hasStartedGame && <span>Started</span>}
            {!hasStartedGame && players.length > 1 && (
                <button onClick={onStartGameClicked}>Start Game</button>
            )}
            <div>
                <ul>
                    {players.map((player) => (
                        <li key={player}>{player}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
