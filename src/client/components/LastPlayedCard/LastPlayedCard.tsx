import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { AnimatePresence, motion } from 'framer-motion';
import { Card } from '@/types/cards';
import { CardGridItem } from '../CardGridItem';
import { RootState } from '@/client/redux/store';

const OuterContainer = styled.div`
    display: grid;
    place-items: center;
    > span {
        color: white;
        background: cornflowerblue;
        padding: 4px 8px;
        border-radius: 3px;
        margin-bottom: 2px;
    }
`;

/**
 * @returns {JSX.Element} Component for rendering the last played spell card in a game,
 * if any have been played yet.
 */
export const LastPlayedCard: React.FC = () => {
    const lastPlayedCard = useSelector<RootState, Card>((state) => {
        const { lastPlayedCards } = state.clientSideGameExtras;
        if (!lastPlayedCards.length) return null;
        return lastPlayedCards[lastPlayedCards.length - 1];
    });

    if (!lastPlayedCard) {
        return <div></div>;
    }
    return (
        <OuterContainer>
            <span>Last Spell</span>
            <AnimatePresence>
                <motion.div
                    key={lastPlayedCard.id}
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                        open: { opacity: 1, height: 'auto' },
                        collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        variants={{
                            collapsed: { scale: 0 },
                            open: { scale: 1 },
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        <CardGridItem
                            card={lastPlayedCard}
                            hasTooltip
                            zoomLevel={0.8}
                        />
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </OuterContainer>
    );
};
