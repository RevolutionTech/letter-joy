import _ from "lodash";
import { Game } from "boardgame.io";

import {
  LETTERS_PER_PLAYER,
  NUM_HINTS_LOCKED,
  NUM_HINTS_STARTING_AVAILABLE,
} from "./constants";
import { createDeck, shuffleCards, dealCards } from "./deck";
import { LETTER_DISTRIBUTION, countLetters } from "./letters";
import { PHASES } from "./phases";
import { isEveryPlayerWaiting } from "./players";
import { playerView } from "./playerView";
import { Letter, G } from "./types";

export const LetterJoy: Game<G> = {
  name: "letter-joy",
  setup: (ctx) => {
    const unshuffledDeck = createDeck(LETTER_DISTRIBUTION);
    const deck = shuffleCards(ctx, unshuffledDeck);
    const deckCuts = dealCards(deck, ctx.numPlayers);

    const playerStates = deckCuts.map((startingLetters, i) => ({
      playerID: i.toString(),
      wordConstructionLetters: countLetters(startingLetters),
      letters: [],
      activeLetterIndex: 0,
      nextLetterIndex: 0,
      letterNotes: _.range(LETTERS_PER_PLAYER).map(() =>
        _.mapValues(LETTER_DISTRIBUTION, (quantity) => quantity > 0)
      ),
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
      endGameVotes: [],
    };
  },
  endIf: (g, ctx) =>
    _.every(
      g.players,
      (playerState) => playerState.playerOutcome?.isWord != null
    ) && isEveryPlayerWaiting(ctx),

  phases: PHASES,
  playerView,

  minPlayers: 6,
  maxPlayers: 6,
};
