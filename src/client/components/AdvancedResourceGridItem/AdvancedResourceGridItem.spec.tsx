import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import { makeAdvancedResourceCard } from '@/cardDb/resources/advancedResources';
import { Resource } from '@/types/resources';
import { EffectType } from '@/types/effects';
import { render } from '@/test-utils';

import { AdvancedResourceGridItem } from './AdvancedResourceGridItem';
import { CardRarity } from '@/types/cards';

describe('Advanced Resource Card Grid Item', () => {
    it('renders rules text about tapping for 1 resources', () => {
        const advancedResourceCard = makeAdvancedResourceCard({
            name: 'Deal 1 damage Iron',
            resourceType: Resource.IRON,
            imgSrc: '/images/example.avif',
            enterEffects: [
                {
                    type: EffectType.DEAL_DAMAGE,
                    strength: 1,
                },
            ],
            rarity: CardRarity.COMMON,
        });

        render(<AdvancedResourceGridItem card={advancedResourceCard} />);
        expect(screen.getByTestId('RulesTextArea')).toHaveTextContent(
            'Tap to add 🛠️ to your casting pool'
        );
    });

    it('renders rules text about tapping for 2 resources', () => {
        const advancedResourceCard = makeAdvancedResourceCard({
            name: 'Iron/Water card',
            resourceType: Resource.IRON,
            secondaryResourceType: Resource.WATER,
            imgSrc: '/images/example.avif',
            enterEffects: [
                {
                    type: EffectType.DEAL_DAMAGE,
                    strength: 1,
                },
            ],
            rarity: CardRarity.COMMON,
        });

        render(<AdvancedResourceGridItem card={advancedResourceCard} />);
        expect(screen.getByTestId('RulesTextArea')).toHaveTextContent(
            'Tap to add 🛠️ or 🌊 to your casting pool'
        );
    });

    it('renders rules text about coming in tapped', () => {
        const advancedResourceCard = makeAdvancedResourceCard({
            name: 'Come in tapped iron',
            resourceType: Resource.IRON,
            imgSrc: '/images/example.avif',
            enterEffects: [],
            comesInTapped: true,
            rarity: CardRarity.COMMON,
        });

        render(<AdvancedResourceGridItem card={advancedResourceCard} />);
        expect(screen.getByTestId('RulesTextArea')).toHaveTextContent(
            'Enters the board tapped'
        );
    });

    it('taps the card (single resource card)', () => {
        const advancedResourceCard = makeAdvancedResourceCard({
            name: 'Deal 1 damage Iron',
            resourceType: Resource.IRON,
            imgSrc: '/images/example.avif',
            enterEffects: [
                {
                    type: EffectType.DEAL_DAMAGE,
                    strength: 1,
                },
            ],
            rarity: CardRarity.COMMON,
        });
        const mockOnClick = jest.fn();

        render(
            <AdvancedResourceGridItem
                card={advancedResourceCard}
                onClick={mockOnClick}
                isOnBoard
            />
        );
        fireEvent.click(screen.getByTestId('ResourceCard-GridItem'));
        expect(mockOnClick).toHaveBeenCalledWith();
    });

    it('taps the card (dual resource cards - tapping primary)', () => {
        const advancedResourceCard = makeAdvancedResourceCard({
            name: 'Iron/Water card',
            resourceType: Resource.IRON,
            secondaryResourceType: Resource.WATER,
            imgSrc: '/images/example.avif',
            enterEffects: [
                {
                    type: EffectType.DEAL_DAMAGE,
                    strength: 1,
                },
            ],
            rarity: CardRarity.COMMON,
        });
        const mockOnClick = jest.fn();
        render(
            <AdvancedResourceGridItem
                card={advancedResourceCard}
                onClick={mockOnClick}
                isOnBoard
            />
        );

        fireEvent.click(screen.getByTestId('ResourceCard-GridItem'));
        fireEvent.click(screen.getByTestId('ResourceCard-Iron'));

        expect(mockOnClick).toHaveBeenCalledWith({
            resourceType: Resource.IRON,
        });
    });

    it('taps the card (dual resource cards - tapping secondary)', () => {
        const advancedResourceCard = makeAdvancedResourceCard({
            name: 'Iron/Water card',
            resourceType: Resource.IRON,
            secondaryResourceType: Resource.WATER,
            imgSrc: '/images/example.avif',
            enterEffects: [
                {
                    type: EffectType.DEAL_DAMAGE,
                    strength: 1,
                },
            ],
            rarity: CardRarity.COMMON,
        });
        const mockOnClick = jest.fn();
        render(
            <AdvancedResourceGridItem
                isOnBoard
                card={advancedResourceCard}
                onClick={mockOnClick}
            />
        );

        fireEvent.click(screen.getByTestId('ResourceCard-GridItem'));
        fireEvent.click(screen.getByTestId('ResourceCard-Water'));

        expect(mockOnClick).toHaveBeenCalledWith({
            resourceType: Resource.WATER,
        });
    });
});
