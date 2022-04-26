import React from 'react';
import styled from 'styled-components';

import { PartialRecord } from '@/types/generics';
import {
    ORDERED_RESOURCES,
    Resource,
    RESOURCE_GLOSSARY,
} from '@/types/resources';
import { Colors } from '@/constants/colors';

interface CastingCostProps {
    cost: PartialRecord<Resource, number>;
    originalCost?: PartialRecord<Resource, number>;
}

interface CastingCostFrameProps {
    hasNoMargin?: boolean;
    isGenericIncreased?: boolean;
    isMuted?: boolean;
    shouldCollapseLeft?: boolean;
}

export const CastingCostFrame = styled.span<CastingCostFrameProps>`
    color: white;
    background: rgb(100, 100, 100);
    border: 1px solid rgb(255, 255, 255);
    border-radius: 100%;
    ${({ isGenericIncreased }) =>
        isGenericIncreased ? `color: ${Colors.DEBUFF_RED};` : ''}
    ${({ isMuted }) => (isMuted ? `opacity: .7;` : '')}
    width: 20px;
    height: 20px;
    display: inline-grid;
    place-content: center;
    :not(first-child) {
        margin-left: ${({ hasNoMargin, shouldCollapseLeft }) => {
            if (hasNoMargin) return '0';
            if (shouldCollapseLeft) return '-10';
            return '2';
        }}px;
    }
`;

export const CastingCost: React.FC<CastingCostProps> = ({
    cost,
    originalCost,
}) => {
    const costs: JSX.Element[] = [];
    let key = 0;
    const originalGenericCost = originalCost?.Generic || 0;
    ORDERED_RESOURCES.forEach((resource) => {
        if (!(resource in cost)) {
            return;
        }
        const number = cost[resource];
        const castingSymbol = RESOURCE_GLOSSARY[resource].icon;
        if (resource === Resource.GENERIC) {
            key += 1;
            // render the generic symbol
            costs.push(
                <CastingCostFrame
                    key={key}
                    isGenericIncreased={number > originalGenericCost}
                >
                    {number}
                </CastingCostFrame>
            );
        } else {
            [...new Array(number)].forEach((_, i) => {
                key += 1;
                costs.push(
                    <CastingCostFrame key={key} shouldCollapseLeft={i > 0}>
                        {castingSymbol}
                    </CastingCostFrame>
                );
            });
        }
    });
    return <>{costs}</>;
};
