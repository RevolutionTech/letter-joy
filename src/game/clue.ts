import _ from "lodash";

import { Letter, Spelling } from "./types";

export const clueSummary = (teamLetters: Letter[], placement: Spelling) => {
  const usesWild = _.some(
    placement,
    (cardLocation) =>
      cardLocation.ownerID === "TEAM" &&
      teamLetters[cardLocation.letterIndex] === Letter.WILD
  );
  return {
    numLetters: placement.length,
    usesWild,
    numPlayers: Object.keys(_.groupBy(placement, "ownerID")).length - +usesWild,
  };
};
