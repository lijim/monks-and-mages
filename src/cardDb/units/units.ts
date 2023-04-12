import { SOLDIERS } from './soldiers';
import { RANGED_UNITS } from './ranged';
import { MISC_UNITS } from './misc';
import { MAGES } from './mages';
import {
    MONKS,
    SAHARANS,
    SORCERORS,
    DIVERS,
    DRAGONS,
    WITCHES,
    PIRATES,
    CANNONEERS,
} from './tribes';

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
    ...CANNONEERS,
};
