import _ from "lodash";
import { Ctx } from "boardgame.io";

import { LETTER_DISTRIBUTION } from "./constants";
import { Letter } from "./types";

export const createShuffledDeck = (ctx: Ctx) => {
  const unshuffledDeck = _.reduce(
    LETTER_DISTRIBUTION,
    (result: string[], value: number, key: string) => [
      ...result,
      ...Array(value).fill(key),
    ],
    []
  ) as Letter[];
  const shuffledDeck = ctx.random!.Shuffle(unshuffledDeck);
  return shuffledDeck;
};
