import React from 'react';

import { UnitCard } from '@/types/cards';
import { CastingCost } from '../CastingCost';
import {
    AttackHPFooter,
    CardFrame,
    CardHeader,
    CardImage,
    CardImageContainer,
    CostHeaderCell,
    HPCell,
    NameCell,
    RulesTextArea,
} from '../CardFrame';
import { getColorForCard } from '@/transformers/getColorForCard';
import { transformEffectToRulesText } from '@/transformers/transformEffectsToRulesText';

interface UnitGridItemProps {
    card: UnitCard;
    isOnBoard?: boolean;
    onClick?: () => void;
}

export const UnitGridItem: React.FC<UnitGridItemProps> = ({
    card,
    isOnBoard = false,
    onClick,
}) => {
    const {
        attack,
        cost,
        enterEffects,
        hp,
        imgSrc,
        isMagical,
        isRanged,
        isSoldier,
        name,
        passiveEffects,
        totalHp,
    } = card;
    let unitType = '';
    if (isRanged) unitType = 'Ranged';
    if (isMagical) unitType = 'Magical';
    if (isSoldier) unitType = 'Soldier';

    return (
        <CardFrame
            data-testid="UnitGridItem"
            primaryColor={getColorForCard(card)}
            onClick={onClick}
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
            <div>Unit{unitType ? ` - ${unitType}` : ''}</div>
            <RulesTextArea
                shouldCenter={passiveEffects.length + enterEffects.length === 1}
                shouldFade={passiveEffects.length + enterEffects.length === 0}
            >
                {passiveEffects.length + enterEffects.length === 0 && (
                    <i>ipsem lorum description</i>
                )}
                {passiveEffects.map((effect) => (
                    <div key={effect}>{effect}</div>
                ))}
                {enterEffects.length > 0 && <b>Upon entering the board:</b>}
                {enterEffects.map((effect) => (
                    <div key={transformEffectToRulesText(effect)}>
                        {transformEffectToRulesText(effect)}
                    </div>
                ))}
            </RulesTextArea>
            <AttackHPFooter>
                <div>{attack} ⚔️</div>
                <HPCell>
                    {isOnBoard && `${hp} / `} {totalHp} 💙
                </HPCell>
            </AttackHPFooter>
        </CardFrame>
    );
};
