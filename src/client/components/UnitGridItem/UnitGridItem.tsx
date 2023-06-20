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
    TypesAndRarityLine,
} from '../CardFrame';
import { getColorsForCard } from '@/transformers/getColorsForCard';
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
        damagePlayerEffects = [],
        description = 'ipsem lorum description',
        enterEffects,
        hp,
        hpBuff,
        id,
        isLegendary,
        isMagical,
        isRanged,
        isSoldier,
        name,
        numAttacks,
        numAttacksLeft,
        oneCycleAttackBuff,
        oneTurnAttackBuff,
        originalAttributes: { cost: originalCost },
        passiveEffects,
        totalHp,
    } = card;
    let unitType = '';
    if (isRanged) unitType = 'Ranged';
    if (isMagical) unitType = 'Magical';
    if (isSoldier) unitType = 'Soldier';
    if (isLegendary) unitType += ' (Legendary)';
    const { primaryColor, secondaryColor } = getColorsForCard(card);

    const numEffectsToDisplay =
        damagePlayerEffects.length +
        passiveEffects.length +
        enterEffects.length +
        (numAttacks !== 1 ? 1 : 0);

    return (
        <CardFrame
            isHighlighted={isHighlighted}
            isRaised={attackUnitId === id}
            shouldShowTallImage
            data-testid="UnitGridItem"
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
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
                <CardImage
                    src={getImgSrcForCard(card)}
                    objectPosition={card.imgObjectPosition}
                />
            </CardImageContainer>
            <TypesAndRarityLine rarity={card.rarity}>
                Unit{unitType ? ` - ${unitType}` : ''}
            </TypesAndRarityLine>
            <RulesTextArea
                shouldCenter={numEffectsToDisplay === 1}
                shouldFade={numEffectsToDisplay === 0}
            >
                {numEffectsToDisplay === 0 && <i>{description}</i>}
                {passiveEffects.map((effect) => (
                    <div key={effect}>
                        {card.omitReminderText ? effect.split(' (')[0] : effect}
                    </div>
                ))}{' '}
                {numAttacks === 0 && <div>Cannot attack</div>}
                {numAttacks > 1 && <div>{numAttacks} attacks per turn</div>}
                {enterEffects.length > 0 && <b>Upon entering the board:</b>}
                {enterEffects.map((effect, index) => (
                    <div key={`${index}-${transformEffectToRulesText(effect)}`}>
                        {transformEffectToRulesText(effect)}
                    </div>
                ))}
                {damagePlayerEffects.length > 0 && (
                    <div>
                        <b>Upon damaging an opposing player in combat:</b>
                        {damagePlayerEffects.map((effect) => (
                            <div key={transformEffectToRulesText(effect)}>
                                {transformEffectToRulesText(effect)}
                            </div>
                        ))}
                    </div>
                )}
            </RulesTextArea>
            <AttackHPFooter>
                <AttackCell
                    data-testid="attack"
                    buffAmount={
                        attackBuff + oneCycleAttackBuff + oneTurnAttackBuff
                    }
                >
                    {attack +
                        attackBuff +
                        oneCycleAttackBuff +
                        oneTurnAttackBuff}{' '}
                    ⚔️
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
