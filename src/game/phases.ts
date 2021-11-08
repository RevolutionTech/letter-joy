import _ from "lodash";
import { PhaseConfig } from "boardgame.io";
import { TurnOrder } from "boardgame.io/core";

import { createPreviousClue } from "./clue";
import { MAX_NUM_PLAYERS } from "./constants";
import { consumeHint } from "./hints";
import {
  chooseSecretWord,
  updateNote,
  proposeClue,
  resetSupport,
  supportClue,
  supportEnd,
  advanceLetter,
  rearrangeLetters,
  confirmUnexpectedWord,
} from "./moves";
import { isEveryPlayerWaiting } from "./players";
import { G } from "./types";

export enum Phase {
  CHOOSE_SECRET_WORD = "chooseSecretWord",
  CHOOSE_CLUE = "chooseClue",
  ACTIVE_CLUE = "activeClue",
  REARRANGE_LETTERS = "rearrangeLetters",
}

export const PHASES: Record<Phase, PhaseConfig<G>> = {
  [Phase.CHOOSE_SECRET_WORD]: {
    start: true,
    turn: {
      activePlayers: { all: "chooseSecretWordMain" },
      stages: {
        chooseSecretWordMain: {
          moves: {
            chooseSecretWord: { move: chooseSecretWord, client: false },
          },
          next: "waiting",
        },
        waiting: {},
      },
    },
    endIf: (_, ctx) => isEveryPlayerWaiting(ctx),
    next: Phase.CHOOSE_CLUE,
  },
  [Phase.CHOOSE_CLUE]: {
    turn: {
      activePlayers: { all: "chooseClueMain" },
      stages: {
        chooseClueMain: {
          moves: {
            updateNote: { move: updateNote, client: false },
            proposeClue,
            resetSupport,
            supportClue,
            supportEnd,
          },
        },
      },
    },
    onEnd: (g) => {
      const acceptedClue = _.find(
        g.proposedClues,
        (proposedClue) => proposedClue.votes.length === MAX_NUM_PLAYERS
      );
      if (acceptedClue != null) {
        const activeClue = _.omit(acceptedClue, "votes");
        g.activeClue = activeClue;
        consumeHint(g, activeClue.authorID);
      }
      g.proposedClues = [];
    },
    endIf: (g) =>
      g.endGameVotes.length === MAX_NUM_PLAYERS ||
      _.some(
        g.proposedClues,
        (proposedClue) => proposedClue.votes.length === MAX_NUM_PLAYERS
      ),
    next: (g) =>
      g.endGameVotes.length === MAX_NUM_PLAYERS
        ? Phase.REARRANGE_LETTERS
        : Phase.ACTIVE_CLUE,
  },
  [Phase.ACTIVE_CLUE]: {
    turn: {
      activePlayers: { all: "deciding" },
      stages: {
        deciding: {
          moves: {
            updateNote: { move: updateNote, client: false },
            advanceLetter,
          },
          next: "waiting",
        },
        waiting: { moves: { updateNote: { move: updateNote, client: false } } },
      },
    },
    onEnd: (g) => {
      // Move the active clue to previous clues
      if (g.activeClue != null) {
        g.previousClues.push(createPreviousClue(g.teamLetters, g.activeClue));
        g.activeClue = null;
      }

      // Update active letters based on which letter
      // the player wants to advance to the next round
      g.players = _.mapValues(g.players, (playerState) => ({
        ...playerState,
        activeLetterIndex: playerState.nextLetterIndex,
      }));
    },
    endIf: (_, ctx) => isEveryPlayerWaiting(ctx),
    next: Phase.CHOOSE_CLUE,
  },
  [Phase.REARRANGE_LETTERS]: {
    turn: {
      order: TurnOrder.RESET,
      activePlayers: {
        currentPlayer: { stage: "rearrangeLettersMain" },
        others: { stage: "scoring" },
      },
      stages: {
        rearrangeLettersMain: {
          moves: {
            updateNote: { move: updateNote, client: false },
            rearrangeLetters,
          },
        },
        unexpectedWord: {
          moves: {
            updateNote: { move: updateNote, client: false },
            confirmUnexpectedWord,
          },
          next: "scoring",
        },
        scoring: { moves: { updateNote: { move: updateNote, client: false } } },
      },
    },
  },
};
