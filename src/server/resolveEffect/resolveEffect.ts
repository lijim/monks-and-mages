import cloneDeep from 'lodash.clonedeep';

import { ResolveEffectsParams } from '@/types';
import { Board, Player } from '@/types/board';
import {
    EffectType,
    getDefaultTargetForEffect,
    TargetTypes,
} from '@/types/effects';
import { UnitCard } from '@/types/cards';

export const resolveEffect = (
    board: Board,
    { effect, playerNames, unitCardIds }: ResolveEffectsParams,
    playerName: string
): Board | null => {
    const clonedBoard = cloneDeep(board);
    const { strength: effectStrength } = effect;
    const { players } = clonedBoard;
    const activePlayer = players.find((player) => player.isActivePlayer);
    const otherPlayers = players.filter((player) => !player.isActivePlayer);

    // Error out when event is being emitted by the non-active player
    if (activePlayer?.name !== playerName) {
        return null;
    }

    // take the latest effect off the stack
    activePlayer.effectQueue.pop();

    // Determine targets to apply effects to
    let playerTargets: Player[];
    let unitTargets: { player: Player; unit: UnitCard }[];
    const target = effect.target || getDefaultTargetForEffect(effect.type);

    if (playerNames) {
        playerTargets = players.filter(
            (player) => playerNames.indexOf(player.name) > -1
        );
    } else {
        switch (target) {
            case TargetTypes.ALL_PLAYERS: {
                playerTargets = players;
                break;
            }
            case TargetTypes.ALL_OPPONENTS: {
                playerTargets = otherPlayers;
                break;
            }
            case TargetTypes.SELF_PLAYER: {
                playerTargets = [activePlayer];
                break;
            }
            default: {
                break;
            }
        }
    }

    playerTargets = playerTargets.filter((player) => player.isAlive);

    switch (effect.type) {
        case EffectType.DRAW: {
            playerTargets.forEach((player) => {
                const { hand, deck } = player;
                if (effectStrength > deck.length) {
                    player.isAlive = false;
                }
                player.hand = hand.concat(deck.splice(-effectStrength));
                player.numCardsInHand = player.hand.length;
                player.numCardsInDeck = player.deck.length;
            });
            return clonedBoard;
        }
        default:
            return null;
    }
    return null;
};
