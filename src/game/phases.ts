import _ from "lodash";
import { PhaseConfig } from "boardgame.io";
import { TurnOrder } from "boardgame.io/core";

import { getUniqueOwners, createPreviousClue } from "./clue";
import { drawCard, drawFromDeck } from "./deck";
import { consumeHint } from "./hints";
import {
  chooseSecretWord,
  updateNote,
  proposeClue,
  removeClue,
  resetSupport,
  supportClue,
  supportEnd,
  advanceLetter,
  rearrangeLetters,
  confirmUnexpectedWord,
} from "./moves";
import { isEveryPlayerWaiting } from "./players";
import { OwnerType, CardStack, G } from "./types";

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
            removeClue,
            resetSupport,
            supportClue,
            supportEnd,
          },
        },
      },
    },
    onEnd: (g, ctx) => {
      const acceptedClue = _.find(
        g.proposedClues,
        (proposedClue) => proposedClue.votes.length === ctx.numPlayers
      );
      if (acceptedClue != null) {
        const activeClue = _.omit(acceptedClue, "votes");
        g.activeClue = activeClue;
        consumeHint(g, ctx, activeClue.authorID);
      }
      g.proposedClues = [];
    },
    endIf: (g, ctx) =>
      g.endGameVotes.length === ctx.numPlayers ||
      _.some(
        g.proposedClues,
        (proposedClue) => proposedClue.votes.length === ctx.numPlayers
      ),
    next: (g, ctx) =>
      g.endGameVotes.length === ctx.numPlayers
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
    onEnd: (g, ctx) => {
      // Determine the non-players in the most recent clue
      const nonPlayersInClue = getUniqueOwners(
        g.activeClue?.spelling ?? [],
        OwnerType.NONPLAYER,
        "nonPlayerIndex"
      );

      // Move the active clue to previous clues
      if (g.activeClue != null) {
        g.previousClues.push(
          createPreviousClue(g.team.bonus, g.nonPlayers, g.activeClue)
        );
        g.activeClue = null;
      }

      // Update active non-player letters based on those used
      g.nonPlayers = g.nonPlayers.map((nonPlayerLetters, i) => {
        if (nonPlayersInClue.includes(`${i}`)) {
          // Add previous letter to the discard
          const [previousLetter, newLetters] = drawCard(nonPlayerLetters);
          g.discardPile.push(previousLetter);

          if (newLetters.length === 0) {
            // Pull a new letter for this non-player from the deck
            const newLetter = drawFromDeck(g, ctx);
            return [newLetter];
          } else if (newLetters.length === 1) {
            // Add hint when we've advanced to the last non-player letter
            g.team.hints.available += 1;
          }

          return newLetters;
        } else {
          return nonPlayerLetters;
        }
      });

      // Update active player letters based on which letter
      // the player wants to advance to the next round
      g.players = _.mapValues(g.players, (playerState) => {
        if (
          playerState.requestAdvanceLetter &&
          playerState.activeLetter.stack === CardStack.ARRAY
        ) {
          const activeLetter = {
            stack: CardStack.ARRAY,
            letterIndex: playerState.activeLetter.letterIndex + 1,
          };
          return {
            ...playerState,
            activeLetter,
            requestAdvanceLetter: false,
          };
        } else {
          return playerState;
        }
      });
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
