import React, { useContext } from 'react';

import { DeckListSelections } from '@/constants/lobbyConstants';
import { WebSocketContext } from '../WebSockets';

export const DeckListSelector: React.FC = () => {
    const webSocket = useContext(WebSocketContext);

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
                defaultValue={DeckListSelections.MONKS}
            >
                {Object.values(DeckListSelections).map((deckListSelection) => (
                    <option value={deckListSelection} key={deckListSelection}>
                        {deckListSelection}
                    </option>
                ))}
            </select>
        </div>
    );
};
