import _ from "lodash";
import { Ctx } from "boardgame.io";

import { G, PlayerViewG, PlayerState, PlayerViewPlayerState } from "./types";

const playerStatePlayerView = (
  playerState: PlayerState,
  playerViewPlayerID: string
): PlayerViewPlayerState => {
  const { playerID, playerName, letters, activeLetterIndex } = playerState;

  // Filter out all letters unless it is a different player's active card
  const lettersPlayerView = letters.map((letter, i) =>
    playerViewPlayerID === playerID || activeLetterIndex !== i ? null : letter
  );

  return {
    ...playerState,
    playerName:
      playerViewPlayerID === playerID ? `${playerName} (me)` : playerName,
    letters: lettersPlayerView,
  };
};

export const playerView = (g: G, ctx: Ctx, playerID: string): PlayerViewG => {
  const { players, teamHints } = g;
  return {
    players: _.reduce(
      players,
      (result, value, key) => ({
        ...result,
        [key]: playerStatePlayerView(value, playerID),
      }),
      {}
    ),
    teamHints,
  };
};
