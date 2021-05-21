import _ from "lodash";
import { Ctx } from "boardgame.io";

import { LETTER_DISTRIBUTION } from "./constants";
import { Letter } from "./types";

const createShuffledDeck = (ctx: Ctx) => {
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

const dealCards = (deck: Letter[], numPlayers: number) => {
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
  return [
    ..._.chunk(deckMoreCardsPerPlayer, maxNumCardsPerPlayer),
    ..._.chunk(deckFewerCardsPerPlayer, maxNumCardsPerPlayer - 1),
  ];
};

export const createDeckAndDeal = (ctx: Ctx, numPlayers: number) => {
  const deck = createShuffledDeck(ctx);
  const playerCards = dealCards(deck, numPlayers);
  return playerCards;
};
