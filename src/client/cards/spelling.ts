import { useState, useCallback } from "react";
import _ from "lodash";

import { OwnerType, CardOwner, Spelling, PlayerViewG } from "../../game/types";

export const getCardLocationsAssignedToOwner = (
  spelling: Spelling,
  owner: CardOwner
) =>
  _.range(spelling.length)
    .filter((i) => _.isEqual(spelling[i].owner, owner))
    .map((i) => i + 1);

export const useSpelling = (g: PlayerViewG) => {
  const [spelling, setSpelling] = useState<Spelling>([]);

  const addCardLocation = useCallback(
    (owner: CardOwner) =>
      setSpelling((cardLocations) => {
        // TODO: Add support for multiple team letters
        const letterIndex =
          owner.ownerType === OwnerType.TEAM
            ? 0
            : g.players[+owner.playerID].activeLetterIndex;
        return [...cardLocations, { owner, letterIndex }];
      }),
    [g.players]
  );

  const clearSpelling = useCallback(() => setSpelling([]), []);

  return [spelling, addCardLocation, clearSpelling] as const;
};
