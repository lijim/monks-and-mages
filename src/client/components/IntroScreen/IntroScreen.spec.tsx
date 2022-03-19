import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import { render } from '@/test-utils';
import { IntroScreen } from './IntroScreen';

describe('Intro Screen', () => {
    it('submits a name', () => {
        const { webSocket } = render(<IntroScreen />);
        const { chooseName } = webSocket;

        fireEvent.change(screen.getByRole('textbox'), {
            target: { value: 'Trogzor' },
        });
        fireEvent.click(screen.getByRole('button'));

        expect(chooseName).toHaveBeenCalledWith('Trogzor');
    });
});
