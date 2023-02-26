import { useAuth0 } from '@auth0/auth0-react';
import useSWR from 'swr';
import { fetcher } from '@/apiHelpers';
import { DEFAULT_AVATAR, Level, UserPlayer } from '@/types/players';

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

    const { data: levelsData } = useSWR<Level[]>(
        user ? '/api/levels' : null,
        fetcher
    );
    const { data, mutate } = useSWR<UserPlayer>(
        user ? '/api/users/self' : null,
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
        DEFAULT_AVATAR,
        ...levelsAttained.map((level) => level.image),
    ];
    return {
        currentLevel,
        nextLevel,
        data,
        mutate,
        availableAvatars,
    };
};
