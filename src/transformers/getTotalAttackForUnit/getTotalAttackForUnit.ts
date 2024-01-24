import { UnitCard } from '@/types/cards';

export const getTotalAttackForUnit = (unit: UnitCard) => {
    return (
        unit.attack +
        unit.attackBuff +
        unit.oneCycleAttackBuff +
        unit.oneTurnAttackBuff
    );
};
