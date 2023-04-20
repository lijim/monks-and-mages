import { useAuth0 } from '@auth0/auth0-react';
import useSWR from 'swr';
import { useCookies } from 'react-cookie';
import { fetcher } from '@/apiHelpers';
import {
    DEFAULT_AVATAR,
    DEFAULT_AVATAR_NAME,
    Level,
    UserPlayer,
} from '@/types/players';

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
        levelsAttained,
    };
};

export const useLoggedInPlayerInfo = () => {
    const { user } = useAuth0();
    const [cookies] = useCookies();

    const { data: levelsData } = useSWR<Level[]>(
        user && cookies.accessToken
            ? ['/api/levels', cookies.accessToken]
            : null,
        fetcher
    );
    const { data, mutate } = useSWR<UserPlayer>(
        user && cookies.accessToken
            ? ['/api/users/self', cookies.accessToken]
            : null,
        fetcher
    );

    if (!data || !levelsData) {
        return null;
    }

    const { currentLevel, nextLevel, levelsAttained } = getLevels(
        data,
        levelsData
    );
    const availableAvatars = [
        {
            name: DEFAULT_AVATAR_NAME,
            avatar: DEFAULT_AVATAR,
        },
        ...levelsAttained.map((level) => ({
            name: `Level ${level.level} - ${level.name}`,
            avatar: level.image,
        })),
    ];
    return {
        currentLevel,
        nextLevel,
        data,
        mutate,
        availableAvatars,
    };
};
