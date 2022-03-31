import React from 'react';
import { screen } from '@testing-library/react';

import { makeAdvancedResourceCard } from '@/cardDb/resources/advancedResources';
import { Resource } from '@/types/resources';
import { EffectType } from '@/types/effects';
import { render } from '@/test-utils';

import { AdvancedResourceCardGridItem } from './AdvancedResourceCardGridItem';

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
        });

        render(<AdvancedResourceCardGridItem card={advancedResourceCard} />);
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
        });

        render(<AdvancedResourceCardGridItem card={advancedResourceCard} />);
        expect(screen.getByTestId('RulesTextArea')).toHaveTextContent(
            'Tap to add 🛠️ or 🌊 to your casting pool'
        );
    });
});
