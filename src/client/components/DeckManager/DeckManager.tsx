import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { DeckList } from '../DeckList';
import { TopNavBar } from '../TopNavBar';
import { RootState } from '@/client/redux/store';
import { makeDeck } from '@/factories/deck';
import { DeckList as DeckListType } from '@/types/cards';
import {
    getCurrentDeckName,
    getCurrentDeckList,
} from '@/client/redux/selectors';

const DeckListBackDrop = styled.div`
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(5px);
    padding: 16px;

    width: 1000px;
    margin: auto;
    height: 86vh;
    overflow-y: scroll;
`;

export const DeckManager: React.FC = () => {
    const deckList = useSelector<RootState, DeckListType>(getCurrentDeckList);
    const deckName = useSelector<RootState, string>(getCurrentDeckName);
    const deck = makeDeck(deckList);
    return (
        <>
            <TopNavBar>
                <b>Viewing Deck:</b> {deckName} <Link to="/">Back</Link>
            </TopNavBar>
            <DeckListBackDrop>
                <DeckList deck={deck} isDisplayOnly />
            </DeckListBackDrop>
        </>
    );
};
