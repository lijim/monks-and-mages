import React, { useState } from 'react';
import styled from 'styled-components';

import { ResourceCard } from '@/types/cards';
import { RESOURCE_GLOSSARY } from '@/types/resources';
import {
    CardFrame,
    CardHeader,
    CardImage,
    CardImageContainer,
    NameCell,
    RulesTextArea,
    TypesAndRarityLine,
} from '../CardFrame';
import { CastingCostFrame } from '../CastingCost';
import { transformEffectToRulesText } from '@/transformers/transformEffectsToRulesText';
import { HandleClickOnCardParams } from '../GameManager/handleClickOnCard';
import { getImgSrcForCard } from '@/transformers/getImgSrcForCard';

interface AdvancedResourceGridItemProps {
    card: ResourceCard;
    isHighlighted?: boolean;
    isOnBoard?: boolean;
    onClick?: (extras?: HandleClickOnCardParams['extras']) => void;
    zoomLevel?: number;
}

const DecidingCardFrame = styled(CardFrame)`
    cursor: inherit;
    grid-template-rows: auto 1fr 1fr;
`;

// for deciding which resource to pick
const DecisionFrame = styled.div`
    display: grid;
    place-items: center;
    zoom: 5;
    margin-top: 1.5px;
    margin-bottom: 1px;
    background: rgba(255, 255, 255, 0.8);
    border: 0.2px solid white;
    cursor: pointer;

    :hover {
        background: rgba(255, 255, 255, 0.5);
    }
`;

export const AdvancedResourceGridItem: React.FC<
    AdvancedResourceGridItemProps
> = ({ card, isHighlighted, isOnBoard, onClick, zoomLevel }) => {
    const { resourceType, secondaryResourceType, enterEffects, comesInTapped } =
        card;
    const { icon, primaryColor } = RESOURCE_GLOSSARY[resourceType];
    const secondaryResource = RESOURCE_GLOSSARY[secondaryResourceType];

    const [isDeciding, setIsDeciding] = useState(false);

    /**
     * Clicking on the card in its original state
     */
    const handleClick = () => {
        if (!isOnBoard || !secondaryResource) {
            onClick();
        } else if (!card.isUsed) {
            setIsDeciding(true);
        }
    };

    const handleClickPrimaryResource = () => {
        onClick({ resourceType });
        setIsDeciding(false);
    };

    const handleClickSecondaryResource = () => {
        onClick({ resourceType: secondaryResourceType });
        setIsDeciding(false);
    };

    if (isDeciding) {
        return (
            <DecidingCardFrame
                primaryColor={primaryColor}
                secondaryColor={secondaryResource?.primaryColor}
                data-testid="ResourceCard-GridItem"
                isHighlighted={isHighlighted}
                isRotated={card.isUsed}
                zoomLevel={zoomLevel}
                shouldShowTallImage
                className="CardFrame"
            >
                <CardHeader>
                    <NameCell>{card.name}</NameCell>
                </CardHeader>
                <DecisionFrame
                    onClick={handleClickPrimaryResource}
                    tabIndex={0}
                    data-testid={`ResourceCard-${resourceType}`}
                >
                    <CastingCostFrame hasNoMargin>{icon}</CastingCostFrame>
                </DecisionFrame>
                <DecisionFrame
                    onClick={handleClickSecondaryResource}
                    tabIndex={0}
                    data-testid={`ResourceCard-${secondaryResourceType}`}
                >
                    <CastingCostFrame hasNoMargin>
                        {secondaryResource?.icon}
                    </CastingCostFrame>
                </DecisionFrame>
            </DecidingCardFrame>
        );
    }

    return (
        <CardFrame
            primaryColor={primaryColor}
            secondaryColor={secondaryResource?.primaryColor}
            data-testid="ResourceCard-GridItem"
            onClick={handleClick}
            tabIndex={0}
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
                <CardImage src={getImgSrcForCard(card)}></CardImage>
            </CardImageContainer>

            <TypesAndRarityLine rarity={card.rarity}>
                Resource - Advanced
            </TypesAndRarityLine>
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
                {comesInTapped && 'Enters the board tapped'}
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
