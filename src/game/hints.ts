import _ from "lodash";

import { NUM_HINTS_STARTING_PER_PLAYER } from "./constants";
import { G, PlayerViewG } from "./types";

export const playerHasHintAvailable = (g: G | PlayerViewG, playerID: string) =>
  g.players[+playerID].hintsUsed < NUM_HINTS_STARTING_PER_PLAYER ||
  g.teamHints.available > 0;

export const consumeHint = (g: G, playerID: string) => {
  const { players, teamHints } = g;
  const hintPlayer = players[+playerID];

  // Consume one of the team hints, if necessary
  if (hintPlayer.hintsUsed >= NUM_HINTS_STARTING_PER_PLAYER) {
    teamHints.available -= 1;
  }

  // Mark the player as having consumed an additional hint
  hintPlayer.hintsUsed += 1;

  // Potentially unlock new hints
  if (
    teamHints.locked > 0 &&
    _.every(g.players, (playerState) => playerState.hintsUsed > 0)
  ) {
    teamHints.available += teamHints.locked;
    teamHints.locked = 0;
  }

  // Apply updates to g
  g = { ...g, players, teamHints };
};