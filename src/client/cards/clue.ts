import { useState, useCallback } from "react";
import _ from "lodash";

import {
  Letter,
  ClueTokenPlayerLocation,
  ClueTokenLocation,
  Clue,
  PlayerViewG,
} from "../../game/types";

export const getTokensAssignedToOwner = (clue: Clue, ownerID: string) =>
  _.range(clue.length)
    .filter((i) => clue[i].ownerID === ownerID)
    .map((i) => i + 1);

export const getClueDisplay = (g: PlayerViewG, clue: Clue) => {
  const letters = clue.map((clueTokenLocation) => {
    const { ownerID } = clueTokenLocation;
    if (ownerID === "TEAM") {
      return Letter.WILD;
    } else {
      // TODO: Surely there is a way to avoid this assertion
      const letterIndex = (clueTokenLocation as ClueTokenPlayerLocation)
        .letterIndex;
      // TODO: Perhaps keys in g.players should be strings so that we don't have to cast here
      const player = g.players[+ownerID];
      const letter = player.letters[letterIndex];
      return letter;
    }
  });
  return letters.join(" ");
};

export const useClue = (g: PlayerViewG) => {
  const [clue, setClue] = useState<Clue>([]);

  const addClueToken = useCallback(
    (ownerID: string) =>
      setClue((clue) => {
        const clueTokenLocation: ClueTokenLocation =
          ownerID === "TEAM"
            ? { ownerID }
            : { ownerID, letterIndex: g.players[+ownerID].activeLetterIndex };
        return [...clue, clueTokenLocation];
      }),
    [g.players]
  );

  const clearClue = useCallback(() => setClue([]), []);

  return [clue, addClueToken, clearClue] as const;
};
