import React, { createContext, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/client/redux/store';
import { WebSocketContext } from '../WebSockets';
import { handleClickOnCard } from './handleClickOnCard';

interface GameManagerContextValue {
    handleClickCard: (cardId: string) => void;
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
        [rootState, socket]
    );

    return (
        <GameManagerContext.Provider value={{ handleClickCard }}>
            {children}
        </GameManagerContext.Provider>
    );
};
