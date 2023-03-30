import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useSWRConfig } from 'swr';

import cookie from 'cookiejs';
import useSWRMutation from 'swr/mutation';
import { SavedDeck } from '@/types/deckBuilder';
import { Colors } from '@/constants/colors';
import {
    getCleanName,
    getCurrentSavedDeckId,
    getCurrentSavedDeckName,
    getIsSavedDeckAltered,
    getSkeleton,
} from '@/client/redux/selectors';
import { RootState } from '@/client/redux/store';
import { chooseSavedDeck, saveOldDeck } from '@/client/redux/deckBuilder';
import { Skeleton } from '@/types/cards';
import { swrPatch } from '@/apiHelpers';
import { ErrorMessage } from '@/types/api';

type SavedDeckSquareProps = {
    savedDeck: SavedDeck;
};

type OutlineProps = {
    isHighlighted: boolean;
};

const SavedDeckOutline = styled.div<OutlineProps>`
    border: ${({ isHighlighted }) => (isHighlighted ? 3 : 1)}px solid
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
    grid-template-columns: 1fr auto auto;
`;

const deleteDeckFn = async (username: string, deckId: string) =>
    axios.delete('/api/saved_decks', {
        data: { username, deckId },
        headers: {
            Authorization: `Bearer ${cookie.get('accessToken')}`,
        },
    });

const isSaveResponseError = (
    response: SavedDeck | ErrorMessage
): response is ErrorMessage => {
    return (response as ErrorMessage).message !== undefined;
};

export const SavedDeckSquare: React.FC<SavedDeckSquareProps> = ({
    savedDeck,
}) => {
    const { name, id } = savedDeck;
    const username = useSelector<RootState, string | undefined>(getCleanName);
    const dispatch = useDispatch();
    const currentSavedDeckName = useSelector<RootState, string>(
        getCurrentSavedDeckName
    );
    const currentSavedDeckId = useSelector<RootState, string>(
        getCurrentSavedDeckId
    );
    const isSavedDeckAltered = useSelector<RootState, boolean>(
        getIsSavedDeckAltered
    );
    const skeleton = useSelector<RootState, Skeleton>(getSkeleton);
    const { mutate } = useSWRConfig();
    const { trigger } = useSWRMutation<
        SavedDeck | ErrorMessage,
        unknown,
        unknown,
        { deckId: string; skeleton: Skeleton }
    >(`/saved_decks`, swrPatch());

    const isHighlighted = currentSavedDeckName === name;

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

    const onClickSave = async () => {
        try {
            const savedDeckResponse = await trigger({
                deckId: currentSavedDeckId,
                skeleton,
            });
            if (isSaveResponseError(savedDeckResponse)) {
                // eslint-disable-next-line no-alert
                window.alert(savedDeckResponse.message);
                return;
            }
            dispatch(saveOldDeck(savedDeckResponse));
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
                    dispatch(chooseSavedDeck(savedDeck));
                }}
                isHighlighted={isHighlighted}
            >
                <b>{name}</b>
            </SavedDeckOutline>
            {isSavedDeckAltered && isHighlighted && (
                <SavedDeckOutline
                    tabIndex={0}
                    isHighlighted={isHighlighted}
                    onClick={onClickSave}
                >
                    💾
                </SavedDeckOutline>
            )}
            <SavedDeckOutline
                tabIndex={0}
                onClick={deleteDeck}
                isHighlighted={isHighlighted}
            >
                🗑
            </SavedDeckOutline>
        </HStack>
    );
};
