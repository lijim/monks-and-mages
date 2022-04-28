import { UnitCards } from '@/mocks/units';
import { getTypeForUnitCard } from './getTypeForUnitCard';

describe('get type for unit card', () => {
    it('returns soldier', () => {
        expect(getTypeForUnitCard(UnitCards.LANCER)).toEqual('Soldier');
    });

    it('returns ranged', () => {
        expect(getTypeForUnitCard(UnitCards.LONGBOWMAN)).toEqual('Ranged');
    });

    it('returns magical', () => {
        expect(getTypeForUnitCard(UnitCards.FIRE_MAGE)).toEqual('Magical');
    });

    it('returns none', () => {
        expect(getTypeForUnitCard(UnitCards.BOUNTY_COLLECTOR)).toEqual('None');
    });
});
