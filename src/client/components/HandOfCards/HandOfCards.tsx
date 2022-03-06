import React from 'react';
import { useSelector } from 'react-redux';

import { getSelfPlayer } from '@/client/redux/selectors';
import { CardGridItem } from '../CardGridItem';

export const HandOfCards: React.FC = () => {
    const selfPlayer = useSelector(getSelfPlayer);
    if (!selfPlayer?.hand?.length) return <></>;
    return (
        <div>
            {selfPlayer.hand.map((card) => (
                <CardGridItem key={card.id} card={card} />
            ))}
        </div>
    );
};
