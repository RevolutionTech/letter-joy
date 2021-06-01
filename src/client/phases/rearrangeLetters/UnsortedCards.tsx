import _ from "lodash";
import { styled } from "@material-ui/core";

import { Letter, Spelling } from "../../../game/types";
import { HandOfCards } from "../../display/DisplayRow";
import { SingleDroppableCard } from "./SingleDroppableCard";
import { CARD_SLOT_PADDING } from "./SortedWordDroppable";

const UnsortedHandOfCards = styled(HandOfCards)({
  marginLeft: CARD_SLOT_PADDING,
});

interface Props {
  teamLetters: Letter[];
  initialCardLocations: Spelling;
  sortedCards: Spelling;
}

export const UnsortedCards = (props: Props) => {
  const { teamLetters, initialCardLocations, sortedCards } = props;
  return (
    <UnsortedHandOfCards>
      {initialCardLocations.map((cardLocation, i) => (
        <SingleDroppableCard
          key={i}
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
