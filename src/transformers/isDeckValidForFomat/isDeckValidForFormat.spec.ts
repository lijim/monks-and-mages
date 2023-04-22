import { SpellCards } from '@/cardDb/spells';
import { ALL_CARDS, SORCERORS_DECKLIST } from '@/constants/deckLists';
import { PlayerConstants } from '@/constants/gameConstants';
import { makeCard, makeResourceCard } from '@/factories/cards';
import { Format } from '@/types/games';
import { Resource } from '@/types/resources';
import { isDeckValidForFormat } from './isDeckValidForFormat';
import { UnitCards } from '@/cardDb/units';

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
                {
                    mainBoard: [{ card: SpellCards.HOLY_REVIVAL, quantity: 1 }],
                    sideBoard: [],
                },
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
                {
                    mainBoard: [
                        {
                            card: makeResourceCard(Resource.BAMBOO),
                            quantity: 400,
                        },
                    ],
                    sideBoard: [],
                },
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
                {
                    mainBoard: ALL_CARDS.mainBoard.slice(
                        0,
                        PlayerConstants.MAX_DECK_SIZE
                    ),
                    sideBoard: [],
                },
                Format.SINGLETON
            )
        ).toEqual({
            isValid: true,
            reason: undefined,
        });
    });

    describe('legendary league validation', () => {
        it('validates for legendary league', () => {
            const mainBoard = [
                { card: makeCard(UnitCards.ALADDIN), quantity: 1 },
                { card: makeCard(UnitCards.ALERT_FELINE), quantity: 1 },
                { card: makeCard(UnitCards.BABA_YAGA), quantity: 1 },
                { card: makeCard(SpellCards.SMOLDER), quantity: 1 },
                { card: makeResourceCard(Resource.FIRE), quantity: 56 },
            ];
            expect(
                isDeckValidForFormat(
                    {
                        mainBoard,
                        sideBoard: [],
                    },
                    Format.LEGENDARY_LEAGUE
                )
            ).toEqual({
                isValid: true,
                reason: undefined,
            });
        });

        it('is invalid if there are two legendaries', () => {
            const mainBoard = [
                { card: makeCard(UnitCards.ALADDIN), quantity: 1 },
                { card: makeCard(UnitCards.ANUBIS_GOD_OF_DEATH), quantity: 1 },
                { card: makeCard(UnitCards.BABA_YAGA), quantity: 1 },
                { card: makeCard(SpellCards.SMOLDER), quantity: 1 },
                { card: makeResourceCard(Resource.FIRE), quantity: 56 },
            ];
            expect(
                isDeckValidForFormat(
                    {
                        mainBoard,
                        sideBoard: [],
                    },
                    Format.LEGENDARY_LEAGUE
                )
            ).toEqual({
                isValid: false,
                reason: 'Must have exactly 1 legendary unit as your leader',
            });
        });

        it('is invalid if there are cards not fitting the resource theme', () => {
            const mainBoard = [
                { card: makeCard(UnitCards.ALADDIN), quantity: 1 },
                { card: makeCard(UnitCards.ALERT_FELINE), quantity: 1 },
                { card: makeCard(UnitCards.BABA_YAGA), quantity: 1 },
                { card: makeCard(SpellCards.ARCHERY_AT_SUNSET), quantity: 1 },
                { card: makeResourceCard(Resource.FIRE), quantity: 56 },
            ];
            expect(
                isDeckValidForFormat(
                    {
                        mainBoard,
                        sideBoard: [],
                    },
                    Format.LEGENDARY_LEAGUE
                )
            ).toEqual({
                isValid: false,
                reason: 'Every card must match the color identify of your legendary leader',
            });
        });
    });
});
