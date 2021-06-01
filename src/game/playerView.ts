import _ from "lodash";
import { Ctx } from "boardgame.io";

import { G, PlayerViewG, PlayerState, PlayerViewPlayerState } from "./types";

const playerStatePlayerView = (
  playerState: PlayerState,
  playerViewPlayerID: string
): PlayerViewPlayerState => {
  const {
    playerID,
    playerName,
    letters,
    activeLetterIndex,
    nextLetterIndex,
    hintsUsed,
  } = playerState;

  // Filter out all letters unless it is a different player's active card
  const lettersPlayerView = letters.map((letter, i) =>
    playerViewPlayerID === playerID || activeLetterIndex < i ? null : letter
  );

  return {
    playerID,
    playerName:
      playerViewPlayerID === playerID ? `${playerName} (me)` : playerName,
    letters: lettersPlayerView,
    activeLetterIndex,
    nextLetterIndex,
    hintsUsed,
  };
};

export const playerView = (g: G, ctx: Ctx, playerID: string): PlayerViewG => {
  const { players, proposedClues } = g;
  return {
    ...g,
    wordConstructionLetters: g.players[+playerID].wordConstructionLetters,
    players: _.reduce(
      players,
      (result, value, key) => ({
        ...result,
        [key]: playerStatePlayerView(value, playerID),
      }),
      {}
    ),
    proposedClues: proposedClues.map((proposedClue) => {
      const { authorID, spelling, summary, votes } = proposedClue;
      const maybeSpelling = authorID === playerID ? { spelling } : {};
      return { authorID, ...maybeSpelling, summary, votes };
    }),
  };
};
