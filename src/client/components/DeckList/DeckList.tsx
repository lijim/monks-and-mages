import React from 'react';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { Card, PileOfCards } from '@/types/cards';
import { splitDeckListToPiles } from '@/transformers/splitDeckListToPiles';
import { CardGridItem } from '../CardGridItem';
import { QuantitySelector } from '../QuantitySelector';
import { removeCard } from '@/client/redux/deckBuilder';

interface DeckListProps {
    deck: Card[];
    isDisplayOnly: boolean;
    shouldShowQuantity?: boolean;
    shouldShowSummary?: boolean;
}

interface DeckListCardSlotProps {
    position: number;
}

// controls positioning, hover of a CardGridItem in the deck list
export const DeckListCardSlot = styled.div<DeckListCardSlotProps>`
    height: 33px;
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

export const Pile = styled(motion.div)`
    display: block;
    width: 295px;
    grid-auto-rows: 34px;
`;

export const Piles = styled.div`
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
    shouldShowQuantity = true,
    shouldShowSummary = true,
    isDisplayOnly = false,
}) => {
    const dispatch = useDispatch();
    const onRemoveCard = (card: Card) => {
        if (!isDisplayOnly) {
            dispatch(removeCard(card));
        }
    };

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
                <AnimatePresence>
                    {piles.map((pile, pileIndex) => (
                        <Pile
                            key={pileIndex}
                            initial={{ opacity: 0.01, scale: 0.75 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2>{pile.title}</h2>

                            {[...pile.cards.entries()].map(
                                ([card, quantity], cardIndex) => (
                                    <DeckListCardSlot
                                        position={cardIndex}
                                        key={card.id}
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
                                                onRemoveCard(card);
                                            }}
                                        />
                                    </DeckListCardSlot>
                                )
                            )}
                        </Pile>
                    ))}
                </AnimatePresence>
            </Piles>
        </Centering>
    );
};
