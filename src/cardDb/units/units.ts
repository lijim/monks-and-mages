import { SOLDIERS } from './soldiers';
import { RANGED_UNITS } from './ranged';
import { MISC_UNITS } from './misc';
import { MAGES } from './mages';
import { MONKS } from './tribes/monks';
import { SAHARANS } from './tribes/saharans';
import { SORCERORS } from './tribes/sorcerors';
import { DIVERS } from './tribes/divers';
import { DRAGONS } from './tribes/dragons';
import { WITCHES } from './tribes/witches';
import { PIRATES } from './tribes/pirates';

export { Tokens } from './tokens';

export const UnitCards = {
    ...MAGES,
    ...SOLDIERS,
    ...MONKS,
    ...RANGED_UNITS,
    ...MISC_UNITS,
    ...SAHARANS,
    ...SORCERORS,
    ...DIVERS,
    ...DRAGONS,
    ...WITCHES,
    ...PIRATES,
};
