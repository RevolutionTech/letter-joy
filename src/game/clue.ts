import _ from "lodash";

import { Letter, OwnerType, CardStack, Spelling, Clue } from "./types";

export const getUniqueBonus = (spelling: Spelling) => {
  const bonusCards = spelling.filter(
    (card) =>
      card.owner.ownerType === OwnerType.TEAM && card.stack === CardStack.ARRAY
  ) as {
    owner: { ownerType: OwnerType.TEAM };
    stack: CardStack.ARRAY;
    letterIndex: number;
  }[];
  const bonusIds = bonusCards.map((card) => card.letterIndex);
  return _.uniq(bonusIds);
};

export const getUniqueOwners = (
  spelling: Spelling,
  ownerType: OwnerType,
  ownerKey: string
) => {
  const filteredOwners = spelling
    .filter((card) => card.owner.ownerType === ownerType)
    .map((card) => card.owner);
  return Object.keys(_.groupBy(filteredOwners, ownerKey));
};

export const clueSummary = (placement: Spelling) => {
  const usesWild = _.some(
    placement,
    (cardLocation) =>
      cardLocation.owner.ownerType === OwnerType.TEAM &&
      cardLocation.stack === CardStack.SINGLE
  );
  return {
    numLetters: placement.length,
    usesWild,
    numBonus: getUniqueBonus(placement).length,
    numNonPlayers: getUniqueOwners(
      placement,
      OwnerType.NONPLAYER,
      "nonPlayerIndex"
    ).length,
    numPlayers: getUniqueOwners(placement, OwnerType.PLAYER, "playerID").length,
  };
};

export const createPreviousClue = (
  bonusLetters: Letter[],
  nonPlayers: Letter[][],
  activeClue: Clue
) => ({
  ...activeClue,
  spelling: activeClue.spelling.map((card) => {
    switch (card.owner.ownerType) {
      case OwnerType.TEAM:
        return card.stack === CardStack.SINGLE
          ? Letter.WILD
          : bonusLetters[card.letterIndex];
      case OwnerType.NONPLAYER:
        return nonPlayers[card.owner.nonPlayerIndex][
          card.stack === CardStack.SINGLE ? 0 : card.letterIndex
        ];
      default:
        return card;
    }
  }),
});
