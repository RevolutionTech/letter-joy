import { FilteredMetadata } from "boardgame.io";

export type MaybePlayerNames = FilteredMetadata | undefined;

export const playerNameDisplay = (
  playerNames: MaybePlayerNames,
  playerID: number
) => playerNames?.[playerID].name ?? `Player ${playerID + 1}`;
