import React, { useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'redux-first-history';
import styled from 'styled-components';

import { DeckList } from '../DeckList';
import { TopNavBar } from '../TopNavBar';
import { makeDeck } from '@/factories/deck';
import { ALL_CARDS } from '@/constants/deckLists';
import { CompactDeckList } from '../CompactDeckList';
import { Card, DeckList as DeckListType, Skeleton } from '@/types/cards';
import { SecondaryColorButton } from '../Button';
import { getSkeletonFromDeckList } from '@/transformers/getSkeletonFromDeckList';
import { WebSocketContext } from '../WebSockets';
import { RootState } from '@/client/redux/store';
import { isDeckValidForFormat } from '@/transformers/isDeckValidForFomat';
import { Colors } from '@/constants/colors';
import { DeckBuilderFilters } from '../DeckBuilderFilters';
import { filterCards } from '@/transformers/filterCards';
import { Filters } from '@/types/deckBuilder';
import { SavedDeckManager } from '../SavedDeckManager';
import { getAuth0Id, getDeckList } from '@/client/redux/selectors';
import { clearDeck, loadDeck } from '@/client/redux/deckBuilder';

const DeckListContainers = styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto;
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
};

export const DeckBuilder: React.FC<DeckBuilderProps> = ({
    cardPool = makeDeck(ALL_CARDS),
}) => {
    const webSocket = useContext(WebSocketContext);
    const skeleton = useSelector<RootState, Skeleton>(
        (state) => state.deckList.customDeckList
    );
    const currentDeck = useSelector<RootState, DeckListType>(getDeckList);
    const dispatch = useDispatch();
    const fileInputEl = useRef<HTMLInputElement>(null);
    const filters = useSelector<RootState, Filters>(
        (state) => state.deckBuilderFilters
    );
    const auth0Id = useSelector<RootState, string | undefined>(getAuth0Id);

    useEffect(() => {
        if (skeleton) {
            dispatch(loadDeck(skeleton));
        }
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(
            JSON.stringify(getSkeletonFromDeckList(currentDeck))
        );
    };

    const download = () => {
        // See: https://robkendal.co.uk/blog/2020-04-17-saving-text-to-client-side-file-using-vanilla-js
        const a = document.createElement('a');
        const file = new Blob(
            [JSON.stringify(getSkeletonFromDeckList(currentDeck))],
            { type: 'text/plain' }
        );
        a.href = URL.createObjectURL(file);
        a.download = 'new-deck.txt';
        a.click();
        URL.revokeObjectURL(a.href);
    };

    const importDeckList = (txtBlob: string) => {
        try {
            dispatch(loadDeck(JSON.parse(txtBlob)));
        } catch (error) {
            if (error.name === 'SyntaxError') {
                // eslint-disable-next-line no-alert
                window.alert(
                    'Deck list not supported - make sure it follows the latest ' +
                        "format in files created by 'Download as a File' or " +
                        'Copy to Clipboard'
                );
            }
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
        webSocket.chooseCustomDeck(getSkeletonFromDeckList(currentDeck));
        dispatch(push('/'));
    };

    const onClickClearDeck = () => {
        dispatch(clearDeck());
    };

    const { isValid: isCurrentDeckValid, reason: reasonForDeckInvalid } =
        isDeckValidForFormat(currentDeck);

    const deck = filterCards(cardPool, filters);
    return (
        <>
            <TopNavBar>
                <b>Customize your deck</b> {} <Link to="/">Back</Link>
            </TopNavBar>
            <DeckListContainers>
                <DeckListBackDrop data-testid="CardPool">
                    <DeckBuilderFilters />
                    {deck.length}
                    <CompactDeckList deck={deck} shouldShowQuantity={false} />
                </DeckListBackDrop>
                <DeckListBackDrop data-testid="CurrentDeck">
                    <SecondaryColorButton onClick={copyToClipboard} zoom={0.8}>
                        Copy to Clipboard
                    </SecondaryColorButton>
                    &nbsp;&nbsp;
                    <SecondaryColorButton
                        onClick={importFromClipboard}
                        zoom={0.8}
                    >
                        Import from Clipboard
                    </SecondaryColorButton>
                    &nbsp;&nbsp;
                    <SecondaryColorButton onClick={download} zoom={0.8}>
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
                    <SecondaryColorButton onClick={importFile} zoom={0.8}>
                        Import File
                    </SecondaryColorButton>{' '}
                    &nbsp;&nbsp;
                    <SecondaryColorButton onClick={onClickClearDeck} zoom={0.8}>
                        Clear
                    </SecondaryColorButton>{' '}
                    &nbsp;&nbsp;
                    <SecondaryColorButton
                        onClick={submitDecklist}
                        disabled={!isCurrentDeckValid}
                        zoom={0.8}
                    >
                        Submit
                    </SecondaryColorButton>
                    <br />
                    <ValidationMsg>{reasonForDeckInvalid}</ValidationMsg>
                    <br />
                    <DeckList deck={makeDeck(currentDeck)} />
                </DeckListBackDrop>
                {auth0Id && <SavedDeckManager decklist={currentDeck} />}
            </DeckListContainers>
        </>
    );
};
