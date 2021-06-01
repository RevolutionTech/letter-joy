import { styled } from "@material-ui/core";
import { Droppable } from "react-beautiful-dnd";

import {
  CARD_WIDTH,
  CARD_BORDER_WIDTH,
  CARD_MARGIN_RIGHT,
} from "../../cards/Card";
import { DraggableCard } from "./DraggableCard";
import { SortableCard, getSortableCardId } from "./sortableCard";

const CardPlaceholder = styled("div")({
  width: `calc(${CARD_WIDTH}px + ${CARD_BORDER_WIDTH}px * 2)`,
  marginRight: `${CARD_MARGIN_RIGHT}px`,
});

interface Props {
  card: SortableCard;
  isPlaceholder: boolean;
}

export const SingleDroppableCard = (props: Props) => {
  const { card, isPlaceholder } = props;
  const sortableCardId = getSortableCardId(card);
  return (
    <Droppable droppableId={sortableCardId} isDropDisabled>
      {(droppableProvided) => (
        <div
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
        >
          {isPlaceholder ? (
            <CardPlaceholder />
          ) : (
            <DraggableCard
              draggableId={sortableCardId}
              index={0}
              letter={card.letter}
            />
          )}
          {droppableProvided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
