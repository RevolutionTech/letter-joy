import _ from "lodash";
import { styled } from "@mui/material";
import { Droppable } from "react-beautiful-dnd";

import { LETTERS_PER_PLAYER } from "../../../game/constants";
import { Letter, Spelling } from "../../../game/types";
import {
  CARD_WIDTH,
  CARD_HEIGHT,
  CARD_BORDER_WIDTH,
  CARD_MARGIN_RIGHT,
} from "../../cards/Card";
import { HandOfCards } from "../../display/DisplayCell";
import theme from "../../theme";
import { DraggableCard } from "./DraggableCard";
import { getDraggableId } from "./draggableId";

export const SORTED_WORD_DROPPABLE_ID = "sorted-word";
const CARD_SLOT_HEIGHT = CARD_HEIGHT + 8;
const CARD_SLOT_PADDING = 8;

const CardSlot = styled("div")({
  display: "flex",
  height: `${CARD_SLOT_HEIGHT}px`,
  padding: `${CARD_SLOT_PADDING}px`,
  marginBottom: "16px",

  backgroundColor: theme.white,
  borderRadius: "4px",

  transition: "width 0.4s ease",
});

const cardSlotWidth = (numCards: number) =>
  `calc(${CARD_SLOT_PADDING}px * 2 + (${CARD_WIDTH}px + ${CARD_BORDER_WIDTH}px * 2 + ${CARD_MARGIN_RIGHT}px) * ${numCards} - ${CARD_MARGIN_RIGHT}px)`;

interface Props {
  isDragDisabled: boolean;
  playerLetters: (Letter | null)[];
  teamLetters: Letter[];
  sortedCards: Spelling;
}

export const SortedWordDroppable = (props: Props) => {
  const { isDragDisabled, playerLetters, teamLetters, sortedCards } = props;
  return (
    <HandOfCards>
      <Droppable droppableId={SORTED_WORD_DROPPABLE_ID} direction="horizontal">
        {(provided) => (
          <CardSlot
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              width: cardSlotWidth(
                _.max([
                  LETTERS_PER_PLAYER,
                  sortedCards.length + (isDragDisabled ? 0 : 1),
                ]) ?? LETTERS_PER_PLAYER
              ),
            }}
          >
            {sortedCards.map((card, i) => {
              const draggableId = getDraggableId(card);
              const letter =
                card.ownerID === "TEAM"
                  ? teamLetters[card.letterIndex]
                  : playerLetters[card.letterIndex];
              return (
                <DraggableCard
                  key={draggableId}
                  draggableId={draggableId}
                  index={i}
                  letter={letter}
                  isDragDisabled={isDragDisabled}
                />
              );
            })}
            {provided.placeholder}
          </CardSlot>
        )}
      </Droppable>
    </HandOfCards>
  );
};
