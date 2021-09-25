import { useMemo, useState, useCallback } from "react";
import _ from "lodash";
import { DragDropContext } from "react-beautiful-dnd";

import { Spelling, PlayerViewG } from "../../../game/types";
import { DisplayRow, DisplayStatus } from "../../display/DisplayRow";
import { GameTable, FullWidthGameTable } from "../../display/GameTable";
import { BottombarPlaceholder } from "../../panels/Bottombar";
import { SidebarPlaceholder, Sidebar } from "../../panels/sidebar/Sidebar";
import { RearrangeLettersBottombar } from "./bottombar/RearrangeLettersBottombar";
import { getDraggableId } from "./draggableId";
import {
  SORTED_WORD_DROPPABLE_ID,
  SortedWordDroppable,
} from "./SortedWordDroppable";
import { UnsortedCards } from "./UnsortedCards";

interface Props {
  g: PlayerViewG;
  currentPlayer: string;
  stage: "rearrangeLettersMain" | "unexpectedWord";
  onConfirmExpectedWord: (spelling: Spelling, expectedWord: string) => void;
  onConfirmUnexpectedWord: (isWord: boolean) => void;
}

export const RearrangeLettersContent = (props: Props) => {
  const {
    g,
    currentPlayer,
    stage,
    onConfirmExpectedWord,
    onConfirmUnexpectedWord,
  } = props;

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

  const [isRearrangingLetters, setIsRearrangingLetters] = useState<boolean>(
    true
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
        <GameTable>
          <DragDropContext onDragEnd={onDragEnd}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <DisplayRow>
                <DisplayStatus>Your letters</DisplayStatus>
                <UnsortedCards
                  isDragDisabled={!isRearrangingLetters}
                  teamLetters={initialTeamLetters}
                  initialCardLocations={initialPlayerCardLocations}
                  sortedCards={sortedCards}
                />
              </DisplayRow>
              <DisplayRow>
                <DisplayStatus>Bonus letters</DisplayStatus>
                <UnsortedCards
                  isDragDisabled={!isRearrangingLetters}
                  teamLetters={initialTeamLetters}
                  initialCardLocations={initialTeamCardLocations}
                  sortedCards={sortedCards}
                />
              </DisplayRow>
              <DisplayRow>
                <DisplayStatus>Your word</DisplayStatus>
                <SortedWordDroppable
                  isDragDisabled={!isRearrangingLetters}
                  playerLetters={initialPlayerLetters}
                  teamLetters={initialTeamLetters}
                  sortedCards={sortedCards}
                />
              </DisplayRow>
            </div>
          </DragDropContext>
          <SidebarPlaceholder />
        </GameTable>
        <BottombarPlaceholder />
      </FullWidthGameTable>
      <Sidebar g={g} />
      <RearrangeLettersBottombar
        stage={stage}
        numSortedCards={sortedCards.length}
        isRearrangingLetters={isRearrangingLetters}
        spelledWord={g.players[+currentPlayer].playerOutcome?.spelledWord}
        onConfirmSortedCards={() => setIsRearrangingLetters(false)}
        onResetSortedCards={() => setSortedCards([])}
        onConfirmExpectedWord={(expectedWord) =>
          onConfirmExpectedWord(sortedCards, expectedWord)
        }
        onCancelExpectedWord={() => setIsRearrangingLetters(true)}
        onConfirmUnexpectedWord={onConfirmUnexpectedWord}
      />
    </>
  );
};
