import _ from "lodash";
import { Game } from "boardgame.io";

import {
  MAX_NUM_PLAYERS,
  NUM_HINTS_LOCKED,
  NUM_HINTS_STARTING_AVAILABLE,
} from "./constants";
import { createDeckAndDeal } from "./deck";
import { PHASES } from "./phases";
import { playerView } from "./playerView";
import { Letter, G } from "./types";

export const LetterJoy: Game<G> = {
  setup: (ctx) => {
    const deckCuts = createDeckAndDeal(ctx, MAX_NUM_PLAYERS);

    const playerStates = deckCuts.map((startingLetters, i) => ({
      playerID: i.toString(),
      playerName: `Player ${i + 1}`,
      wordConstructionLetters: _.sortBy(startingLetters),
      letters: [],
      activeLetterIndex: 0,
      nextLetterIndex: 0,
      hintsUsed: 0,
    }));

    return {
      players: _.assign({}, playerStates),
      teamLetters: [Letter.WILD],
      teamHints: {
        available: NUM_HINTS_STARTING_AVAILABLE,
        locked: NUM_HINTS_LOCKED,
      },
      activeClue: null,
      previousClues: [],
      proposedClues: [],
    };
  },
  endIf: (g) =>
    _.every(
      g.players,
      (playerState) => playerState.playerOutcome?.isWord != null
    ),

  phases: PHASES,
  playerView,
};
