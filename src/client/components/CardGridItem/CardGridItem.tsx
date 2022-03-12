import React, { useContext } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';

import { Card, CardType } from '@/types/cards';
import { ResourceCardGridItem } from '../ResourceCardGridItem';
import { SpellGridItem } from '../SpellGridItem';
import { UnitGridItem } from '../UnitGridItem';
import { GameManagerContext } from '../GameManager';

interface CardGridItemProps {
    card: Card;
    hasOnClick?: boolean;
    hasTooltip?: boolean;
    isOnBoard?: boolean;
    zoomLevel?: number;
}

/**
 * renders a card grid item w/ no tooltip
 */
export const CardGridSingleItem: React.FC<CardGridItemProps> = ({
    card,
    hasOnClick,
    isOnBoard,
    zoomLevel,
}) => {
    const { handleClickCard } = useContext(GameManagerContext) || {};
    const onClick = () => {
        handleClickCard(card.id);
    };
    if (card.cardType === CardType.RESOURCE) {
        return (
            <ResourceCardGridItem
                card={card}
                onClick={hasOnClick ? onClick : undefined}
                zoomLevel={zoomLevel}
            />
        );
    }
    if (card.cardType === CardType.SPELL) {
        return (
            <SpellGridItem
                card={card}
                onClick={hasOnClick ? onClick : undefined}
                zoomLevel={zoomLevel}
            />
        );
    }
    if (card.cardType === CardType.UNIT) {
        return (
            <UnitGridItem
                card={card}
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

    return (
        <>
            {/* The card itself */}
            <div style={{ display: 'inline-grid' }} ref={setTriggerRef}>
                <CardGridSingleItem
                    key={card.id}
                    card={card}
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
                    <CardGridSingleItem isOnBoard={isOnBoard} card={card} />
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
