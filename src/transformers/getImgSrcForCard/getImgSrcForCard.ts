import { Card, CardType } from '@/types/cards';

const slugifyName = (name: string): string => {
    return name
        .replace(/ /g, '-')
        .replace(/'/g, '')
        .replace(/,/g, '')
        .replace(/:/g, '')
        .toLowerCase();
};

export const getImgSrcForCard = (card: Card): string => {
    const newName = slugifyName(card.name);
    if (card.cardType === CardType.RESOURCE) {
        return `images/resources/${newName}.avif`;
    }
    if (card.cardType === CardType.SPELL) {
        return `images/spells/${newName}.avif`;
    }
    if (card.cardType === CardType.UNIT) {
        return `images/units/${newName}.avif`;
    }
    return '';
};
