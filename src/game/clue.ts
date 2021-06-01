import _ from "lodash";

import { Spelling } from "./types";

export const clueSummary = (placement: Spelling) => {
  const usesWild = _.some(
    placement,
    (cardLocation) => cardLocation.ownerID === "TEAM"
  );
  return {
    numLetters: placement.length,
    usesWild,
    numPlayers: Object.keys(_.groupBy(placement, "ownerID")).length - +usesWild,
  };
};
