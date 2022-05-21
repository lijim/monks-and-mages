import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import { render } from '@/test-utils';
import { IntroScreen } from './IntroScreen';

jest.mock('@/audioHelpers/playAudio', () => ({
    __esModule: true,
    default: 'mockedDefaultExport',
    startBackgroundMusic: jest.fn(),
}));

describe('Intro Screen', () => {
    it('submits a name', () => {
        const { webSocket } = render(<IntroScreen />);
        const { chooseName } = webSocket;

        fireEvent.change(screen.getByRole('textbox'), {
            target: { value: 'Trogzor' },
        });
        fireEvent.click(screen.getByText('Start'));

        expect(chooseName).toHaveBeenCalledWith('Trogzor');
    });
});
