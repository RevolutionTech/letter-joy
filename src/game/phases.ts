import _ from "lodash";
import { PhaseConfig } from "boardgame.io";

import { MAX_NUM_PLAYERS } from "./constants";
import { consumeHint } from "./hints";
import { proposeClue, supportClue, advanceLetter } from "./moves";
import { G } from "./types";

export enum Phase {
  CHOOSE_CLUE = "chooseClue",
  ACTIVE_CLUE = "activeClue",
}

export const PHASES: Record<Phase, PhaseConfig<G>> = {
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
    onEnd: (g) => {
      const acceptedClue = _.find(
        g.proposedClues,
        (proposedClue) => proposedClue.votes.length === MAX_NUM_PLAYERS
      );
      const activeClue = _.omit(acceptedClue, "votes");
      g.activeClue = activeClue;
      g.proposedClues = [];
      consumeHint(g, activeClue.authorID);
    },
    endIf: (g) =>
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
    onEnd: (g) => {
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
    endIf: (_g, ctx) =>
      ctx.activePlayers != null &&
      _.every(Object.values(ctx.activePlayers), (stage) => stage === "waiting"),
    next: Phase.CHOOSE_CLUE,
  },
};
