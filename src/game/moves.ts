import _ from "lodash";
import { Ctx } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";

import { ClueTokenPlacement, G } from "./types";

export const proposeClue = (g: G, ctx: Ctx, placement: ClueTokenPlacement) => {
  // A player must be active to propose the clue
  if (ctx.playerID == null) {
    return INVALID_MOVE;
  }

  g.proposedClues.push({
    authorID: ctx.playerID,
    placement,
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
