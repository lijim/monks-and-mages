import React from 'react';

import { ResourceCard } from '@/types/cards';
import { RESOURCE_GLOSSARY } from '@/types/resources';
import { CardFrame, CardHeader, NameCell, RulesTextArea } from '../CardFrame';
import { CastingCostFrame } from '../CastingCost';

interface ResourceCardGridItemProps {
    card: ResourceCard;
    onClick?: () => void;
}

export const ResourceCardGridItem: React.FC<ResourceCardGridItemProps> = ({
    card,
    onClick,
}) => {
    const { name, icon, primaryColor } = RESOURCE_GLOSSARY[card.resourceType];
    return (
        <CardFrame
            primaryColor={primaryColor}
            data-testid="ResourceCard-GridItem"
            onClick={onClick}
        >
            <CardHeader>
                <NameCell>{name}</NameCell>
            </CardHeader>
            <div
                style={{
                    display: 'grid',
                    placeItems: 'center',
                    zoom: 5,
                    marginTop: 1.5,
                    marginBottom: 1,
                    background: 'rgba(255, 255, 255, .8)',
                    border: '.2px solid white',
                }}
            >
                <CastingCostFrame hasNoMargin>{icon}</CastingCostFrame>
            </div>
            <div>Resource</div>
            <RulesTextArea shouldCenter>
                Tap to add{' '}
                <CastingCostFrame hasNoMargin>{icon}</CastingCostFrame> to your
                casting pool
            </RulesTextArea>
        </CardFrame>
    );
};
