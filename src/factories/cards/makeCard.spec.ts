import { UnitCards } from '@/cardDb/units';
import { CardType } from '@/types/cards';
import { Resource } from '@/types/resources';
import { makeCard, makeResourceCard } from './makeCards';

it('makes a resource card', () => {
    expect(makeResourceCard(Resource.BAMBOO)).toMatchObject({
        cardType: CardType.RESOURCE,
        name: Resource.BAMBOO,
        resourceType: Resource.BAMBOO,
        isUsed: false,
    });
});

it('makes unique cards', () => {
    const card1 = makeCard(UnitCards.LANCER);
    const card2 = makeCard(UnitCards.LANCER);
    card1.hp += 3;
    expect(card1.hp).not.toEqual(card2.hp);
});
