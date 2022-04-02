// eslint-disable-next-line
import Axios from 'axios';
import fs from 'fs';

import { Tokens, UnitCards } from '@/cardDb/units';
import { SpellCards } from '@/cardDb/spells';

async function downloadImage(url: string, filepath: string) {
    const response = await Axios({
        url,
        method: 'GET',
        responseType: 'stream',
    });
    return new Promise((resolve, reject) => {
        response.data
            .pipe(fs.createWriteStream(filepath))
            .on('error', reject)
            .once('close', () => resolve(filepath));
    });
}

const slugifyName = (name: string) => {
    return name.replaceAll('_', '-').toLowerCase();
};

/**
 * Script to scrape and compress images into reasonably-sized
 * 520px width avif files
 */
[
    ...Object.entries(UnitCards),
    ...Object.entries(Tokens),
    ...Object.entries(SpellCards),
].forEach(([name, card]) => {
    if (!card.imgSrc.startsWith('http')) return;
    const newName = slugifyName(name);
    if (
        fs.existsSync(`assets/images/units/${newName}.avif`) ||
        fs.existsSync(`assets/images/spells/${newName}.avif`)
    ) {
        // eslint-disable-next-line
        console.log(`skipping ${newName} - already have an asset`);
        return;
    }
    // eslint-disable-next-line
    console.log(`downloading ${newName}.jpg`);
    downloadImage(card.imgSrc, `tmp/${newName}.jpg`);
});
