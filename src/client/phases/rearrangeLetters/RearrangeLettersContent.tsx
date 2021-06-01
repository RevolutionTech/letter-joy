import { useMemo, useState, useCallback } from "react";
import _ from "lodash";
import { DragDropContext } from "react-beautiful-dnd";

import { LETTERS_PER_PLAYER } from "../../../game/constants";
import { Spelling, PlayerViewG } from "../../../game/types";
import { DisplayRow, DisplayStatus } from "../../display/DisplayRow";
import { FullWidthGameTable } from "../../display/GameTable";
import { Bottombar, BottombarPlaceholder } from "../../panels/Bottombar";
import { Button } from "../../panels/Button";
import { getDraggableId } from "./draggableId";
import {
  SORTED_WORD_DROPPABLE_ID,
  SortedWordDroppable,
} from "./SortedWordDroppable";
import { UnsortedCards } from "./UnsortedCards";

interface Props {
  g: PlayerViewG;
  currentPlayer: string;
}

export const RearrangeLettersContent = (props: Props) => {
  const { g, currentPlayer } = props;

  const initialTeamLetters = g.teamLetters;
  const initialPlayerLetters = g.players[+currentPlayer].letters;
  const initialPlayerCardLocations = useMemo(
    () =>
      initialPlayerLetters.map((_, i) => ({
        ownerID: currentPlayer,
        letterIndex: i,
      })),
    [currentPlayer, initialPlayerLetters]
  );
  const initialTeamCardLocations = useMemo(
    () =>
      initialTeamLetters.map((_, i) => ({
        ownerID: "TEAM",
        letterIndex: i,
      })),
    [initialTeamLetters]
  );

  const [sortedCards, setSortedCards] = useState<Spelling>([]);

  const onDragEnd = useCallback(
    (result) => {
      const { draggableId, source, destination } = result;

      // Do nothing unless the draggable
      // was placed into or reordered in the sorted word droppable
      if (
        destination == null ||
        destination.droppableId !== SORTED_WORD_DROPPABLE_ID ||
        (source.droppableId === destination.droppableId &&
          source.index === destination.index)
      ) {
        return;
      }

      // Get the card that was dragged
      const draggedCard = _.find(
        _.concat(initialPlayerCardLocations, initialTeamCardLocations),
        (card) => getDraggableId(card) === draggableId
      )!;

      // Remove the dragged card from the sorted list (if it was there at all)
      // and insert the card to the spot it was dragged to
      setSortedCards((cards) => {
        const otherCards = _.without(cards, draggedCard);
        return [
          ..._.slice(otherCards, 0, destination.index),
          draggedCard,
          ..._.slice(otherCards, destination.index),
        ];
      });
    },
    [initialPlayerCardLocations, initialTeamCardLocations]
  );

  return (
    <>
      <FullWidthGameTable>
        <DragDropContext onDragEnd={onDragEnd}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <DisplayRow>
              <DisplayStatus>Your letters</DisplayStatus>
              <UnsortedCards
                teamLetters={g.teamLetters}
                initialCardLocations={initialPlayerCardLocations}
                sortedCards={sortedCards}
              />
            </DisplayRow>
            <DisplayRow>
              <DisplayStatus>Bonus letters</DisplayStatus>
              <UnsortedCards
                teamLetters={g.teamLetters}
                initialCardLocations={initialTeamCardLocations}
                sortedCards={sortedCards}
              />
            </DisplayRow>
            <DisplayRow>
              <DisplayStatus>Your word</DisplayStatus>
              <SortedWordDroppable
                teamLetters={g.teamLetters}
                sortedCards={sortedCards}
              />
            </DisplayRow>
          </div>
        </DragDropContext>
        <BottombarPlaceholder />
      </FullWidthGameTable>
      <Bottombar
        buttons={[
          <Button
            key="confirm"
            variant="contained"
            color="primary"
            size="large"
            disabled={sortedCards.length < LETTERS_PER_PLAYER}
          >
            Confirm
          </Button>,
          <Button
            key="reset"
            variant="outlined"
            size="large"
            disabled={sortedCards.length === 0}
            onClick={() => setSortedCards([])}
          >
            Reset
          </Button>,
        ]}
      >
        <div>
          <div style={{ fontSize: "36pt" }}>
            Rearrange your letters to spell a word.
          </div>
          <div style={{ fontSize: "24pt" }}>
            You may use bonus letters too, but then no one else can.
          </div>
        </div>
      </Bottombar>
    </>
  );
};
