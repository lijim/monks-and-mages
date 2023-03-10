import React, { useMemo } from 'react';

import { CardGridItem } from '../CardGridItem';
import { Card } from '@/types/cards';
import { makePack } from '@/factories';

export const Pack = () => {
    const packContents: Card[] = useMemo(() => {
        return makePack();
    }, []);

    return (
        <>
            {packContents.map((card) => (
                <CardGridItem key={card.id} card={card} />
            ))}
        </>
    );
};
