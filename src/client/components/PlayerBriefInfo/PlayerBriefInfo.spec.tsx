import React from 'react';
import { render, screen } from '@testing-library/react';

import { PlayerBriefInfo } from './PlayerBriefInfo';
import { SAMPLE_DECKLIST_1 } from '@/factories/deck';
import { makeNewPlayer } from '@/factories/player';
import { Resource } from '@/types/resources';
import { makeCard } from '@/factories/cards';
import { UnitCards } from '@/cardDb/units';

describe('Player Brief Info', () => {
    it('renders the player name', () => {
        const player = makeNewPlayer('Grandma Jenkins', SAMPLE_DECKLIST_1);
        render(<PlayerBriefInfo player={player} />);
        expect(screen.getByText('Grandma Jenkins')).toBeInTheDocument();
    });

    it('renders the health bar', () => {
        const player = makeNewPlayer('Grandma Jenkins', SAMPLE_DECKLIST_1);
        render(<PlayerBriefInfo player={player} />);
        expect(screen.getByText('15')).toBeInTheDocument();
    });

    it('renders the remaining cards / size of hand', () => {
        const player = makeNewPlayer('Grandma Jenkins', SAMPLE_DECKLIST_1);
        render(<PlayerBriefInfo player={player} />);
        expect(screen.getByText('41')).toBeInTheDocument();
        expect(screen.getByText('7')).toBeInTheDocument();
    });

    it('renders the cemetery', () => {
        const player = makeNewPlayer('Grandma Jenkins', SAMPLE_DECKLIST_1);
        player.cemetery = [makeCard(UnitCards.ASSASSIN)];
        render(<PlayerBriefInfo player={player} />);
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('renders the players resource pool', () => {
        const player = makeNewPlayer('Grandma Jenkins', SAMPLE_DECKLIST_1);
        player.resourcePool = { [Resource.BAMBOO]: 3, [Resource.FIRE]: 0 };
        render(<PlayerBriefInfo player={player} />);
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('🎋')).toBeInTheDocument();
        expect(screen.queryByText('🔥')).not.toBeInTheDocument();
    });
});