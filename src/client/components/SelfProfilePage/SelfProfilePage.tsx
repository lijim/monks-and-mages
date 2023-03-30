import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';
import { CardImage } from '../CardFrame';
import { PrimaryColorButton } from '../Button';
import { Colors } from '@/constants/colors';
import { useLoggedInPlayerInfo } from '@/client/hooks';
import { swrPatch } from '@/apiHelpers';
import { ChooseAvatarParams } from '@/types/api';
import { DEFAULT_AVATAR } from '@/types/players';
import { TopNavBar } from '../TopNavBar';

const CenterColumn = styled.div`
    background: rgba(255, 255, 255, 0.95);
    display: grid;
    margin: 20px;
    padding-left: 30px;
    padding-right: 30px;
    overflow: auto;
`;

const Avatars = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 260px);
    grid-gap: 20px;
`;

const ProfileStats = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: 40px;
    grid-row-gap: 20px;
    border: 1px solid ${Colors.LIGHT_GREY};
    border-radius: 4px;
    background: white;
    padding: 20px;
    width: 500px;
`;

const StackedProfileStat = styled.div`
    display: grid;
    place-content: center;
    text-align: center;
    gap: 4px;
`;

export const SelfProfilePage = (): JSX.Element => {
    const loggedInPlayerInfo = useLoggedInPlayerInfo();

    const { trigger } = useSWRMutation<
        unknown,
        unknown,
        unknown,
        ChooseAvatarParams
    >(`/users/self/choose_avatar`, swrPatch());

    const onClickAvatar = (avatar: string) => async () => {
        await trigger({
            avatarUrl: avatar,
        });
        loggedInPlayerInfo?.mutate();
    };

    if (!loggedInPlayerInfo) {
        return null;
    }
    const {
        data: selfData,
        currentLevel,
        nextLevel,
        availableAvatars,
    } = loggedInPlayerInfo;

    const currentAvatar = selfData?.avatarUrl || DEFAULT_AVATAR;

    return (
        <>
            <TopNavBar>
                <Link to="/">Back</Link>
            </TopNavBar>
            <CenterColumn>
                <h1>{selfData?.username}</h1>
                <ProfileStats>
                    <StackedProfileStat>
                        <span>
                            {new Date(selfData?.createdAt).toLocaleDateString()}
                        </span>
                        <h3 style={{ margin: 0 }}>Joined</h3>
                    </StackedProfileStat>
                    <StackedProfileStat>
                        <span>{selfData?.numberOfGamesWon}</span>
                        <h3 style={{ margin: 0 }}>Games won</h3>
                    </StackedProfileStat>
                    <StackedProfileStat>
                        <span>Level {currentLevel?.level}</span>
                        <h3 style={{ margin: 0 }}>{currentLevel?.name}</h3>
                    </StackedProfileStat>
                    <StackedProfileStat>
                        <span>
                            {selfData?.exp}{' '}
                            {nextLevel ? <>/ {nextLevel.xpRequired}</> : null}
                        </span>
                        <h3 style={{ margin: 0 }}>XP</h3>
                    </StackedProfileStat>
                </ProfileStats>

                <h3>Avatars Unlocked</h3>
                <Avatars>
                    {availableAvatars.map(({ avatar, name }) => (
                        <div style={{ textAlign: 'center' }} key={name}>
                            <div
                                style={{
                                    width: 260,
                                    height: 220,
                                    border: `5px solid ${
                                        avatar === currentAvatar
                                            ? Colors.FIRE_ORANGE_EMPHASIZED
                                            : Colors.LIGHT_GREY
                                    }`,
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                                data-testid={`Avatar-${avatar}`}
                                onClick={onClickAvatar(avatar)}
                            >
                                <CardImage src={avatar} />
                            </div>
                            <span>{name}</span>
                        </div>
                    ))}
                    {nextLevel && (
                        <div style={{ textAlign: 'center', opacity: '.5' }}>
                            <div
                                style={{
                                    width: 260,
                                    height: 220,
                                    border: `5px solid ${Colors.LIGHT_GREY}`,
                                    borderRadius: '4px',
                                }}
                            >
                                <CardImage src={nextLevel.image} />
                            </div>
                            <span>
                                Next Unlock: Level {nextLevel.level} -{' '}
                                {nextLevel.name}
                            </span>
                        </div>
                    )}
                </Avatars>

                <br />
                <Link to="/">
                    <PrimaryColorButton>Back</PrimaryColorButton>
                </Link>
                <br />
            </CenterColumn>
        </>
    );
};
