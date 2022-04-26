import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    searchFreeTextFilter,
    selectResourceMatchStrategy,
    toggleResourceFilter,
} from '@/client/redux/deckBuilderFilters';
import { AppDispatch, RootState } from '@/client/redux/store';
import { Filters, MatchStrategy } from '@/types/deckBuilder';
import {
    ORDERED_RESOURCES,
    Resource,
    RESOURCE_GLOSSARY,
} from '@/types/resources';
import { CastingCostFrame } from '../CastingCost';

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
                            isMuted={resources.indexOf(r) === -1}
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

/**
 * Note: unit tests omitted temporarily in favor of an integration test on DeckBuilder
 * @returns Filters component for DeckBuilder
 */
export const DeckBuilderFilters: React.FC = () => {
    return (
        <>
            <FreeTextFilters />
            <ResourceFilter />
        </>
    );
};
