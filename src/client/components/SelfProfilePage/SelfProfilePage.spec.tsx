import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { render, screen } from '@/test-utils';
import { SelfProfilePage } from './SelfProfilePage';

jest.mock('@auth0/auth0-react', () => ({
    __esModule: true,
    useAuth0: () => ({
        user: 'auth0|1234',
    }),
}));

const server = setupServer(
    rest.get('/api/levels', (_, res, ctx) => {
        return res(
            ctx.json([
                {
                    name: 'Angry Hen',
                    level: 1,
                    xpRequired: 0,
                    image: 'https://monksandmages.com/images/units/angry-hen.webp',
                },
                {
                    name: 'Manta Ray',
                    level: 2,
                    xpRequired: 15,
                    image: 'https://monksandmages.com/images/units/manta-ray.webp',
                },
                {
                    name: 'Bamboo Farmer',
                    level: 3,
                    xpRequired: 30,
                    image: 'https://monksandmages.com/images/units/bamboo-farmer.webp',
                },
                {
                    name: 'Gargoyle',
                    level: 4,
                    xpRequired: 50,
                    image: 'https://monksandmages.com/images/units/gargoyle.webp',
                },
            ])
        );
    }),

    rest.get('/api/users/self', (_, res, ctx) => {
        return res(
            ctx.json({
                uid: 'auth0|1234',
                username: 'groucho',
                createdAt: '2023-02-25T08:41:41.258Z',
                numberOfGamesWon: 0,
                exp: 20,
                avatarUrl: '',
            })
        );
    }),

    rest.get('/socket.io/', (_, res, ctx) => {
        return res(ctx.json({}));
    })
);

beforeAll(() => {
    server.listen();
});
afterAll(() => {
    server.close();
});

describe('Self Profile Page', () => {
    it('displays available avatars', async () => {
        render(<SelfProfilePage />);
        expect(
            await screen.findByText('Level 2 - Manta Ray')
        ).toBeInTheDocument();
    });

    it('displays the next unlock', async () => {
        render(<SelfProfilePage />);
        expect(
            await screen.findByText('Next Unlock: Level 3 - Bamboo Farmer')
        ).toBeInTheDocument();
    });
});
