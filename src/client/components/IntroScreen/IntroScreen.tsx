import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/client/redux/store';
import { chooseName } from '@/client/redux/user';
import { NameChanger } from '../NameChanger';

/**
 * The Intro Screen is where people set their names / see games in
 * lobbies that they can join.
 * @returns {JSX.Element} Intro screen component
 */
export const IntroScreen: React.FC = () => {
    const dispatch = useDispatch();
    const name = useSelector<RootState>((state) => state.user.name);

    const handleSubmit = (newName: string) =>
        dispatch(chooseName({ name: newName }));
    return (
        <>
            {name ? (
                <>Name: {name}</>
            ) : (
                <NameChanger handleSubmit={handleSubmit} />
            )}
        </>
    );
};
