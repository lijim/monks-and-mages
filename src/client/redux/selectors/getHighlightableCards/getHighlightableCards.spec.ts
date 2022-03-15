import { makeNewBoard } from '@/factories/board';
import { makeCard } from '@/factories/cards';
import { UnitCards } from '@/mocks/units';
import { Board, Player } from '@/types/board';
import { Effect } from '@/types/cards';
import { EffectType, TargetTypes } from '@/types/effects';
import { RootState } from '../../store';
import { getHighlightableCards } from './getHighlightableCards';

describe('Get Highlightable Cards', () => {
    let state: Partial<RootState>;
    let board: Board;
    let tommy: Player;
    let timmy: Player;
    beforeEach(() => {
        board = makeNewBoard({
            playerNames: ['Tommy', 'Timmy'],
            startingPlayerIndex: 0,
        });
        [tommy, timmy] = board.players;
        state = {
            board,
            user: {
                name: 'Tommy',
            },
        };
    });

    it('returns nothing if you are not the active player', () => {
        const unit1 = makeCard(UnitCards.LANCER); // cannot attack
        const unit2 = makeCard(UnitCards.KNIGHT_TEMPLAR); // has quick, can attack
        tommy.units = [unit1, unit2];
        tommy.isActivePlayer = false;
        timmy.isActivePlayer = true;
        expect(getHighlightableCards(state)).toEqual([]);
    });

    describe('effect targets', () => {
        it('highlights nothing if a player is being targetted', () => {
            const effect: Effect = {
                type: EffectType.DEAL_DAMAGE,
                target: TargetTypes.PLAYER,
            };
            tommy.effectQueue = [effect];
            const unit1 = makeCard(UnitCards.LANCER); // cannot attack
            const unit2 = makeCard(UnitCards.KNIGHT_TEMPLAR); // has quick, can attack
            tommy.units = [unit1, unit2];

            expect(getHighlightableCards(state)).toEqual([]);
        });

        it('highlights own units', () => {
            const effect: Effect = {
                type: EffectType.DEAL_DAMAGE,
                target: TargetTypes.OWN_UNIT,
            };
            tommy.effectQueue = [effect];
            const unit1 = makeCard(UnitCards.LANCER); // cannot attack
            const unit2 = makeCard(UnitCards.KNIGHT_TEMPLAR); // has quick, can attack
            const unit3 = makeCard(UnitCards.LANCER); // cannot attack
            const unit4 = makeCard(UnitCards.KNIGHT_TEMPLAR); // has quick, can attack
            tommy.units = [unit1, unit2];
            timmy.units = [unit3, unit4];

            expect(getHighlightableCards(state)).toEqual([unit1.id, unit2.id]);
        });

        it("highlights other players' units", () => {
            const effect: Effect = {
                type: EffectType.DEAL_DAMAGE,
                target: TargetTypes.OPPOSING_UNIT,
            };
            tommy.effectQueue = [effect];
            const unit1 = makeCard(UnitCards.LANCER); // cannot attack
            const unit2 = makeCard(UnitCards.KNIGHT_TEMPLAR); // has quick, can attack
            const unit3 = makeCard(UnitCards.LANCER); // cannot attack
            const unit4 = makeCard(UnitCards.KNIGHT_TEMPLAR); // has quick, can attack
            tommy.units = [unit1, unit2];
            timmy.units = [unit3, unit4];

            expect(getHighlightableCards(state)).toEqual([unit3.id, unit4.id]);
        });

        it('highlights all units', () => {
            const effect: Effect = {
                type: EffectType.DEAL_DAMAGE,
            };
            tommy.effectQueue = [effect];
            const unit1 = makeCard(UnitCards.LANCER); // cannot attack
            const unit2 = makeCard(UnitCards.KNIGHT_TEMPLAR); // has quick, can attack
            const unit3 = makeCard(UnitCards.LANCER); // cannot attack
            const unit4 = makeCard(UnitCards.KNIGHT_TEMPLAR); // has quick, can attack
            tommy.units = [unit1, unit2];
            timmy.units = [unit3, unit4];

            expect(getHighlightableCards(state)).toEqual([
                unit1.id,
                unit2.id,
                unit3.id,
                unit4.id,
            ]);
        });

        it("highlights only alive players' units", () => {
            const effect: Effect = {
                type: EffectType.DEAL_DAMAGE,
            };
            tommy.effectQueue = [effect];
            timmy.isAlive = false;
            const unit1 = makeCard(UnitCards.LANCER); // cannot attack
            const unit2 = makeCard(UnitCards.KNIGHT_TEMPLAR); // has quick, can attack
            const unit3 = makeCard(UnitCards.LANCER); // cannot attack
            const unit4 = makeCard(UnitCards.KNIGHT_TEMPLAR); // has quick, can attack
            tommy.units = [unit1, unit2];
            timmy.units = [unit3, unit4];

            expect(getHighlightableCards(state)).toEqual([unit1.id, unit2.id]);
        });
    });

    describe('attackers', () => {
        it('highlights eligible attackers', () => {
            const unit1 = makeCard(UnitCards.LANCER); // cannot attack
            const unit2 = makeCard(UnitCards.KNIGHT_TEMPLAR); // has quick, can attack
            tommy.units = [unit1, unit2];
            expect(getHighlightableCards(state)).toEqual([unit2.id]);
        });
    });

    describe('defenders', () => {
        it('highlights eligible attack targets (magical - highlights all)', () => {
            const unit1 = makeCard(UnitCards.MAGICIANS_APPRENTICE);
            const unit2 = makeCard(UnitCards.LANCER);
            const unit3 = makeCard(UnitCards.LONGBOWMAN);

            tommy.units = [unit1];
            timmy.units = [unit2, unit3];
            state.clientSideGameExtras = { attackingUnit: unit1.id };
            expect(getHighlightableCards(state)).toEqual([unit2.id, unit3.id]);
        });

        it('highlights eligible attack targets (no soldiers)', () => {
            const unit1 = makeCard(UnitCards.LANCER);
            const unit2 = makeCard(UnitCards.LONGBOWMAN);
            const unit3 = makeCard(UnitCards.LONGBOWMAN);

            tommy.units = [unit1];
            timmy.units = [unit2, unit3];
            state.clientSideGameExtras = { attackingUnit: unit1.id };
            expect(getHighlightableCards(state)).toEqual([unit2.id, unit3.id]);
        });

        it('highlights eligible attack targets (soldiers tank damage first)', () => {
            const unit1 = makeCard(UnitCards.LANCER);
            const unit2 = makeCard(UnitCards.LANCER);
            const unit3 = makeCard(UnitCards.LONGBOWMAN);

            tommy.units = [unit1];
            timmy.units = [unit2, unit3];
            state.clientSideGameExtras = { attackingUnit: unit1.id };
            expect(getHighlightableCards(state)).toEqual([unit2.id]);
        });
    });
});
