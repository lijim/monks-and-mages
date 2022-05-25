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

const TwoColumnGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
    .CardFrame {
        text-align: initial;
        color: inherit;
    }
    > div {
        padding: 12px;
        margin: 12px;
        background: ${Colors.MAROON};
        color: white;
        > p {
            text-align: initial;
        }
    }
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
                    <h3>Resources</h3>A deck should be composed of 18-22
                    resources typically, with some decks having less and others
                    more depending on whether the deck has a lot of expensive
                    cards (more resource cards needed) or a lot of cheap cards
                    (fewer resource cards needed). Players can deploy one
                    resource card per turn (hover the mouse on the bottom of
                    your screen to see details about your cards, including
                    resource cards) and do so by clicking on the highlighted
                    resource cards.
                    <br />
                    <br />
                    <TwoColumnGrid>
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
                    </TwoColumnGrid>
                    <h3>Casting spells and deploying units:</h3>
                    To deploy units or cast spells cards, you must first click
                    on resource cards on your side of the board to add to your
                    resource pool, which is displayed next to your avatar and
                    shows how much you have left to pay for cards.
                    <TwoColumnGrid>
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
                                for this, you could use 3 fire and 2 iron. or 4
                                iron and a fire. Or even 2 fire, an iron, and 2
                                water. As long as you have a fire ready, 2
                                irons, and 2 of anything else, you can pay for
                                it
                            </p>
                        </div>
                    </TwoColumnGrid>
                    <hr />
                    <TwoColumnGrid>
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
                                To pay for Ember Spear, you simply need to tap a
                                single resource for 🔥. After tapping for 🔥,
                                you can click the spell in your hand and point 3
                                damage in any direction (be careful not to fry
                                your own units unless you really know what
                                you're doing!)
                            </p>
                        </div>
                        <div>
                            This is a more advanced example of a spell:
                            <br />
                            <br />
                            <SpellGridItem
                                card={makeCard(SpellCards.SOLFATARA)}
                            />
                            <br />
                            <br />
                            <p>
                                Solfatara costs 3, 🔥, and 🌊. To pay for this
                                card, you need to have available: a single fire,
                                a single water, and 3 of anything else.
                                <br />
                                <br />
                                The effects will take place top to bottom. Some
                                (such as dealing 2 damage to yourself)
                                auto-resolve, so you have no control over these
                                effects. Other effects (like dealing 4 damage to
                                anything) will allow the active player to choose
                                a target on the board (or sometimes opposing
                                players)
                            </p>
                        </div>
                    </TwoColumnGrid>
                </p>
            </CenterColumn>
        </>
    );
};
