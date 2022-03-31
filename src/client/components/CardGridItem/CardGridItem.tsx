import React, { useContext } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';

import { Card, CardType } from '@/types/cards';
import { ResourceCardGridItem } from '../ResourceCardGridItem';
import { SpellGridItem } from '../SpellGridItem';
import { UnitGridItem } from '../UnitGridItem';
import { GameManagerContext } from '../GameManager';
import { AdvancedResourceCardGridItem } from '../AdvancedResourceCardGridItem.tsx';

interface CardGridItemProps {
    card: Card;
    hasOnClick?: boolean;
    hasTooltip?: boolean;
    isHighlighted?: boolean;
    isOnBoard?: boolean;
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
    zoomLevel,
}) => {
    const { handleClickCard } = useContext(GameManagerContext) || {};
    const onClick = () => {
        handleClickCard(card.id);
    };
    if (card.cardType === CardType.RESOURCE && !card.isAdvanced) {
        return (
            <ResourceCardGridItem
                card={card}
                isHighlighted={isHighlighted}
                onClick={hasOnClick ? onClick : undefined}
                zoomLevel={zoomLevel}
            />
        );
    }
    if (card.cardType === CardType.RESOURCE && card.isAdvanced) {
        return (
            <AdvancedResourceCardGridItem
                card={card}
                isHighlighted={isHighlighted}
                onClick={hasOnClick ? onClick : undefined}
                zoomLevel={zoomLevel}
            />
        );
    }
    if (card.cardType === CardType.SPELL) {
        return (
            <SpellGridItem
                card={card}
                isHighlighted={isHighlighted}
                onClick={hasOnClick ? onClick : undefined}
                zoomLevel={zoomLevel}
            />
        );
    }
    if (card.cardType === CardType.UNIT) {
        return (
            <UnitGridItem
                card={card}
                isHighlighted={isHighlighted}
                onClick={hasOnClick ? onClick : undefined}
                isOnBoard={isOnBoard}
                zoomLevel={zoomLevel}
            />
        );
    }
    return undefined;
};

export const CardGridItem: React.FC<CardGridItemProps> = ({
    card,
    hasTooltip,
    hasOnClick,
    isHighlighted,
    isOnBoard,
    zoomLevel = 1,
}) => {
    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip();

    const cardModifiedForTooltip =
        card.cardType === CardType.RESOURCE ? { ...card, isUsed: false } : card;

    return (
        <>
            {/* The card itself */}
            <div style={{ display: 'inline-grid' }} ref={setTriggerRef}>
                <CardGridSingleItem
                    key={card.id}
                    card={card}
                    isHighlighted={isHighlighted}
                    isOnBoard={isOnBoard}
                    hasOnClick={hasOnClick}
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
