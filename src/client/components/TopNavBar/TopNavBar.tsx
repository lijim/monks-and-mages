import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { RootState } from '@/client/redux/store';
import { SecondaryColorButton } from '../Button';
import { LogoutButton } from '../LogoutButton';
import { getCleanName } from '@/client/redux/selectors';
import { useLoggedInPlayerInfo } from '@/client/hooks';
import { CardImage } from '../CardFrame';
import { Colors } from '@/constants/colors';

// TODO: rename IntroScreen to LoginBar: https://github.com/lijim/monks-and-mages/issues/28

const NameDisplayer = styled.div`
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 10px;
    background-color: rgb(255, 255, 255, 0.8);
    padding-bottom: 10px;
    display: grid;
    grid-template-columns: 1fr auto 1fr;

    .topNavBar-center {
        place-self: center;
    }
`;

interface Props {
    children?: ReactNode;
}

/**
 * Top nav bar on the rooms page
 */
export const TopNavBar = ({ children }: Props) => {
    const guestName = useSelector<RootState, string>(getCleanName);
    const { user } = useAuth0();
    const loggedInPlayerInfo = useLoggedInPlayerInfo();

    if (user && loggedInPlayerInfo?.data) {
        const { data, nextLevel, currentLevel } = loggedInPlayerInfo;
        const xpIntoCurrentLevel = data.exp - currentLevel.xpRequired;
        const xpForNextLevel = nextLevel
            ? nextLevel.xpRequired - currentLevel.xpRequired
            : xpIntoCurrentLevel;
        const progressTowardsNextLevel =
            (xpIntoCurrentLevel / xpForNextLevel) * 100;
        return (
            <NameDisplayer>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                    }}
                >
                    <Link to="/me">
                        <div
                            style={{
                                width: 50,
                                height: 40,
                                border: `3px solid ${Colors.FIRE_ORANGE_EMPHASIZED}`,
                                cursor: 'pointer',
                                borderRadius: '4px',
                            }}
                        >
                            <CardImage
                                src={loggedInPlayerInfo?.data?.avatarUrl}
                            />
                        </div>
                    </Link>
                    <div
                        style={{
                            width: '250px',
                            height: '40px',
                            backgroundColor: Colors.IRON_GREY,
                            borderRadius: '4px',
                            overflow: 'hidden',
                            boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.2)',
                            position: 'relative',
                        }}
                    >
                        <div
                            style={{
                                width: `${progressTowardsNextLevel}%`,
                                height: '100%',
                                backgroundColor: Colors.FIRE_ORANGE,
                                borderRadius: '4px',
                                transition: 'width 0.5s ease-in-out',
                                position: 'absolute',
                            }}
                        />
                        <div
                            style={{
                                color: 'white',
                                position: 'absolute',
                                top: '10px',
                                left: '10px',
                            }}
                        >
                            Level {currentLevel.level} - {data.exp} /{' '}
                            {nextLevel.xpRequired} XP
                        </div>
                    </div>
                    {loggedInPlayerInfo?.data.username ? (
                        <Link to="/me">
                            <SecondaryColorButton>
                                ⚙️ <b>{loggedInPlayerInfo?.data.username}</b>
                            </SecondaryColorButton>
                        </Link>
                    ) : (
                        'Loading...'
                    )}
                </div>
                <div className="topNavBar-center">{children}</div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'end',
                        gap: '4px',
                    }}
                >
                    <LogoutButton shouldLogOutFromAuth0 />
                    <Link to="/instructions">
                        <SecondaryColorButton>Help</SecondaryColorButton>
                    </Link>
                </div>
            </NameDisplayer>
        );
    }
    return (
        <NameDisplayer>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                }}
            >
                👤 <b>{guestName}</b>{' '}
            </div>
            <div className="topNavBar-center">{children}</div>
            <div style={{ display: 'flex', justifyContent: 'end', gap: '4px' }}>
                <LogoutButton />
                <Link to="/instructions">
                    <SecondaryColorButton>Help</SecondaryColorButton>
                </Link>
            </div>
        </NameDisplayer>
    );
};
