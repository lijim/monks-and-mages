import React, { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { push } from 'redux-first-history';
import { SecondaryColorButton } from '../Button';
import { WebSocketContext } from '../WebSockets';

export const LogoutButton = () => {
    const { logout } = useAuth0();
    const webSocket = useContext(WebSocketContext);
    const dispatch = useDispatch();

    return (
        <SecondaryColorButton
            onClick={() => {
                webSocket.logout();
                webSocket.chooseName('');
                dispatch(push('/'));
                logout({ returnTo: window.location.origin });
            }}
        >
            Log Out
        </SecondaryColorButton>
    );
};
