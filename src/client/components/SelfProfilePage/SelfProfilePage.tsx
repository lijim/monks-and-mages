import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CardImage } from '../CardFrame';
import { PrimaryColorButton } from '../Button';
import { Colors } from '@/constants/colors';
import { useLoggedInPlayerInfo } from '@/client/hooks';

const CenterColumn = styled.div`
    background: rgba(255, 255, 255, 0.95);
    display: grid;
    margin: 20px;
    padding-left: 30px;
    padding-right: 30px;
    overflow: auto;
`;

export const SelfProfilePage = (): JSX.Element => {
    const { currentLevel, nextLevel, data: selfData } = useLoggedInPlayerInfo();

    return (
        <CenterColumn>
            <h1>{selfData.username}</h1>
            <div>
                Player since:{' '}
                {new Date(selfData.createdAt).toLocaleDateString()}
            </div>
            <div>Games won: {selfData.numberOfGamesWon}</div>
            <div>
                Level {currentLevel?.level} {currentLevel?.name}
            </div>
            <div
                style={{
                    width: 260,
                    height: 220,
                    border: `5px solid ${Colors.LIGHT_GREY}`,
                }}
            >
                <CardImage src={currentLevel.image} />
            </div>
            <div>
                XP: {selfData.exp}{' '}
                {nextLevel ? <>/ {nextLevel.xpRequired}</> : null}
            </div>
            <br />
            <Link to="/">
                <PrimaryColorButton>Back</PrimaryColorButton>
            </Link>
            <br />
        </CenterColumn>
    );
};
