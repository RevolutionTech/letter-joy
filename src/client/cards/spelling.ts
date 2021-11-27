import { useState, useCallback } from "react";
import _ from "lodash";

import { OwnerType, CardOwner, Spelling, PlayerViewG } from "../../game/types";
import { assertNever } from "../../game/utils";

const getActiveLetterIndexForOwner = (g: PlayerViewG, owner: CardOwner) => {
  const ownerType = owner.ownerType;
  switch (ownerType) {
    case OwnerType.TEAM:
      // TODO: Add support for multiple team letters
      return 0;
    case OwnerType.NONPLAYER:
      return g.nonPlayers[owner.nonPlayerIndex].activeLetterIndex;
    case OwnerType.PLAYER:
      return g.players[+owner.playerID].activeLetterIndex;
    default:
      return assertNever(ownerType);
  }
};

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
        const letterIndex = getActiveLetterIndexForOwner(g, owner);
        return [...cardLocations, { owner, letterIndex }];
      }),
    [g.players]
  );

  const clearSpelling = useCallback(() => setSpelling([]), []);

  return [spelling, addCardLocation, clearSpelling] as const;
};
