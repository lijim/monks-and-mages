import React from 'react';
import styled from 'styled-components';

import { Card, PileOfCards } from '@/types/cards';
import { splitDeckListToPiles } from '@/transformers/splitDeckListToPiles';
import { CardGridItem } from '../CardGridItem';
import { QuantitySelector } from '../QuantitySelector';

interface DeckListProps {
    addCard?: (card: Card) => void;
    deck: Card[];
    removeCard?: (card: Card) => void;
    shouldShowQuantity?: boolean;
    shouldShowSummary?: boolean;
}

interface DeckListCardSlotProps {
    position: number;
}

// controls positioning, hover of a CardGridItem in the deck list
const DeckListCardSlot = styled.div<DeckListCardSlotProps>`
    height: 35px;
    z-index: 0;
    transition: all 0.2s ease-in-out 0.1s;
    :hover:not(:last-of-type) {
        height: 275px;
        z-index: 1;
    }
`;

const Centering = styled.div`
    width: 1280px;
    margin: auto;
`;

const Pile = styled.div`
    display: block;
    width: 295px;
    grid-auto-rows: 34px;
`;

const Piles = styled.div`
    margin: auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    row-gap: 240px;
`;

const getTotalCardsInPile = (pile: PileOfCards): number => {
    const initialValue = 0;
    return [...pile.cards.entries()]
        .map(([, quantity]) => quantity)
        .reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            initialValue
        );
};

export const DeckList: React.FC<DeckListProps> = ({
    deck,
    removeCard,
    shouldShowQuantity = true,
    shouldShowSummary = true,
}) => {
    if (deck.length === 0) {
        return <Centering />;
    }
    const piles = splitDeckListToPiles(deck);
    return (
        <Centering>
            {shouldShowSummary && (
                <>
                    <div>
                        <b>Cards</b>: {deck.length} <hr />
                        {piles.map((pile, pileIndex) => (
                            <span key={pileIndex}>
                                {pileIndex !== 0 && <br />}
                                <b>{pile.title}</b>: {getTotalCardsInPile(pile)}
                            </span>
                        ))}
                    </div>
                    <hr />
                </>
            )}
            <Piles>
                {piles.map((pile, pileIndex) => (
                    <Pile key={pileIndex}>
                        <h2>{pile.title}</h2>
                        {[...pile.cards.entries()].map(
                            ([card, quantity], cardIndex) => (
                                <DeckListCardSlot
                                    position={cardIndex}
                                    key={cardIndex}
                                >
                                    {shouldShowQuantity && (
                                        <QuantitySelector
                                            quantity={quantity}
                                        ></QuantitySelector>
                                    )}
                                    {'  '}
                                    <CardGridItem
                                        card={card}
                                        onClick={() => {
                                            removeCard?.(card);
                                        }}
                                    />
                                </DeckListCardSlot>
                            )
                        )}
                    </Pile>
                ))}
            </Piles>
        </Centering>
    );
};
