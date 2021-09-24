import _ from "lodash";
import { Ctx } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";

import { clueSummary } from "./clue";
import { LETTERS_PER_PLAYER } from "./constants";
import { shuffleCards, dealCards } from "./deck";
import { playerHasHintAvailable } from "./hints";
import { getLeftPlayerID, getPlayersActing } from "./players";
import { Letter, Spelling, G } from "./types";
import { pullOnce } from "./utils";
import { isWordEqual } from "./word";

export const chooseSecretWord = (g: G, ctx: Ctx, secretWord: Letter[]) => {
  // A player must be active to choose a secret word
  const activePlayer = ctx.playerID;
  if (activePlayer == null) {
    return INVALID_MOVE;
  }

  // Update the letters of the player to the left using the secret word
  // that the active player generated
  const leftPlayerID = getLeftPlayerID(+activePlayer);
  g.players[leftPlayerID] = {
    ...g.players[leftPlayerID],
    letters: ctx.random!.Shuffle(secretWord),
  };

  // Move the active player into the waiting stage
  ctx.events?.endStage?.();

  // Distribute unused letters to the remaining players
  const otherActivePlayers = _.without(getPlayersActing(ctx), activePlayer);
  const unusedLetters = pullOnce(
    g.players[+activePlayer].wordConstructionLetters,
    secretWord
  );
  const deckCuts = dealCards(
    shuffleCards(ctx, unusedLetters),
    otherActivePlayers.length
  );
  otherActivePlayers.forEach((playerID, i) => {
    const prevWordConstructionLetters =
      g.players[+playerID].wordConstructionLetters;
    const wordConstructionLetters = _.sortBy([
      ...prevWordConstructionLetters,
      ...deckCuts[i],
    ]);
    g.players[+playerID] = {
      ...g.players[+playerID],
      wordConstructionLetters,
    };
  });

  // Reset the active player's letters available to create secret words
  g.players[+activePlayer] = {
    ...g.players[+activePlayer],
    wordConstructionLetters: [],
  };
};

export const proposeClue = (g: G, ctx: Ctx, spelling: Spelling) => {
  // A player must be active and must have a hint available to propose the clue
  if (ctx.playerID == null || !playerHasHintAvailable(g, ctx.playerID)) {
    return INVALID_MOVE;
  }

  g.proposedClues.push({
    authorID: ctx.playerID,
    spelling,
    summary: clueSummary(g.teamLetters, spelling),
    votes: [],
  });
};

export const resetSupport = (
  g: G,
  ctx: Ctx,
  resetEndSupport: boolean,
  activeClueIndex?: number
) => {
  // A player must be active to reset their support
  const activePlayer = ctx.playerID;
  if (activePlayer == null) {
    return INVALID_MOVE;
  }

  // Clear any support the player currently has,
  // aside from the clue with active support (if any)
  g.proposedClues.forEach((proposedClue, i) => {
    if (i !== activeClueIndex) {
      g.proposedClues[i] = {
        ...proposedClue,
        votes: _.without(proposedClue.votes, activePlayer),
      };
    }
  });

  // Possibly clear support for ending the game
  if (resetEndSupport) {
    g.endGameVotes = _.without(g.endGameVotes, activePlayer);
  }
};

export const supportClue = (g: G, ctx: Ctx, clueIndex: number) => {
  // A player must be active to support a clue
  // and the clue being supported must be one of the ones displayed
  const activePlayer = ctx.playerID;
  if (
    activePlayer == null ||
    clueIndex < 0 ||
    clueIndex >= g.proposedClues.length
  ) {
    return INVALID_MOVE;
  }

  // Clear the player's vote from all of the other proposed clues
  resetSupport(g, ctx, true, clueIndex);

  // Add the player's vote to the provided clue
  if (clueIndex != null) {
    const proposedClue = g.proposedClues[clueIndex];
    g.proposedClues[clueIndex] = {
      ...proposedClue,
      votes: _.union(proposedClue.votes, [activePlayer]),
    };
  }
};

export const supportEnd = (g: G, ctx: Ctx) => {
  // A player must be active to support ending the game
  const activePlayer = ctx.playerID;
  if (activePlayer == null) {
    return INVALID_MOVE;
  }

  // Clear the player's vote from any proposed clues
  resetSupport(g, ctx, false);

  // Add the player's vote to ending the game
  g.endGameVotes = _.union(g.endGameVotes, [activePlayer]);
};

export const advanceLetter = (g: G, ctx: Ctx) => {
  // A player must be active to advance
  const activePlayer = ctx.playerID;
  if (activePlayer == null) {
    return INVALID_MOVE;
  }

  // A player cannot advance beyond their final letter
  const playerState = g.players[+activePlayer];
  const nextLetterIndex = playerState.activeLetterIndex + 1;
  if (nextLetterIndex >= LETTERS_PER_PLAYER) {
    return INVALID_MOVE;
  }

  // Update the letter that the player will have active next round
  g.players[+activePlayer] = {
    ...playerState,
    nextLetterIndex,
  };
};

export const rearrangeLetters = (
  g: G,
  ctx: Ctx,
  spelling: Spelling,
  expectedWord: string
) => {
  // The player rearranging letters must be the active player
  if (ctx.playerID !== ctx.currentPlayer) {
    return INVALID_MOVE;
  }

  // Determine the word the user spelled
  const playerState = g.players[+ctx.currentPlayer];
  const spelledWord = spelling
    .map((cardLocation) =>
      cardLocation.ownerID === "TEAM"
        ? g.teamLetters[cardLocation.letterIndex]
        : playerState.letters[cardLocation.letterIndex]
    )
    .join("");

  // Assign the player outcome
  const isSpelledWordExpected = isWordEqual(expectedWord, spelledWord);
  g.players[+ctx.currentPlayer] = {
    ...playerState,
    playerOutcome: {
      expectedWord,
      spelledWord,
      // If the user didn't spell the word they expected,
      // we don't yet know if it's a word
      isWord: isSpelledWordExpected || undefined,
    },
  };

  // Remove any team letters that were used
  const indicesToRemove = spelling
    .filter((cardLocation) => cardLocation.ownerID === "TEAM")
    .map((cardLocation) => cardLocation.letterIndex);
  _.pullAt(g.teamLetters, indicesToRemove);

  // Determine the active player's next stage depending on
  // whether they spelled what they meant to or not
  if (isSpelledWordExpected) {
    ctx.events?.setStage?.("scoring");
    ctx.events?.endTurn?.();
  } else {
    ctx.events?.setStage?.("unexpectedWord");
  }
};

export const confirmUnexpectedWord = (g: G, ctx: Ctx, isWord: boolean) => {
  // The player confirming must be the active player and they must already have a player outcome
  if (ctx.playerID !== ctx.currentPlayer) {
    return INVALID_MOVE;
  }

  // The player must have a player outcome assigned
  const playerState = g.players[+ctx.currentPlayer];
  if (playerState.playerOutcome == null) {
    return INVALID_MOVE;
  }

  // Add the player's input on whether or not they have spelled a word
  g.players[+ctx.currentPlayer] = {
    ...playerState,
    playerOutcome: { ...playerState.playerOutcome, isWord },
  };

  // Move the active player into the scoring stage and end the turn
  ctx.events?.endStage?.();
  ctx.events?.endTurn?.();
};
