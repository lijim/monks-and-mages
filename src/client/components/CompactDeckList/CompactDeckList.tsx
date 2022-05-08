import React from 'react';
import { createPortal } from 'react-dom';
import { usePopperTooltip } from 'react-popper-tooltip';
import styled from 'styled-components';

import { Card, CardType } from '@/types/cards';
import { splitDeckListToPiles } from '@/transformers/splitDeckListToPiles';
import { QuantitySelector } from '../QuantitySelector';
import { CastingCost } from '../CastingCost';
import {
    getColorsForCard,
    getSecondaryColorForCard,
} from '@/transformers/getColorsForCard';
import { RESOURCE_GLOSSARY } from '@/types/resources';
import { CardGridSingleItem } from '../CardGridItem';
import { Colors } from '@/constants/colors';

interface CompactDeckListProps {
    deck: Card[];
    onClickCard?: (card: Card) => void;
    shouldShowQuantity?: boolean;
}

type MiniCardFrameProps = {
    hasOnClick: boolean;
    primaryColor: string;
    secondaryColor: string;
};

const MiniCardFrame = styled.div<MiniCardFrameProps>`
    box-shadow: 0 1px 0 rgb(0 0 0 / 30%);
    padding: 2px 7px;
    width: 300px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    margin-bottom: 4px;
    margin-left: 4px;
    grid-gap: 6px;
    align-items: center;
    color: white;
    ${({ primaryColor, secondaryColor }) => {
        if (!primaryColor) {
            return `background-color: ${Colors.NO_COLOR_BROWN};`;
        }
        if (!secondaryColor) {
            return `background-color: ${primaryColor};`;
        }
        return `background-image: linear-gradient(to right, ${primaryColor}, ${secondaryColor});`;
    }};
    cursor: ${({ hasOnClick }) => (hasOnClick ? 'pointer' : 'inherit')};
`;

type NameCellProps = {
    primaryColor?: string;
    secondaryColor?: string;
};

export const NameCell = styled.span<NameCellProps>`
    font-style: italic;
    ${({ primaryColor, secondaryColor }) => {
        if (!primaryColor) {
            return `background-color: rgba(0, 0, 0, 0.2);`;
        }
        if (!secondaryColor) {
            return `background-color: ${primaryColor};`;
        }
        return `background-image: linear-gradient(to right, ${primaryColor}, ${secondaryColor});`;
    }};
    border-radius: 2px;
    font-weight: 500;
    padding: 3px 6px;
    text-overflow: ellipsis;
`;

const CostCell = styled.div`
    text-align: right;
    color: white;
`;

type MiniCardProps = {
    card: Card;
    onClickCard: (card: Card) => void;
    quantity: number;
    shouldShowQuantity: boolean;
};

const MiniCard: React.FC<MiniCardProps> = ({
    card,
    onClickCard,
    quantity,
    shouldShowQuantity,
}) => {
    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip({
        trigger: ['focus', 'hover'],
        placement: 'right',
    });

    const cardModifiedForTooltip =
        card.cardType === CardType.RESOURCE ? { ...card, isUsed: false } : card;

    const { primaryColor, secondaryColor } = getColorsForCard(card);

    return (
        <>
            <MiniCardFrame
                hasOnClick={!!onClickCard}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                onClick={() => {
                    onClickCard(card);
                }}
                tabIndex={0}
                ref={setTriggerRef}
            >
                {shouldShowQuantity && (
                    <QuantitySelector hasNoBorder quantity={quantity} />
                )}
                <div>
                    <NameCell
                        primaryColor={
                            card.cardType === CardType.RESOURCE
                                ? RESOURCE_GLOSSARY[card.resourceType]
                                      .primaryColor
                                : undefined
                        }
                        secondaryColor={getSecondaryColorForCard(card)}
                    >
                        {card.name}
                    </NameCell>
                </div>
                {card.cardType !== CardType.RESOURCE && (
                    <CostCell>
                        <CastingCost
                            cost={card.cost}
                            originalCost={card.cost}
                        />
                    </CostCell>
                )}
            </MiniCardFrame>
            {visible &&
                createPortal(
                    <div
                        ref={setTooltipRef}
                        {...getTooltipProps({
                            className: 'tooltip-container',
                        })}
                    >
                        <CardGridSingleItem
                            isOnBoard={false}
                            card={cardModifiedForTooltip}
                        />
                        <div
                            {...getArrowProps({
                                className: 'tooltip-arrow',
                            })}
                        />
                    </div>,
                    document.body
                )}
        </>
    );
};

export const CompactDeckList: React.FC<CompactDeckListProps> = ({
    deck,
    onClickCard,
    shouldShowQuantity = true,
}) => {
    const piles = splitDeckListToPiles(deck);
    return (
        <>
            {piles.map((pile) => (
                <div key={pile.title}>
                    <h3>{pile.title}</h3>
                    {[...pile.cards.entries()].map(([card, quantity]) => (
                        <MiniCard
                            card={card}
                            quantity={quantity}
                            shouldShowQuantity={shouldShowQuantity}
                            onClickCard={onClickCard}
                            key={card.name}
                        />
                    ))}
                </div>
            ))}
        </>
    );
};
