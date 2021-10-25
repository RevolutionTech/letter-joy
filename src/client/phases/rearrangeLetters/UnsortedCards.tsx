import _ from "lodash";
import { styled } from "@material-ui/core";

import { Letter, Spelling } from "../../../game/types";
import { CARD_HEIGHT, CARD_BORDER_WIDTH } from "../../cards/Card";
import { HandOfCards } from "../../display/DisplayCell";
import { SingleDroppableCard } from "./SingleDroppableCard";

const UnsortedHandOfCards = styled(HandOfCards)({
  minHeight: `calc(${CARD_HEIGHT}px + ${CARD_BORDER_WIDTH}px * 2)`,
});

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
    <UnsortedHandOfCards>
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
    </UnsortedHandOfCards>
  );
};
