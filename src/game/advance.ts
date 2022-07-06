import { Ctx } from "boardgame.io";

import { LETTERS_PER_PLAYER } from "./constants";
import { drawFromDeck } from "./deck";
import {
  Letter,
  OwnerType,
  CardStack,
  CardLocation,
  OwnerCardLocation,
  PlayerState,
  G,
} from "./types";

const isCardLocation = (card: CardLocation | Letter): card is CardLocation => {
  return (card as CardLocation).owner != null;
};

export const bonusLettersReplacedInPreviousClues = (g: G) =>
  g.previousClues.map((clue) => ({
    ...clue,
    spelling: clue.spelling.map((card) => {
      if (
        isCardLocation(card) &&
        card.owner.ownerType === OwnerType.PLAYER &&
        card.stack === CardStack.SINGLE
      ) {
        const playerState = g.players[+card.owner.playerID];
        if (playerState.bonusLetter && playerState.requestAdvanceLetter) {
          return playerState.bonusLetter;
        }
      }

      return card;
    }),
  }));

export const maybeAdvanceLetter = (playerState: PlayerState) => {
  const { activeLetter, requestAdvanceLetter } = playerState;
  if (requestAdvanceLetter && activeLetter.stack === CardStack.ARRAY) {
    const nextLetterIndex = activeLetter.letterIndex + 1;
    const newActiveLetter = (
      nextLetterIndex >= LETTERS_PER_PLAYER
        ? { stack: CardStack.SINGLE }
        : {
            stack: CardStack.ARRAY,
            letterIndex: nextLetterIndex,
          }
    ) as OwnerCardLocation;
    return {
      ...playerState,
      activeLetter: newActiveLetter,
    };
  } else {
    return playerState;
  }
};

export const maybeDrawNewBonusLetter = (
  g: G,
  ctx: Ctx,
  playerState: PlayerState
) => {
  if (
    playerState.requestAdvanceLetter &&
    playerState.activeLetter.stack === CardStack.SINGLE
  ) {
    const bonusLetter = drawFromDeck(g, ctx);
    if (playerState.bonusLetter != null) {
      g.discardPile.push(playerState.bonusLetter);
    }
    return { ...playerState, bonusLetter };
  } else {
    return playerState;
  }
};
