import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RoomSquare } from '../RoomSquare/RoomSquare';
import { RootState } from '@/client/redux/store';
import { WebSocketContext } from '../WebSockets';
import { DetailedRoom } from '@/types';
import { PrimaryColorButton } from '../Button';
import { MAX_ROOM_NAME_LENGTH } from '@/constants/lobbyConstants';

const RoomsContainer = styled.div`
    display: grid;
    margin: 50px;
    grid-template-columns: 250px 1fr;
    overflow-y: hidden;
`;

const LeftColumn = styled.div`
    display: grid;
    grid-template-rows: auto 1fr;
    grid-gap: 10px;
`;

const MiddleColumn = styled.div`
    overflow-y: scroll;
`;

/**
 * Rooms is the primary lobby component responsible for rendering what users
 * see when they've selected a name
 * @returns @{JSX.Element}
 */
export const Rooms: React.FC = () => {
    const name = useSelector<RootState, string>((state) => state.user.name);
    const rooms = useSelector<RootState, DetailedRoom[]>(
        (state) => state.rooms.rooms || []
    );
    const joinedRoom = rooms.find((detailedRoom) =>
        detailedRoom.players.find((player) => player === name)
    );
    const [newRoomName, setNewRoomName] = useState('Room 1 🥑');
    const webSocket = useContext(WebSocketContext);

    const joinRoom = (roomName: string) => {
        webSocket.joinRoom(roomName);
    };

    const startGame = () => {
        webSocket.startGame();
    };

    // TODO:
    // only allow 1 room at a time to be joined

    // TODO:
    // don't allow players outside a room to start a room

    return (
        <RoomsContainer>
            <LeftColumn>
                <label htmlFor="newRoomName">
                    <b>Create New Room</b>{' '}
                    <input
                        value={newRoomName}
                        maxLength={MAX_ROOM_NAME_LENGTH}
                        name="newRoomName"
                        type="text"
                        placeholder="The Training Grounds"
                        onChange={(event) => {
                            setNewRoomName(event.target.value);
                        }}
                    />
                </label>

                <span>
                    <PrimaryColorButton
                        onClick={() => {
                            joinRoom(newRoomName);
                        }}
                        disabled={!newRoomName}
                    >
                        Create New Room
                    </PrimaryColorButton>
                </span>
            </LeftColumn>
            <MiddleColumn>
                <h1>Rooms</h1>
                {rooms &&
                    [...rooms]
                        .sort((roomA, roomB) =>
                            roomA.roomName
                                .toLowerCase()
                                .localeCompare(roomB.roomName.toLowerCase())
                        )
                        .map((detailedRoom) => (
                            <RoomSquare
                                hasJoined={joinedRoom === detailedRoom}
                                joinRoom={() => {
                                    const normalizedRoomName =
                                        detailedRoom.roomName.replace(
                                            'public-',
                                            ''
                                        );
                                    joinRoom(normalizedRoomName);
                                }}
                                detailedRoom={detailedRoom}
                                key={detailedRoom.roomName}
                                onStartGameClicked={startGame}
                            />
                        ))}
            </MiddleColumn>
        </RoomsContainer>
    );
};
