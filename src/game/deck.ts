import _ from "lodash";
import { DefaultPluginAPIs } from "boardgame.io";

import { MAX_NUM_PLAYERS, MIN_NUM_LETTERS_NON_PLAYER } from "./constants";
import { G, Letter } from "./types";

export const createDeck = (distribution: Record<Letter, number>): Letter[] =>
  _.reduce(
    distribution,
    (result: string[], value: number, key: string) => [
      ...result,
      ...Array(value).fill(key),
    ],
    []
  ) as Letter[];

export const drawCard = (deck: Letter[]) => {
  const card = deck[0];
  const remainingDeck = _.slice(deck, 1);
  return [card, remainingDeck] as const;
};

export const dealNonPlayerCards = (
  deck: Letter[],
  numPlayers: number
): [Letter[][], Letter[]] => {
  const numNonPlayers = MAX_NUM_PLAYERS - numPlayers;
  const maxNumLettersNonPlayer = MIN_NUM_LETTERS_NON_PLAYER + numNonPlayers;

  let nonPlayerDeckCuts: Letter[][] = [];
  let startIndex = 0;

  for (
    let numLetters = MIN_NUM_LETTERS_NON_PLAYER;
    numLetters < maxNumLettersNonPlayer;
    numLetters++
  ) {
    nonPlayerDeckCuts = [
      ...nonPlayerDeckCuts,
      _.slice(deck, startIndex, startIndex + numLetters),
    ];
    startIndex += numLetters;
  }

  return [nonPlayerDeckCuts, _.slice(deck, startIndex)];
};

export const dealCardsEvenly = (deck: Letter[], numPlayers: number) => {
  const extraCardsLeftover = deck.length % numPlayers;
  const maxNumCardsPerPlayer = Math.ceil(deck.length / numPlayers);
  const minNumCardsPerPlayer = extraCardsLeftover
    ? maxNumCardsPerPlayer - 1
    : maxNumCardsPerPlayer;
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
    ..._.chunk(deckFewerCardsPerPlayer, minNumCardsPerPlayer),
  ];
};

export const drawFromDeck = (g: G, random: DefaultPluginAPIs["random"]) => {
  let drawPile = g.drawPile;

  // Reshuffle the discard if the draw pile is empty
  if (drawPile.length === 0) {
    drawPile = random.Shuffle(g.discardPile);
    g.discardPile = [];
  }

  // Draw a card from the draw pile, updating it
  const [card, newDraw] = drawCard(drawPile);
  g.drawPile = newDraw;

  return card;
};
