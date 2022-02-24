# Spirit Animals

[MIRO design link](https://miro.com/app/board/uXjVOPh75D8=/?invite_link_id=218874507880)

Spirit Animals is a browser-based auto-battler with inspirations from Team-Fight Tactics but also from card games, e.g. Magic the Gathering. Characters in the game are based on animals, e.g. monkeys throwing poop, puppies, and crocodiles.

Spirit Animals differs from other auto-battlers in that battles are deterministic, as is the economy.

This game will also support even numbers of players, e.g. 2,4,6, and 8 person pods

# Resources:

-   ✚ Health - every player starts with a health pool of 30. Each battle they lose the total amount of levels of remaining units
-   🕐 Round - each round has a buy/setup phase, and a battle phase
-   ⚜️ Level - players start at level 1
-   🃏 Cards - different types of cards, including equipment, units, and territory.

Equipment - modifies the unit

Units - each unit is a card that can fight for the player. Players start out with 3 card slots available, but can expand up to 5 cards (+1 per level)

Territory - modifies unit, needed in order to place a unit

Cards can appear in several places:

-   on the battlefield
-   in the player’s hand
-   in the global library
-   💰 Gold - Used to buy cards between rounds

# **Buy Phase**

The buy phase will allow players to purchase cards with gold. Each phase will show (5 / 7 / 9) cards at a time depending on level.

Players can also:

Re-deal (2 gold) - up to 3 times per round. Will pull from a player’s preconfigured stack (the global library resets each round and deals out stacks for each player)

Level up (25 gold, 40 gold)

# **Economy**

Players start with 10 gold

Players earn:

-   10 gold per win (rounds 1-10), 20 gold per win (rounds 11+)
-   9 gold per tie (rounds 1-10) 18 gold per tie (rounds 11+)
-   8 gold per loss (rounds 1-10), 16 gold per win (rounds 11+)

Passive income

-   1 gold per 10 gold

**Cards cost**

|         | Creature | Equip | Land |
| ------- | -------- | ----- | ---- |
| Level 1 | 4g       | 1g    | 2g   |
| Level 2 | 7g       | 4g    | 6g   |
| Level 3 | 15g      | 7g    | 12g  |

Cards can also be sold for 1 gold (can’t sell territory cards if there are only 3)

# **Units + Modifiers**

-   **Health**
-   **Genus** (Insect, Mammal, Sea Animal)
-   **Attack** (attack per round)
-   **Defense** (reduces attack taken per round, to a minimum of 1)
-   **Attack type** (ranged / melee / magic)
-   **Teamwork** (boosts health / attack of genus-mates)
-   **Impervious** resurrects once per round
-   **Sturdy** can’t be brought from max health to 0
-   **Rage** builds attack with each hit
-   **Priority** -1, 0 or 1. 1 is “first hit”
-   **Matriarch** when brought down, the matriarch triggers an event where a random lower level unit in the hand will replace it (of the same genus)

# **Running Locally**

1. Run `yarn install`
1. Run `yarn start`
1. Visit localhost:3000
