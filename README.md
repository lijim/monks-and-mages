# Monks and Mages

Monks and Mages is a trading card-style game inspired by [Heroes of Might and Magic](https://en.wikipedia.org/wiki/Heroes_of_Might_and_Magic) / [Magic the Gathering](https://en.wikipedia.org/wiki/Magic:_The_Gathering). The gameplay is similar to Magic, but with vastly simplified rules. Players build decks, then pit these decks against 1-3 other players. Cards are inspired from a mix of medieval and Chinese settings

To play, visit: https://www.monksandmages.com/

This game is a work in progress. If you find bugs, feel free to let me know on the issues section of this project

# Installation and Running

This game can be run locally if you have [node v16.x](https://nodejs.org/en/download/) and [yarn installed globally](https://yarnpkg.com/getting-started/install)

To get started:

```
yarn install
yarn dev
```

Go to `http://localhost:3000/` to see the game (and open it in multiple browser windows to simulate multiple players)

To see sockets.io debug screen:

```
open https://admin.socket.io/#/sockets while running the app
```

This project also strives for extensive TDD and unit testing. To run tests in watch mode:

```
yarn test
```

To run tests for a particular file:

```
yarn test src/server/gameEngine/gameEngine.spec.ts
```

To run tests once through:

```
yarn ci
```

Note: with the new auth0 and DB service integrations, you may need to contact me as a project owner for additional setup help

# Core technologies

This project runs on a few core technologies:

-   [styled components](https://styled-components.com/)
-   [express](https://expressjs.com/)
-   [typescript](https://www.typescriptlang.org/)
-   [webpack](https://webpack.js.org/)
-   [socket.io](https://socket.io/)
-   [React](https://reactjs.org/)
-   [React Redux](https://redux-toolkit.js.org/introduction/getting-started)
-   [React Router v6](https://reactrouter.com)

Linting on this project is done via a combination of typescript, [prettier](https://prettier.io/), and [eslint](https://eslint.org/)

Unit testing is covered via [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

# Gameplay

## Game rules

-   Players come with a deck of at least 60 cards
-   2-4 players can play against each other
-   7 cards to start, 1 card drawn per turn (unless starting player)
-   Players start with 20 life
-   Players lose when they either reach 0 or less life or attempt to draw from an empty deck
-   Cards come in 3 flavors: _Resources_, _Units_, and _Spells_
    -   **Resources** are the basis for paying for the other two types of cards. When a player deploys a resource card (one per turn can be deployed), they add that resource to their casting pool. This casting pool refills every turn.
        -   Casting costs are represented similarly to MtG. For instance, a lancer costs (🛠️), meaning a single iron can pay for one to be deployed onto the field
    -   **Units** have a cost, an attack, and a health pool. The health of a unit ticks down whenever it is attacked. The attack determines
        -   On a given turn, you can deploy as many units as you have space (max 6 units per player) and resources
        -   Units can attack once per turn (some have > 1 attack / turn), and cannot attack the turn they are deployed
        -   Units have 3 overarching types:
            -   Soldiers: Non-magical units must attack soldiers, if any are present on the board. Soldiers are the 'tanks' of the game
            -   Ranged: ranged units (including most magic units) can attack without getting 'hit back'
            -   Magical: magical units can attack any target, including the opponent directly, even if there are soldiers present
    -   **Spells** have an effect that is deployed immediately upon casting, such as:
        -   Ember Spear (🔥) deal 3 damage to any target
        -   A gentle gust (🔥)(🌊) buffs the team's stats by 1

## Game philosophy

-   the game has 5 resources with separate identities:

    -   Bamboo 🎋: resource generation, minor healing effects, buffing hp, ranged units and ranged damage spells
    -   Iron 🛠: soldiers, sturdy units, minor damage spells, buffing attack and hp
    -   Fire 🔥: direct damage, conjuration, curses (e.g. cursing an opponents' hand), buffing attack
    -   Water 🌊: drawing cards, conjuration, returning units to hands (bounce)
    -   Crystal 🔮: drawing cards (minor), resurrection, augmenting other forms of magic

-   Within the resources, we have 2 color combos that form unique sub-identities:
    -   Crystal + Water: Water (more water spells accessible)
    -   Crystal + Fire: Fire (more fire spells accessible)
    -   Crystal + Iron: Saharan - Drawing / discarding
    -   Crystal + Bamboo: Earth magic / primal / witchcraft (e.g. polymorph into frog)
    -   Water + Fire: Wind
    -   Water + Iron: Seafaring / pirates
    -   Water + Bamboo: Coral Magic
    -   Fire + Iron: Might and machinery (e.g. cannons, buff cards, damage-based boardwipes)
    -   Fire + Bamboo: Dragon raising / Phoenixes
    -   Bamboo + Iron: Ninjas / assassins

# Scripts

Normally, downloading images from pexels / unsplash, processing them to be 520px in width, converting them to avif is a very manual process that we do through tools like https://squoosh.app/

Luckily, we've written some scripts to help with this process.

For all the cards in cardDb, imgSrc is not used in the components, but rather in these scripts as part of the 'download -> compress' chain. The img src's for each card are actually calculated via `@/transformers/getImgSrcForCard`

To run these scripts:

```
yarn images
```

To get an image into assets/images:

0. Make sure to `brew install imagemagick`
1. add a new unit / spell / token card to `src/cardDb`
2. set that imgSrc to be a jpg image off the internet (starting with http)
3. run the scripts above ^
4. prosper!

Note: on occassion, some imageMagick conversions will rotate the image b/c of orientation. The camera may have originally recorded the picture in a different rotation, and imageMagick is trying to re-orient it:

https://legacy.imagemagick.org/discourse-server/viewtopic.php?t=33900

To fix this, I recommend taking a screenshot of the image and pushing it through https://squoosh.app - it's hacky, but it gets the job done.

Also in terms of dev tooling on Macs, the easiest way to inspect the generated avif's is actually through Github Desktop client.
