import React, { useContext } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';

import { Card, CardType } from '@/types/cards';
import { ResourceCardGridItem } from '../ResourceCardGridItem';
import { SpellGridItem } from '../SpellGridItem';
import { UnitGridItem } from '../UnitGridItem';
import { GameManagerContext } from '../GameManager';
import { AdvancedResourceGridItem } from '../AdvancedResourceGridItem';
import { HandleClickOnCardParams } from '../GameManager/handleClickOnCard';
import { getAssociatedCards, modifyCardForTooltip } from '@/transformers';

interface CardGridItemProps {
    card: Card;
    hasOnClick?: boolean;
    hasTooltip?: boolean;
    isHighlighted?: boolean;
    isOnBoard?: boolean;
    onClick?: () => void;
    opacity?: number;
    // if provided overrides the default one from hasOnClick
    zoomLevel?: number;
}

/**
 * renders a card grid item w/ no tooltip
 */
export const CardGridSingleItem: React.FC<CardGridItemProps> = ({
    card,
    hasOnClick,
    isHighlighted,
    isOnBoard,
    onClick,
    zoomLevel,
}) => {
    const { handleClickCard } = useContext(GameManagerContext) || {};
    const defaultOnClick = (extras?: HandleClickOnCardParams['extras']) => {
        handleClickCard(card.id, extras);
    };
    if (card.cardType === CardType.RESOURCE && !card.isAdvanced) {
        return (
            <ResourceCardGridItem
                card={card}
                isHighlighted={isHighlighted}
                onClick={onClick || (hasOnClick ? defaultOnClick : undefined)}
                zoomLevel={zoomLevel}
            />
        );
    }
    if (card.cardType === CardType.RESOURCE && card.isAdvanced) {
        return (
            <AdvancedResourceGridItem
                card={card}
                isHighlighted={isHighlighted}
                onClick={onClick || (hasOnClick ? defaultOnClick : undefined)}
                isOnBoard={isOnBoard}
                zoomLevel={zoomLevel}
            />
        );
    }
    if (card.cardType === CardType.SPELL) {
        return (
            <SpellGridItem
                card={card}
                isHighlighted={isHighlighted}
                onClick={onClick || (hasOnClick ? defaultOnClick : undefined)}
                zoomLevel={zoomLevel}
            />
        );
    }
    if (card.cardType === CardType.UNIT) {
        return (
            <UnitGridItem
                card={card}
                isHighlighted={isHighlighted}
                onClick={onClick || (hasOnClick ? defaultOnClick : undefined)}
                isOnBoard={isOnBoard}
                zoomLevel={zoomLevel}
            />
        );
    }
    return undefined;
};

interface HelperTextProps {
    card: Card;
}

export const HelperText = ({ card }: HelperTextProps): JSX.Element => {
    if (card.cardType === CardType.UNIT) {
        return (
            <div
                style={{
                    width: 185,
                    fontSize: 12,
                    textAlign: 'center',
                    display: 'grid',
                    gap: '12px',
                }}
            >
                {card.isSoldier && (
                    <div>
                        Soldiers must be attacked by non-magical units first
                    </div>
                )}
                {card.isMagical && (
                    <div>
                        Magical units are a special type of ranged unit that do
                        not have to attack soldiers first
                    </div>
                )}
                {card.isRanged && !card.isMagical && (
                    <div>
                        Ranged units do not take damage from attacking units on
                        your turn (except other ranged + magical units)
                    </div>
                )}
                {card.isLegendary && (
                    <div>
                        If you control two legendary units with the same name,
                        the least recent one goes to the cemetery
                    </div>
                )}
            </div>
        );
    }
    return null;
};

export const CardGridItem: React.FC<CardGridItemProps> = ({
    card,
    hasTooltip,
    hasOnClick,
    isHighlighted,
    isOnBoard,
    opacity = 1,
    onClick,
    zoomLevel = 1,
}) => {
    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip({
        trigger: ['focus', 'hover'],
    });

    const associatedCards = getAssociatedCards(card);

    return (
        <>
            {/* The card itself */}
            <div
                style={{ display: 'inline-grid', opacity }}
                ref={hasTooltip && setTriggerRef}
            >
                <CardGridSingleItem
                    key={card.id}
                    card={card}
                    isHighlighted={isHighlighted}
                    isOnBoard={isOnBoard}
                    hasOnClick={hasOnClick}
                    onClick={onClick}
                    zoomLevel={zoomLevel}
                />
            </div>
            {visible && hasTooltip && (
                <div
                    ref={setTooltipRef}
                    {...getTooltipProps({
                        className: 'tooltip-container',
                    })}
                >
                    <div>
                        <div
                            style={{
                                display: 'grid',
                                gap: '4px',
                                gridAutoFlow: 'column',
                            }}
                        >
                            <CardGridSingleItem
                                isOnBoard={isOnBoard}
                                card={modifyCardForTooltip(card)}
                            />
                            {!isOnBoard &&
                                associatedCards.map(
                                    (associatedCard) =>
                                        associatedCard && (
                                            <CardGridSingleItem
                                                isOnBoard={false}
                                                card={modifyCardForTooltip(
                                                    associatedCard
                                                )}
                                            />
                                        )
                                )}
                        </div>
                        {isOnBoard && <HelperText card={card} />}
                    </div>
                    <div
                        {...getArrowProps({
                            className: 'tooltip-arrow',
                        })}
                    />
                </div>
            )}
        </>
    );
};
