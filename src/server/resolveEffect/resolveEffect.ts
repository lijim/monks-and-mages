import cloneDeep from 'lodash.clonedeep';
import isEqual from 'lodash.isequal';
import difference from 'lodash.difference';
import sampleSize from 'lodash.samplesize';

import { ResolveEffectParams } from '@/types';
import { Board, Player } from '@/types/board';
import {
    EffectType,
    getDefaultTargetForEffect,
    TargetTypes,
} from '@/types/effects';
import { CardType, SpellCard, UnitCard } from '@/types/cards';
import { makeCard, makeResourceCard } from '@/factories/cards';
import {
    applyWinState,
    processBoardToCemetery,
    resetUnitCard,
} from '../gameEngine';
import { transformEffectToRulesText } from '@/transformers/transformEffectsToRulesText';
import { SpellCards } from '@/cardDb/spells';
import { Tokens, UnitCards } from '@/cardDb/units';

export const resolveEffect = (
    board: Board,
    { effect, playerNames, unitCardIds }: ResolveEffectParams,
    playerName: string,
    verifyEffect = false,
    addChatMessage?: (message: string) => void
): Board | null => {
    const clonedBoard = cloneDeep(board);
    const { strength: effectStrength = 0, cardName } = effect;
    const { players } = clonedBoard;
    const activePlayer = players.find((player) => player.isActivePlayer);
    const otherPlayers = players.filter((player) => !player.isActivePlayer);

    // Error out when event is being emitted by the non-active player
    if (activePlayer?.name !== playerName) {
        return null;
    }

    const { effectQueue } = activePlayer;
    if (
        verifyEffect &&
        (!effectQueue?.length ||
            !isEqual(effectQueue[effectQueue.length - 1], effect))
    ) {
        return null;
    }
    // take the latest effect off the stack
    effectQueue.pop();

    // Determine targets to apply effects to
    let playerTargets: Player[];
    let unitTargets: { player: Player; unitCard: UnitCard }[] = [];
    const originalTarget = effect.target;
    const target = effect.target || getDefaultTargetForEffect(effect.type);
    let targetText;

    if (playerNames) {
        playerTargets = players.filter(
            (player) => playerNames.indexOf(player.name) > -1
        );
        targetText = playerNames.join(', ');
    } else {
        switch (target) {
            case TargetTypes.ALL_PLAYERS: {
                playerTargets = players;
                targetText = 'all players';
                break;
            }
            case TargetTypes.ALL_OPPONENTS: {
                playerTargets = otherPlayers;
                targetText = 'all opponents';
                break;
            }
            case TargetTypes.SELF_PLAYER: {
                targetText = 'theirself';
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
            targetText = 'all opposing units';
            break;
        }
        case TargetTypes.ALL_SELF_UNITS: {
            unitTargets = selfPlayerUnits;
            targetText = 'all self-owned units';
            break;
        }
        case TargetTypes.ALL_UNITS: {
            unitTargets = [...selfPlayerUnits, ...otherPlayerUnits];
            targetText = 'all units';
            break;
        }
        case TargetTypes.ALL_SELF_UNITS_GRAVEYARD: {
            targetText = 'all units in cemetery';
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
        targetText = unitTargets
            .map((unitTarget) => `[[${unitTarget.unitCard.name}]]`)
            .join(', ');
    }

    /**
     * Chat messages
     */
    const rulesText = transformEffectToRulesText(effect).toLowerCase();
    const addSystemChat = (message: string) => addChatMessage?.(message);
    addSystemChat(
        `${activePlayer.name} resolved "${rulesText}"${
            targetText && originalTarget ? ` ➡️ ${targetText}` : ''
        }`
    );

    switch (effect.type) {
        case EffectType.BOUNCE: {
            unitTargets.forEach(({ player, unitCard }) => {
                player.units = player.units.filter((card) => card !== unitCard);
                player.hand.push(unitCard);
                resetUnitCard(unitCard);
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
            processBoardToCemetery(clonedBoard, addSystemChat);
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
        case EffectType.CURSE_HAND: {
            playerTargets.forEach((player) => {
                player.hand.forEach((card) => {
                    if (card.cardType !== CardType.RESOURCE) {
                        card.cost.Generic =
                            (card.cost.Generic || 0) + effectStrength;
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
                processBoardToCemetery(clonedBoard, addSystemChat);
            }

            playerTargets.forEach((player) => {
                player.health -= effectStrength;
                if (player.health <= 0) player.isAlive = false;
            });
            applyWinState(clonedBoard);
            return clonedBoard;
        }
        case EffectType.DISCARD_HAND: {
            playerTargets.forEach((player) => {
                const { hand } = player;
                const cardsToDiscard = sampleSize(
                    hand,
                    Math.min(hand.length, effectStrength)
                );
                player.hand = difference(hand, cardsToDiscard);
                player.cemetery = player.cemetery.concat(cardsToDiscard);
                addSystemChat(
                    `${player.name} discarded ${cardsToDiscard
                        .map((card) => `[[${card.name}]]`)
                        .join(', ')}`
                );
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
            applyWinState(clonedBoard);
            return clonedBoard;
        }
        case EffectType.DRAW_PER_UNIT: {
            playerTargets.forEach((player) => {
                const cardsToDraw = player.units.length;
                const { hand, deck } = player;
                if (cardsToDraw > deck.length) {
                    player.isAlive = false;
                }
                player.hand = hand.concat(deck.splice(-cardsToDraw));
            });
            return clonedBoard;
        }
        case EffectType.HEAL: {
            playerTargets.forEach((player) => {
                player.health += effectStrength;
            });
            unitTargets.forEach(({ unitCard }) => {
                unitCard.hp = Math.min(
                    unitCard.totalHp,
                    unitCard.hp + effectStrength
                );
            });
            return clonedBoard;
        }
        case EffectType.LEARN: {
            let cardToMake: UnitCard | SpellCard;
            const cardPool = { ...SpellCards, ...UnitCards, ...Tokens };

            Object.entries(cardPool).forEach(([key, card]) => {
                if (key === cardName) {
                    cardToMake = card;
                }
            });

            if (!cardToMake) return clonedBoard;
            playerTargets.forEach((player) => {
                for (let i = 0; i < Math.min(effectStrength, 50); i += 1) {
                    player.hand.push(makeCard(cardToMake));
                }
            });
            return clonedBoard;
        }
        case EffectType.RAMP: {
            const { resourceType } = effect;
            if (!resourceType) return clonedBoard;
            playerTargets.forEach((player) => {
                for (let i = 0; i < Math.min(50, effectStrength); i += 1) {
                    player.resources.push(makeResourceCard(resourceType));
                }
            });
            return clonedBoard;
        }
        case EffectType.REVIVE: {
            const cardsIdsToRevive = new Set(
                unitTargets.map(({ unitCard }) => unitCard.id)
            );
            // remove from cemeteries
            players.forEach((player) => {
                player.cemetery = player.cemetery.filter(
                    (card) => !cardsIdsToRevive.has(card.id)
                );
            });

            const unitsToRevive = unitTargets.map(({ unitCard }) => unitCard);
            // return to active players' board
            activePlayer.units = activePlayer.units.concat(unitsToRevive);

            // add enter the board effects that need to resolve
            const effectsToAdd = unitsToRevive.flatMap(
                (unit) => unit.enterEffects
            );
            activePlayer.effectQueue =
                activePlayer.effectQueue.concat(effectsToAdd);
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
