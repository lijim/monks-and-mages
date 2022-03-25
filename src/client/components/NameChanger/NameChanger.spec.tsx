import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { NameChanger } from './NameChanger';
import { startBackgroundMusic } from '@/audioHelpers/playAudio';

jest.mock('@/audioHelpers/playAudio', () => ({
    __esModule: true, // this property makes it work
    default: 'mockedDefaultExport',
    startBackgroundMusic: jest.fn(),
}));

describe('Name Changer', () => {
    it('selects a new name', () => {
        const mockOnSubmit = jest.fn();
        render(<NameChanger handleSubmit={mockOnSubmit} />);

        fireEvent.change(screen.getByRole('textbox'), {
            target: { value: 'Trogdor the Burninator' },
        });
        fireEvent.click(screen.getByRole('button'));

        expect(mockOnSubmit).toHaveBeenCalledWith('Trogdor the Burninator');
    });

    it('starts the game music', () => {
        const mockOnSubmit = jest.fn();
        render(<NameChanger handleSubmit={mockOnSubmit} />);

        fireEvent.change(screen.getByRole('textbox'), {
            target: { value: 'Trogdor the Burninator' },
        });
        fireEvent.click(screen.getByRole('button'));

        expect(startBackgroundMusic).toHaveBeenCalled();
    });

    it('does nothing if the new name is blank', () => {
        const mockOnSubmit = jest.fn();
        render(<NameChanger handleSubmit={mockOnSubmit} />);

        fireEvent.click(screen.getByRole('button'));

        expect(mockOnSubmit).toHaveBeenCalledTimes(0);
    });
});
