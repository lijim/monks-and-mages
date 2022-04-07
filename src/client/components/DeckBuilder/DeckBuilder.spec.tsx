import React from 'react';
import { fireEvent, render, screen, within } from '@/test-utils';
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
    it.todo('exports the decklist');
    it.todo('imports a decklist');
    it.todo('displays errors for importing a malformed decklist');
});
