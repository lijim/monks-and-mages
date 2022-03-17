import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '@/client/redux/store';
import { NameChanger } from '../NameChanger';
import { WebSocketContext } from '../WebSockets';

// TODO: rename IntroScreen to LoginBar: https://github.com/lijim/monks-and-mages/issues/28

const NameDisplayer = styled.div`
    padding-left: 50px;
    padding-top: 10px;
    background-color: rgb(255, 255, 255, 0.8);
    padding-bottom: 10px;
`;

/**
 * The Intro Screen is where people set their names / see games in
 * lobbies that they can join.
 * @returns {JSX.Element} Intro screen component
 */
export const IntroScreen: React.FC = () => {
    const name = useSelector<RootState, string>((state) => state.user.name);
    const webSocket = useContext(WebSocketContext);

    const handleSubmit = (newName: string) => {
        webSocket.chooseName(newName.trim());
    };

    const logOut = () => {
        webSocket.chooseName('');
    };
    return (
        <>
            {name ? (
                <NameDisplayer>
                    👤 <b>{name}</b> (
                    <a href="#" type="button" onClick={logOut}>
                        Logout
                    </a>
                    )
                </NameDisplayer>
            ) : (
                <NameChanger handleSubmit={handleSubmit} />
            )}
        </>
    );
};
