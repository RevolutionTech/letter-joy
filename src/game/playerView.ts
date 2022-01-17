import _ from "lodash";
import { Ctx } from "boardgame.io";

import { ZERO_LETTERS } from "./letters";
import { G, PlayerViewG, PlayerState, PlayerViewPlayerState } from "./types";

const playerStatePlayerView = (
  playerState: PlayerState,
  playerViewPlayerID: string | null
): PlayerViewPlayerState => {
  const {
    playerID,
    letters,
    activeLetterIndex,
    nextLetterIndex,
    hintsUsed,
    playerOutcome,
  } = playerState;

  // Filter out all letters unless it is a different player's active card
  // or it is the end of the game where the player has flipped over their cards
  const lettersPlayerView = letters.map((letter, i) =>
    playerOutcome == null &&
    (playerViewPlayerID === playerID || activeLetterIndex < i)
      ? null
      : letter
  );

  return {
    playerID,
    letters: lettersPlayerView,
    activeLetterIndex,
    nextLetterIndex,
    hintsUsed,
    playerOutcome,
  };
};

export const playerView = (
  g: G,
  _ctx: Ctx,
  playerID: string | null
): PlayerViewG => {
  const { players, nonPlayers, proposedClues } = g;
  return {
    ...g,
    wordConstructionLetters:
      playerID == null
        ? ZERO_LETTERS
        : g.players[+playerID].wordConstructionLetters,
    players: _.reduce(
      players,
      (result, value, key) => ({
        ...result,
        [key]: playerStatePlayerView(value, playerID),
      }),
      {}
    ),
    nonPlayers: nonPlayers.map((letters) => _.fill(letters, null, 1)),
    letterNotes: playerID == null ? [] : g.players[+playerID].letterNotes,
    proposedClues: proposedClues.map((proposedClue) => {
      const { authorID, spelling, summary, active, votes } = proposedClue;
      const maybeSpelling = authorID === playerID ? { spelling } : {};
      return { authorID, ...maybeSpelling, summary, active, votes };
    }),
  };
};
