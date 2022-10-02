import { styled } from "@mui/material";
import { Droppable } from "@hello-pangea/dnd";

import {
  Letter,
  OwnerType,
  CardLocation,
  CardStack,
} from "../../../game/types";
import {
  CARD_WIDTH,
  CARD_BORDER_WIDTH,
  CARD_MARGIN_RIGHT,
} from "../../cards/Paper";
import { DraggableCard } from "./DraggableCard";
import { getDraggableId } from "./draggableId";

const CardPlaceholder = styled("div")({
  width: `calc(${CARD_WIDTH}px + ${CARD_BORDER_WIDTH}px * 2)`,
  marginRight: `${CARD_MARGIN_RIGHT}px`,
});

const letterFromCardLocation = (
  teamLetters: Letter[],
  cardLocation: CardLocation
) => {
  if (cardLocation.owner.ownerType === OwnerType.TEAM) {
    return cardLocation.stack === CardStack.SINGLE
      ? Letter.WILD
      : teamLetters[cardLocation.letterIndex];
  } else {
    return null;
  }
};

interface Props {
  isDragDisabled: boolean;
  teamLetters: Letter[];
  cardLocation: CardLocation;
  isPlaceholder: boolean;
}

export const SingleDroppableCard = (props: Props) => {
  const { isDragDisabled, teamLetters, cardLocation, isPlaceholder } = props;
  const draggableId = getDraggableId(cardLocation);
  const letter = letterFromCardLocation(teamLetters, cardLocation);

  return (
    <Droppable droppableId={draggableId} isDropDisabled>
      {(droppableProvided) => (
        <div
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
        >
          {isPlaceholder ? (
            <CardPlaceholder />
          ) : (
            <DraggableCard
              draggableId={draggableId}
              index={0}
              letter={letter}
              destinedOwner={cardLocation.owner.ownerType}
              isDragDisabled={isDragDisabled}
            />
          )}
          {droppableProvided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
