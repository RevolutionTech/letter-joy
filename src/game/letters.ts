import _ from "lodash";

import { Letter } from "./types";

export const LETTER_DISTRIBUTION: Record<Letter, number> = {
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
  [Letter.WILD]: 0,
};
export const ZERO_LETTERS: Record<Letter, 0> = _.reduce(
  Letter,
  (result: Partial<Record<Letter, 0>>, value: Letter) => ({
    ...result,
    [value]: 0,
  }),
  {}
) as Record<Letter, 0>;

export const countLetters = (
  letters: Letter[],
  startingCount?: Record<Letter, number>,
  step?: number
) =>
  _.reduce(
    letters,
    (result, value) => {
      result[value] += step ?? 1;
      return result;
    },
    { ...(startingCount ?? ZERO_LETTERS) }
  );
