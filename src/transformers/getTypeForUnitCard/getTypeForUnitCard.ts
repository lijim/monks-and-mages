import { UnitCard, UnitType } from '@/types/cards';

export const getTypeForUnitCard = (unitCard: UnitCard): UnitType => {
    if (unitCard.isMagical) return 'Magical';
    if (unitCard.isRanged) return 'Ranged';
    if (unitCard.isSoldier) return 'Soldier';
    return 'None';
};
