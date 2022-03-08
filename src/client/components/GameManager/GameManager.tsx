import React, { createContext, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/client/redux/store';
import { WebSocketContext } from '../WebSockets';
import { handleClickOnCard } from './handleClickOnCard';
import { Player } from '@/types/board';
import { handleClickOnPlayer } from './handleClickPlayer';

interface GameManagerContextValue {
    handleClickCard: (cardId: string) => void;
    handleClickPlayer: (player: Player) => void;
}

export const GameManagerContext = createContext<GameManagerContextValue>(null);

export const GameManager: React.FC = ({ children }) => {
    const { socket } = useContext(WebSocketContext) || {};
    const dispatch = useDispatch();
    const rootState = useSelector<RootState, RootState>((state) => state);

    const handleClickCard = useCallback(
        (cardId: string) => {
            handleClickOnCard({
                cardId,
                dispatch,
                state: rootState,
                socket,
            });
        },
        [dispatch, rootState, socket]
    );

    const handleClickPlayer = useCallback(
        (player: Player) => {
            handleClickOnPlayer({
                player,
                dispatch,
                state: rootState,
                socket,
            });
        },
        [dispatch, rootState, socket]
    );

    return (
        <GameManagerContext.Provider
            value={{ handleClickCard, handleClickPlayer }}
        >
            {children}
        </GameManagerContext.Provider>
    );
};
