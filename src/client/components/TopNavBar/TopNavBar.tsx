import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '@/client/redux/store';
import { WebSocketContext } from '../WebSockets';

// TODO: rename IntroScreen to LoginBar: https://github.com/lijim/monks-and-mages/issues/28

const NameDisplayer = styled.div`
    padding-left: 50px;
    padding-top: 10px;
    background-color: rgb(255, 255, 255, 0.8);
    padding-bottom: 10px;
`;

/**
 * Top nav bar on the rooms page
 */
export const TopNavBar: React.FC = () => {
    const name = useSelector<RootState, string>((state) => state.user.name);
    const webSocket = useContext(WebSocketContext);

    const logOut = () => {
        webSocket.chooseName('');
    };
    return (
        <NameDisplayer>
            👤 <b>{name}</b> (
            <a href="#" type="button" onClick={logOut}>
                Logout
            </a>
            )
        </NameDisplayer>
    );
};
