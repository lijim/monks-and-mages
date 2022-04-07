import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { DeckListSelections } from '@/constants/lobbyConstants';
import { WebSocketContext } from '../WebSockets';
import { RootState } from '@/client/redux/store';

export const DeckListSelector: React.FC = () => {
    const webSocket = useContext(WebSocketContext);
    const currentDeckList = useSelector<RootState, DeckListSelections>(
        (state) => state.deckList.premadeDecklist
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
                value={currentDeckList}
            >
                {Object.values(DeckListSelections).map((deckListSelection) => (
                    <option value={deckListSelection} key={deckListSelection}>
                        {deckListSelection}
                    </option>
                ))}
            </select>
            <br />
            <br />
            {currentDeckList !== DeckListSelections.RANDOM && (
                <Link to="/decklist" style={{ color: 'white' }}>
                    View Decklist
                </Link>
            )}

            <br />
            <Link to="/customize" style={{ color: 'white' }}>
                Customize (in beta)
            </Link>
        </div>
    );
};
