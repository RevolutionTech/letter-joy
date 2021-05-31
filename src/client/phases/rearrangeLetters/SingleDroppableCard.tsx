import { styled } from "@material-ui/core";
import { Droppable } from "react-beautiful-dnd";

import { Letter } from "../../../game/types";
import {
  CARD_WIDTH,
  CARD_BORDER_WIDTH,
  CARD_MARGIN_RIGHT,
} from "../../cards/Card";
import { DraggableCard } from "./DraggableCard";

const CardPlaceholder = styled("div")({
  width: `calc(${CARD_WIDTH}px + ${CARD_BORDER_WIDTH}px * 2)`,
  marginRight: `${CARD_MARGIN_RIGHT}px`,
});

interface Props {
  droppableId: string;
  letter: Letter | null;
  isPlaceholder: boolean;
}

export const SingleDroppableCard = (props: Props) => {
  const { droppableId, letter, isPlaceholder } = props;
  return (
    <Droppable droppableId={droppableId} isDropDisabled>
      {(droppableProvided) => (
        <div
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
        >
          {isPlaceholder ? (
            <CardPlaceholder />
          ) : (
            <DraggableCard
              draggableId={droppableId}
              index={0}
              letter={letter}
            />
          )}
          {droppableProvided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
