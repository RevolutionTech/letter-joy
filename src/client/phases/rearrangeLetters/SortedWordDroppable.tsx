import _ from "lodash";
import { styled } from "@material-ui/core";
import { Droppable } from "react-beautiful-dnd";

import { LETTERS_PER_PLAYER } from "../../../game/constants";
import { SortableCard } from "../../../game/types";
import {
  CARD_WIDTH,
  CARD_HEIGHT,
  CARD_BORDER_WIDTH,
  CARD_MARGIN_RIGHT,
} from "../../cards/Card";
import { HandOfCards } from "../../display/DisplayRow";
import theme from "../../theme";
import { DraggableCard } from "./DraggableCard";

export const SORTED_WORD_DROPPABLE_ID = "sorted-word";
const CARD_SLOT_HEIGHT = CARD_HEIGHT + 8;
export const CARD_SLOT_PADDING = 8;

const CardSlot = styled("div")({
  display: "flex",
  height: `${CARD_SLOT_HEIGHT}px`,
  padding: `${CARD_SLOT_PADDING}px`,

  backgroundColor: theme.white,
  borderRadius: "10px",

  transition: "width 0.4s ease",
});

const cardSlotWidth = (numCards: number) =>
  `calc(${CARD_SLOT_PADDING}px * 2 + (${CARD_WIDTH}px + ${CARD_BORDER_WIDTH}px * 2 + ${CARD_MARGIN_RIGHT}px) * ${numCards} - ${CARD_MARGIN_RIGHT}px)`;

interface Props {
  sortedCards: SortableCard[];
}

export const SortedWordDroppable = (props: Props) => {
  const { sortedCards } = props;
  return (
    <HandOfCards>
      <Droppable droppableId={SORTED_WORD_DROPPABLE_ID} direction="horizontal">
        {(provided) => (
          <CardSlot
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              width: cardSlotWidth(
                _.max([LETTERS_PER_PLAYER, sortedCards.length + 1]) ??
                  LETTERS_PER_PLAYER
              ),
            }}
          >
            {sortedCards.map((card, i) => (
              <DraggableCard
                key={card.id}
                draggableId={card.id}
                index={i}
                letter={card.letter}
              />
            ))}
            {provided.placeholder}
          </CardSlot>
        )}
      </Droppable>
    </HandOfCards>
  );
};
