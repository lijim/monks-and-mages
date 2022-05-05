import React from 'react';
import { push } from 'redux-first-history';
import { fireEvent, render, screen, waitFor, within } from '@/test-utils';
import { DeckBuilder } from './DeckBuilder';
import { UnitCards } from '@/cardDb/units';
import { SpellCards } from '@/cardDb/spells';
import { AdvancedResourceCards } from '@/cardDb/resources/advancedResources';
import { MatchStrategy } from '@/types/deckBuilder';

describe('DeckBuilder', () => {
    beforeAll(() => {
        HTMLAnchorElement.prototype.click = jest.fn();
    });
    it('adds cards from the entire card pool (constructed mode)', () => {
        render(<DeckBuilder />);
        fireEvent.click(screen.getByText('Lancer'));
        expect(
            within(screen.getByTestId('MyDeck')).getByText('Lancer')
        ).toBeInTheDocument();
    });
    // it.todo('adds cards from a filtered card pool');
    // it.todo('adds cards via a quantity selector');
    it('does not add cards past a limit of 4 (constructed)', () => {
        render(<DeckBuilder />);
        const cardPool = screen.getByTestId('CardPool');
        const myDeck = screen.getByTestId('MyDeck');

        for (let i = 0; i < 5; i += 1) {
            fireEvent.click(within(cardPool).getByText('Lancer'));
        }
        expect(within(myDeck).queryByText('5')).not.toBeInTheDocument();
        expect(within(myDeck).getByText('4')).toBeInTheDocument();
    });

    it('allows more than 4 basic resources (constructed)', () => {
        render(<DeckBuilder />);
        const cardPool = screen.getByTestId('CardPool');
        const myDeck = screen.getByTestId('MyDeck');

        for (let i = 0; i < 5; i += 1) {
            fireEvent.click(within(cardPool).getByText('Crystal'));
        }

        expect(within(myDeck).getByText('5')).toBeInTheDocument();
    });
    // it.todo('adds from a limited pool of cards (draft mode)');
    it('removes cards', () => {
        render(<DeckBuilder />);
        const cardPool = screen.getByTestId('CardPool');
        const myDeck = screen.getByTestId('MyDeck');

        for (let i = 0; i < 5; i += 1) {
            fireEvent.click(within(cardPool).getByText('Crystal'));
        }
        fireEvent.click(within(myDeck).getByText('Crystal'));

        expect(within(myDeck).getByText('4')).toBeInTheDocument();
    });
    it.todo('removes cards via a quantity selector');

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
            `[{"card":"Lancer","quantity":1}]`
        );
    });

    it('imports a decklist', async () => {
        Object.assign(navigator, {
            clipboard: {
                readText: () => `[{"card":"Lancer","quantity":1}]`,
            },
        });

        navigator.clipboard.writeText = jest.fn();
        render(<DeckBuilder />);
        const myDeck = screen.getByTestId('MyDeck');

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
                readText: () => `[{"card":"LancerABC","quantity":1}]`,
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
                'Error found in decklist: Could not read "LancerABC"'
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
                    `[{"card":"Iron","quantity":44},{"card":"Lancer","quantity":4}]`,
            },
        });

        navigator.clipboard.writeText = jest.fn();
        const { webSocket, dispatch } = render(<DeckBuilder />);
        const myDeck = screen.getByTestId('MyDeck');

        fireEvent.click(screen.getByText('Import from Clipboard'));
        expect(await within(myDeck).findByText('Lancer')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Submit'));
        expect(webSocket.chooseCustomDeck).toHaveBeenCalledWith([
            { card: 'Iron', quantity: 44 },
            { card: 'Lancer', quantity: 4 },
        ]);
        expect(dispatch).toHaveBeenCalledWith(push('/'));
    });

    it('downloads a deck', async () => {
        Object.assign(navigator, {
            clipboard: {
                readText: () =>
                    `[{"card":"Iron","quantity":44},{"card":"Lancer","quantity":4}]`,
            },
        });

        navigator.clipboard.writeText = jest.fn();
        render(<DeckBuilder />);
        const myDeck = screen.getByTestId('MyDeck');

        fireEvent.click(screen.getByText('Import from Clipboard'));
        expect(await within(myDeck).findByText('Lancer')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Download as File'));
        expect(global.URL.createObjectURL).toHaveBeenCalled();
        expect(global.URL.revokeObjectURL).toHaveBeenCalled();
    });

    it('validates a deck', async () => {
        Object.assign(navigator, {
            clipboard: {
                readText: () => `[{"card":"Lancer","quantity":1}]`,
            },
        });

        navigator.clipboard.writeText = jest.fn();
        render(<DeckBuilder />);
        const myDeck = screen.getByTestId('MyDeck');

        fireEvent.click(screen.getByText('Import from Clipboard'));
        expect(await within(myDeck).findByText('Lancer')).toBeInTheDocument();

        expect(screen.getByText('Submit')).toBeDisabled();
    });

    it('loads a deck if one was already created', () => {
        render(<DeckBuilder />, {
            preloadedState: {
                deckList: {
                    customDeckList: [{ card: 'Lancer', quantity: 1 }],
                    premadeDecklist: null,
                },
            },
        });
        const myDeck = screen.getByTestId('MyDeck');

        expect(within(myDeck).getByText('Lancer')).toBeInTheDocument();
    });

    describe('Search filters', () => {
        it('searches by free text on card titles', () => {
            render(<DeckBuilder />, { useRealDispatch: true });
            const searchBar = screen.getByTestId('Filters-FreeText');
            fireEvent.change(searchBar, { target: { value: 'star' } });
            expect(screen.queryByText(UnitCards.LANCER.name)).toBeNull();
            expect(
                screen.getByText(SpellCards.STARRY_ILLUSION.name)
            ).toBeInTheDocument();
        });

        it('searches by rules text on card titles', () => {
            render(<DeckBuilder />, { useRealDispatch: true });
            const searchBar = screen.getByTestId('Filters-FreeText');
            fireEvent.change(searchBar, { target: { value: 'Poison' } });
            expect(
                screen.queryByText(UnitCards.ASSASSIN.name)
            ).toBeInTheDocument();
            expect(
                screen.queryByText(SpellCards.STARRY_ILLUSION.name)
            ).toBeNull();
        });

        it.todo('searches by free text on rules text (case insensitive)');

        it('clears the free text search field', () => {
            render(<DeckBuilder />, { useRealDispatch: true });
            const searchBar = screen.getByTestId('Filters-FreeText');
            fireEvent.change(searchBar, { target: { value: 'star' } });
            fireEvent.click(screen.getByText('Clear'));
            expect(
                screen.queryByText(UnitCards.LANCER.name)
            ).toBeInTheDocument();
            expect(
                screen.getByText(SpellCards.STARRY_ILLUSION.name)
            ).toBeInTheDocument();
        });

        it('searches by colors (exactly)', () => {
            render(<DeckBuilder />, { useRealDispatch: true });

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

        it('searches by colors (strictly)', () => {
            render(<DeckBuilder />, { useRealDispatch: true });

            fireEvent.change(
                screen.getByTestId('Filters-ResourcesMatchStrategy'),
                {
                    target: {
                        value: MatchStrategy.STRICT,
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
            ).toBeInTheDocument();
            expect(
                screen.queryByText(AdvancedResourceCards.TANGLED_RUINS.name)
            ).toBeInTheDocument();
        });

        it('searches by colors (loosely)', () => {
            render(<DeckBuilder />, { useRealDispatch: true });

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
                screen.queryByText(UnitCards.DRAGON_MIST_WARRIOR.name)
            ).toBeInTheDocument();
            expect(
                screen.queryByText(AdvancedResourceCards.TANGLED_RUINS.name)
            ).toBeInTheDocument();
        });

        it('filters by unit type', () => {
            render(<DeckBuilder />, { useRealDispatch: true });

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
    });
});
