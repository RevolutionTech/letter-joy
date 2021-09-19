import _ from "lodash";
import { Letter } from "./types";

export const displayWord = (word: string) => Array.from(word).join(" ");

const isLetterEqual = (aLetter: Letter, bLetter: Letter) =>
  aLetter === Letter.WILD || bLetter === Letter.WILD || aLetter === bLetter;

export const numLettersEqual = (a: string, b: string) => {
  if (a.length !== b.length) {
    throw new Error(
      "Cannot compare number of equal letters to words of different length."
    );
  }

  const aUpper = _.toUpper(a);
  const bUpper = _.toUpper(b);
  return _.sum(
    _.range(aUpper.length).map((i) => {
      const aLetter = aUpper[i] as Letter;
      const bLetter = bUpper[i] as Letter;
      return isLetterEqual(aLetter, bLetter);
    })
  );
};

export const isWordEqual = (a: string, b: string) =>
  a.length === b.length && numLettersEqual(a, b) === a.length;
