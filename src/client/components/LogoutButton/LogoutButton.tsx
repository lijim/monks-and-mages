import React, { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { SecondaryColorButton } from '../Button';
import { useDispatch } from 'react-redux';
import { WebSocketContext } from '../WebSockets';
import { push } from 'redux-first-history';

export const LogoutButton = () => {
    const { logout } = useAuth0();
    const webSocket = useContext(WebSocketContext);
    const dispatch = useDispatch();

    return (
        <SecondaryColorButton
            onClick={() => {
                webSocket.chooseName('');
                dispatch(push('/'));
                logout({ returnTo: window.location.origin });
            }}
        >
            Log Out
        </SecondaryColorButton>
    );
};
