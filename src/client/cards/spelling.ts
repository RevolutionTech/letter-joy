import { useState, useCallback } from "react";
import _ from "lodash";

import {
  OwnerType,
  CardOwner,
  CardStack,
  CardLocation,
  Spelling,
  PlayerViewG,
} from "../../game/types";
import { assertNever } from "../../game/utils";

const getActiveLetterIndexForOwner = (g: PlayerViewG, owner: CardOwner) => {
  const ownerType = owner.ownerType;
  switch (ownerType) {
    case OwnerType.TEAM: // TODO: Add support for team bonus letters
    case OwnerType.NONPLAYER:
      return 0;
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
        const stack =
          owner.ownerType === OwnerType.TEAM
            ? CardStack.SINGLE
            : CardStack.ARRAY;
        const newLocation = {
          owner,
          stack,
          ...(stack === CardStack.ARRAY
            ? { letterIndex: getActiveLetterIndexForOwner(g, owner) }
            : {}),
        } as CardLocation;
        return [...cardLocations, newLocation];
      }),
    [g.players]
  );

  const clearSpelling = useCallback(() => setSpelling([]), []);

  return [spelling, addCardLocation, clearSpelling] as const;
};
