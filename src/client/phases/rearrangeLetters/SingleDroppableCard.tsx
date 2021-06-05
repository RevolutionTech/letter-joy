import { styled } from "@material-ui/core";
import { Droppable } from "react-beautiful-dnd";

import { Letter, CardLocation } from "../../../game/types";
import {
  CARD_WIDTH,
  CARD_BORDER_WIDTH,
  CARD_MARGIN_RIGHT,
} from "../../cards/Card";
import { DraggableCard } from "./DraggableCard";
import { getDraggableId } from "./draggableId";

const CardPlaceholder = styled("div")({
  width: `calc(${CARD_WIDTH}px + ${CARD_BORDER_WIDTH}px * 2)`,
  marginRight: `${CARD_MARGIN_RIGHT}px`,
});

interface Props {
  isDragDisabled: boolean;
  teamLetters: Letter[];
  cardLocation: CardLocation;
  isPlaceholder: boolean;
}

export const SingleDroppableCard = (props: Props) => {
  const { isDragDisabled, teamLetters, cardLocation, isPlaceholder } = props;
  const draggableId = getDraggableId(cardLocation);
  const letter =
    cardLocation.ownerID === "TEAM"
      ? teamLetters[cardLocation.letterIndex]
      : null;

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
              isDragDisabled={isDragDisabled}
            />
          )}
          {droppableProvided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
