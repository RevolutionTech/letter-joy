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

const getActiveStackForOwner = (g: PlayerViewG, owner: CardOwner) => {
  if (owner.ownerType === OwnerType.TEAM) {
    return CardStack.SINGLE;
  } else if (owner.ownerType === OwnerType.NONPLAYER) {
    return CardStack.ARRAY;
  } else {
    return g.players[+owner.playerID].activeLetter.stack;
  }
};

const getActiveLetterIndexForOwner = (g: PlayerViewG, owner: CardOwner) => {
  if (owner.ownerType === OwnerType.PLAYER) {
    const activeLetter = g.players[+owner.playerID].activeLetter;
    if (activeLetter.stack === CardStack.SINGLE) {
      return 0;
    } else {
      return activeLetter.letterIndex;
    }
  } else {
    // TODO: Add support for team bonus letters
    return 0;
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
        const stack = getActiveStackForOwner(g, owner);
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
