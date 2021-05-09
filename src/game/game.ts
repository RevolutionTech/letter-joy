import _ from "lodash";
import { Ctx } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";

import {
  LETTERS_PER_PLAYER,
  MAX_NUM_PLAYERS,
  NUM_HINTS_LOCKED,
  NUM_HINTS_STARTING_AVAILABLE,
} from "./constants";
import { createShuffledDeck } from "./deck";
import { playerView } from "./playerView";
import { ClueTokenPlacement, G } from "./types";
import { splitArray } from "./utils";

export const LetterJoy = {
  setup: (ctx: Ctx): G => {
    const deck = createShuffledDeck(ctx);
    const [dealtCards] = splitArray(deck, MAX_NUM_PLAYERS * LETTERS_PER_PLAYER);
    const playerLetters = _.chunk(dealtCards, LETTERS_PER_PLAYER);

    const playerStates = playerLetters.map((letters, i) => ({
      playerID: i.toString(),
      playerName: `Player ${i + 1}`,
      letters,
      activeLetterIndex: 0,
      hintsUsed: 0,
    }));

    return {
      players: _.assign({}, playerStates),
      teamHints: {
        available: NUM_HINTS_STARTING_AVAILABLE,
        locked: NUM_HINTS_LOCKED,
      },
      proposedClues: [],
    };
  },

  moves: {
    proposeClue: (g: G, ctx: Ctx, placement: ClueTokenPlacement) => {
      g.proposedClues.push({
        authorID: ctx.currentPlayer,
        placement,
        votes: [],
      });
    },
    supportClue: (g: G, ctx: Ctx, clueIndex: number | null) => {
      // The clue being supported must be one of the ones displayed
      if (
        clueIndex != null &&
        (clueIndex < 0 || clueIndex >= g.proposedClues.length)
      ) {
        return INVALID_MOVE;
      }

      // Clear the player's vote from all of the other proposed clues
      g.proposedClues.forEach((proposedClue, i) => {
        if (i !== clueIndex) {
          g.proposedClues[i] = {
            ...proposedClue,
            votes: _.without(proposedClue.votes, ctx.currentPlayer),
          };
        }
      });

      // Add the player's vote to the provided clue
      if (clueIndex != null) {
        const proposedClue = g.proposedClues[clueIndex];
        g.proposedClues[clueIndex] = {
          ...proposedClue,
          votes: _.union(proposedClue.votes, [ctx.currentPlayer]),
        };
      }
    },
  },

  playerView,
};
