import { useState, useCallback } from "react";
import _ from "lodash";

import {
  Letter,
  ClueTokenPlayerLocation,
  ClueTokenLocation,
  ClueTokenPlacement,
  PlayerViewG,
} from "../../game/types";

export const getTokensAssignedToOwner = (
  tokenPlacement: ClueTokenPlacement,
  ownerID: string
) =>
  _.range(tokenPlacement.length)
    .filter((i) => tokenPlacement[i].ownerID === ownerID)
    .map((i) => i + 1);

export const getClueDisplay = (
  g: PlayerViewG,
  tokenPlacement: ClueTokenPlacement
) => {
  const letters = tokenPlacement.map((clueTokenLocation) => {
    const { ownerID } = clueTokenLocation;
    if (ownerID === "TEAM") {
      return Letter.WILD;
    } else {
      // TODO: Surely there is a way to avoid this assertion
      const letterIndex = (clueTokenLocation as ClueTokenPlayerLocation)
        .letterIndex;
      const player = g.players[+ownerID];
      // TODO: Use subscript for unknown letters to mark the index
      const letter = player.letters[letterIndex] ?? "?";
      return letter;
    }
  });
  return letters.join(" ");
};

export const useClueTokenPlacement = (g: PlayerViewG) => {
  const [
    clueTokenPlacement,
    setClueTokenPlacement,
  ] = useState<ClueTokenPlacement>([]);

  const addClueToken = useCallback(
    (ownerID: string) =>
      setClueTokenPlacement((tokenPlacement) => {
        const clueTokenLocation: ClueTokenLocation =
          ownerID === "TEAM"
            ? { ownerID }
            : { ownerID, letterIndex: g.players[+ownerID].activeLetterIndex };
        return [...tokenPlacement, clueTokenLocation];
      }),
    [g.players]
  );

  const clearClueTokenPlacement = useCallback(
    () => setClueTokenPlacement([]),
    []
  );

  return [clueTokenPlacement, addClueToken, clearClueTokenPlacement] as const;
};
