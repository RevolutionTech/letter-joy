import _ from "lodash";

import { ClueTokenPlacement } from "./types";

export const clueSummary = (placement: ClueTokenPlacement) => {
  const usesWild = _.some(
    placement,
    (clueTokenLocation) => clueTokenLocation.ownerID === "TEAM"
  );
  return {
    numLetters: placement.length,
    usesWild,
    numPlayers: Object.keys(_.groupBy(placement, "ownerID")).length - +usesWild,
  };
};
