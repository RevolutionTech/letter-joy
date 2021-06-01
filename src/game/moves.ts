import _ from "lodash";
import { Ctx } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";

import { clueSummary } from "./clue";
import { LETTERS_PER_PLAYER } from "./constants";
import { playerHasHintAvailable } from "./hints";
import { getLeftPlayerID } from "./players";
import { Letter, Spelling, G } from "./types";

export const chooseSecretWord = (g: G, ctx: Ctx, secretWord: Letter[]) => {
  // A player must be active to choose a secret word
  if (ctx.playerID == null) {
    return INVALID_MOVE;
  }

  // Update the letters of the player to the left using the secret word
  // that the active player generated
  const leftPlayerID = getLeftPlayerID(+ctx.playerID);
  g.players[leftPlayerID] = {
    ...g.players[leftPlayerID],
    letters: ctx.random!.Shuffle(secretWord),
  };

  // Move the active player into the waiting stage
  ctx.events?.endStage?.();
};

export const proposeClue = (g: G, ctx: Ctx, spelling: Spelling) => {
  // A player must be active and must have a hint available to propose the clue
  if (ctx.playerID == null || !playerHasHintAvailable(g, ctx.playerID)) {
    return INVALID_MOVE;
  }

  g.proposedClues.push({
    authorID: ctx.playerID,
    spelling,
    summary: clueSummary(g.teamLetters, spelling),
    votes: [],
  });
};

export const supportClue = (g: G, ctx: Ctx, clueIndex: number | null) => {
  // A player must be active to support a clue
  // and the clue being supported must be one of the ones displayed
  const activePlayer = ctx.playerID;
  if (
    activePlayer == null ||
    (clueIndex != null &&
      (clueIndex < 0 || clueIndex >= g.proposedClues.length))
  ) {
    return INVALID_MOVE;
  }

  // Clear the player's vote from all of the other proposed clues
  g.proposedClues.forEach((proposedClue, i) => {
    if (i !== clueIndex) {
      g.proposedClues[i] = {
        ...proposedClue,
        votes: _.without(proposedClue.votes, activePlayer),
      };
    }
  });

  // Add the player's vote to the provided clue
  if (clueIndex != null) {
    const proposedClue = g.proposedClues[clueIndex];
    g.proposedClues[clueIndex] = {
      ...proposedClue,
      votes: _.union(proposedClue.votes, [activePlayer]),
    };
  }
};

export const advanceLetter = (g: G, ctx: Ctx) => {
  // A player must be active to advance
  const activePlayer = ctx.playerID;
  if (activePlayer == null) {
    return INVALID_MOVE;
  }

  // A player cannot advance beyond their final letter
  const playerState = g.players[+activePlayer];
  const nextLetterIndex = playerState.activeLetterIndex + 1;
  if (nextLetterIndex >= LETTERS_PER_PLAYER) {
    return INVALID_MOVE;
  }

  // Update the letter that the player will have active next round
  g.players[+activePlayer] = {
    ...playerState,
    nextLetterIndex,
  };
};
