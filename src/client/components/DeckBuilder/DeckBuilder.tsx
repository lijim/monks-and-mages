import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { DeckList } from '../DeckList';
import { TopNavBar } from '../TopNavBar';
import { makeDeck } from '@/factories/deck';
import { ALL_CARDS } from '@/constants/deckLists';
import { CompactDeckList } from '../CompactDeckList';
import { Card, CardType, DeckList as DeckListType } from '@/types/cards';
import { SecondaryColorButton } from '../Button';
import { getSkeletonFromDeckList } from '@/transformers/getSkeletonFromDeckList/getSkeletonFromDeckList';
import { getDeckListFromSkeleton } from '@/transformers/getDeckListFromSkeleton/getDeckListFromSkeleton';

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

export const DeckBuilder: React.FC<DeckBuilderProps> = ({
    cardPool = makeDeck(ALL_CARDS),
    isConstructed = true,
}) => {
    const [myDeck, setMyDeck] = useState<DeckListType>([]);

    const addCard = (card: Card) => {
        const isCardNotBasicResource = !(
            card.cardType === CardType.RESOURCE && !card.isAdvanced
        );

        const matchingCardSlot = myDeck.find(
            (cardSlot) => cardSlot.card.name === card.name
        );

        // on constructed mode, everything except basic resourcs is capped at 4
        if (
            isConstructed &&
            isCardNotBasicResource &&
            matchingCardSlot &&
            matchingCardSlot.quantity >= 4
        )
            return;

        if (matchingCardSlot) {
            matchingCardSlot.quantity += 1;
        } else {
            myDeck.push({ card, quantity: 1 });
        }
        setMyDeck([...myDeck]);
    };
    const removeCard = (card: Card) => {
        const matchingCardSlot = myDeck.find(
            (cardSlot) => cardSlot.card.name === card.name
        );

        if (matchingCardSlot) {
            matchingCardSlot.quantity -= 1;
        }
        setMyDeck([...myDeck.filter((cardSlot) => cardSlot.quantity > 0)]);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(
            JSON.stringify(getSkeletonFromDeckList(myDeck))
        );
    };

    const importFromClipboard = async () => {
        const clipboardTxt = await navigator.clipboard.readText();
        try {
            const { decklist, errors } = getDeckListFromSkeleton(
                JSON.parse(clipboardTxt)
            );
            if (!errors?.length) setMyDeck(decklist);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
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
                    <SecondaryColorButton onClick={copyToClipboard}>
                        Copy decklist to clipboard
                    </SecondaryColorButton>
                    &nbsp;&nbsp;
                    <SecondaryColorButton onClick={importFromClipboard}>
                        Import decklist from clipboard
                    </SecondaryColorButton>
                    <br />
                    <br />
                    <DeckList
                        deck={makeDeck(myDeck)}
                        addCard={addCard}
                        removeCard={removeCard}
                    />
                </DeckListBackDrop>
            </DeckListContainers>
        </>
    );
};