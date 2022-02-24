import React from 'react';
import { DeckList } from '../DeckList';
import { CompactDeckList } from '../CompactDeckList';
import { makeSampleDeck1 } from '@/factories/deck';

export const App: React.FC = () => {
    const deck = makeSampleDeck1();

    return (
        <div>
            <DeckList deck={deck} />
            <CompactDeckList deck={deck} />
        </div>
    );
};
