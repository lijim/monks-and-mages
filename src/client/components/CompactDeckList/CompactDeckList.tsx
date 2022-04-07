import React from 'react';
import styled from 'styled-components';

import { Card, CardType } from '@/types/cards';
import { splitDeckListToPiles } from '@/transformers/splitDeckListToPiles';
import { QuantitySelector } from '../QuantitySelector';
import { CastingCost } from '../CastingCost';
import {
    getColorForCard,
    getSecondaryColorForCard,
} from '@/transformers/getColorForCard';
import { RESOURCE_GLOSSARY } from '@/types/resources';

interface CompactDeckListProps {
    deck: Card[];
    onClickCard?: (card: Card) => void;
    shouldShowQuantity?: boolean;
}

type MiniCardFrameProps = {
    hasOnClick: boolean;
    primaryColor: string;
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
    background: ${({ primaryColor }) => primaryColor};
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
                        <MiniCardFrame
                            hasOnClick={!!onClickCard}
                            primaryColor={getColorForCard(card)}
                            key={card.name}
                            onClick={() => {
                                onClickCard(card);
                            }}
                        >
                            {shouldShowQuantity && (
                                <QuantitySelector
                                    hasNoBorder
                                    quantity={quantity}
                                />
                            )}
                            <div>
                                <NameCell
                                    primaryColor={
                                        card.cardType === CardType.RESOURCE
                                            ? RESOURCE_GLOSSARY[
                                                  card.resourceType
                                              ].primaryColor
                                            : undefined
                                    }
                                    secondaryColor={getSecondaryColorForCard(
                                        card
                                    )}
                                >
                                    {card.name}
                                </NameCell>
                            </div>
                            {card.cardType !== CardType.RESOURCE && (
                                <CostCell>
                                    <CastingCost cost={card.cost} />
                                </CostCell>
                            )}
                        </MiniCardFrame>
                    ))}
                </div>
            ))}
        </>
    );
};
