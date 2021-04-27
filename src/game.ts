import _ from "lodash";
import { Ctx } from "boardgame.io";

import { Letter } from "./letters";
import { splitArray } from "./utils";

const LETTERS_PER_PLAYER = 5;
const MAX_NUM_PLAYERS = 6;
const LETTER_DISTRIBUTION: Record<Letter, number> = {
  [Letter.A]: 4,
  [Letter.B]: 2,
  [Letter.C]: 3,
  [Letter.D]: 3,
  [Letter.E]: 6,
  [Letter.F]: 2,
  [Letter.G]: 2,
  [Letter.H]: 3,
  [Letter.I]: 4,
  [Letter.K]: 2,
  [Letter.L]: 3,
  [Letter.M]: 2,
  [Letter.N]: 3,
  [Letter.O]: 4,
  [Letter.P]: 2,
  [Letter.R]: 4,
  [Letter.S]: 4,
  [Letter.T]: 4,
  [Letter.U]: 3,
  [Letter.W]: 2,
  [Letter.Y]: 2,
};
const NUM_HINTS_LOCKED = 1;
const NUM_HINTS_STARTING_AVAILABLE = 4;

const createShuffledDeck = (ctx: Ctx) => {
  const unshuffledDeck = _.reduce(
    LETTER_DISTRIBUTION,
    (result: string[], value: number, key: string) => [
      ...result,
      ...Array(value).fill(key),
    ],
    []
  ) as Letter[];
  const shuffledDeck = ctx.random!.Shuffle(unshuffledDeck);
  return shuffledDeck;
};

export interface PlayerState {
  playerID: string;
  playerName: string;
  letters: Letter[];
  hintsUsed: number;
}

export interface G {
  players: Record<number, PlayerState>;
  teamHints: { available: number; locked: number };
}

export const LetterJoy = {
  setup: (ctx: Ctx): G => {
    const deck = createShuffledDeck(ctx);
    const [dealtCards] = splitArray(deck, MAX_NUM_PLAYERS * LETTERS_PER_PLAYER);
    const playerLetters = _.chunk(dealtCards, LETTERS_PER_PLAYER);

    const playerStates = playerLetters.map((letters, i) => ({
      playerID: i.toString(),
      playerName: `Player ${i + 1}`,
      letters,
      hintsUsed: 0,
    }));

    return {
      players: _.assign({}, playerStates),
      teamHints: {
        available: NUM_HINTS_STARTING_AVAILABLE,
        locked: NUM_HINTS_LOCKED,
      },
    };
  },

  moves: {},
};
