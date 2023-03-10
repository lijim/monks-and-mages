import { SpellCards } from '@/cardDb/spells';
import { ALL_CARDS, SORCERORS_DECKLIST } from '@/constants/deckLists';
import { PlayerConstants } from '@/constants/gameConstants';
import { makeResourceCard } from '@/factories/cards';
import { Format } from '@/types/games';
import { Resource } from '@/types/resources';
import { isDeckValidForFormat } from './isDeckValidForFormat';

describe('isDeckValidForFormat', () => {
    it('validates for standard', () => {
        expect(isDeckValidForFormat(SORCERORS_DECKLIST)).toEqual({
            isValid: true,
            reason: undefined,
        });
    });

    it('returns false when there are too many of a single card', () => {
        expect(
            isDeckValidForFormat(SORCERORS_DECKLIST, Format.SINGLETON)
        ).toEqual({
            isValid: false,
            reason: 'May have no more than 1 of [Spectral Genesis]',
        });
    });

    it('returns false when there are not enough cards', () => {
        expect(
            isDeckValidForFormat(
                [{ card: SpellCards.HOLY_REVIVAL, quantity: 1 }],
                Format.SINGLETON
            )
        ).toEqual({
            isValid: false,
            reason: 'Must have at least 60 cards in deck',
        });
    });

    it('returns false when there are too many cards', () => {
        expect(
            isDeckValidForFormat(
                [{ card: makeResourceCard(Resource.BAMBOO), quantity: 400 }],
                Format.SINGLETON
            )
        ).toEqual({
            isValid: false,
            reason: 'Must have at most 200 cards in deck',
        });
    });

    it('validates for singleton', () => {
        expect(
            isDeckValidForFormat(
                ALL_CARDS.slice(0, PlayerConstants.MAX_DECK_SIZE)
            )
        ).toEqual({
            isValid: true,
            reason: undefined,
        });
    });
});
