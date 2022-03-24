import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/client/redux/store';
import { GameResult } from '@/types/games';

const displayGameResult = (gameResult: GameResult): string => {
    if (gameResult.result === 'WIN') {
        return `${gameResult.winners.join(
            ', '
        )} won 🏆 over ${gameResult.nonWinners.join(', ')}`;
    }
    return `Tie game: ${gameResult.nonWinners.join(', ')}`;
};

export const LatestWinners: React.FC = () => {
    const latestResults = useSelector<RootState, GameResult[]>(
        (state) => state.lobby.latestGameResults
    );
    return (
        <div>
            <h2>Latest Winners</h2>
            {!latestResults.length && 'No games played yet'}
            <ul>
                {latestResults.map((gameResult) => (
                    <li key={gameResult.id}>{displayGameResult(gameResult)}</li>
                ))}
            </ul>
        </div>
    );
};
