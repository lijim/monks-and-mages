// eslint-disable-next-line
import imageMagick from 'imagemagick';
import fs from 'fs';

import { Tokens, UnitCards } from '@/cardDb/units';
import { SpellCards } from '@/cardDb/spells';
import { AdvancedResourceCards } from '@/cardDb/resources/advancedResources';

const slugifyName = (name: string) => {
    return name.replaceAll('_', '-').toLowerCase();
};

/**
 * Script to scrape and compress images into reasonably-sized
 * 520px width avif files
 */
[...Object.entries(UnitCards), ...Object.entries(Tokens)].forEach(
    ([name, card]) => {
        if (!card.imgSrc.startsWith('http')) {
            return;
        }
        const newName = slugifyName(name);
        if (!fs.existsSync(`tmp/${newName}.jpg`)) {
            return;
        }
        if (fs.existsSync(`assets/images/units/${newName}.avif`)) {
            return;
        }
        imageMagick.resize(
            {
                srcPath: `tmp/${newName}.jpg`,
                format: 'avif',
                srcFormat: 'jpg',
                width: 520,
                dstPath: `assets/images/units/${newName}.avif`,
            },
            () => {
                // eslint-disable-next-line
                console.log(`downloaded and formatted ${newName}.avif`);
            }
        );
    }
);

Object.entries(SpellCards).forEach(([name, card]) => {
    if (!card.imgSrc.startsWith('http')) {
        return;
    }
    const newName = slugifyName(name);

    if (!fs.existsSync(`tmp/${newName}.jpg`)) {
        return;
    }
    if (fs.existsSync(`assets/images/spells/${newName}.avif`)) {
        return;
    }
    imageMagick.resize(
        {
            srcPath: `tmp/${newName}.jpg`,
            format: 'avif',
            srcFormat: 'jpg',
            width: 520,
            dstPath: `assets/images/spells/${newName}.avif`,
        },
        () => {
            // eslint-disable-next-line
            console.log(`downloaded and formatted ${newName}.avif`);
        }
    );
});

Object.entries(AdvancedResourceCards).forEach(([name, card]) => {
    if (!card.imgSrc.startsWith('http')) {
        return;
    }
    const newName = slugifyName(name);

    if (!fs.existsSync(`tmp/${newName}.jpg`)) {
        return;
    }
    if (fs.existsSync(`assets/images/resources/${newName}.avif`)) {
        return;
    }
    imageMagick.resize(
        {
            srcPath: `tmp/${newName}.jpg`,
            format: 'avif',
            srcFormat: 'jpg',
            width: 520,
            dstPath: `assets/images/resources/${newName}.avif`,
        },
        () => {
            // eslint-disable-next-line
            console.log(`downloaded and formatted ${newName}.avif`);
        }
    );
});
