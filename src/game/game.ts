import _ from "lodash";
import { Game } from "boardgame.io";

import {
  LETTER_JOY,
  LETTERS_PER_PLAYER,
  MIN_NUM_PLAYERS,
  MAX_NUM_PLAYERS,
  NUM_HINTS_LOCKED,
  NUM_HINTS_STARTING_AVAILABLE,
} from "./constants";
import {
  createDeck,
  shuffleCards,
  dealNonPlayerCards,
  dealCardsEvenly,
} from "./deck";
import { LETTER_DISTRIBUTION, countLetters } from "./letters";
import { PHASES } from "./phases";
import { isEveryPlayerWaiting } from "./players";
import { playerView } from "./playerView";
import { Letter, G } from "./types";

export const LetterJoy: Game<G> = {
  name: LETTER_JOY,
  setup: (ctx) => {
    const unshuffledDeck = createDeck(LETTER_DISTRIBUTION);
    const deck = shuffleCards(ctx, unshuffledDeck);
    const [nonPlayers, remainingDeck] = dealNonPlayerCards(
      deck,
      ctx.numPlayers
    );
    const playerDeckCuts = dealCardsEvenly(remainingDeck, ctx.numPlayers);

    const playerStates = playerDeckCuts.map((startingLetters, i) => ({
      playerID: i.toString(),
      wordConstructionLetters: countLetters(startingLetters),
      letters: [],
      activeLetterIndex: 0,
      nextLetterIndex: 0,
      letterNotes: _.range(LETTERS_PER_PLAYER).map(() =>
        _.mapValues(LETTER_DISTRIBUTION, () => false)
      ),
      hintsUsed: 0,
    }));

    return {
      players: _.assign({}, playerStates),
      nonPlayers,
      teamLetters: [Letter.WILD],
      teamHints: {
        available: NUM_HINTS_STARTING_AVAILABLE[ctx.numPlayers],
        locked: NUM_HINTS_LOCKED[ctx.numPlayers],
      },
      drawPile: [],
      discardPile: [],
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

  minPlayers: MIN_NUM_PLAYERS,
  maxPlayers: MAX_NUM_PLAYERS,
};
