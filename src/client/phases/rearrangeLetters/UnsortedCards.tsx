import _ from "lodash";

import { Letter, Spelling } from "../../../game/types";
import { HandOfCards } from "../../display/DisplayCell";
import { SingleDroppableCard } from "./SingleDroppableCard";

interface Props {
  isDragDisabled: boolean;
  teamLetters: Letter[];
  initialCardLocations: Spelling;
  sortedCards: Spelling;
}

export const UnsortedCards = (props: Props) => {
  const { isDragDisabled, teamLetters, initialCardLocations, sortedCards } =
    props;
  return (
    <HandOfCards>
      {initialCardLocations.map((cardLocation, i) => (
        <SingleDroppableCard
          key={i}
          isDragDisabled={isDragDisabled}
          teamLetters={teamLetters}
          cardLocation={cardLocation}
          isPlaceholder={_.some(
            sortedCards,
            (c) =>
              c.ownerID === cardLocation.ownerID &&
              c.letterIndex === cardLocation.letterIndex
          )}
        />
      ))}
    </HandOfCards>
  );
};
