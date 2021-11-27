import _ from "lodash";

import { Letter, OwnerType, Spelling, Clue } from "./types";

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

export const clueSummary = (teamLetters: Letter[], placement: Spelling) => {
  const usesWild = _.some(
    placement,
    (cardLocation) =>
      cardLocation.owner.ownerType === OwnerType.TEAM &&
      teamLetters[cardLocation.letterIndex] === Letter.WILD
  );
  return {
    numLetters: placement.length,
    usesWild,
    numNonPlayers: getUniqueOwners(
      placement,
      OwnerType.NONPLAYER,
      "nonPlayerIndex"
    ).length,
    numPlayers: getUniqueOwners(placement, OwnerType.PLAYER, "playerID").length,
  };
};

export const createPreviousClue = (
  teamLetters: Letter[],
  activeClue: Clue
) => ({
  ...activeClue,
  spelling: activeClue.spelling.map((card) =>
    card.owner.ownerType === OwnerType.TEAM
      ? teamLetters[card.letterIndex]
      : card
  ),
});
