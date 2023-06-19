import cloneDeep from 'lodash.clonedeep';
import isEqual from 'lodash.isequal';
import difference from 'lodash.difference';
import sampleSize from 'lodash.samplesize';

import shuffle from 'lodash.shuffle';
import { ResolveEffectParams } from '@/types';
import { Board, Player } from '@/types/board';
import {
    EffectType,
    getDefaultTargetForEffect,
    PassiveEffect,
    TargetTypes,
} from '@/types/effects';
import { CardType, ResourceCard, SpellCard, UnitCard } from '@/types/cards';
import { makeCard, makeResourceCard } from '@/factories/cards';
import {
    applyWinState,
    processBoardToCemetery,
    resetCard,
    resetUnitCard,
} from '../gameEngine';
import { transformEffectToRulesText } from '@/transformers/transformEffectsToRulesText';
import { SpellCards } from '@/cardDb/spells';
import { Tokens, UnitCards } from '@/cardDb/units';
import { ALL_CARDS_DICTIONARY } from '@/constants/deckLists';
import { getTotalAttackForUnit } from '@/transformers';
import { assertUnreachable } from '@/types/assertUnreachable';
import { performEffectRequirement } from '../performEffectRequirement';
import { LEGENDARY_LEADER_INCREMENTAL_TAX } from '@/constants/gameConstants';
import { max } from 'lodash';

