import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useSWRConfig } from 'swr';

import { SavedDeck } from '@/types/deckBuilder';
import { Colors } from '@/constants/colors';
import { Skeleton } from '@/types/cards';
import { getCleanName } from '@/client/redux/selectors';
import { RootState } from '@/client/redux/store';

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

const deleteDeckFn = async (username: string, deckId: string) =>
    axios.delete('/api/saved_decks', { data: { username, deckId } });

export const SavedDeckSquare: React.FC<SavedDeckSquareProps> = ({
    savedDeck: { name, skeleton, id },
    setSkeleton,
}) => {
    const username = useSelector<RootState, string | undefined>(getCleanName);

    const { mutate } = useSWRConfig();

    const deleteDeck = async () => {
        try {
            await deleteDeckFn(username, id);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        } finally {
            mutate(`/api/saved_decks/${username}`);
        }
    };

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
            <SavedDeckOutline tabIndex={0} onClick={deleteDeck}>
                🗑
            </SavedDeckOutline>
        </HStack>
    );
};
