import { NUM_HINTS_STARTING_PER_PLAYER } from "./constants";
import { G, PlayerViewG } from "./types";

export const playerHasHintAvailable = (g: G | PlayerViewG, playerID: string) =>
  g.players[+playerID].hintsUsed < NUM_HINTS_STARTING_PER_PLAYER ||
  g.teamHints.available > 0;
