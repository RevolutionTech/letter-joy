import _ from "lodash";
import { Game } from "boardgame.io";

import { ZERO_LETTERS } from "./letters";
import {
  G,
  PlayerViewG,
  PlayerState,
  PlayerViewPlayerState,
  CardStack,
} from "./types";

const playerStatePlayerView = (
  playerState: PlayerState,
  playerViewPlayerID: string | null
): PlayerViewPlayerState => {
  const {
    playerID,
    letters,
    bonusLetter,
    activeLetter,
    requestAdvanceLetter,
    hintsUsed,
    playerOutcome,
  } = playerState;

  // Filter out all letters unless it is a different player's active card
  // or it is the end of the game where the player has flipped over their cards
  const lettersPlayerView = letters.map((letter, i) =>
    playerOutcome == null &&
    (playerViewPlayerID === playerID ||
      (activeLetter.stack === CardStack.ARRAY && activeLetter.letterIndex < i))
      ? null
      : letter
  );

  return {
    playerID,
    letters: lettersPlayerView,
    activeLetter,
    bonusLetter: playerViewPlayerID === playerID ? null : bonusLetter,
    requestAdvanceLetter,
    hintsUsed,
    playerOutcome,
  };
};

export const playerView: Game<G>["playerView"] = ({
  G: g,
  playerID,
}): PlayerViewG => {
  const { players, nonPlayers, proposedClues } = g;
  return {
    ..._.omit(g, "drawPile"),
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
