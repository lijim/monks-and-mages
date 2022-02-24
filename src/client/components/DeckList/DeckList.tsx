import React from 'react';
import styled from 'styled-components';

import { Card } from '@/types/cards';
import { splitDeckListToPiles } from '@/transformers/splitDeckListToPiles';
import { CardGridItem } from '../CardGridItem';
import { QuantitySelector } from '../QuantitySelector';

interface DeckListProps {
    deck: Card[];
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

export const DeckList: React.FC<DeckListProps> = ({ deck }) => {
    const piles = splitDeckListToPiles(deck);
    return (
        <Centering>
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
                                    <QuantitySelector
                                        quantity={quantity}
                                    ></QuantitySelector>
                                    {'  '}
                                    <CardGridItem card={card} />
                                </DeckListCardSlot>
                            )
                        )}
                    </Pile>
                ))}
            </Piles>
        </Centering>
    );
};
