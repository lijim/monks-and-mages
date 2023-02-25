import { fetcher } from '@/apiHelpers';
import { Level, UserPlayer } from '@/types/players';
import { useAuth0 } from '@auth0/auth0-react';
import useSWR from 'swr';

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

export const useLoggedInPlayerInfo = () => {
    const { user } = useAuth0();

    const { data: levelsData } = useSWR<Level[]>(
        user ? '/api/levels' : null,
        fetcher
    );
    const { data } = useSWR<UserPlayer>(
        user ? '/api/users/self' : null,
        fetcher
    );

    if (!data || !levelsData) {
        return null;
    }

    const { currentLevel, nextLevel } = getLevels(data, levelsData);
    return {
        currentLevel,
        nextLevel,
        avatarUrl: currentLevel.image,
        data,
    };
};
