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
    SleepyCell,
} from '../CardFrame';
import { getColorForCard } from '@/transformers/getColorForCard';
import { transformEffectToRulesText } from '@/transformers/transformEffectsToRulesText';
import { getAttackingUnit } from '@/client/redux/selectors';
import { getImgSrcForCard } from '@/transformers/getImgSrcForCard';

interface UnitGridItemProps {
    card: UnitCard;
    isHighlighted?: boolean;
    isOnBoard?: boolean;
    onClick?: () => void;
    zoomLevel?: number;
}

export const UnitGridItem: React.FC<UnitGridItemProps> = ({
    card,
    isHighlighted = false,
    isOnBoard = false,
    onClick,
    zoomLevel,
}) => {
    const attackUnitId = useSelector(getAttackingUnit);
    const {
        attack,
        attackBuff,
        cost,
        description = 'ipsem lorum description',
        enterEffects,
        hp,
        hpBuff,
        id,
        isMagical,
        isRanged,
        isSoldier,
        name,
        numAttacks,
        numAttacksLeft,
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
            isHighlighted={isHighlighted}
            isRaised={attackUnitId === id}
            shouldShowTallImage
            data-testid="UnitGridItem"
            primaryColor={getColorForCard(card)}
            onClick={onClick}
            tabIndex={0}
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
                <CardImage src={getImgSrcForCard(card)}></CardImage>
            </CardImageContainer>
            <div>Unit{unitType ? ` - ${unitType}` : ''}</div>
            <RulesTextArea
                shouldCenter={passiveEffects.length + enterEffects.length === 1}
                shouldFade={passiveEffects.length + enterEffects.length === 0}
            >
                {passiveEffects.length + enterEffects.length === 0 && (
                    <i>{description}</i>
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
                {numAttacks > 1 && <div>{numAttacks} attacks per turn</div>}
            </RulesTextArea>
            <AttackHPFooter>
                <AttackCell data-testid="attack" buffAmount={attackBuff}>
                    {attack + attackBuff} ⚔️
                </AttackCell>
                <SleepyCell>
                    {isOnBoard && numAttacksLeft === 0 && '💤'}
                </SleepyCell>
                <HPCell data-testid="hp" buffAmount={hpBuff}>
                    {isOnBoard && `${hp + hpBuff} / `} {totalHp + hpBuff} 💙
                </HPCell>
            </AttackHPFooter>
        </CardFrame>
    );
};
