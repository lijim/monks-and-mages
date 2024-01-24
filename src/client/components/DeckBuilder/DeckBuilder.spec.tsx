import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { range } from 'lodash';
import { fireEvent, render, screen, waitFor, within } from '@/test-utils';
import { DeckBuilder } from './DeckBuilder';
import { UnitCards } from '@/cardDb/units';
import { SpellCards } from '@/cardDb/spells';
import { AdvancedResourceCards } from '@/cardDb/resources/advancedResources';
import { MatchStrategy } from '@/types/deckBuilder';
import { mockSavedDeck } from '@/mocks/savedDecks';
import { Format } from '@/types/games';
import { GameActionTypes } from '@/types/gameActions';
import { makeNewBoard } from '@/factories';

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
    // Describe the requests to mock.
    rest.get('/api/saved_decks/dungeonmaster', (_, res, ctx) => {
        return res(ctx.json([mockSavedDeck]));
    }),

    rest.get('/api/users/self', (_, res, ctx) => {
        return res(
            ctx.json({
                uid: 'auth0|1234',
                username: 'dungeonmaster',
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
    // Establish requests interception layer before all tests.
    server.listen();
});
afterAll(() => {
    // Clean up after all tests are done, preventing this
    // interception layer from affecting irrelevant tests.
    server.close();
});

describe('DeckBuilder', () => {
    beforeAll(() => {
        HTMLAnchorElement.prototype.click = jest.fn();
    });
    it('adds cards from the entire card pool (constructed mode)', async () => {
        render(<DeckBuilder />);
        fireEvent.click(screen.getByText('Lancer'));
        expect(
            await within(await screen.findByTestId('CurrentDeck')).findByText(
                'Lancer'
            )
        ).toBeInTheDocument();
    });
    it('does not add cards past a limit of 4 (constructed)', () => {
        render(<DeckBuilder />);
        const cardPool = screen.getByTestId('CardPool');
        const myDeck = screen.getByTestId('CurrentDeck');

        for (let i = 0; i < 5; i += 1) {
            fireEvent.click(within(cardPool).getByText('Lancer'));
        }
        expect(within(myDeck).queryByText('5')).not.toBeInTheDocument();
        expect(within(myDeck).getByText('4')).toBeInTheDocument();
    });

    it('allows more than 4 basic resources (constructed)', () => {
        render(<DeckBuilder />);
        const cardPool = screen.getByTestId('CardPool');
        const myDeck = screen.getByTestId('CurrentDeck');

        for (let i = 0; i < 5; i += 1) {
            fireEvent.click(within(cardPool).getByText('Crystal'));
        }

        expect(within(myDeck).getByText('5')).toBeInTheDocument();
    });
    it('removes cards', () => {
        render(<DeckBuilder />);
        const cardPool = screen.getByTestId('CardPool');
        const myDeck = screen.getByTestId('CurrentDeck');

        for (let i = 0; i < 5; i += 1) {
            fireEvent.click(within(cardPool).getByText('Crystal'));
        }
        fireEvent.click(within(myDeck).getByText('Crystal'));

        expect(within(myDeck).getByText('4')).toBeInTheDocument();
    });

    it('clears the whole deck', () => {
        render(<DeckBuilder />);
        const cardPool = screen.getByTestId('CardPool');
        const myDeck = screen.getByTestId('CurrentDeck');

        for (let i = 0; i < 5; i += 1) {
            fireEvent.click(within(cardPool).getByText('Crystal'));
        }
        fireEvent.click(within(myDeck).getByText('Clear'));

        expect(within(myDeck).queryAllByText('Crystal')).toHaveLength(0);
    });

    it('exports the decklist', () => {
        Object.assign(navigator, {
            clipboard: {
                writeText: () => {},
            },
        });

        navigator.clipboard.writeText = jest.fn();
        render(<DeckBuilder />);
        fireEvent.click(screen.getByText('Lancer'));

        fireEvent.click(screen.getByText('Copy to Clipboard'));

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
            '{"mainBoard":[{"card":"Lancer","quantity":1}],"sideBoard":[]}'
        );
    });

    it('imports a decklist', async () => {
        Object.assign(navigator, {
            clipboard: {
                readText: () =>
                    '{"mainBoard":[{"card":"Lancer","quantity":1}],"sideBoard":[]}',
            },
        });

        navigator.clipboard.writeText = jest.fn();
        render(<DeckBuilder />);
        const myDeck = screen.getByTestId('CurrentDeck');

        fireEvent.click(screen.getByText('Import from Clipboard'));

        expect(await within(myDeck).findByText('Lancer')).toBeInTheDocument();
    });

    it('alerts about improper import formats', async () => {
        Object.assign(navigator, {
            clipboard: {
                readText: () => `Lancer: 1"`,
            },
        });

        // eslint-disable-next-line no-console
        const consoleError = console.error;
        // eslint-disable-next-line no-console
        console.error = jest.fn();
        const windowAlert = window.alert;
        window.alert = jest.fn();
        render(<DeckBuilder />);

        fireEvent.click(screen.getByText('Import from Clipboard'));

        await waitFor(() =>
            expect(window.alert).toHaveBeenCalledWith(
                "Deck list not supported - make sure it follows the latest format in files created by 'Download as a File' or Copy to Clipboard"
            )
        );

        // eslint-disable-next-line no-console
        console.error = consoleError;
        window.alert = windowAlert;
    });

    it('gives deck-specific import errors', async () => {
        Object.assign(navigator, {
            clipboard: {
                readText: () =>
                    '{"mainBoard":[{"card":"LancerABC","quantity":1}],"sideBoard":[]}',
            },
        });

        // eslint-disable-next-line no-console
        const consoleError = console.error;
        // eslint-disable-next-line no-console
        console.error = jest.fn();
        const windowAlert = window.alert;
        window.alert = jest.fn();
        render(<DeckBuilder />);

        fireEvent.click(screen.getByText('Import from Clipboard'));

        await waitFor(() =>
            expect(window.alert).toHaveBeenCalledWith(
                'Error: Could not read "LancerABC"'
            )
        );

        // eslint-disable-next-line no-console
        console.error = consoleError;
        window.alert = windowAlert;
    });

    it('submits a deck', async () => {
        Object.assign(navigator, {
            clipboard: {
                readText: () =>
                    `{"mainBoard":[{"card":"Iron","quantity":56},{"card":"Lancer","quantity":4}],"sideBoard":[]}`,
            },
        });

        navigator.clipboard.writeText = jest.fn();
        const { webSocket } = render(<DeckBuilder />);
        const myDeck = screen.getByTestId('CurrentDeck');

        fireEvent.click(screen.getByText('Import from Clipboard'));
        expect(await within(myDeck).findByText('Lancer')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Submit'));
        expect(webSocket.chooseCustomDeck).toHaveBeenCalledWith({
            mainBoard: [
                { card: 'Iron', quantity: 56 },
                { card: 'Lancer', quantity: 4 },
            ],
            sideBoard: [],
        });
    });

    it('submits a deck for limited mode', async () => {
        const { webSocket } = render(<DeckBuilder format={Format.SEALED} />, {
            preloadedState: {
                board: makeNewBoard({
                    playerNames: ['Tommy', 'Timmy'],
                    startingPlayerIndex: 0,
                    format: Format.SEALED,
                }),
            },
        });
        const bamboo = screen.getByText('Bamboo');
        range(0, 40).forEach(() => {
            fireEvent.click(bamboo);
        });
        const myDeck = screen.getByTestId('CurrentDeck');

        expect(await within(myDeck).findByText('Bamboo')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Submit'));
        expect(webSocket.takeGameAction).toHaveBeenCalledWith({
            type: GameActionTypes.SUBMIT_DECK,
            skeleton: {
                mainBoard: [{ card: 'Bamboo', quantity: 40 }],
                sideBoard: [],
            },
        });
    });

    it('downloads a deck', async () => {
        Object.assign(navigator, {
            clipboard: {
                readText: () =>
                    `{"mainBoard":[{"card":"Iron","quantity":56},{"card":"Lancer","quantity":4}],"sideBoard":[]}`,
            },
        });

        navigator.clipboard.writeText = jest.fn();
        render(<DeckBuilder />);
        const myDeck = screen.getByTestId('CurrentDeck');

        fireEvent.click(screen.getByText('Import from Clipboard'));
        expect(await within(myDeck).findByText('Lancer')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Download as File'));
        expect(global.URL.createObjectURL).toHaveBeenCalled();
        expect(global.URL.revokeObjectURL).toHaveBeenCalled();
    });

    it('validates a deck', async () => {
        Object.assign(navigator, {
            clipboard: {
                readText: () =>
                    `{"mainBoard":[{"card":"Lancer","quantity":4}],"sideBoard":[]}`,
            },
        });

        navigator.clipboard.writeText = jest.fn();
        render(<DeckBuilder />);
        const myDeck = screen.getByTestId('CurrentDeck');

        fireEvent.click(screen.getByText('Import from Clipboard'));
        expect(await within(myDeck).findByText('Lancer')).toBeInTheDocument();

        expect(screen.getByText('Submit')).toBeDisabled();
    });

    it('loads a deck if one was already created', () => {
        render(<DeckBuilder />, {
            preloadedState: {
                deckList: {
                    customDeckList: {
                        mainBoard: [{ card: 'Lancer', quantity: 1 }],
                        sideBoard: [],
                    },
                    premadeDecklist: null,
                },
            },
        });
        const myDeck = screen.getByTestId('CurrentDeck');

        expect(within(myDeck).getByText('Lancer')).toBeInTheDocument();
    });

    describe('Search filters', () => {
        it('searches by free text on card titles', () => {
            render(<DeckBuilder />);
            const searchBar = screen.getByTestId('Filters-FreeText');
            fireEvent.change(searchBar, { target: { value: 'star' } });
            expect(screen.queryByText(UnitCards.LANCER.name)).toBeNull();
            expect(
                screen.getByText(SpellCards.STARRY_ILLUSION.name)
            ).toBeInTheDocument();
        });

        it('searches by rules text', () => {
            render(<DeckBuilder />);
            const searchBar = screen.getByTestId('Filters-FreeText');
            fireEvent.change(searchBar, { target: { value: 'Poison' } });
            expect(
                screen.queryByText(UnitCards.ASSASSIN.name)
            ).toBeInTheDocument();
            expect(
                screen.queryByText(SpellCards.STARRY_ILLUSION.name)
            ).toBeNull();
        });

        it('searches by resource cost', () => {
            render(<DeckBuilder />);

            fireEvent.click(screen.getByTestId('Filters-ResourceCost-2'));

            expect(
                screen.queryByText(UnitCards.ASSASSIN.name)
            ).toBeInTheDocument();
            expect(screen.queryByText(SpellCards.EMBER_SPEAR.name)).toBeNull();
        });

        it('clears the free text search field', () => {
            render(<DeckBuilder />);
            const cardPool = screen.getByTestId('CardPool');
            const searchBar = screen.getByTestId('Filters-FreeText');
            fireEvent.change(searchBar, { target: { value: 'star' } });
            fireEvent.click(within(cardPool).getByText('Clear'));
            expect(
                screen.queryByText(UnitCards.LANCER.name)
            ).toBeInTheDocument();
            expect(
                screen.getByText(SpellCards.STARRY_ILLUSION.name)
            ).toBeInTheDocument();
        });

        it('searches by colors (exactly)', () => {
            render(<DeckBuilder />);

            fireEvent.change(
                screen.getByTestId('Filters-ResourcesMatchStrategy'),
                {
                    target: {
                        value: MatchStrategy.EXACT,
                    },
                }
            );
            fireEvent.click(screen.getByTestId('Filters-Resources-Iron'));
            fireEvent.click(screen.getByTestId('Filters-Resources-Bamboo'));

            expect(
                screen.queryByText(UnitCards.LANCER.name)
            ).not.toBeInTheDocument();
            expect(
                screen.queryByText(UnitCards.DRAGON_MIST_WARRIOR.name)
            ).not.toBeInTheDocument();
            expect(
                screen.queryByText(AdvancedResourceCards.TANGLED_RUINS.name)
            ).toBeInTheDocument();
        });

        it('searches by colors (loosely)', () => {
            render(<DeckBuilder />);

            fireEvent.change(
                screen.getByTestId('Filters-ResourcesMatchStrategy'),
                {
                    target: {
                        value: MatchStrategy.LOOSE,
                    },
                }
            );
            fireEvent.click(screen.getByTestId('Filters-Resources-Iron'));
            fireEvent.click(screen.getByTestId('Filters-Resources-Bamboo'));

            expect(
                screen.queryByText(UnitCards.LANCER.name)
            ).toBeInTheDocument();
            expect(
                screen.queryByText(AdvancedResourceCards.TANGLED_RUINS.name)
            ).toBeInTheDocument();
        });

        it('filters by unit type', () => {
            render(<DeckBuilder />);

            fireEvent.click(screen.getByText('⚔️'));
            fireEvent.click(screen.getByText('🪄'));

            // expect soldiers + magical units
            expect(
                screen.queryByText(UnitCards.LANCER.name)
            ).toBeInTheDocument();
            expect(
                screen.queryByText(UnitCards.DRAGON_MIST_WARRIOR.name)
            ).toBeInTheDocument();
            expect(
                screen.queryByText(UnitCards.MAGICIANS_APPRENTICE.name)
            ).toBeInTheDocument();

            // don't expect other unit types
            expect(
                screen.queryByText(UnitCards.PASTURE_EXPLORER.name)
            ).not.toBeInTheDocument();
            expect(
                screen.queryByText(UnitCards.LONGBOWMAN.name)
            ).not.toBeInTheDocument();

            // don't expect spells
            expect(
                screen.queryByText(AdvancedResourceCards.TANGLED_RUINS.name)
            ).not.toBeInTheDocument();
            expect(
                screen.queryByText(SpellCards.EMBER_SPEAR.name)
            ).not.toBeInTheDocument();
        });

        it('filters by rarity', () => {
            render(<DeckBuilder />);

            fireEvent.click(screen.getByTestId('Filters-RarityType-Common'));
            fireEvent.click(screen.getByTestId('Filters-RarityType-Uncommon'));

            // expect commons + uncommons
            expect(
                screen.queryByText(UnitCards.LANCER.name)
            ).toBeInTheDocument();
            expect(
                screen.queryByText(UnitCards.LONGBOWMAN.name)
            ).toBeInTheDocument();
            expect(
                screen.queryByText(UnitCards.MAGICIANS_APPRENTICE.name)
            ).toBeInTheDocument();

            // don't expect rares / mythics
            expect(
                screen.queryByText(UnitCards.DRAGON_MIST_WARRIOR.name)
            ).not.toBeInTheDocument();
            expect(
                screen.queryByText(SpellCards.A_DARK_FOREST.name)
            ).not.toBeInTheDocument();
        });
    });

    describe('Saved Decks', () => {
        it('loads saved decks', async () => {
            render(<DeckBuilder />, {
                preloadedState: {
                    user: {
                        auth0Id: 'auth0Id|a01fde2',
                        name: 'dungeonmaster1234',
                    },
                },
            });
            await waitFor(() =>
                expect(screen.getByText('my first deck')).toBeInTheDocument()
            );
            fireEvent.click(screen.getByText('my first deck'));
            const myDeck = screen.getByTestId('CurrentDeck');

            expect(
                within(myDeck).getByText('Smelting Forge')
            ).toBeInTheDocument();
        });
    });
});
