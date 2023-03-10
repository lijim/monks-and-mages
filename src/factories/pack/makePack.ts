import sampleSize from 'lodash.samplesize';
import { AdvancedResourceCards } from '@/cardDb/resources/advancedResources';
import { SpellCards } from '@/cardDb/spells';
import { UnitCards } from '@/cardDb/units';
import { Card, CardRarity } from '@/types/cards';
import { makeCard } from '../cards';

const CARDPOOL = [
    ...Object.values(AdvancedResourceCards),
    ...Object.values(SpellCards),
    ...Object.values(UnitCards),
].filter((card) => !card.isTokenOnly);

const MYTHICS = CARDPOOL.filter((card) => card.rarity === CardRarity.MYTHIC);
const RARES = CARDPOOL.filter((card) => card.rarity === CardRarity.RARE);
const UNCOMMONS = CARDPOOL.filter(
    (card) => card.rarity === CardRarity.UNCOMMON
);
const COMMONS = CARDPOOL.filter((card) => card.rarity === CardRarity.COMMON);

export const makePack = (): Card[] => {
    const commons = sampleSize(COMMONS, 9);
    const uncommons = sampleSize(UNCOMMONS, 4);
    const raresAndMythics =
        Math.random() < 0.2
            ? [...sampleSize(RARES, 1), ...sampleSize(MYTHICS, 1)]
            : sampleSize(RARES, 2);
    return [...commons, ...uncommons, ...raresAndMythics].map((card) =>
        makeCard(card)
    );
};
