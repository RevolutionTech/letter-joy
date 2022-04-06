// Static constants
export const LETTER_JOY = "letter-joy";
export const LETTERS_PER_PLAYER = 5;
export const MIN_NUM_PLAYERS = 2;
export const MAX_NUM_PLAYERS = 6;
export const MIN_NUM_LETTERS_NON_PLAYER = 7;

// Constants dependent on the number of players
export const NUM_HINTS_STARTING_PER_PLAYER: Record<number, number> = {
  2: 3,
  3: 2,
  4: 1,
  5: 1,
  6: 1,
};
export const NUM_HINTS_LOCKED: Record<number, number> = {
  2: 3,
  3: 3,
  4: 1,
  5: 1,
  6: 1,
};
export const NUM_HINTS_STARTING_AVAILABLE: Record<number, number> = {
  2: 2,
  3: 2,
  4: 6,
  5: 5,
  6: 4,
};
