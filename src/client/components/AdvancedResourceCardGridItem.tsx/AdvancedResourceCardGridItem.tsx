import React from 'react';

import { ResourceCard } from '@/types/cards';
import { RESOURCE_GLOSSARY } from '@/types/resources';
import {
    CardFrame,
    CardHeader,
    CardImage,
    CardImageContainer,
    NameCell,
    RulesTextArea,
} from '../CardFrame';
import { CastingCostFrame } from '../CastingCost';
import { transformEffectToRulesText } from '@/transformers/transformEffectsToRulesText';

interface AdvancedResourceCardGridItemProps {
    card: ResourceCard;
    isHighlighted?: boolean;
    onClick?: () => void;
    zoomLevel?: number;
}

export const AdvancedResourceCardGridItem: React.FC<
    AdvancedResourceCardGridItemProps
> = ({ card, isHighlighted, onClick, zoomLevel }) => {
    const { imgSrc, resourceType, secondaryResourceType, enterEffects } = card;
    const { icon, primaryColor } = RESOURCE_GLOSSARY[resourceType];
    const secondaryResource = RESOURCE_GLOSSARY[secondaryResourceType];
    return (
        <CardFrame
            primaryColor={primaryColor}
            secondaryColor={secondaryResource?.primaryColor}
            data-testid="ResourceCard-GridItem"
            onClick={onClick}
            isHighlighted={isHighlighted}
            isRotated={card.isUsed}
            zoomLevel={zoomLevel}
            shouldShowTallImage
            className="CardFrame"
        >
            <CardHeader>
                <NameCell>{card.name}</NameCell>
            </CardHeader>
            <CardImageContainer>
                <CardImage src={imgSrc}></CardImage>
            </CardImageContainer>

            <div>Resource - Advanced</div>
            <RulesTextArea
                shouldCenter={!enterEffects.length}
                data-testid="RulesTextArea"
            >
                Tap to add{' '}
                <CastingCostFrame hasNoMargin>{icon}</CastingCostFrame>{' '}
                {secondaryResource && (
                    <>
                        or{' '}
                        <CastingCostFrame hasNoMargin>
                            {secondaryResource.icon}
                        </CastingCostFrame>{' '}
                    </>
                )}
                to your casting pool
                <br />
                <br />
                {enterEffects.length > 0 && <b>Upon entering the board:</b>}
                {enterEffects?.map((effect, i) => (
                    <div key={`${transformEffectToRulesText(effect)}-${i}`}>
                        {transformEffectToRulesText(effect)}
                    </div>
                ))}
            </RulesTextArea>
        </CardFrame>
    );
};
