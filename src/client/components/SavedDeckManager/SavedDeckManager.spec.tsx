import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { render, screen } from '@/test-utils';
import { SavedDeckManager } from './SavedDeckManager';
import { savedDecks } from './fixtures';

jest.mock('@auth0/auth0-react', () => ({
    __esModule: true,
    useAuth0: () => ({
        user: 'auth0|1234',
    }),
}));

jest.mock('react-cookie', () => ({
    useCookies: () => [{ accessToken: '12345' }],
}));

const server = setupServer(
    rest.get('/api/saved_decks/groucho', (_, res, ctx) => {
        return res(ctx.json(savedDecks));
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

    rest.get('/api/levels', (_, res, ctx) => {
        return res(
            ctx.json([
                {
                    name: 'Angry Hen',
                    level: 1,
                    xpRequired: 0,
                    image: 'https://monksandmages.com/images/units/angry-hen.webp',
                },
            ])
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
    it('displays saved decks', async () => {
        render(
            <SavedDeckManager decklist={{ mainBoard: [], sideBoard: [] }} />
        );
        expect(
            await screen.findByText('Singleton: Green/Grey')
        ).toBeInTheDocument();
        expect(
            await screen.findByText('Singleton: Orange/Blue')
        ).toBeInTheDocument();
    });
});
