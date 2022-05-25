import { AdvancedResourceCards } from '@/cardDb/resources/advancedResources';
import { SpellCards } from '@/cardDb/spells';
import { UnitCards } from '@/cardDb/units';
import { Colors } from '@/constants/colors';
import { makeCard, makeResourceCard } from '@/factories/cards';
import { Resource } from '@/types/resources';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AdvancedResourceGridItem } from '../AdvancedResourceGridItem.tsx';
import { SecondaryColorButton } from '../Button';
import { ResourceCardGridItem } from '../ResourceCardGridItem';
import { SpellGridItem } from '../SpellGridItem';
import { UnitGridItem } from '../UnitGridItem';

const CenterColumn = styled.div`
    background: rgba(255, 255, 255, 0.95);
    display: grid;
    margin: 20px;
    padding-left: 30px;
    padding-right: 30px;
    overflow: auto;
`;

const ColumnGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    text-align: center;
    .CardFrame {
        text-align: initial;
        color: inherit;
    }
    > div {
        padding: 12px;
        margin: 12px;
        background: ${Colors.LIGHT_GREY};
        color: white;
        > p {
            text-align: initial;
        }
    }
`;

const AttackExample = styled.div`
    margin-top: 4px;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    place-items: center;
`;

export const InstructionsPage: React.FC = () => {
    return (
        <>
            <CenterColumn>
                <h1>
                    <Link to="/">
                        <SecondaryColorButton>Back</SecondaryColorButton>
                    </Link>
                    &nbsp; How to Play
                </h1>
            </CenterColumn>
            <CenterColumn>
                <p>
                    Monks and Mages is a TCG-style game heavily inspired by
                    Magic the Gathering, with a blend of unique mechanics.
                    <br />
                    <br />
                    Players construct 48-card decks, start at 20 life, and work
                    to win by being the last player standing. This game supports
                    2-4 players at once.
                    <br />
                    <br />
                    This is at its heart a turn-based card game. Players take
                    turns and can only do things on their turns.
                    <br />
                    <br />
                    On a given turn, a player can:
                    <ul>
                        <li>Deploy resources</li>
                        <li>Cast spells</li>
                        <li>Deploy units</li>
                        <li>Use units in combat</li>
                    </ul>
                    <h3>Resources</h3>A deck should be composed of 18-22
                    resources typically, with some decks having less and others
                    more depending on whether the deck has a lot of expensive
                    cards (more resource cards needed) or a lot of cheap cards
                    (fewer resource cards needed). Players can deploy one
                    resource card per turn. Simply click on the resource card of
                    your choice at the bottom of the screen when in-game
                    <br />
                    <br />
                    <ColumnGrid>
                        <div>
                            This is what a resource card looks like:
                            <br />
                            <br />
                            <ResourceCardGridItem
                                card={makeResourceCard(Resource.FIRE)}
                            />
                            <br />
                            <br />
                            <p>
                                Resource cards add 1 of that resource when used
                                and can be used once per turn once they're
                                deployed
                            </p>
                        </div>
                        <div>
                            This is what an advanced resource card looks like:
                            <br />
                            <br />
                            <AdvancedResourceGridItem
                                card={makeCard(
                                    AdvancedResourceCards.TANGLED_RUINS
                                )}
                            />
                            <br />
                            <br />
                            <p>
                                Advanced resource cards typically come with some
                                downside compared to playing a regular resource
                                card (such as entering already used, a.k.a
                                tapped). However, they can also provide upside
                                in the form of useful effects (such as healing
                                yourself) or being able to tap for different
                                kinds of resources
                            </p>
                        </div>
                    </ColumnGrid>
                    <h3>Casting Spells and Deploying Units:</h3>
                    To deploy units or cast spells cards, you must first click
                    on resource cards on your side of the board to add to your
                    resource pool, which is displayed next to your avatar and
                    shows how much you have left to pay for cards.
                    <ColumnGrid>
                        <div>
                            This is a lake zombie:
                            <br />
                            <br />
                            <UnitGridItem
                                card={makeCard(UnitCards.LAKE_ZOMBIE)}
                            />
                            <br />
                            <br />
                            <p>
                                The lake zombie costs exactly 1 🌊, so if you
                                have just a single 🌊 from a resource, you can
                                deploy it have
                            </p>
                        </div>
                        <div>
                            This is a cannon:
                            <br />
                            <br />
                            <UnitGridItem card={makeCard(UnitCards.CANNON)} />
                            <br />
                            <br />
                            <p>
                                The cannon costs 2, 🔥, and 2 🛠️ (iron). To pay
                                for this, you could use 3 🔥 and 2 🛠️. or 4 🛠️
                                and a 🔥. Or even 2 🔥, an 🛠️, and 2 🌊.
                                <br />
                                <br />
                                As long as you have a 🔥, 2 🛠️, and 2 of
                                anything else (5 in total), you can pay for it
                            </p>
                        </div>
                    </ColumnGrid>
                    <hr />
                    <ColumnGrid>
                        <div>
                            This is a spell card:
                            <br />
                            <br />
                            <SpellGridItem
                                card={makeCard(SpellCards.EMBER_SPEAR)}
                            />
                            <br />
                            <br />
                            <p>
                                The epitomy of simplicity. To pay for Ember
                                Spear, you simply need to tap a single resource
                                for 🔥. After tapping for 🔥, you can click the
                                spell in your hand and point 3 damage in any
                                direction (be careful not to fry your own units
                                unless you really know what you're doing!)
                            </p>
                        </div>
                        <div>
                            This is a more complicated spell:
                            <br />
                            <br />
                            <SpellGridItem
                                card={makeCard(SpellCards.SOLFATARA)}
                            />
                            <br />
                            <br />
                            <p>
                                Solfatara costs 3, 🔥, and 🌊. To pay for this
                                card, you need to have available: a single 🔥, a
                                single 🌊, and 3 of anything else (including
                                fire / water).
                                <br />
                                <br />
                                Effects will happen top-to-bottom style
                            </p>
                        </div>
                    </ColumnGrid>
                    <h3>Unit Combat:</h3>
                    Unit combat follows these rules:
                    <ul>
                        <li>
                            A unit gains the ability to attack the turn{' '}
                            <b>after</b> it is deployed. (unless it has quick,
                            in which case it can attack immediately)
                        </li>
                        <li>
                            Units can attack either other units or a player
                            directly.
                        </li>
                        <li>
                            Units apply their ⚔️ stat in combat (see the lower
                            left hand of the card). Their health 💙 determines
                            if they survive or go to the cemetery.
                        </li>
                        <li>
                            When a unit attacks another unit, the other unit
                            fights back (with some exceptions, see section below
                            on unit types)
                        </li>
                        <li>
                            Damage from combat and from spells persists over
                            turns, unlike in other games like Magic the
                            Gathering.
                        </li>
                    </ul>
                    <h3>Special Combat Rules - Unit Types:</h3>
                    Some units have a special property called a type:
                    <ColumnGrid>
                        <div>
                            Soldiers
                            <br />
                            <br />
                            <UnitGridItem card={makeCard(UnitCards.SQUIRE)} />
                            <br />
                            <br />
                            <p>
                                Soldiers tend to be a bit higher in health and
                                act like damage sponges in the game.
                                <br />
                                <br />
                                On defense, soldiers prevent non-magical units
                                from attacking anything except soldiers
                            </p>
                        </div>
                        <div>
                            Ranged
                            <br />
                            <br />
                            <UnitGridItem
                                card={makeCard(UnitCards.LONGBOWMAN)}
                            />
                            <br />
                            <br />
                            <p>
                                Ranged units are great attackers but typically
                                are lower in health and attack than their
                                soldier counterparts.
                                <br />
                                <br />
                                When attacking units that do not have magical or
                                ranged, ranged units do not suffer any damage
                                from the defender.
                            </p>
                        </div>
                        <div>
                            Magical
                            <br />
                            <br />
                            <UnitGridItem
                                card={makeCard(UnitCards.MAGICIANS_APPRENTICE)}
                            />
                            <br />
                            <br />
                            <p>
                                Magic Units typically have the most flavorful
                                effects compared to soldiers and ranged units,
                                but have the least stats of the three usually.
                                <br />
                                <br />
                                Magic units act like ranged units when it comes
                                to attacking and defending and are able to
                                ignore the 'soldier' rule where soldiers must be
                                attacked first
                            </p>
                        </div>
                    </ColumnGrid>
                    Let's see how a few of these types play out in various
                    scenarios
                    <ColumnGrid>
                        <div>
                            <AttackExample>
                                <UnitGridItem
                                    card={makeCard(UnitCards.LANCER)}
                                />
                                <div>attacks a</div>
                                <UnitGridItem
                                    card={makeCard(UnitCards.SAMBAR_DEER)}
                                />
                            </AttackExample>
                            <p>
                                Neither of these units have ranged. Both will
                                trade their damage and go to the cemetery
                            </p>
                        </div>
                        <div>
                            <AttackExample>
                                <UnitGridItem
                                    card={makeCard(UnitCards.LONGBOWMAN)}
                                />
                                <div>attacks a</div>
                                <UnitGridItem
                                    card={makeCard(UnitCards.JAVELINEER)}
                                />
                            </AttackExample>
                            <p>
                                Both of these units have ranged, so the
                                javelineer is able to return 2 damage back to
                                the longbowman. Both go to the cemetery
                            </p>
                        </div>
                    </ColumnGrid>
                    <ColumnGrid>
                        <div>
                            <AttackExample>
                                <UnitGridItem
                                    card={makeCard(UnitCards.INFANTRY_OFFICER)}
                                />
                                <div>attacks a</div>
                                <UnitGridItem
                                    card={makeCard(UnitCards.LONGBOWMAN)}
                                />
                            </AttackExample>
                            <p>
                                Despite the longbowman having ranged, the
                                infantry officer has the attack. Therefore, they
                                both apply their respective damages (1 and 3) to
                                each other and go to the cemetery after the
                                attack
                            </p>
                        </div>
                        <div>
                            <AttackExample>
                                <UnitGridItem
                                    card={makeCard(UnitCards.LONGBOWMAN)}
                                />
                                <div>attacks a</div>
                                <UnitGridItem
                                    card={makeCard(UnitCards.INFANTRY_OFFICER)}
                                />
                            </AttackExample>
                            <p>
                                The infantry officer does not have ranged, so
                                the longbowman cleanly wins the battle. The
                                longbowman sends the infantry officer to the
                                cemetery
                            </p>
                        </div>
                    </ColumnGrid>
                </p>
            </CenterColumn>
        </>
    );
};
