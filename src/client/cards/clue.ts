import { useState, useCallback } from "react";
import _ from "lodash";

import { Letter, PlayerViewG } from "../../game/types";

type ClueTokens = Record<string, number[]>;

const getNumTokens = (clueTokens: ClueTokens) =>
  _.flatten(Object.values(clueTokens)).length;

const getActiveLetter = (g: PlayerViewG, ownerID: string) => {
  if (ownerID === "TEAM") {
    return Letter.WILD;
  } else {
    // TODO: Perhaps keys in g.players should be strings so that we don't have to cast here
    const player = g.players[+ownerID];
    const activeLetter = player.letters[player.activeLetterIndex];
    return activeLetter;
  }
};

export const getClueDisplay = (g: PlayerViewG, clueTokens: ClueTokens) => {
  const numTokens = getNumTokens(clueTokens);
  const clueDisplayArr = _.reduce(
    clueTokens,
    (result, value, key) => {
      const activeLetter = getActiveLetter(g, key);
      value.forEach((tokenNum) => {
        const resultIndex = tokenNum - 1;
        result[resultIndex] = activeLetter;
      });
      return result;
    },
    Array(numTokens).fill("")
  );
  return clueDisplayArr.join(" ");
};

export const useClueTokens = () => {
  const [clueTokens, setClueTokens] = useState<ClueTokens>({});

  const addClueToken = useCallback(
    (key: string) =>
      setClueTokens((clueTokens) => ({
        ...clueTokens,
        [key]: [...(clueTokens[key] ?? []), getNumTokens(clueTokens) + 1],
      })),
    []
  );
  const clearClueTokens = useCallback(() => setClueTokens({}), []);

  return [clueTokens, addClueToken, clearClueTokens] as const;
};
