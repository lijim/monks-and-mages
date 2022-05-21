import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { push } from 'redux-first-history';
import { useAuth0 } from '@auth0/auth0-react';
import { RootState } from '@/client/redux/store';
import { WebSocketContext } from '../WebSockets';
import { SecondaryColorButton } from '../Button';
import { LogoutButton } from '../LogoutButton';
import { getCleanName } from '@/client/redux/selectors';

// TODO: rename IntroScreen to LoginBar: https://github.com/lijim/monks-and-mages/issues/28

const NameDisplayer = styled.div`
    padding-left: 50px;
    padding-top: 10px;
    background-color: rgb(255, 255, 255, 0.8);
    padding-bottom: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    .topNavBar-center {
        place-self: center;
    }
`;

/**
 * Top nav bar on the rooms page
 */
export const TopNavBar: React.FC = ({ children }) => {
    const guestName = useSelector<RootState, string>(getCleanName);
    const { user } = useAuth0();
    const webSocket = useContext(WebSocketContext);
    const dispatch = useDispatch();

    const logOut = () => {
        webSocket.chooseName('');
        dispatch(push('/'));
    };
    if (user)
        return (
            <NameDisplayer>
                <div>
                    👤 <b>{guestName || 'Loading...'}</b> <LogoutButton />
                </div>
                <div className="topNavBar-center">{children}</div>
                <div></div>
            </NameDisplayer>
        );
    if (guestName)
        return (
            <NameDisplayer>
                <div>
                    👤 <b>{guestName}</b>{' '}
                    <SecondaryColorButton onClick={logOut}>
                        Return Home
                    </SecondaryColorButton>
                </div>
                <div className="topNavBar-center">{children}</div>
                <div></div>
            </NameDisplayer>
        );

    return null;
};
