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
}

export const SpellGridItem: React.FC<SpellGridItemProps> = ({ card }) => {
    const { cost, imgSrc, name, effects } = card;

    return (
        <CardFrame
            data-testid="ResourceGridItem"
            primaryColor={getColorForCard(card)}
        >
            <CardHeader>
                <NameCell>{name}</NameCell>
                <CostHeaderCell>
                    <CastingCost cost={cost} />
                </CostHeaderCell>
            </CardHeader>
            <CardImageContainer>
                <CardImage src={imgSrc}></CardImage>
            </CardImageContainer>
            <div>Spell</div>
            <RulesTextArea shouldCenter={effects.length === 1}>
                {effects.map((effect) => (
                    <div key={transformEffectToRulesText(effect)}>
                        {transformEffectToRulesText(effect)}
                    </div>
                ))}
            </RulesTextArea>
        </CardFrame>
    );
};
