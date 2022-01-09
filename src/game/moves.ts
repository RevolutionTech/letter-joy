import _ from "lodash";
import { Ctx } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";

import { clueSummary } from "./clue";
import { LETTERS_PER_PLAYER } from "./constants";
import { createDeck, shuffleCards, dealCardsEvenly } from "./deck";
import { playerHasHintAvailable } from "./hints";
import { ZERO_LETTERS, countLetters } from "./letters";
import { getLeftPlayerID, getPlayersActing } from "./players";
import { Letter, OwnerType, Spelling, G } from "./types";
import { isWordEqual } from "./word";

export const chooseSecretWord = (g: G, ctx: Ctx, secretWord: Letter[]) => {
  // A player must be active to choose a secret word
  const activePlayer = ctx.playerID;
  if (activePlayer == null) {
    return INVALID_MOVE;
  }

  // Update the letters of the player to the left using the secret word
  // that the active player generated
  const leftPlayerID = getLeftPlayerID(ctx.numPlayers, +activePlayer);
  g.players[leftPlayerID] = {
    ...g.players[leftPlayerID],
    letters: ctx.random!.Shuffle(secretWord),
  };

  // Move the active player into the waiting stage
  ctx.events?.endStage?.();

  // Distribute unused letters to the remaining players
  const otherActivePlayers = _.without(getPlayersActing(ctx), activePlayer);
  const unusedLetterCounts = countLetters(
    secretWord,
    g.players[+activePlayer].wordConstructionLetters,
    -1
  );
  const unusedLetters = createDeck(unusedLetterCounts);
  const deckCuts = dealCardsEvenly(
    shuffleCards(ctx, unusedLetters),
    otherActivePlayers.length
  );
  otherActivePlayers.forEach((playerID, i) => {
    const wordConstructionLetters = countLetters(
      deckCuts[i],
      g.players[+playerID].wordConstructionLetters
    );
    g.players[+playerID] = {
      ...g.players[+playerID],
      wordConstructionLetters,
    };
  });

  // Reset the active player's letters available to create secret words
  g.players[+activePlayer] = {
    ...g.players[+activePlayer],
    wordConstructionLetters: { ...ZERO_LETTERS },
  };
  return;
};

export const updateNote = (
  g: G,
  ctx: Ctx,
  letterIndex: number,
  letter: Letter,
  isCandidate: boolean
) => {
  // A player must be active to update a note
  const activePlayer = ctx.playerID;
  if (activePlayer == null) {
    return INVALID_MOVE;
  }

  // Update the note
  g.players[+activePlayer].letterNotes[letterIndex][letter] = isCandidate;
  return;
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
  return;
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
  return;
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
  return;
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
  return;
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
  return;
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
    .map(
      (cardLocation) =>
        (cardLocation.owner.ownerType === OwnerType.TEAM
          ? g.teamLetters
          : playerState.letters)[cardLocation.letterIndex]
    )
    .join("");

  // Assign the player outcome
  const teamLettersUsed = spelling
    .filter((cardLocation) => cardLocation.owner.ownerType === OwnerType.TEAM)
    .map((cardLocation) => cardLocation.letterIndex);
  const isSpelledWordExpected = isWordEqual(expectedWord, spelledWord);
  g.players[+ctx.currentPlayer] = {
    ...playerState,
    playerOutcome: {
      spelledWord,
      expectedWord,
      teamLettersUsed,
      // If the user didn't spell the word they expected,
      // we don't yet know if it's a word
      isWord: isSpelledWordExpected || undefined,
    },
  };

  // Determine the active player's next stage depending on
  // whether they spelled what they meant to or not
  if (isSpelledWordExpected) {
    // Remove any team letters that were used
    _.pullAt(g.teamLetters, teamLettersUsed);

    // End turn and advance to scoring
    ctx.events?.setStage?.("scoring");
    ctx.events?.endTurn?.();
  } else {
    // Move to unexpected word stage
    ctx.events?.setStage?.("unexpectedWord");
  }
  return;
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

  // Remove any team letters that were used
  _.pullAt(g.teamLetters, playerState.playerOutcome.teamLettersUsed);

  // Move the active player into the scoring stage and end the turn
  ctx.events?.endStage?.();
  ctx.events?.endTurn?.();
  return;
};
