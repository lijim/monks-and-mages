// eslint-disable-next-line
import imageMagick from 'imagemagick';
import fs from 'fs';

import { Tokens, UnitCards } from '@/cardDb/units';
import { SpellCards } from '@/cardDb/spells';
import { AdvancedResourceCards } from '@/cardDb/resources/advancedResources';

const slugifyName = (name: string) => {
    return name.replaceAll('_', '-').toLowerCase();
};

const FORMATS = ['webp', 'avif'];

const formatToWebP = (imageName: string, imagePath: string) => {
    const newName = slugifyName(imageName);

    imageMagick.resize(
        {
            srcPath: `assets/images/${imagePath}/${newName}.avif`,
            format: 'avif',
            srcFormat: 'jpg',
            width: 520,
            dstPath: `assets/images/${imagePath}/${newName}.webp`,
        },
        () => {
            // eslint-disable-next-line
            console.log(`formatted ${newName}.webp`);
        }
    );
};

const formatImages = (imageName: string, imagePath: string) => {
    const newName = slugifyName(imageName);

    if (!fs.existsSync(`tmp/${newName}.jpg`)) {
        return;
    }
    if (fs.existsSync(`assets/images/${imagePath}/${newName}.avif`)) {
        return;
    }

    FORMATS.forEach((format) =>
        imageMagick.resize(
            {
                srcPath: `tmp/${newName}.jpg`,
                format: 'avif',
                srcFormat: 'jpg',
                width: 520,
                dstPath: `assets/images/${imagePath}/${newName}.${format}`,
            },
            () => {
                // eslint-disable-next-line
                console.log(`downloaded and formatted ${newName}.${format}`);
            }
        )
    );
};

/**
 * Script to scrape and compress images into reasonably-sized
 * 520px width avif files
 */
[...Object.entries(UnitCards), ...Object.entries(Tokens)].forEach(
    ([name, card]) => {
        formatToWebP(name, 'units');
        if (!card.imgSrc.startsWith('http')) {
            return;
        }
        formatImages(name, 'units');
    }
);

Object.entries(SpellCards).forEach(([name, card]) => {
    formatToWebP(name, 'spells');
    if (!card.imgSrc.startsWith('http')) {
        return;
    }
    formatImages(name, 'spells');
});

Object.entries(AdvancedResourceCards).forEach(([name, card]) => {
    formatToWebP(name, 'resources');
    if (!card.imgSrc.startsWith('http')) {
        return;
    }
    formatImages(name, 'resources');
});
