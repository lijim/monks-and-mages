import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { RoomSquare } from '../RoomSquare/RoomSquare';
import { RootState } from '@/client/redux/store';
import { WebSocketContext } from '../WebSockets';

export const Rooms: React.FC = () => {
    const rooms = useSelector<RootState, DetailedRoom[]>(
        (state) => state.rooms.rooms || []
    );
    const webSocket = useContext(WebSocketContext);

    const joinRoom = (roomName: string) => {
        webSocket.joinRoom(roomName);
    };

    // TODO:
    // only allow 1 room at a time to be joined
    // add start button in for game when 2+ players are in a room

    return (
        <div>
            {rooms.map((detailedRoom) => (
                <RoomSquare
                    detailedRoom={detailedRoom}
                    key={detailedRoom.roomName}
                />
            ))}
            <button onClick={() => joinRoom('room 1')}>Room 1 join</button>
            <button onClick={() => joinRoom('room 2')}>Room 2 join</button>
        </div>
    );
};
