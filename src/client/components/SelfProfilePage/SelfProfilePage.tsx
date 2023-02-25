import React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import { Link } from 'react-router-dom';
import { CardImage } from '../CardFrame';
import { Level, UserPlayer } from '@/types/players';
import { fetcher } from '@/apiHelpers';
import { PrimaryColorButton } from '../Button';
import { Colors } from '@/constants/colors';

const CenterColumn = styled.div`
    background: rgba(255, 255, 255, 0.95);
    display: grid;
    margin: 20px;
    padding-left: 30px;
    padding-right: 30px;
    overflow: auto;
`;

const getLevels = (player: UserPlayer | null, levels: Level[] | null) => {
    if (!player || !levels) return null;
    const levelsAttained = levels.filter(
        (level) => level.xpRequired <= player.exp
    );
    const levelsNotAttained = levels.filter(
        (level) => level.xpRequired > player.exp
    );

    return {
        currentLevel: levelsAttained[levelsAttained.length - 1],
        nextLevel: levelsNotAttained[0],
    };
};

export const SelfProfilePage = (): JSX.Element => {
    const { data: levelsData } = useSWR<Level[]>('/api/levels', fetcher);
    const { data: selfData } = useSWR<UserPlayer>('/api/users/self', fetcher);

    if (!selfData || !levelsData) {
        return null;
    }

    const { currentLevel, nextLevel } = getLevels(selfData, levelsData);

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
