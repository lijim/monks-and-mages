import React from 'react';
import { fireEvent, render, screen } from '@/test-utils';
import { NameChanger } from './NameChanger';
import { startBackgroundMusic } from '@/audioHelpers/playAudio';

jest.mock('@/audioHelpers/playAudio', () => ({
    __esModule: true,
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
        fireEvent.click(screen.getByText('Start'));

        expect(mockOnSubmit).toHaveBeenCalledWith('Trogdor the Burninator');
    });

    it('starts the game music', () => {
        const mockOnSubmit = jest.fn();
        render(<NameChanger handleSubmit={mockOnSubmit} />);

        fireEvent.change(screen.getByRole('textbox'), {
            target: { value: 'Trogdor the Burninator' },
        });
        fireEvent.click(screen.getByText('Start'));

        expect(startBackgroundMusic).toHaveBeenCalled();
    });

    it('does nothing if the new name is blank', () => {
        const mockOnSubmit = jest.fn();
        render(<NameChanger handleSubmit={mockOnSubmit} />);

        fireEvent.click(screen.getByText('Start'));

        expect(mockOnSubmit).toHaveBeenCalledTimes(0);
    });
});
