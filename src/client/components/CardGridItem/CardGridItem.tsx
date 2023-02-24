import React, { useContext } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';

import { Card, CardType } from '@/types/cards';
import { ResourceCardGridItem } from '../ResourceCardGridItem';
import { SpellGridItem } from '../SpellGridItem';
import { UnitGridItem } from '../UnitGridItem';
import { GameManagerContext } from '../GameManager';
import { AdvancedResourceGridItem } from '../AdvancedResourceGridItem.tsx';
import { HandleClickOnCardParams } from '../GameManager/handleClickOnCard';

interface CardGridItemProps {
    card: Card;
    hasOnClick?: boolean;
    hasTooltip?: boolean;
    isHighlighted?: boolean;
    isOnBoard?: boolean;
    onClick?: () => void; // if provided overrides the default one from hasOnClick
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
        if (card.isSoldier) {
            return (
                <div style={{ width: 185, fontSize: 12, textAlign: 'center' }}>
                    Soldiers must be attacked by non-magical units first
                </div>
            );
        }

        if (card.isMagical) {
            return (
                <div style={{ width: 185, fontSize: 12, textAlign: 'center' }}>
                    Magical units act like ranged units (not taking damage on
                    your turn from attacking non-ranged units).
                    <br />
                    <br />
                    They are also not forced to attack soldiers first
                </div>
            );
        }

        if (card.isRanged) {
            return (
                <div style={{ width: 185, fontSize: 12, textAlign: 'center' }}>
                    Ranged units do not take damage from attacking units on your
                    turn (except other ranged + magical units)
                </div>
            );
        }
    }
    return null;
};

export const CardGridItem: React.FC<CardGridItemProps> = ({
    card,
    hasTooltip,
    hasOnClick,
    isHighlighted,
    isOnBoard,
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

    const cardModifiedForTooltip =
        card.cardType === CardType.RESOURCE ? { ...card, isUsed: false } : card;

    return (
        <>
            {/* The card itself */}
            <div
                style={{ display: 'inline-grid' }}
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
                    <CardGridSingleItem
                        isOnBoard={isOnBoard}
                        card={cardModifiedForTooltip}
                    />
                    {isOnBoard && <HelperText card={card} />}
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
