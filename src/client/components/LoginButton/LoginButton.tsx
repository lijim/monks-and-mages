import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { PrimaryColorButton } from '../Button';

export const LoginButton = () => {
    const { user, loginWithRedirect } = useAuth0();

    if (user)
        return <>Logged in as {user.preferred_username} ... redirecting</>;
    return (
        <PrimaryColorButton onClick={() => loginWithRedirect()}>
            Log In / Sign Up
        </PrimaryColorButton>
    );
};
