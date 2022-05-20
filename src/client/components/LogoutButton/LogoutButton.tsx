import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { SecondaryColorButton } from '../Button';

export const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <SecondaryColorButton
            onClick={() => logout({ returnTo: window.location.origin })}
        >
            Log Out
        </SecondaryColorButton>
    );
};
