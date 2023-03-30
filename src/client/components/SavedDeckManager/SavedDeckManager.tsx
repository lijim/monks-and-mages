import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useSWR, { useSWRConfig } from 'swr';

import cookie from 'cookiejs';
import { RootState } from '@/client/redux/store';
import { getCleanName } from '@/client/redux/selectors';
import { SavedDeck } from '@/types/deckBuilder';
import { getSkeletonFromDeckList } from '@/transformers/getSkeletonFromDeckList';
import { fetcher } from '@/apiHelpers';
import { SavedDeckSquare } from '@/client/components/SavedDeckSquare';
import { DeckList } from '@/types/cards';
import { PrimaryColorButton } from '../Button';
import { saveNewDeck } from '@/client/redux/deckBuilder';

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
};

export const SavedDeckManager: React.FC<SavedDeckManagerProps> = ({
    decklist,
}) => {
    const { mutate } = useSWRConfig();
    const dispatch = useDispatch();

    const [deckName, setDeckName] = useState('');
    const username = useSelector<RootState, string | undefined>(getCleanName);
    const { data: savedDecks } = useSWR<SavedDeck[]>(
        `/api/saved_decks/${username}`,
        fetcher()
    );

    const createDeck = async () => {
        try {
            const savedDeck = await axios.post<SavedDeck>(
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
            dispatch(saveNewDeck(savedDeck.data));
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
                        />
                    ))}
            </DeckListGrid>
        </Backdrop>
    );
};
