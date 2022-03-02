import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/client/redux/store';
import { NameChanger } from '../NameChanger';
import { WebSocketContext } from '../WebSockets';

// TODO: rename IntroScreen to LoginBar

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
                <>
                    Name: {name}{' '}
                    <button type="button" onClick={logOut}>
                        Logout
                    </button>
                </>
            ) : (
                <NameChanger handleSubmit={handleSubmit} />
            )}
        </>
    );
};
