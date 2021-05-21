import _ from "lodash";
import { Ctx, PhaseConfig } from "boardgame.io";

import { MAX_NUM_PLAYERS } from "./constants";
import { consumeHint } from "./hints";
import {
  chooseSecretWord,
  proposeClue,
  supportClue,
  advanceLetter,
} from "./moves";
import { G } from "./types";

export enum Phase {
  CHOOSE_SECRET_WORD = "chooseSecretWord",
  CHOOSE_CLUE = "chooseClue",
  ACTIVE_CLUE = "activeClue",
}

export const getPlayersActing = (ctx: Ctx) =>
  Object.keys(_.pickBy(ctx.activePlayers, (stage) => stage !== "waiting"));

const isEveryPlayerWaiting = (_g: G, ctx: Ctx) =>
  ctx.activePlayers != null && getPlayersActing(ctx).length === 0;

export const PHASES: Record<Phase, PhaseConfig<G>> = {
  [Phase.CHOOSE_SECRET_WORD]: {
    start: true,
    turn: {
      activePlayers: { all: "chooseSecretWordMain" },
      stages: {
        chooseSecretWordMain: { moves: { chooseSecretWord }, next: "waiting" },
        waiting: {},
      },
    },
    endIf: isEveryPlayerWaiting,
    next: Phase.CHOOSE_CLUE,
  },
  [Phase.CHOOSE_CLUE]: {
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
    endIf: isEveryPlayerWaiting,
    next: Phase.CHOOSE_CLUE,
  },
};
