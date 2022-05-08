import { CRYSTAL_MAGES } from './crystal';
import { FIRE_MAGES } from './fire';
import { MISC_MAGES } from './misc';
import { WATER_MAGES } from './water';
import { WIND_MAGES } from './wind';

export const MAGES = {
    ...CRYSTAL_MAGES,
    ...FIRE_MAGES,
    ...WATER_MAGES,
    ...WIND_MAGES,
    ...MISC_MAGES,
};
