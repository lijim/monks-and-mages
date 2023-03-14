import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { RootState } from '@/client/redux/store';
import { DraftPile, Player } from '@/types/board';
import {
    getDeckbuildingPoolForPlayer,
    getDraftPiles,
    getDraftPoolSize,
    getOtherPlayers,
    getSelfPlayer,
    isActivePlayer as isActivePlayerSelector,
} from '@/client/redux/selectors';
import { CardGridItem } from '../CardGridItem';
import { Pile, Piles } from '../DeckList';
import { PrimaryColorButton, SecondaryColorButton } from '../Button';
import { WebSocketContext } from '../WebSockets';
import { GameActionTypes } from '@/types/gameActions';
import { CompactDeckList } from '../CompactDeckList';
import { Card } from '@/types/cards';
import { Colors } from '@/constants/colors';

const DeckListCardSlot = styled(motion.div)`
    height: 35px;
    z-index: 0;
    transition: all 0.2s ease-in-out 0.1s;
    :hover:not(:last-of-type) {
        height: 275px;
        z-index: 1;
    }
`;

export const DraftingTable = () => {
    const { takeGameAction } = useContext(WebSocketContext);

    const draftPiles = useSelector<RootState, DraftPile[]>(getDraftPiles);
    const draftPoolSize = useSelector<RootState, number>(getDraftPoolSize);

    const self = useSelector<RootState, Player>(getSelfPlayer);
    const otherPlayers = useSelector<RootState, Player[]>(getOtherPlayers);
    const [player, setPlayer] = useState(self);

    const isActivePlayer = useSelector<RootState, boolean>(
        isActivePlayerSelector
    );

    const deckbuildingPool = useSelector<RootState, Card[]>(
        getDeckbuildingPoolForPlayer(player?.name)
    );

    const takePile = (draftPileIndex: number) => () => {
        isActivePlayer &&
            takeGameAction({
                type: GameActionTypes.TAKE_DRAFT_PILE,
                draftPileIndex,
            });
    };

    const peekAtPlayersDeck = (player: Player) => () => {
        setPlayer(player);
    };

    return (
        <>
            <Piles
                style={{
                    width: '100%',
                    height: '100%',
                    gridTemplateColumns: 'auto auto auto auto auto 1fr',
                    gap: '8px',
                    padding: '20px',
                    background: Colors.FELT_GREEN_ALT,
                }}
            >
                {draftPiles.map((draftPile, draftPileIndex) => (
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateRows: 'auto auto 1fr',
                            justifyItems: 'center',
                            gap: '8px',
                        }}
                        // safe to use index as key here - piles will not be swapped
                        key={draftPileIndex}
                    >
                        <h1 style={{ margin: 0 }}>Pile {draftPileIndex + 1}</h1>
                        <PrimaryColorButton
                            onClick={takePile(draftPileIndex)}
                            disabled={!isActivePlayer || draftPile.length === 0}
                        >
                            Pick
                        </PrimaryColorButton>
                        <Pile style={{ width: '195px' }}>
                            <AnimatePresence>
                                {draftPile.map((card) => (
                                    <DeckListCardSlot
                                        key={card.id}
                                        initial={{ opacity: 0.01 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <CardGridItem card={card} />
                                    </DeckListCardSlot>
                                ))}
                            </AnimatePresence>
                        </Pile>
                    </div>
                ))}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateRows: 'auto 1fr',
                        justifyContent: 'center',
                        textAlign: 'center',
                        gap: '8px',
                    }}
                >
                    <h2 style={{ margin: 0 }}>Cards Left</h2>
                    <h3 style={{ margin: 0 }}>{draftPoolSize} 🂡</h3>
                </div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateRows: 'auto 1fr',
                        background: 'white',
                        padding: '12px',
                        boxShadow: '0 2px 8px rgb(0 0 0 / 10%)',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            gap: '4px',
                        }}
                    >
                        {self && (
                            <PrimaryColorButton
                                onClick={peekAtPlayersDeck(self)}
                            >
                                {self.name}
                                {self.name === player?.name && ' 👁'}
                            </PrimaryColorButton>
                        )}
                        {otherPlayers.map((otherPlayer) => (
                            <SecondaryColorButton
                                key={otherPlayer.name}
                                onClick={peekAtPlayersDeck(otherPlayer)}
                            >
                                {otherPlayer.name}
                                {otherPlayer.name === player?.name && ' 👁'}
                            </SecondaryColorButton>
                        ))}
                    </div>
                    <div
                        style={{
                            height: 'calc(100vh - 140px)',
                            overflowY: 'auto',
                        }}
                    >
                        <div
                            style={{
                                display: 'grid',
                                gap: '8px',
                                gridTemplateRows: 'auto auto 1fr',
                            }}
                        >
                            <CompactDeckList deck={deckbuildingPool} />
                        </div>
                    </div>
                </div>
            </Piles>
        </>
    );
};
