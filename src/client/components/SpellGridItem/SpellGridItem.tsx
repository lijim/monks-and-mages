import React from 'react';

import { SpellCard } from '@/types/cards';
import { CastingCost } from '../CastingCost';
import {
    CardFrame,
    CardHeader,
    CardImage,
    CardImageContainer,
    CostHeaderCell,
    NameCell,
    RulesTextArea,
    TypesAndRarityLine,
} from '../CardFrame';
import { transformEffectToRulesText } from '@/transformers/transformEffectsToRulesText';
import { getColorsForCard } from '@/transformers/getColorsForCard';
import { getImgSrcForCard } from '@/transformers/getImgSrcForCard';

interface SpellGridItemProps {
    card: SpellCard;
    isHighlighted?: boolean;
    onClick?: () => void;
    zoomLevel?: number;
}

export const SpellGridItem: React.FC<SpellGridItemProps> = ({
    card,
    isHighlighted = false,
    onClick,
    zoomLevel,
}) => {
    const {
        cost,
        name,
        effects,
        originalAttributes: { cost: originalCost },
    } = card;
    const { primaryColor, secondaryColor } = getColorsForCard(card);

    return (
        <CardFrame
            isHighlighted={isHighlighted}
            data-testid="SpellGridItem"
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            onClick={onClick}
            tabIndex={0}
            zoomLevel={zoomLevel}
            shouldShowTallImage
            className="CardFrame"
        >
            <CardHeader>
                <NameCell>{name}</NameCell>
                <CostHeaderCell>
                    <CastingCost cost={cost} originalCost={originalCost} />
                </CostHeaderCell>
            </CardHeader>
            <CardImageContainer>
                <CardImage src={getImgSrcForCard(card)}></CardImage>
            </CardImageContainer>
            <TypesAndRarityLine rarity={card.rarity}>Spell</TypesAndRarityLine>
            <RulesTextArea shouldCenter={effects.length === 1}>
                {effects.map((effect, i) => (
                    <div key={`${transformEffectToRulesText(effect)}-${i}`}>
                        {transformEffectToRulesText(effect)}
                    </div>
                ))}
            </RulesTextArea>
        </CardFrame>
    );
};
