import { Card, CardType } from '@/types/cards';

const slugifyName = (name: string): string => {
    return name
        .replace(/ /g, '-')
        .replace(/'/g, '')
        .replace(/,/g, '')
        .replace(/:/g, '')
        .toLowerCase();
};

export const getImgSrcForCard = (card: Card, format = 'avif'): string => {
    const newName = slugifyName(card.name);
    if (card.cardType === CardType.RESOURCE) {
        return `/images/resources/${newName}.${format}`;
    }
    if (card.cardType === CardType.SPELL) {
        return `/images/spells/${newName}.${format}`;
    }
    if (card.cardType === CardType.UNIT) {
        return `/images/units/${newName}.${format}`;
    }
    return '';
};
