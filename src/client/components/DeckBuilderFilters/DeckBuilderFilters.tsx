import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    searchFreeTextFilter,
    selectResourceMatchStrategy,
    toggleResourceFilter,
    toggleUnitTypeFilter,
} from '@/client/redux/deckBuilderFilters';
import { AppDispatch, RootState } from '@/client/redux/store';
import { Filters, MatchStrategy } from '@/types/deckBuilder';
import {
    ORDERED_RESOURCES,
    Resource,
    RESOURCE_GLOSSARY,
} from '@/types/resources';
import { CastingCostFrame } from '../CastingCost';
import { UnitType } from '@/types/cards';

export const FreeTextFilters: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { freeText } = useSelector<RootState, Filters>(
        (state) => state.deckBuilderFilters
    );

    return (
        <div style={{ marginBottom: '4px', zoom: 1.5 }}>
            <input
                type="text"
                value={freeText}
                onChange={(e) => {
                    dispatch(searchFreeTextFilter(e.target.value));
                }}
                data-testid="Filters-FreeText"
            ></input>
            <button
                onClick={() => {
                    dispatch(searchFreeTextFilter(''));
                }}
            >
                Clear
            </button>
        </div>
    );
};

export const ResourceFilter: React.FC = () => {
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
                <option>{MatchStrategy.STRICT}</option>
                <option>{MatchStrategy.LOOSE}</option>
            </select>
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

/**
 * Note: unit tests omitted temporarily in favor of an integration test on DeckBuilder
 * @returns Filters component for DeckBuilder
 */
export const DeckBuilderFilters: React.FC = () => {
    return (
        <>
            <FreeTextFilters />
            <ResourceFilter />
            <UnitTypeFilter />
        </>
    );
};
