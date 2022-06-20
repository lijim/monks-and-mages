import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import useSWR from 'swr';

import { RootState } from '@/client/redux/store';
import { getCleanName } from '@/client/redux/selectors';
import { SavedDeck } from '@/types/deckBuilder';
import { fetcher } from '@/apiHelpers';
import { SavedDeckSquare } from '@/client/components/SavedDeckSquare';
import { Skeleton } from '@/types/cards';

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
    setSkeleton: (decklist: Skeleton) => void;
};

export const SavedDeckManager: React.FC<SavedDeckManagerProps> = ({
    setSkeleton,
}) => {
    const username = useSelector<RootState, string | undefined>(getCleanName);
    const { data: savedDecks } = useSWR<SavedDeck[]>(
        `/api/saved_decks/${username}`,
        fetcher
    );

    return (
        <Backdrop>
            <h1>Decks</h1>
            <DeckListGrid>
                {savedDecks
                    ?.sort((deckA, deckB) =>
                        deckA.name
                            .toLowerCase()
                            .localeCompare(deckB.name.toLowerCase())
                    )
                    .map((savedDeck) => (
                        <SavedDeckSquare
                            savedDeck={savedDeck}
                            setSkeleton={setSkeleton}
                        />
                    ))}
            </DeckListGrid>
        </Backdrop>
    );
};
