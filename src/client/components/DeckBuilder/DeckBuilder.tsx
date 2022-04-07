import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { DeckList } from '../DeckList';
import { TopNavBar } from '../TopNavBar';
import { makeDeck } from '@/factories/deck';
import { ALL_CARDS } from '@/constants/deckLists';
import { CompactDeckList } from '../CompactDeckList';
import { Card, CardType } from '@/types/cards';
import { makeCard } from '@/factories/cards';

const DeckListContainers = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 16px;
    height: 86vh;
    place-self: center;
    padding: 12px;
`;

const DeckListBackDrop = styled.div`
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(5px);
    padding: 16px;
    height: 100%;
    width: 100%;

    margin: auto;
    overflow-y: scroll;
`;

type DeckBuilderProps = {
    cardPool?: Card[];
    isConstructed?: boolean;
};

function spliceNoMutate(myArray: Card[], indexToRemove: number) {
    return myArray
        .slice(0, indexToRemove)
        .concat(myArray.slice(indexToRemove + 1));
}

export const DeckBuilder: React.FC<DeckBuilderProps> = ({
    cardPool = makeDeck(ALL_CARDS),
    isConstructed = true,
}) => {
    const [myDeck, setMyDeck] = useState(makeDeck([]));

    const addCard = (card: Card) => {
        const isCardNotBasicResource = !(
            card.cardType === CardType.RESOURCE && !card.isAdvanced
        );
        if (
            isConstructed &&
            isCardNotBasicResource &&
            myDeck.filter((c) => c.name === card.name).length >= 4
        )
            return;
        setMyDeck(myDeck.concat([makeCard(card)]));
    };
    const removeCard = (card: Card) => {
        const firstMatchingIndex = myDeck.findIndex(
            (c) => c.name === card.name
        );

        if (firstMatchingIndex > -1) {
            setMyDeck(spliceNoMutate(myDeck, firstMatchingIndex));
        }
    };
    return (
        <>
            <TopNavBar>
                <b>Customize your deck</b> {} <Link to="/">Back</Link>
            </TopNavBar>
            <DeckListContainers>
                <DeckListBackDrop data-testid="CardPool">
                    <CompactDeckList
                        deck={cardPool}
                        shouldShowQuantity={false}
                        onClickCard={addCard}
                    />
                </DeckListBackDrop>
                <DeckListBackDrop data-testid="MyDeck">
                    <DeckList
                        deck={myDeck}
                        addCard={addCard}
                        removeCard={removeCard}
                    />
                </DeckListBackDrop>
            </DeckListContainers>
        </>
    );
};
