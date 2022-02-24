import React from 'react';
import { render, screen } from '@testing-library/react';
import { QuantitySelector } from './QuantitySelector';

describe('Quantity Selector', () => {
    it('renders in non-editable mode by default', () => {
        render(<QuantitySelector quantity={3} />);
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.queryByText('+')).not.toBeInTheDocument();
        expect(screen.queryByText('-')).not.toBeInTheDocument();
    });

    it('renders in editable mode by default', () => {
        render(<QuantitySelector isEditable quantity={3} />);
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.queryByText('+')).toBeInTheDocument();
        expect(screen.queryByText('-')).toBeInTheDocument();
    });
});
