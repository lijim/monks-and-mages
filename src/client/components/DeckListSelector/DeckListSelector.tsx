import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { DeckListSelections } from '@/constants/lobbyConstants';
import { WebSocketContext } from '../WebSockets';
import { RootState } from '@/client/redux/store';
import { PrimaryColorButton, SecondaryColorButton } from '../Button';

export const DeckListSelector: React.FC = () => {
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
                    <Link to="/decklist">
                        <PrimaryColorButton>View Decklist</PrimaryColorButton>
                    </Link>
                )}
                <Link to="/customize">
                    <SecondaryColorButton fontSize="16px">
                        Custom (Standard)
                    </SecondaryColorButton>
                </Link>
                <Link to="/customize/singleton">
                    <SecondaryColorButton fontSize="16px">
                        Custom (Singleton)
                    </SecondaryColorButton>
                </Link>
            </div>
        </div>
    );
};
