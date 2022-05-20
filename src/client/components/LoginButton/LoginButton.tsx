import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { PrimaryColorButton } from '../Button';

export const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <PrimaryColorButton onClick={() => loginWithRedirect()}>
            Log In / Sign Up
        </PrimaryColorButton>
    );
};
