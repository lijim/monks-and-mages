import React from 'react';
import { push } from 'redux-first-history';
import { act, fireEvent, render, screen, within } from '@/test-utils';
import { DeckBuilder } from './DeckBuilder';

describe('DeckBuilder', () => {
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

        fireEvent.click(screen.getByText('Copy decklist to clipboard'));

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

        fireEvent.click(screen.getByText('Import decklist from clipboard'));

        expect(await within(myDeck).findByText('Lancer')).toBeInTheDocument();
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

        fireEvent.click(screen.getByText('Import decklist from clipboard'));
        expect(await within(myDeck).findByText('Lancer')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Submit Decklist'));
        expect(webSocket.chooseCustomDeck).toHaveBeenCalledWith([
            { card: 'Iron', quantity: 44 },
            { card: 'Lancer', quantity: 4 },
        ]);
        expect(dispatch).toHaveBeenCalledWith(push('/'));
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

        fireEvent.click(screen.getByText('Import decklist from clipboard'));
        expect(await within(myDeck).findByText('Lancer')).toBeInTheDocument();

        expect(screen.getByText('Submit Decklist')).toBeDisabled();
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
    it.todo('errors for not enough cards in a deck');
});
