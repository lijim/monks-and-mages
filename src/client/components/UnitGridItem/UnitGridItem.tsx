import React from 'react';
import { useSelector } from 'react-redux';

import { UnitCard } from '@/types/cards';
import { CastingCost } from '../CastingCost';
import {
    AttackCell,
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
import { getAttackingUnit } from '@/client/redux/selectors';

interface UnitGridItemProps {
    card: UnitCard;
    isOnBoard?: boolean;
    onClick?: () => void;
    zoomLevel?: number;
}

export const UnitGridItem: React.FC<UnitGridItemProps> = ({
    card,
    isOnBoard = false,
    onClick,
    zoomLevel,
}) => {
    const attackUnitId = useSelector(getAttackingUnit);
    const {
        attack,
        attackBuff,
        cost,
        enterEffects,
        hp,
        hpBuff,
        id,
        imgSrc,
        isMagical,
        isRanged,
        isSoldier,
        name,
        originalCost,
        passiveEffects,
        totalHp,
    } = card;
    let unitType = '';
    if (isRanged) unitType = 'Ranged';
    if (isMagical) unitType = 'Magical';
    if (isSoldier) unitType = 'Soldier';

    return (
        <CardFrame
            isRaised={attackUnitId === id}
            data-testid="UnitGridItem"
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
                <AttackCell data-testid="attack" buffAmount={attackBuff}>
                    {attack + attackBuff} ⚔️
                </AttackCell>
                <HPCell data-testid="hp" buffAmount={hpBuff}>
                    {isOnBoard && `${hp + hpBuff} / `} {totalHp + hpBuff} 💙
                </HPCell>
            </AttackHPFooter>
        </CardFrame>
    );
};
