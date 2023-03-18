import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import { render } from '@/test-utils';
import { TopNavBar } from './TopNavBar';
import { RootState } from '@/client/redux/store';

describe('TopNavBar', () => {
    it('logs out', () => {
        const preloadedState: Partial<RootState> = {
            user: { name: 'Squidcake' },
        };
        const { webSocket } = render(<TopNavBar />, { preloadedState });

        fireEvent.click(screen.getByText('Log Out'));

        expect(webSocket.logout).toHaveBeenCalled();
    });
});
