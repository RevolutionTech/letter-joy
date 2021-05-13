import { useState, useCallback } from "react";
import _ from "lodash";

import {
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
