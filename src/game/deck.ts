import _ from "lodash";
import { Ctx } from "boardgame.io";

import { LETTER_DISTRIBUTION } from "./constants";
import { Letter } from "./types";

export const createDeck = (): Letter[] =>
  _.reduce(
    LETTER_DISTRIBUTION,
    (result: string[], value: number, key: string) => [
      ...result,
      ...Array(value).fill(key),
    ],
    []
  ) as Letter[];

export const shuffleCards = (ctx: Ctx, deck: Letter[]) =>
  ctx.random!.Shuffle(deck);

export const dealCards = (deck: Letter[], numPlayers: number) => {
  const extraCardsLeftover = deck.length % numPlayers;
  const maxNumCardsPerPlayer = Math.ceil(deck.length / numPlayers);
  const deckMoreCardsPerPlayer = _.slice(
    deck,
    0,
    maxNumCardsPerPlayer * extraCardsLeftover
  );
  const deckFewerCardsPerPlayer = _.slice(
    deck,
    maxNumCardsPerPlayer * extraCardsLeftover,
    deck.length
  );
  // TODO: Shuffle chunks so that later players do not consistently get fewer cards
  return [
    ..._.chunk(deckMoreCardsPerPlayer, maxNumCardsPerPlayer),
    ..._.chunk(deckFewerCardsPerPlayer, maxNumCardsPerPlayer - 1),
  ];
};
