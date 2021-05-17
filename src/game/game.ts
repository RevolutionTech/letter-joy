import _ from "lodash";
import { Ctx } from "boardgame.io";

import {
  LETTERS_PER_PLAYER,
  MAX_NUM_PLAYERS,
  NUM_HINTS_LOCKED,
  NUM_HINTS_STARTING_AVAILABLE,
} from "./constants";
import { createShuffledDeck } from "./deck";
import { consumeHint } from "./hints";
import { proposeClue, supportClue, advanceLetter } from "./moves";
import { playerView } from "./playerView";
import { Phase, G } from "./types";
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

  phases: {
    [Phase.CHOOSE_CLUE]: {
      start: true,
      turn: {
        activePlayers: { all: "chooseClueMain" },
        stages: {
          chooseClueMain: {
            moves: {
              proposeClue,
              supportClue,
            },
          },
        },
      },
      onEnd: (g: G) => {
        const acceptedClue = _.find(
          g.proposedClues,
          (proposedClue) => proposedClue.votes.length === MAX_NUM_PLAYERS
        );
        const activeClue = _.omit(acceptedClue, "votes");
        g.activeClue = activeClue;
        g.proposedClues = [];
        consumeHint(g, activeClue.authorID);
      },
      endIf: (g: G) =>
        _.some(
          g.proposedClues,
          (proposedClue) => proposedClue.votes.length === MAX_NUM_PLAYERS
        ),
      next: Phase.ACTIVE_CLUE,
    },
    [Phase.ACTIVE_CLUE]: {
      turn: {
        activePlayers: { all: "deciding" },
        stages: {
          deciding: {
            moves: { advanceLetter },
            next: "waiting",
          },
          waiting: {},
        },
      },
      onEnd: (g: G) => {
        // Move the active clue to previous clues
        if (g.activeClue != null) {
          g.previousClues.push(g.activeClue);
          g.activeClue = null;
        }

        // Update active letters based on which letter
        // the player wants to advance to the next round
        g.players = _.mapValues(g.players, (playerState) => ({
          ...playerState,
          activeLetterIndex: playerState.nextLetterIndex,
        }));
      },
      endIf: (g: G, ctx: Ctx) =>
        ctx.activePlayers != null &&
        _.every(
          Object.values(ctx.activePlayers),
          (stage) => stage === "waiting"
        ),
      next: Phase.CHOOSE_CLUE,
    },
  },

  playerView,
};
