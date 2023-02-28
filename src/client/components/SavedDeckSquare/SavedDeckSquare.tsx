import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useSWRConfig } from 'swr';

import cookie from 'cookiejs';
import { SavedDeck } from '@/types/deckBuilder';
import { Colors } from '@/constants/colors';
import { Skeleton } from '@/types/cards';
import {
    getCleanName,
    getCurrentSavedDeckName,
} from '@/client/redux/selectors';
import { RootState } from '@/client/redux/store';
import { chooseSavedDeck } from '@/client/redux/deckBuilder';

type SavedDeckSquareProps = {
    savedDeck: SavedDeck;
    setSkeleton: (decklist: Skeleton) => void;
};

type OutlineProps = {
    isHighlighted: boolean;
};

const SavedDeckOutline = styled.div<OutlineProps>`
    border: 1px solid
        ${({ isHighlighted }) =>
            isHighlighted ? Colors.FOCUS_BLUE : Colors.LIGHT_GREY};
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
    axios.delete('/api/saved_decks', {
        data: { username, deckId },
        headers: {
            Authorization: `Bearer ${cookie.get('accessToken')}`,
        },
    });

export const SavedDeckSquare: React.FC<SavedDeckSquareProps> = ({
    savedDeck,
    setSkeleton,
}) => {
    const { name, skeleton, id } = savedDeck;
    const username = useSelector<RootState, string | undefined>(getCleanName);
    const dispatch = useDispatch();
    const currentSavedDeckName = useSelector<RootState, string>(
        getCurrentSavedDeckName
    );
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
                    dispatch(chooseSavedDeck(savedDeck));
                }}
                isHighlighted={currentSavedDeckName === name}
            >
                <b>{name}</b>
            </SavedDeckOutline>
            <SavedDeckOutline
                tabIndex={0}
                onClick={deleteDeck}
                isHighlighted={currentSavedDeckName === name}
            >
                🗑
            </SavedDeckOutline>
        </HStack>
    );
};
