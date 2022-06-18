import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import useSWR from 'swr';

import { RootState } from '@/client/redux/store';
import { getCleanName } from '@/client/redux/selectors';
import { SavedDeck } from '@/types/deckBuilder';
import { fetcher } from '@/apiHelpers';

const Backdrop = styled.div`
    min-width: 200px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(5px);
    padding: 16px;
    height: 100%;
    width: 100%;

    margin: auto;
    overflow-y: scroll;
`;

export const SavedDeckManager: React.FC = () => {
    const username = useSelector<RootState, string | undefined>(getCleanName);
    const { data: savedDecks } = useSWR<SavedDeck[]>(
        `/api/saved_decks/${username}`,
        fetcher
    );

    return (
        <Backdrop>
            <h1>Decks</h1>
            Number of decks: {savedDecks?.length}
        </Backdrop>
    );
};
