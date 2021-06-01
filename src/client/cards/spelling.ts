import { useState, useCallback } from "react";
import _ from "lodash";

import { CardLocation, Spelling, PlayerViewG } from "../../game/types";

export const getCardLocationsAssignedToOwner = (
  spelling: Spelling,
  ownerID: string
) =>
  _.range(spelling.length)
    .filter((i) => spelling[i].ownerID === ownerID)
    .map((i) => i + 1);

export const useSpelling = (g: PlayerViewG) => {
  const [spelling, setSpelling] = useState<Spelling>([]);

  const addCardLocation = useCallback(
    (ownerID: string) =>
      setSpelling((cardLocations) => {
        // TODO: Add support for multiple team letters
        const cardLocation: CardLocation =
          ownerID === "TEAM"
            ? { ownerID, letterIndex: 0 }
            : { ownerID, letterIndex: g.players[+ownerID].activeLetterIndex };
        return [...cardLocations, cardLocation];
      }),
    [g.players]
  );

  const clearSpelling = useCallback(() => setSpelling([]), []);

  return [spelling, addCardLocation, clearSpelling] as const;
};
