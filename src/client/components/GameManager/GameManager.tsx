import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/client/redux/store';
import { WebSocketContext } from '../WebSockets';
import {
    handleClickOnCard,
    HandleClickOnCardParams,
} from './handleClickOnCard';
import { Player } from '@/types/board';
import { handleClickOnPlayer } from './handleClickPlayer';
import { Effect } from '@/types/cards';
import {
    getLastEffect,
    shouldLastEffectFizzle,
} from '@/client/redux/selectors';
import {
    AUTO_RESOLVING_TARGETS,
    getDefaultTargetForEffect,
} from '@/types/effects';
import { AUTO_RESOLVE_LINGER_DURATION } from '@/constants/gameConstants';

interface GameManagerContextValue {
    handleClickCard: (
        cardId: string,
        extras?: HandleClickOnCardParams['extras']
    ) => void;
    handleClickPlayer: (player: Player) => void;
}

export const GameManagerContext = createContext<GameManagerContextValue>(null);

interface Props {
    children?: ReactNode;
}

export const GameManager = ({ children }: Props) => {
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
        if (AUTO_RESOLVING_TARGETS.includes(target) || willLastEffectFizzle) {
            setTimeout(() => {
                socket.emit('resolveEffect', {
                    effect: lastEffect,
                });
            }, AUTO_RESOLVE_LINGER_DURATION);
        }
    }, [lastEffect]);

    const handleClickCard = useCallback(
        (cardId: string, extras?: HandleClickOnCardParams['extras']) => {
            handleClickOnCard({
                cardId,
                dispatch,
                state: rootState,
                socket,
                extras,
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
