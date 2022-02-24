import React from 'react';
import { render, screen } from '@testing-library/react';
import { CastingCost } from './CastingCost';
import { Resource, RESOURCE_GLOSSARY } from '@/types/resources';

describe('Casting Cost', () => {
    it('displays generics as a number', () => {
        render(
            <CastingCost cost={{ [Resource.GENERIC]: 5, [Resource.FIRE]: 1 }} />
        );
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('displays symbols for each non-generic resource as a number', () => {
        render(
            <CastingCost cost={{ [Resource.WATER]: 3, [Resource.FIRE]: 2 }} />
        );
        expect(
            screen.getAllByText(RESOURCE_GLOSSARY[Resource.FIRE].icon)
        ).toHaveLength(2);
        expect(
            screen.getAllByText(RESOURCE_GLOSSARY[Resource.WATER].icon)
        ).toHaveLength(3);
    });
});
