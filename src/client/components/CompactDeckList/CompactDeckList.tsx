import React from 'react';
import { createPortal } from 'react-dom';
import { usePopperTooltip } from 'react-popper-tooltip';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { Card, CardType } from '@/types/cards';
import {
    splitDeckListToPiles,
    getColorsForCard,
    getSecondaryColorForCard,
    modifyCardForTooltip,
    getAssociatedCards,
} from '@/transformers';
import { QuantitySelector } from '../QuantitySelector';
import { CastingCost } from '../CastingCost';
import { RESOURCE_GLOSSARY } from '@/types/resources';
import { CardGridSingleItem } from '../CardGridItem';
import { Colors } from '@/constants/colors';
import { addCard } from '@/client/redux/deckBuilder';
import {
    getGameFormat,
    getGameState,
    getNumberLeft,
} from '@/client/redux/selectors';
import { GameState } from '@/types/board';
import { RootState } from '@/client/redux/store';
import { ALL_BASIC_RESOURCES } from '@/constants/deckLists';
import { isFormatConstructed } from '@/types/games';

interface CompactDeckListProps {
    deck: Card[];
    isDisplayOnly?: boolean;
    onClickCard?: (card: Card) => void;
    shouldShowQuantity?: boolean;
}

type MiniCardFrameProps = {
    hasOnClick: boolean;
    isDisplayOnly?: boolean;
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
    isDisplayOnly: boolean;
    quantity: number;
    shouldShowQuantity: boolean;
};

const MiniCard: React.FC<MiniCardProps> = ({
    card,
    quantity,
    shouldShowQuantity,
    isDisplayOnly,
}) => {
    const dispatch = useDispatch();
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

    const gameFormat = useSelector(getGameFormat);
    const numberLeft = useSelector(getNumberLeft(card));

    const associatedCards = getAssociatedCards(card);
    const { primaryColor, secondaryColor } = getColorsForCard(card);

    let quantityToDisplay = 0;
    if (isFormatConstructed(gameFormat)) {
        quantityToDisplay = quantity;
    } else if (quantity !== Number.MAX_SAFE_INTEGER) {
        quantityToDisplay = numberLeft;
    } else {
        quantityToDisplay = quantity;
    }

    const hasOnClick = () => {
        if (isDisplayOnly) {
            return false;
        }
        if (
            gameFormat &&
            !isFormatConstructed(gameFormat) &&
            quantityToDisplay <= 0
        ) {
            return false;
        }
        return true;
    };

    const onAddCard = () => {
        if (hasOnClick()) {
            dispatch(addCard(card));
        }
    };

    return (
        <>
            <MiniCardFrame
                style={{ opacity: hasOnClick() ? '1' : '.7' }}
                hasOnClick={hasOnClick()}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                onClick={onAddCard}
                tabIndex={0}
                ref={setTriggerRef}
            >
                {shouldShowQuantity && (
                    <QuantitySelector
                        hasNoBorder
                        quantity={quantityToDisplay}
                    />
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
                        <div
                            style={{
                                display: 'grid',
                                gap: '4px',
                                gridAutoFlow: 'column',
                            }}
                        >
                            <CardGridSingleItem
                                isOnBoard={false}
                                card={modifyCardForTooltip(card)}
                            />
                            {associatedCards.map(
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
    shouldShowQuantity = true,
    isDisplayOnly = false,
}) => {
    let piles = splitDeckListToPiles(deck);
    const gameState = useSelector<RootState, GameState>(getGameState);

    const shouldShowBasicResources = gameState === GameState.DECKBUILDING;

    if (shouldShowBasicResources) {
        const basicResourceCards = new Map(
            ALL_BASIC_RESOURCES.mainBoard.map(({ card }) => [
                card,
                Number.MAX_SAFE_INTEGER,
            ])
        );
        const resources = piles.find((pile) => pile.title === 'Resources');
        if (!resources) {
            piles = [
                {
                    title: 'Resources',
                    cards: basicResourceCards,
                },
                ...piles,
            ];
        } else {
            resources.cards = new Map([
                ...basicResourceCards.entries(),
                ...resources.cards.entries(),
            ]);
        }
    }

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
                            key={card.name}
                            isDisplayOnly={isDisplayOnly}
                        />
                    ))}
                </div>
            ))}
        </>
    );
};
