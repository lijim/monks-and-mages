import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'redux-first-history';
import styled from 'styled-components';

import { TopNavBar } from '../TopNavBar';
import { RoomSquare } from '../RoomSquare';
import { RootState } from '@/client/redux/store';
import { WebSocketContext } from '../WebSockets';
import { DetailedRoom } from '@/types';
import { PrimaryColorButton } from '../Button';
import { MAX_ROOM_NAME_LENGTH } from '@/constants/lobbyConstants';
import { Colors } from '@/constants/colors';
import { DeckListSelector } from '../DeckListSelector';

const RoomsContainer = styled.div`
    display: grid;
    margin: 50px;
    grid-template-columns: 250px 1fr;
    overflow-y: hidden;
    grid-gap: 20px;
    width: 60%;
`;

const LeftColumn = styled.div`
    display: grid;
    grid-template-rows: auto auto 1fr;
    grid-gap: 10px;
    padding: 16px;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(5px);
    color: white;
    box-shadow: 0 1px 3px rgb(0 0 0 / 50%);
    height: 45%;

    label {
        margin-bottom: 4px;
        display: block;
    }
    input {
        width: 90%;
        height: 30px;
    }
    select {
        zoom: 1.7;
    }
`;

const MiddleColumn = styled.div`
    overflow-y: scroll;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(5px);
    padding: 16px;
`;
const Spacer = styled.div`
    height: 8px;
`;

const RoomsTab = styled.h1`
    margin: 0;
    background: pink;
    color: ${Colors.VANTA_BLACK};
    display: inline-grid;
    outline: auto;
    place-items: center;
    height: 40px;
    padding: 7px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 8px;
    box-shadow: 0px 2px 10px rgb(0 0 0 / 8%);
`;

/**
 * Rooms is the primary lobby component responsible for rendering what users
 * see when they've selected a name
 * @returns @{JSX.Element}
 */
export const Rooms: React.FC = () => {
    const dispatch = useDispatch();
    const name = useSelector<RootState, string>((state) => state.user.name);
    const rooms = useSelector<RootState, DetailedRoom[]>(
        (state) => state.lobby.rooms || []
    );
    const joinedRoom = rooms.find((detailedRoom) =>
        detailedRoom.players.find((player) => player === name)
    );
    const spectatedRoom = rooms.find((detailedRoom) =>
        detailedRoom.spectators.find((spectator) => spectator === name)
    );
    const sortedRooms = [...rooms].sort((roomA, roomB) =>
        roomA.roomName.toLowerCase().localeCompare(roomB.roomName.toLowerCase())
    );
    const [newRoomName, setNewRoomName] = useState('Room 1 🥑');
    const webSocket = useContext(WebSocketContext);

    const joinRoom = (roomName: string) => {
        const normalizedRoomName = roomName.slice('public-'.length);
        webSocket.joinRoom(normalizedRoomName);
    };

    const spectateRoom = (roomName: string) => {
        const normalizedRoomName = roomName.slice('public-'.length);
        webSocket.spectateRoom(normalizedRoomName);
    };

    const rejoinRoom = () => {
        dispatch(push('/ingame'));
    };

    const startGame = () => {
        webSocket.startGame();
    };

    return (
        <>
            <TopNavBar />
            <RoomsContainer>
                <LeftColumn>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            joinRoom(newRoomName);
                        }}
                    >
                        <label htmlFor="newRoomName">
                            <b>Create New Room</b>{' '}
                        </label>
                        <input
                            value={newRoomName}
                            maxLength={MAX_ROOM_NAME_LENGTH}
                            id="newRoomName"
                            type="text"
                            placeholder="The Training Grounds"
                            onChange={(event) => {
                                setNewRoomName(event.target.value);
                            }}
                        />
                        <Spacer />
                        <span>
                            <PrimaryColorButton
                                onClick={() => {
                                    joinRoom(newRoomName);
                                }}
                                disabled={!newRoomName}
                                type="submit"
                            >
                                Create
                            </PrimaryColorButton>
                        </span>
                    </form>

                    <DeckListSelector />
                </LeftColumn>
                <MiddleColumn>
                    <RoomsTab>Rooms</RoomsTab>
                    {sortedRooms.map((detailedRoom) => (
                        <RoomSquare
                            hasJoined={joinedRoom === detailedRoom}
                            isSpectacting={spectatedRoom === detailedRoom}
                            joinRoom={() => {
                                joinRoom(detailedRoom.roomName);
                            }}
                            spectateRoom={() => {
                                spectateRoom(detailedRoom.roomName);
                            }}
                            rejoinRoom={rejoinRoom}
                            detailedRoom={detailedRoom}
                            key={detailedRoom.roomName}
                            onStartGameClicked={startGame}
                        />
                    ))}
                </MiddleColumn>
            </RoomsContainer>
        </>
    );
};
