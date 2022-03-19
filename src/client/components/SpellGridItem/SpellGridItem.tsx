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
} from '../CardFrame';
import { transformEffectToRulesText } from '@/transformers/transformEffectsToRulesText';
import { getColorForCard } from '@/transformers/getColorForCard';

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
    const { cost, imgSrc, name, effects, originalCost } = card;

    return (
        <CardFrame
            isHighlighted={isHighlighted}
            data-testid="SpellGridItem"
            primaryColor={getColorForCard(card)}
            onClick={onClick}
            zoomLevel={zoomLevel}
            className="CardFrame"
        >
            <CardHeader>
                <NameCell>{name}</NameCell>
                <CostHeaderCell>
                    <CastingCost cost={cost} originalCost={originalCost} />
                </CostHeaderCell>
            </CardHeader>
            <CardImageContainer>
                <CardImage src={imgSrc}></CardImage>
            </CardImageContainer>
            <div>Spell</div>
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
