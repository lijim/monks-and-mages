import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { DeckList } from '../DeckList';
import { TopNavBar } from '../TopNavBar';
import { getPremadeDeckList } from '@/client/redux/selectors/getPremadeDeckList';
import {
    deckListMappings,
    DeckListSelections,
} from '@/constants/lobbyConstants';
import { RootState } from '@/client/redux/store';
import { makeDeck } from '@/factories/deck';

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
    const premadeDeckList =
        useSelector<RootState, DeckListSelections>(getPremadeDeckList) ||
        DeckListSelections.MONKS;
    const deckList = deckListMappings[premadeDeckList];
    const deck = makeDeck(deckList);
    return (
        <>
            <TopNavBar>
                <b>Viewing Deck:</b> {premadeDeckList} <Link to="/">Back</Link>
            </TopNavBar>
            <DeckListBackDrop>
                <DeckList deck={deck} />
            </DeckListBackDrop>
        </>
    );
};
