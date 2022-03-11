import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/client/redux/store';
import { WebSocketContext } from '../WebSockets';
import { handleClickOnCard } from './handleClickOnCard';
import { Player } from '@/types/board';
import { handleClickOnPlayer } from './handleClickPlayer';
import { Effect } from '@/types/cards';
import {
    getLastEffect,
    shouldLastEffectFizzle,
} from '@/client/redux/selectors';
import {
    AutoResolvingTargets,
    getDefaultTargetForEffect,
} from '@/types/effects';

interface GameManagerContextValue {
    handleClickCard: (cardId: string) => void;
    handleClickPlayer: (player: Player) => void;
}

export const GameManagerContext = createContext<GameManagerContextValue>(null);

export const GameManager: React.FC = ({ children }) => {
    const { socket } = useContext(WebSocketContext) || {};
    const dispatch = useDispatch();
    const rootState = useSelector<RootState, RootState>((state) => state);

    const lastEffect = useSelector<RootState, Effect | undefined>(
        getLastEffect
    );
    const willLastEffectFizzle = useSelector<RootState, boolean>(
        shouldLastEffectFizzle
    );

    useEffect(() => {
        if (!lastEffect) return;
        let { target } = lastEffect;
        if (!target) target = getDefaultTargetForEffect(lastEffect.type);
        // if the target of the effect auto-resolves, e.g. (ALL OPPONENTS),
        // then resolve the effect automatically
        if (AutoResolvingTargets.indexOf(target) > -1) {
            socket.emit('resolveEffect', {
                effect: lastEffect,
            });
        }
        if (willLastEffectFizzle) {
            socket.emit('resolveEffect', {
                effect: lastEffect,
            });
        }
    }, [lastEffect]);

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
