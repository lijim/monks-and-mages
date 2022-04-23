import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'redux-first-history';
import styled from 'styled-components';

import { DeckList } from '../DeckList';
import { TopNavBar } from '../TopNavBar';
import { makeDeck } from '@/factories/deck';
import { ALL_CARDS } from '@/constants/deckLists';
import { CompactDeckList } from '../CompactDeckList';
import {
    Card,
    CardType,
    DeckList as DeckListType,
    Skeleton,
} from '@/types/cards';
import { SecondaryColorButton } from '../Button';
import { getSkeletonFromDeckList } from '@/transformers/getSkeletonFromDeckList/getSkeletonFromDeckList';
import { getDeckListFromSkeleton } from '@/transformers/getDeckListFromSkeleton/getDeckListFromSkeleton';
import { WebSocketContext } from '../WebSockets';
import { RootState } from '@/client/redux/store';
import { isDeckValidForFormat } from '@/transformers/isDeckValidForFomat';
import { Colors } from '@/constants/colors';

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

const ValidationMsg = styled.div`
    color: ${Colors.DEBUFF_RED};
    padding-top: 12px;
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
    const webSocket = useContext(WebSocketContext);
    const skeleton = useSelector<RootState, Skeleton>(
        (state) => state.deckList.customDeckList
    );
    const dispatch = useDispatch();
    const fileInputEl = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (skeleton) {
            setMyDeck(getDeckListFromSkeleton(skeleton).decklist);
        }
    }, []);

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

    const download = () => {
        // See: https://robkendal.co.uk/blog/2020-04-17-saving-text-to-client-side-file-using-vanilla-js
        const a = document.createElement('a');
        const file = new Blob(
            [JSON.stringify(getSkeletonFromDeckList(myDeck))],
            { type: 'text/plain' }
        );
        a.href = URL.createObjectURL(file);
        a.download = 'new-deck.txt';
        a.click();
        URL.revokeObjectURL(a.href);
    };

    const importDeckList = (txtBlob: string) => {
        try {
            const { decklist, errors } = getDeckListFromSkeleton(
                JSON.parse(txtBlob)
            );
            if (!errors?.length) setMyDeck(decklist);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    };

    const importFromClipboard = async () => {
        const clipboardTxt = await navigator.clipboard.readText();
        importDeckList(clipboardTxt);
    };

    // No good implementations for React.ChangeEvent<HTMLInputElement> for
    // input type="file" yet
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const upload = async (event: any) => {
        if (!event.target.files && event.target.files.length === 1) {
            return;
        }
        const file = event.target.files.item(0);
        const text = await file.text();
        importDeckList(text);
    };

    const importFile = () => {
        fileInputEl.current?.click();
    };

    const submitDecklist = () => {
        webSocket.chooseCustomDeck(getSkeletonFromDeckList(myDeck));
        dispatch(push('/'));
    };

    const { isValid: isMyDeckValid, reason: reasonForDeckInvalid } =
        isDeckValidForFormat(myDeck);

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
                        Copy to Clipboard
                    </SecondaryColorButton>
                    &nbsp;&nbsp;
                    <SecondaryColorButton onClick={importFromClipboard}>
                        Import from Clipboard
                    </SecondaryColorButton>
                    &nbsp;&nbsp;
                    <SecondaryColorButton onClick={download}>
                        Download as File
                    </SecondaryColorButton>
                    &nbsp;&nbsp;
                    <input
                        type="file"
                        onChange={upload}
                        accept="text/plain"
                        style={{ display: 'none' }}
                        ref={fileInputEl}
                    />
                    <SecondaryColorButton onClick={importFile}>
                        Import File
                    </SecondaryColorButton>{' '}
                    &nbsp;&nbsp;
                    <SecondaryColorButton
                        onClick={submitDecklist}
                        disabled={!isMyDeckValid}
                    >
                        Submit
                    </SecondaryColorButton>
                    <br />
                    <ValidationMsg>{reasonForDeckInvalid}</ValidationMsg>
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
