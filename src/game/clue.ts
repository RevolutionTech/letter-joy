import _ from "lodash";

import { Letter, OwnerType, Spelling, Clue } from "./types";

export const clueSummary = (teamLetters: Letter[], placement: Spelling) => {
  const usesWild = _.some(
    placement,
    (cardLocation) =>
      cardLocation.owner.ownerType === OwnerType.TEAM &&
      teamLetters[cardLocation.letterIndex] === Letter.WILD
  );
  const playerLocations = placement.filter(
    (card) => card.owner.ownerType === OwnerType.PLAYER
  );
  return {
    numLetters: placement.length,
    usesWild,
    numPlayers: Object.keys(_.groupBy(playerLocations, "playerID")).length,
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
