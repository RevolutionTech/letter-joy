import { FilteredMetadata } from "boardgame.io";

import { getRightPlayerID } from "../../game/players";
import { PlayerViewG } from "../../game/types";
import { cycleArray } from "../../game/utils";

export type MaybePlayerNames = FilteredMetadata | undefined;

export const playerNameDisplay = (
  playerNames: MaybePlayerNames,
  playerID: number
) => playerNames?.[playerID].name ?? `Player ${playerID + 1}`;

export const getOrderedPlayers = (
  g: PlayerViewG,
  currentPlayer: string | null
) => {
  const playerStates = Object.values(g.players);
  const rightPlayerID =
    currentPlayer == null
      ? 0
      : getRightPlayerID(playerStates.length, +currentPlayer);
  const orderedPlayers = cycleArray(playerStates, rightPlayerID);
  return orderedPlayers;
};
