import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearFreeTextFilter,
    searchFreeTextFilter,
    selectResourceMatchStrategy,
    toggleRarityFilter,
    toggleResourceCardFilter,
    toggleResourceFilter,
    toggleUnitTypeFilter,
} from '@/client/redux/deckBuilderFilters';
import { AppDispatch, RootState } from '@/client/redux/store';
import { Filters, MatchStrategy, ResourceCost } from '@/types/deckBuilder';
import {
    ORDERED_RESOURCES,
    Resource,
    RESOURCE_GLOSSARY,
} from '@/types/resources';
import { CastingCostFrame } from '../CastingCost';
import { CardRarity, UnitType } from '@/types/cards';
import { COLORS_FOR_RARITY } from '@/constants/colors';

const FreeTextFilters: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { freeText } = useSelector<RootState, Filters>(
        (state) => state.deckBuilderFilters
    );

    return (
        <div
            style={{
                marginBottom: '4px',
                zoom: 1.5,
                display: 'flex',
                gap: '4px',
            }}
        >
            <input
                type="text"
                value={freeText}
                onChange={(e) => {
                    dispatch(searchFreeTextFilter(e.target.value));
                }}
                data-testid="Filters-FreeText"
                autoFocus
            ></input>
            <button
                onClick={() => {
                    dispatch(clearFreeTextFilter());
                }}
            >
                Clear
            </button>
        </div>
    );
};

const ResourceFilter: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { resources, resourceMatchStrategy } = useSelector<
        RootState,
        Filters
    >((state) => state.deckBuilderFilters);

    return (
        <div>
            <span style={{ zoom: 2, fontSize: '72%' }}>
                {ORDERED_RESOURCES.filter((r) => r !== Resource.GENERIC).map(
                    (r) => (
                        <CastingCostFrame
                            key={r}
                            hasNoMargin
                            isMuted={!resources.includes(r)}
                            onClick={() => {
                                dispatch(toggleResourceFilter(r));
                            }}
                            style={{ cursor: 'pointer' }}
                            data-testid={`Filters-Resources-${r}`}
                            tabIndex={0}
                        >
                            {RESOURCE_GLOSSARY[r].icon}
                        </CastingCostFrame>
                    )
                )}
            </span>
            <select
                style={{ zoom: 2 }}
                value={resourceMatchStrategy}
                onChange={(e) => {
                    dispatch(
                        selectResourceMatchStrategy(
                            e.target.value as MatchStrategy
                        )
                    );
                }}
                data-testid={`Filters-ResourcesMatchStrategy`}
            >
                <option>{MatchStrategy.EXACT}</option>
                <option>{MatchStrategy.LOOSE}</option>
            </select>
        </div>
    );
};

const RESOURCE_COST_FILTERS: ResourceCost[] = [1, 2, 3, 4, 5, 6, '7+'];

const ResourceCostFilter: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { resourceCosts } = useSelector<RootState, Filters>(
        (state) => state.deckBuilderFilters
    );

    return (
        <div>
            <span style={{ zoom: 2, fontSize: '72%' }}>
                {RESOURCE_COST_FILTERS.map((resourceCost) => (
                    <CastingCostFrame
                        key={resourceCost}
                        hasNoMargin
                        isMuted={!resourceCosts.includes(resourceCost)}
                        onClick={() => {
                            dispatch(toggleResourceCardFilter(resourceCost));
                        }}
                        style={{ cursor: 'pointer' }}
                        data-testid={`Filters-ResourceCost-${resourceCost}`}
                        tabIndex={0}
                    >
                        {resourceCost}
                    </CastingCostFrame>
                ))}
            </span>
        </div>
    );
};

const ALL_UNIT_TYPES: UnitType[] = ['Soldier', 'Ranged', 'Magical', 'None'];
const UNIT_TYPE_SYMBOL: Record<UnitType, string> = {
    Soldier: '⚔️',
    Ranged: '🏹',
    Magical: '🪄',
    None: '🚫',
};

export const UnitTypeFilter: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const unitTypes = useSelector<RootState, UnitType[]>(
        (state) => state.deckBuilderFilters.unitTypes
    );

    return (
        <div>
            <span style={{ zoom: 2, fontSize: '72%' }}>
                {ALL_UNIT_TYPES.map((unitType) => (
                    <CastingCostFrame
                        key={unitType}
                        hasNoMargin
                        isMuted={!unitTypes.includes(unitType)}
                        onClick={() => {
                            dispatch(toggleUnitTypeFilter(unitType));
                        }}
                        style={{ cursor: 'pointer' }}
                        data-testid={`Filters-UnitType-${unitType}`}
                        tabIndex={0}
                    >
                        {UNIT_TYPE_SYMBOL[unitType]}
                    </CastingCostFrame>
                ))}
            </span>
        </div>
    );
};

const ALL_RARITIES = [
    CardRarity.COMMON,
    CardRarity.UNCOMMON,
    CardRarity.RARE,
    CardRarity.MYTHIC,
];

const RaritiesFilter: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const rarities = useSelector<RootState, CardRarity[]>(
        (state) => state.deckBuilderFilters.rarities
    );

    return (
        <div>
            <span style={{ zoom: 2, fontSize: '72%' }}>
                {ALL_RARITIES.map((rarity) => (
                    <CastingCostFrame
                        key={rarity}
                        hasNoMargin
                        isMuted={!rarities.includes(rarity)}
                        onClick={() => {
                            dispatch(toggleRarityFilter(rarity));
                        }}
                        style={{ cursor: 'pointer' }}
                        data-testid={`Filters-UnitType-${rarity}`}
                        tabIndex={0}
                    >
                        <svg width="14" height="14">
                            <polygon
                                points="7,1 13,7 7,13 1,7"
                                fill={COLORS_FOR_RARITY[rarity]}
                                stroke="white"
                                strokeWidth="1"
                            />
                        </svg>
                    </CastingCostFrame>
                ))}
            </span>
        </div>
    );
};

/**
 * Note: unit tests omitted temporarily in favor of an integration test on DeckBuilder
 * @returns Filters component for DeckBuilder
 */
export const DeckBuilderFilters: React.FC = () => {
    return (
        <>
            <FreeTextFilters />
            <ResourceFilter />
            <ResourceCostFilter />
            <UnitTypeFilter />
            <RaritiesFilter />
        </>
    );
};
