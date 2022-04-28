import { UnitType } from './cards';
import { Resource } from './resources';

// Using filter by resource as an example:
export enum MatchStrategy {
    // every resource chosen must be present on the card
    EXACT = 'Exact',
    // as long as one or more resources on the card match
    LOOSE = 'Loose',
    // at least 1+ chosen resources must be present, cannot have any other resources
    STRICT = 'Strict',
}

export type Filters = {
    freeText?: string;
    resourceMatchStrategy?: MatchStrategy;
    resources?: Resource[];
    unitTypes?: UnitType[];
};
