import React from 'react';
import styled from 'styled-components';
import { SavedDeck } from '@/types/deckBuilder';
import { Colors } from '@/constants/colors';
import { Skeleton } from '@/types/cards';

type SavedDeckSquareProps = {
    savedDeck: SavedDeck;
    setSkeleton: (decklist: Skeleton) => void;
};

const SavedDeckOutline = styled.div`
    border: 1px solid ${Colors.LIGHT_GREY};
    :not(:last-child) {
        border-right: none;
    }
    padding: 4px;
    cursor: pointer;
`;

const HStack = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
`;

export const SavedDeckSquare: React.FC<SavedDeckSquareProps> = ({
    savedDeck: { name, skeleton },
    setSkeleton,
}) => {
    return (
        <HStack>
            <SavedDeckOutline
                tabIndex={0}
                onClick={() => {
                    setSkeleton(skeleton);
                }}
            >
                <b>{name}</b>
            </SavedDeckOutline>
            <SavedDeckOutline tabIndex={0}>🗑</SavedDeckOutline>
        </HStack>
    );
};
