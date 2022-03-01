import React from 'react';

type RoomSquareProps = {
    detailedRoom: DetailedRoom;
};

/**
 * @returns component for a single room to be displayed on the main
 * Rooms component.  Should show the name of the group + players
 */
export const RoomSquare: React.FC<RoomSquareProps> = ({
    detailedRoom: { roomName, players },
}) => {
    return (
        <div>
            <h1>{roomName}</h1>
            <div>
                <ul>
                    {players.map((player) => (
                        <li>{player}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
