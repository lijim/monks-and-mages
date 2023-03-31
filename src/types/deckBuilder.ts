import { CardRarity, Skeleton, UnitType } from './cards';
import { Resource } from './resources';

// Using filter by resource as an example:
export enum MatchStrategy {
    // every resource chosen must be present on the card
    EXACT = 'Exact',
    // any subset of the resource cards can be present
    LOOSE = 'Loose',
}

export type ResourceCost = '7+' | number;

export type Filters = {
    freeText: string;
    rarities: CardRarity[];
    resourceCosts: ResourceCost[];
    resourceMatchStrategy: MatchStrategy;
    resources: Resource[];
    unitTypes: UnitType[];
};

export type SavedDeck = {
    createdAt: number;
    id: string;
    name: string;
    skeleton: Skeleton;
    updateAt: number;
    userUid: string;
};
