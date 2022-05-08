import sampleSize from 'lodash.samplesize';
import React, { useMemo } from 'react';

import { ALL_CARDS } from '@/constants/deckLists';
import { CardGridItem } from '../CardGridItem';
import { Card, CardType } from '@/types/cards';
import { makeCard } from '@/factories/cards';

const PACK_SIZE = 15;

const CARD_POOL = ALL_CARDS.filter((card) => {
    if (card.card.cardType === CardType.RESOURCE && !card.card.isAdvanced)
        return false;
    return true;
});

export const Pack = () => {
    const packContents: Card[] = useMemo(() => {
        return sampleSize(CARD_POOL, PACK_SIZE).map((c) => makeCard(c.card));
    }, []);

    return (
        <>
            {packContents.map((card) => (
                <CardGridItem key={card.id} card={card} />
            ))}
        </>
    );
};
