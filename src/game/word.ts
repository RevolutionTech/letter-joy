import _ from "lodash";
import { Letter } from "./types";

export const isWordEqual = (a: string, b: string) => {
  const aUpper = _.toUpper(a);
  const bUpper = _.toUpper(b);
  return (
    aUpper.length === bUpper.length &&
    _.every(
      _.range(aUpper.length).map((i) => {
        const aLetter = aUpper[i];
        const bLetter = bUpper[i];

        const lettersAreEqual =
          aLetter === Letter.WILD ||
          bLetter === Letter.WILD ||
          aLetter === bLetter;
        return lettersAreEqual;
      })
    )
  );
};