export const resolveEffect = (
    board: Board,
    { effect, playerNames, unitCardIds }: ResolveEffectParams,
    playerName: string,
    verifyEffect = false,
    addChatMessage?: (message: string) => void
): Board | null => {
    const clonedBoard = cloneDeep(board);
    const {
        strength: effectStrength = 0,
        cardName,
        secondaryCardName,
        passiveEffects,
        sourceId,
        requirements,
        secondaryStrength,
        resourceType,
        cost,
    } = effect;
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
    const sourceUnitCard = players
        .flatMap((player) => player.units)
        .find((card) => card.id === sourceId);
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
        case TargetTypes.ALL_SELF_UNITS_CEMETERY: {
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
    const rulesText = transformEffectToRulesText(effect, true).toLowerCase();
    const addSystemChat = (message: string) => addChatMessage?.(message);

    /**
     * Determine if effect can go through or not based on requirements
     */

    if (requirements) {
        const tempBoard = cloneDeep(clonedBoard);
        // first try on a dry run to make sure requirements can be fulfilled
        try {
            requirements.forEach((requirement) => {
                performEffectRequirement({
                    board: tempBoard,
                    playerName,
                    effectRequirement: requirement,
                });
            });
        } catch (error) {
            addSystemChat(
                `${activePlayer.name} could not resolve "${rulesText}" because ${error.message}`
            );
            return clonedBoard;
        }

        // then actually fulfill them if no errors were caught (as we need to mutate the clonedBoard)
        try {
            requirements.forEach((requirement) => {
                performEffectRequirement({
                    board: clonedBoard,
                    playerName,
                    effectRequirement: requirement,
                    addSystemChat,
                });
            });
        } catch (error) {
            // just a failsafe - normally should not happen to catch errors here
        }
    }

    addSystemChat(
        `${activePlayer.name} resolved "${rulesText}"${
            targetText && target !== TargetTypes.SELF_PLAYER
                ? ` ➡️ ${targetText}`
                : ''
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
        case EffectType.BOUNCE_UNITS_UNDER_THRESHOLD_ATTACK: {
            unitTargets.forEach(({ player, unitCard }) => {
                if (getTotalAttackForUnit(unitCard) > effectStrength) {
                    return;
                }
                player.units = player.units.filter((card) => card !== unitCard);
                player.hand.push(unitCard);
                resetUnitCard(unitCard);
            });
            return clonedBoard;
        }
        case EffectType.BLOOM: {
            playerTargets.forEach((player) => {
                player.resourcesLeftToDeploy += effectStrength;
            });
            return clonedBoard;
        }
        case EffectType.BUFF_ATTACK: {
            unitTargets.forEach(({ unitCard }) => {
                if (unitCard.passiveEffects.includes(PassiveEffect.STEADY)) {
                    return;
                }
                unitCard.attackBuff += effectStrength;
            });
            return clonedBoard;
        }
        case EffectType.BUFF_ATTACK_FOR_CYCLE: {
            unitTargets.forEach(({ unitCard }) => {
                if (unitCard.passiveEffects.includes(PassiveEffect.STEADY)) {
                    return;
                }
                unitCard.oneCycleAttackBuff += effectStrength;
            });
            return clonedBoard;
        }
        case EffectType.BUFF_ATTACK_FOR_TURN: {
            unitTargets.forEach(({ unitCard }) => {
                if (unitCard.passiveEffects.includes(PassiveEffect.STEADY)) {
                    return;
                }
                unitCard.oneTurnAttackBuff += effectStrength;
            });
            return clonedBoard;
        }
        case EffectType.BUFF_MAGIC: {
            unitTargets.forEach(({ unitCard }) => {
                if (unitCard.passiveEffects.includes(PassiveEffect.STEADY)) {
                    return;
                }
                if (!unitCard.isMagical) return;
                unitCard.hpBuff += effectStrength;
                unitCard.attackBuff += effectStrength;
                // give total attack a floor value of 0
                // to make game easier to understand
                if (unitCard.attackBuff < -unitCard.attack) {
                    unitCard.attackBuff = -unitCard.attack;
                }
            });
            // in case debuffing causes units to go to cemtery
            processBoardToCemetery(clonedBoard, addSystemChat);
            return clonedBoard;
        }
        case EffectType.BUFF_HAND_ATTACK_WITH_FAILSAFE_LIFECHANGE: {
            let hasACardBeenBuffed = false;
            playerTargets.forEach((player) => {
                player.hand.forEach((card) => {
                    if (card.cardType !== CardType.UNIT) return;
                    if (card.passiveEffects.includes(PassiveEffect.STEADY)) {
                        return;
                    }
                    const unit = card;
                    const attackBuffBefore = unit.attackBuff;
                    unit.attackBuff += effectStrength;
                    // give total attack a floor value of 0
                    // to make game easier to understand
                    if (unit.attackBuff < -unit.attack) {
                        unit.attackBuff = -unit.attack;
                    }
                    if (attackBuffBefore !== unit.attackBuff) {
                        hasACardBeenBuffed = true;
                    }
                });
            });
            if (!hasACardBeenBuffed) {
                activePlayer.health += secondaryStrength;
            }
            applyWinState(clonedBoard);
            return clonedBoard;
        }
        case EffectType.BUFF_HAND_NON_MAGIC_ATTACK: {
            playerTargets.forEach((player) => {
                player.hand.forEach((card) => {
                    if (card.cardType !== CardType.UNIT) return;
                    if (card.passiveEffects.includes(PassiveEffect.STEADY)) {
                        return;
                    }
                    const unit = card;
                    if (!unit.isMagical) {
                        unit.attackBuff += effectStrength;
                    }
                });
            });
            return clonedBoard;
        }
        case EffectType.BUFF_TEAM_ATTACK: {
            playerTargets.forEach((player) => {
                player.units.forEach((unit) => {
                    if (unit.passiveEffects.includes(PassiveEffect.STEADY)) {
                        return;
                    }
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
                    if (unit.passiveEffects.includes(PassiveEffect.STEADY)) {
                        return;
                    }
                    unit.hpBuff += effectStrength;
                });
            });
            // in case debuffing causes units to go to cemtery
            processBoardToCemetery(clonedBoard, addSystemChat);
            return clonedBoard;
        }
        case EffectType.BUFF_TEAM_GENERIC_UNITS: {
            playerTargets.forEach((player) => {
                player.units.forEach((unit) => {
                    if (unit.passiveEffects.length > 0) return;
                    if (unit.enterEffects.length > 0) return;
                    if (unit.damagePlayerEffects?.length > 0) return;
                    unit.hpBuff += effectStrength;
                    unit.attackBuff += effectStrength;
                });
            });
            // in case debuffing causes units to go to cemtery
            processBoardToCemetery(clonedBoard, addSystemChat);
            return clonedBoard;
        }
        case EffectType.BUFF_TEAM_LEGENDARY_UNITS: {
            playerTargets.forEach((player) => {
                player.units.forEach((unit) => {
                    if (
                        unit.passiveEffects.includes(PassiveEffect.STEADY) ||
                        !unit.isLegendary
                    ) {
                        return;
                    }
                    unit.attackBuff += effectStrength;
                    unit.hpBuff += effectStrength;
                });
            });
            return clonedBoard;
        }
        case EffectType.BUFF_TEAM_MAGIC: {
            playerTargets.forEach((player) => {
                player.units.forEach((unit) => {
                    if (unit.passiveEffects.includes(PassiveEffect.STEADY)) {
                        return;
                    }
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
                        card.cost.Generic = Math.max(
                            0,
                            (card.cost.Generic || 0) + effectStrength
                        );
                    }
                });
            });
            return clonedBoard;
        }
        case EffectType.CURSE_HAND_RESOURCE_TYPE: {
            playerTargets.forEach((player) => {
                player.hand.forEach((card) => {
                    if (
                        card.cardType !== CardType.RESOURCE &&
                        card.cost[resourceType] > 0
                    ) {
                        card.cost.Generic = Math.max(
                            0,
                            (card.cost.Generic || 0) + effectStrength
                        );
                    }
                });
            });
            return clonedBoard;
        }
        case EffectType.CURSE_HAND_SPELLS: {
            playerTargets.forEach((player) => {
                player.hand.forEach((card) => {
                    if (card.cardType === CardType.SPELL) {
                        card.cost.Generic = Math.max(
                            0,
                            (card.cost.Generic || 0) + effectStrength
                        );
                    }
                });
            });
            return clonedBoard;
        }
        case EffectType.DEAL_DAMAGE: {
            if (unitTargets) {
                unitTargets.forEach(({ unitCard }) => {
                    if (
                        unitCard.passiveEffects.includes(PassiveEffect.ETHEREAL)
                    ) {
                        return;
                    }
                    unitCard.hp -= effectStrength;
                });
                processBoardToCemetery(clonedBoard, addSystemChat);
            }

            playerTargets.forEach((player) => {
                player.health -= effectStrength;
                if (player.health <= 0) {
                    player.isAlive = false;
                }
            });
            applyWinState(clonedBoard);
            return clonedBoard;
        }
        case EffectType.DEAL_DAMAGE_TO_NON_SOLDIERS: {
            if (unitTargets) {
                unitTargets.forEach(({ unitCard }) => {
                    if (
                        unitCard.passiveEffects.includes(
                            PassiveEffect.ETHEREAL
                        ) ||
                        unitCard.isSoldier
                    ) {
                        return;
                    }
                    unitCard.hp -= effectStrength;
                });
                processBoardToCemetery(clonedBoard, addSystemChat);
            }

            playerTargets.forEach((player) => {
                player.health -= effectStrength;
                if (player.health <= 0) {
                    player.isAlive = false;
                }
            });
            applyWinState(clonedBoard);
            return clonedBoard;
        }
        case EffectType.DEPLOY_LEGENDARY_LEADER: {
            playerTargets.forEach((player) => {
                const { legendaryLeader } = player;

                if (player.isLegendaryLeaderDeployed || !legendaryLeader) {
                    return;
                }
                const legendaryLeaderInstance = makeCard(legendaryLeader);
                legendaryLeaderInstance.isLegendaryLeader = true;

                // deploy the card
                player.units.push(legendaryLeaderInstance);
                player.legendaryLeaderExtraCost +=
                    LEGENDARY_LEADER_INCREMENTAL_TAX;
                player.legendaryLeader.cost.Generic =
                    (player.legendaryLeader.originalAttributes.cost.Generic ||
                        0) + player.legendaryLeaderExtraCost;

                player.isLegendaryLeaderDeployed = true;
            });
        }
        case EffectType.DESTROY_RESOURCE: {
            playerTargets.forEach((player) => {
                const resourcesToDestroy = sampleSize(
                    player.resources.filter((resource) => {
                        if (!resourceType) return true;
                        return resource.resourceType === resourceType;
                    }),
                    effectStrength
                );
                player.resources = player.resources.filter(
                    (resource) =>
                        !resourcesToDestroy.find((r) => r === resource)
                );
            });
            applyWinState(clonedBoard);
            return clonedBoard;
        }
        case EffectType.DESTROY_RESOURCE_TO_GAIN_STATS: {
            playerTargets.forEach((player) => {
                const resourcesToDestroy = sampleSize(
                    player.resources.filter((resource) => {
                        if (!resourceType) return true;
                        return resource.resourceType === resourceType;
                    }),
                    effectStrength
                );
                if (sourceUnitCard) {
                    sourceUnitCard.attackBuff += resourcesToDestroy.length;
                    sourceUnitCard.hpBuff += resourcesToDestroy.length;
                }
                player.resources = player.resources.filter(
                    (resource) =>
                        !resourcesToDestroy.find((r) => r === resource)
                );
            });
            return clonedBoard;
        }
        case EffectType.DESTROY_UNIT: {
            if (unitTargets) {
                unitTargets.forEach(({ unitCard }) => {
                    unitCard.hp = 0;
                    unitCard.hpBuff = 0;
                });
                processBoardToCemetery(clonedBoard, addSystemChat);
            }

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

                const cardsToDiscardWithResets = cardsToDiscard.map((card) =>
                    resetCard(card)
                );
                player.cemetery = player.cemetery.concat(
                    cardsToDiscardWithResets
                );
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
        case EffectType.DRAW_MILL_WIN: {
            const { hand, deck } = activePlayer;
            if (effectStrength >= deck.length) {
                otherPlayers.forEach((player) => {
                    player.isAlive = false;
                });
            }
            if (effectStrength > 0)
                activePlayer.hand = hand.concat(deck.splice(-effectStrength));
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
            applyWinState(clonedBoard);
            return clonedBoard;
        }
        case EffectType.DRAW_UNTIL: {
            playerTargets.forEach((player) => {
                const cardsToDraw = Math.max(
                    0,
                    effectStrength - player.hand.length
                );
                const { hand, deck } = player;
                if (cardsToDraw > deck.length) {
                    player.isAlive = false;
                }
                if (cardsToDraw)
                    player.hand = hand.concat(deck.splice(-cardsToDraw));
            });
            applyWinState(clonedBoard);
            return clonedBoard;
        }
        case EffectType.DRAW_UNTIL_MATCHING_OPPONENTS: {
            const maxAmongstOpponents = max(
                otherPlayers
                    .filter((player) => player.isAlive)
                    .map((player) => player.hand.length)
            );
            playerTargets.forEach((player) => {
                const cardsToDraw = Math.max(
                    0,
                    maxAmongstOpponents - player.hand.length
                );
                const { hand, deck } = player;
                if (cardsToDraw > deck.length) {
                    player.isAlive = false;
                }
                if (cardsToDraw)
                    player.hand = hand.concat(deck.splice(-cardsToDraw));
            });
            applyWinState(clonedBoard);
            return clonedBoard;
        }
        case EffectType.EXTRACT_CARD: {
            playerTargets.forEach((player) => {
                const cardsToExtractPopulation = player.deck.filter(
                    (card) => card.name === cardName
                );
                const cardsToExtractSample = sampleSize(
                    cardsToExtractPopulation,
                    effectStrength
                );
                player.deck = player.deck.filter(
                    (card) => cardsToExtractSample.indexOf(card) === -1
                );
                activePlayer.hand =
                    activePlayer.hand.concat(cardsToExtractSample);
            });
            return clonedBoard;
        }
        case EffectType.EXTRACT_SOLDIER_CARDS: {
            playerTargets.forEach((player) => {
                const cardsToExtractPopulation = player.deck.filter(
                    (card) => card.cardType === CardType.UNIT && card.isSoldier
                );
                const cardsToExtractSample = sampleSize(
                    cardsToExtractPopulation,
                    effectStrength
                );
                player.deck = player.deck.filter(
                    (card) => cardsToExtractSample.indexOf(card) === -1
                );
                activePlayer.hand =
                    activePlayer.hand.concat(cardsToExtractSample);
            });
            return clonedBoard;
        }
        case EffectType.EXTRACT_SPELL_CARDS: {
            playerTargets.forEach((player) => {
                const cardsToExtractPopulation = player.deck.filter(
                    (card) => card.cardType === CardType.SPELL
                );
                const cardsToExtractSample = sampleSize(
                    cardsToExtractPopulation,
                    effectStrength
                );
                player.deck = player.deck.filter(
                    (card) => cardsToExtractSample.indexOf(card) === -1
                );
                activePlayer.hand =
                    activePlayer.hand.concat(cardsToExtractSample);
            });
            return clonedBoard;
        }
        case EffectType.EXTRACT_UNIT_AND_SET_COST: {
            playerTargets.forEach((player) => {
                const cardsToExtractPopulation = player.deck.filter(
                    (card) => card.cardType === CardType.UNIT
                );
                const cardsToExtractSample = sampleSize(
                    cardsToExtractPopulation,
                    effectStrength
                );
                cardsToExtractSample.forEach((card) => {
                    (card as UnitCard).cost = cost;
                });
                player.deck = player.deck.filter(
                    (card) => cardsToExtractSample.indexOf(card) === -1
                );
                activePlayer.hand =
                    activePlayer.hand.concat(cardsToExtractSample);
            });
            return clonedBoard;
        }

        case EffectType.FLICKER: {
            unitTargets.forEach(({ unitCard }) => {
                resetUnitCard(unitCard);

                if (unitCard.enterEffects) {
                    activePlayer.effectQueue = activePlayer.effectQueue.concat(
                        cloneDeep(unitCard.enterEffects)
                            .reverse()
                            .map((enterEffect) => ({
                                ...enterEffect,
                                sourceId: unitCard.id,
                            }))
                    );
                }
            });
            return clonedBoard;
        }
        case EffectType.GRANT_PASSIVE_EFFECT: {
            unitTargets.forEach(({ unitCard }) => {
                passiveEffects.forEach((passiveEffect) => {
                    if (!unitCard.passiveEffects.includes(passiveEffect)) {
                        unitCard.passiveEffects.push(passiveEffect);

                        // handle adding attacks to units getting 'quick'
                        if (
                            passiveEffect === PassiveEffect.QUICK &&
                            unitCard.isFresh
                        ) {
                            unitCard.numAttacksLeft = unitCard.numAttacks;
                            unitCard.isFresh = false;
                        }
                    }
                });
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
        case EffectType.MILL: {
            playerTargets.forEach((player) => {
                player.cemetery = player.cemetery.concat(
                    player.deck.splice(-effectStrength)
                );
            });
            return clonedBoard;
        }
        case EffectType.POLYMORPH: {
            const { summonType } = effect;
            if (!summonType) return clonedBoard;

            unitTargets.forEach(({ unitCard, player }) => {
                const matchingIndex = player.units.findIndex(
                    (unit) => unit === unitCard
                );
                if (matchingIndex === -1) return;
                player.units[matchingIndex] = makeCard(summonType);
            });
            return clonedBoard;
        }
        case EffectType.RAMP: {
            if (!resourceType) return clonedBoard;
            playerTargets.forEach((player) => {
                for (let i = 0; i < Math.min(50, effectStrength); i += 1) {
                    const resourceCard = makeResourceCard(resourceType);
                    resourceCard.isUsed = true;
                    player.resources.push(resourceCard);
                }
            });
            return clonedBoard;
        }
        case EffectType.RAMP_FOR_TURN: {
            if (!resourceType) return clonedBoard;
            playerTargets.forEach((player) => {
                player.resourcePool[resourceType] =
                    (player.resourcePool[resourceType] || 0) + effectStrength;
            });
            return clonedBoard;
        }
        case EffectType.RAMP_FROM_HAND: {
            if (!resourceType) return clonedBoard;
            playerTargets.forEach((player) => {
                const cardsToExtractPopulation: ResourceCard[] = [];

                player.hand.forEach((card) => {
                    if (
                        card.cardType === CardType.RESOURCE &&
                        card.resourceType === resourceType &&
                        !card.isAdvanced
                    )
                        cardsToExtractPopulation.push(card);
                });
                const cardsToExtractSample = sampleSize(
                    cardsToExtractPopulation,
                    effectStrength
                );

                cardsToExtractSample.forEach((resourceCard: ResourceCard) => {
                    resourceCard.isUsed = true;
                });

                player.hand = player.hand.filter((card) => {
                    return !(
                        card.cardType === CardType.RESOURCE &&
                        cardsToExtractSample.includes(card)
                    );
                });
                player.resources =
                    player.resources.concat(cardsToExtractSample);
            });
            return clonedBoard;
        }
        case EffectType.RETURN_FROM_CEMETERY: {
            playerTargets.forEach((player) => {
                const cardsToExtractPopulation = player.cemetery.filter(
                    (card) => card.name === cardName
                );
                const cardsToExtractSample = sampleSize(
                    cardsToExtractPopulation,
                    effectStrength
                );
                player.cemetery = player.cemetery.filter(
                    (card) => cardsToExtractSample.indexOf(card) === -1
                );
                activePlayer.hand =
                    activePlayer.hand.concat(cardsToExtractSample);
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
        case EffectType.SHUFFLE_FROM_HAND: {
            if (!playerTargets?.length) return clonedBoard;
            const cardsToSample = activePlayer.hand.filter(
                (card) => card.name === cardName
            );
            const cardsToShuffle = sampleSize(
                cardsToSample,
                effectStrength || cardsToSample.length
            );

            activePlayer.hand = activePlayer.hand.filter(
                (card) => !cardsToShuffle.includes(card)
            );
            // add and shuffle cards
            playerTargets[0].deck = shuffle(
                playerTargets[0].deck.concat(cardsToShuffle)
            );
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
        case EffectType.TRANSMUTE: {
            let cardToMake: UnitCard | SpellCard | ResourceCard;
            const cardPool = ALL_CARDS_DICTIONARY;

            Object.values(cardPool).forEach((card) => {
                if (card.name === secondaryCardName) {
                    cardToMake = card;
                }
            });

            if (!cardToMake) return clonedBoard;

            playerTargets.forEach((player) => {
                const cardsToSample = player.hand.filter(
                    (card) => card.name === cardName
                );
                const cardsToReplace = sampleSize(
                    cardsToSample,
                    effectStrength || cardsToSample.length
                );
                for (
                    let handIndex = 0;
                    handIndex < player.hand.length;
                    handIndex += 1
                ) {
                    if (cardsToReplace.includes(player.hand[handIndex])) {
                        player.hand[handIndex] = makeCard(cardToMake);
                    }
                }
            });
            return clonedBoard;
        }
        case EffectType.TUCK: {
            unitTargets.forEach(({ player, unitCard }) => {
                player.units = player.units.filter((card) => card !== unitCard);
                player.deck.push(unitCard);
                resetUnitCard(unitCard);
            });
            return clonedBoard;
        }
        case EffectType.TUCK_BOTTOM_AND_DRAW: {
            unitTargets.forEach(({ player, unitCard }) => {
                player.units = player.units.filter((card) => card !== unitCard);
                player.deck = [unitCard, ...player.deck];
                resetUnitCard(unitCard);
                player.hand = [...player.hand, player.deck.pop()];
            });
            return clonedBoard;
        }
        default:
            // assertUnreachable(effect.type);
            return clonedBoard;
    }
};
