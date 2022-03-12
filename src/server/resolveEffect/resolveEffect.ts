import cloneDeep from 'lodash.clonedeep';

import { ResolveEffectParams } from '@/types';
import { Board, Player } from '@/types/board';
import {
    EffectType,
    getDefaultTargetForEffect,
    TargetTypes,
} from '@/types/effects';
import { CardType, UnitCard } from '@/types/cards';
import { makeCard } from '@/factories/cards';
import { processBoardToCemetery } from '../gameEngine';

export const resolveEffect = (
    board: Board,
    { effect, playerNames, unitCardIds }: ResolveEffectParams,
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
    let unitTargets: { player: Player; unitCard: UnitCard }[] = [];
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

    playerTargets = playerTargets?.filter((player) => player.isAlive) || [];

    const otherPlayerUnits = otherPlayers.flatMap((player) =>
        player.units.map((unitCard) => {
            return { player, unitCard };
        })
    );
    const selfPlayerUnits = activePlayer.units.map((unitCard) => {
        return { player: activePlayer, unitCard };
    });
    switch (target) {
        case TargetTypes.ALL_OPPOSING_UNITS: {
            unitTargets = otherPlayerUnits;
            break;
        }
        case TargetTypes.ALL_SELF_UNITS: {
            unitTargets = selfPlayerUnits;
            break;
        }
        case TargetTypes.ALL_UNITS: {
            unitTargets = [...selfPlayerUnits, ...otherPlayerUnits];
            break;
        }
        case TargetTypes.ALL_SELF_UNITS_GRAVEYARD: {
            activePlayer.cemetery.forEach((card) => {
                if (card.cardType === CardType.UNIT)
                    unitTargets.push({
                        player: activePlayer,
                        unitCard: card,
                    });
            });
            break;
        }
        default: {
            break;
        }
    }

    if (unitCardIds) {
        players.forEach((player) => {
            player.units.forEach((unitCard) => {
                if (unitCardIds.indexOf(unitCard.id) > -1) {
                    unitTargets.push({ player, unitCard });
                }
            });
        });
    }

    switch (effect.type) {
        case EffectType.BOUNCE: {
            unitTargets.forEach(({ player, unitCard }) => {
                player.units = player.units.filter((card) => card !== unitCard);
                player.hand.push(unitCard);
                unitCard.hp = unitCard.totalHp;
                unitCard.attackBuff = 0;
                unitCard.hpBuff = 0;
            });
            return clonedBoard;
        }
        case EffectType.BUFF_TEAM_ATTACK: {
            playerTargets.forEach((player) => {
                player.units.forEach((unit) => {
                    if (!unit.isMagical) {
                        unit.attackBuff += effectStrength;
                    }
                });
            });
            return clonedBoard;
        }
        case EffectType.BUFF_TEAM_HP: {
            playerTargets.forEach((player) => {
                player.units.forEach((unit) => {
                    unit.hpBuff += effectStrength;
                });
            });
            // in case debuffing causes units to go to cemtery
            processBoardToCemetery(clonedBoard);
            return clonedBoard;
        }
        case EffectType.BUFF_TEAM_MAGIC: {
            playerTargets.forEach((player) => {
                player.units.forEach((unit) => {
                    if (unit.isMagical) {
                        unit.attackBuff += effectStrength;
                    }
                });
            });
            return clonedBoard;
        }
        case EffectType.DEAL_DAMAGE: {
            if (unitTargets) {
                unitTargets.forEach(({ unitCard }) => {
                    unitCard.hp -= effectStrength;
                });
                processBoardToCemetery(clonedBoard);
            }

            playerTargets.forEach((player) => {
                player.health -= effectStrength;
                if (player.health <= 0) player.isAlive = false;
            });
            return clonedBoard;
        }
        case EffectType.DRAW: {
            playerTargets.forEach((player) => {
                const { hand, deck } = player;
                if (effectStrength > deck.length) {
                    player.isAlive = false;
                }
                player.hand = hand.concat(deck.splice(-effectStrength));
            });
            return clonedBoard;
        }
        case EffectType.SUMMON_UNITS: {
            const { summonType } = effect;
            if (!summonType) return clonedBoard;
            playerTargets.forEach((player) => {
                for (let i = 0; i < Math.min(50, effectStrength); i += 1) {
                    player.units.push(makeCard(summonType));
                }
            });
            return clonedBoard;
        }
        default:
            return clonedBoard;
    }
};
