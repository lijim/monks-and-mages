import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import useSWR, { useSWRConfig } from 'swr';

import cookie from 'cookiejs';
import { RootState } from '@/client/redux/store';
import { getCleanName } from '@/client/redux/selectors';
import { SavedDeck } from '@/types/deckBuilder';
import { getSkeletonFromDeckList } from '@/transformers/getSkeletonFromDeckList';
import { fetcher } from '@/apiHelpers';
import { SavedDeckSquare } from '@/client/components/SavedDeckSquare';
import { DeckList, Skeleton } from '@/types/cards';
import { PrimaryColorButton } from '../Button';

const Backdrop = styled.div`
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(5px);
    padding: 16px;
    height: 100%;
    width: 200px;

    margin: auto;
    overflow-y: scroll;
`;

const DeckListGrid = styled.div`
    display: grid;
    grid-gap: 8px;
`;

type SavedDeckManagerProps = {
    decklist: DeckList;
    setSkeleton: (decklist: Skeleton) => void;
};

export const SavedDeckManager: React.FC<SavedDeckManagerProps> = ({
    decklist,
    setSkeleton,
}) => {
    const { mutate } = useSWRConfig();

    const [deckName, setDeckName] = useState('');
    const username = useSelector<RootState, string | undefined>(getCleanName);
    const { data: savedDecks } = useSWR<SavedDeck[]>(
        `/api/saved_decks/${username}`,
        fetcher
    );

    const createDeck = async () => {
        try {
            await axios.post(
                '/api/saved_decks',
                {
                    username,
                    deckName,
                    skeleton: getSkeletonFromDeckList(decklist),
                },
                {
                    headers: {
                        Authorization: `Bearer ${cookie.get('accessToken')}`,
                    },
                }
            );
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        } finally {
            mutate(`/api/saved_decks/${username}`);
        }
    };

    return (
        <Backdrop>
            <h1 style={{ marginTop: 0 }}>Decks</h1>
            <input
                type="text"
                data-form-type="other"
                value={deckName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setDeckName(e.target.value);
                }}
                placeholder="My First Deck"
            />
            <PrimaryColorButton disabled={!deckName} onClick={createDeck}>
                💾 Save
            </PrimaryColorButton>
            <hr />
            <DeckListGrid>
                {(savedDecks || ([] as SavedDeck[]))
                    ?.sort((deckA, deckB) =>
                        deckA.name
                            .toLowerCase()
                            .localeCompare(deckB.name.toLowerCase())
                    )
                    .map((savedDeck) => (
                        <SavedDeckSquare
                            key={savedDeck.id}
                            savedDeck={savedDeck}
                            setSkeleton={setSkeleton}
                        />
                    ))}
            </DeckListGrid>
        </Backdrop>
    );
};
