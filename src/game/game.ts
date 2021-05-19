import _ from "lodash";
import { Ctx } from "boardgame.io";

import {
  LETTERS_PER_PLAYER,
  MAX_NUM_PLAYERS,
  NUM_HINTS_LOCKED,
  NUM_HINTS_STARTING_AVAILABLE,
} from "./constants";
import { createShuffledDeck } from "./deck";
import { PHASES } from "./phases";
import { playerView } from "./playerView";
import { G } from "./types";
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
      nextLetterIndex: 0,
      hintsUsed: 0,
    }));

    return {
      players: _.assign({}, playerStates),
      teamHints: {
        available: NUM_HINTS_STARTING_AVAILABLE,
        locked: NUM_HINTS_LOCKED,
      },
      activeClue: null,
      previousClues: [],
      proposedClues: [],
    };
  },

  phases: PHASES,
  playerView,
};
