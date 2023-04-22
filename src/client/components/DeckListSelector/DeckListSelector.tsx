import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { push } from 'redux-first-history';
import { DeckListSelections } from '@/constants/lobbyConstants';
import { WebSocketContext } from '../WebSockets';
import { RootState } from '@/client/redux/store';
import { PrimaryColorButton, SecondaryColorButton } from '../Button';
import { Format } from '@/types/games';

export const DeckListSelector: React.FC = () => {
    const dispatch = useDispatch();
    const webSocket = useContext(WebSocketContext);
    const currentDeckList = useSelector<RootState, DeckListSelections>(
        (state) => state.deckList.premadeDecklist
    );
    const hasCustomDecklist = useSelector<RootState, boolean>(
        (state) => !!state.deckList.customDeckList
    );

    const chooseDeck = (deckListSelection: string) => {
        if (
            (Object.values(DeckListSelections) as string[]).includes(
                deckListSelection
            )
        ) {
            webSocket.chooseDeck(deckListSelection as DeckListSelections);
        }
    };

    return (
        <div>
            <hr />
            <label htmlFor="deckSelection">
                <b>Choose a Deck</b>{' '}
            </label>
            <select
                id="deckSelection"
                onChange={(event) => {
                    chooseDeck(event.target.value);
                }}
                value={hasCustomDecklist ? 'custom' : currentDeckList}
            >
                {Object.values(DeckListSelections).map((deckListSelection) => (
                    <option value={deckListSelection} key={deckListSelection}>
                        {deckListSelection}
                    </option>
                ))}
                {hasCustomDecklist && (
                    <option value="custom">Custom deck</option>
                )}
            </select>
            <br />
            <br />
            <div style={{ display: 'grid', gap: '12px' }}>
                {currentDeckList !== DeckListSelections.RANDOM && (
                    <SecondaryColorButton
                        onClick={() => {
                            dispatch(push('/decklist'));
                        }}
                    >
                        View Decklist
                    </SecondaryColorButton>
                )}
                <PrimaryColorButton
                    onClick={() => {
                        dispatch(push('/customize'));
                    }}
                    fontSize="16px"
                >
                    Custom (Standard)
                </PrimaryColorButton>
                <PrimaryColorButton
                    onClick={() => {
                        dispatch(push('/customize/singleton'));
                    }}
                    fontSize="16px"
                >
                    Custom (Singleton)
                </PrimaryColorButton>
                <PrimaryColorButton
                    onClick={() => {
                        dispatch(push('/customize/legendary_league'));
                    }}
                    fontSize="13px"
                >
                    Custom ({Format.LEGENDARY_LEAGUE})
                </PrimaryColorButton>
            </div>
        </div>
    );
};
