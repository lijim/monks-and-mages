import { Player } from '@/types/board';

export const recalculateLegendaryLeaderCost = (player: Player) => {
    player.legendaryLeader.cost.Generic = Math.max(
        0,
        (player.legendaryLeader.originalAttributes.cost.Generic || 0) +
            player.legendaryLeaderExtraCost
    );
};
