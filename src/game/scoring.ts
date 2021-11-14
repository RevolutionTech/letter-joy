import _ from "lodash";
import { LETTERS_PER_PLAYER } from "./constants";
import { PlayerOutcome } from "./types";
import { numLettersEqual } from "./word";

const POINTS_PER_LETTER_ORIGINAL = 5;
const POINTS_PER_LETTER_ADDITIONAL = 1;
const POINTS_PER_LETTER_MISPELLING = 1;
const POINTS_PER_UNUSED_HINT = 1;
const POINTS_PER_PLAYER_PER_STAR = 4;
export const MAX_NUM_STARS = 5;

export const playerScore = (
  playerOutcome: PlayerOutcome,
  unusedHints: number
): number => {
  const spelledWordLength = playerOutcome.spelledWord.length;
  const numAdditionalLetters = spelledWordLength - LETTERS_PER_PLAYER;
  const pointsFromWord = playerOutcome.isWord
    ? spelledWordLength * POINTS_PER_LETTER_ORIGINAL +
      numAdditionalLetters * POINTS_PER_LETTER_ADDITIONAL
    : numLettersEqual(playerOutcome.spelledWord, playerOutcome.expectedWord) *
      POINTS_PER_LETTER_MISPELLING;
  const pointsFromUnusedHints = unusedHints * POINTS_PER_UNUSED_HINT;
  return pointsFromWord + pointsFromUnusedHints;
};

export const totalScore = (
  playerOutcomes: PlayerOutcome[],
  unusedHints: number
): number =>
  _.sum(
    playerOutcomes.map((playerOutcome) =>
      playerScore(playerOutcome, unusedHints)
    )
  );

export const totalStars = (score: number, numPlayers: number): number =>
  _.min([
    _.floor(score / (POINTS_PER_PLAYER_PER_STAR * numPlayers)),
    MAX_NUM_STARS,
  ]) ?? 0;
