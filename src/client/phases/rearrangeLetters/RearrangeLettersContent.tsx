import { useMemo, useState, useCallback } from "react";
import _ from "lodash";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

import {
  OwnerType,
  CardStack,
  CardLocation,
  Spelling,
  PlayerViewG,
} from "../../../game/types";
import { DisplayCell, DisplayStatus } from "../../display/DisplayCell";
import { PanelLayout } from "../../panels/PanelLayout";
import { Sidebar } from "../../panels/sidebar/Sidebar";
import { getDraggableId } from "./draggableId";
import { RearrangeLettersSidebar } from "./sidebar/RearrangeLettersSidebar";
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

  const initialPlayerLetters = g.players[+currentPlayer].letters;
  const initialPlayerCardLocations: CardLocation[] = useMemo(
    () =>
      initialPlayerLetters.map((_, i) => ({
        owner: {
          ownerType: OwnerType.PLAYER,
          playerID: currentPlayer,
        },
        stack: CardStack.ARRAY,
        letterIndex: i,
      })),
    [currentPlayer, initialPlayerLetters]
  );
  const initialTeamCardLocations = useMemo(
    () => [
      ...(g.team.wild == null
        ? []
        : [{ owner: { ownerType: OwnerType.TEAM }, stack: CardStack.SINGLE }]),
      ...g.team.bonus.map((_, i) => ({
        owner: { ownerType: OwnerType.TEAM },
        stack: CardStack.ARRAY,
        letterIndex: i,
      })),
    ],
    [g.team.wild, g.team.bonus]
  ) as CardLocation[];

  const [isRearrangingLetters, setIsRearrangingLetters] =
    useState<boolean>(true);
  const [sortedCards, setSortedCards] = useState<Spelling>([]);

  const onDragEnd = useCallback(
    (result: DropResult) => {
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
    <PanelLayout
      sidebar={
        <Sidebar g={g}>
          <RearrangeLettersSidebar
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
        </Sidebar>
      }
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <DisplayCell>
            <DisplayStatus>Your letters</DisplayStatus>
            <UnsortedCards
              isDragDisabled={!isRearrangingLetters}
              teamLetters={g.team.bonus}
              initialCardLocations={initialPlayerCardLocations}
              sortedCards={sortedCards}
            />
          </DisplayCell>
          {(g.team.wild != null || g.team.bonus.length > 0) && (
            <DisplayCell>
              <DisplayStatus>Bonus letters</DisplayStatus>
              <UnsortedCards
                isDragDisabled={!isRearrangingLetters}
                teamLetters={g.team.bonus}
                initialCardLocations={initialTeamCardLocations}
                sortedCards={sortedCards}
              />
            </DisplayCell>
          )}
          <DisplayCell>
            <DisplayStatus>Your word</DisplayStatus>
            <SortedWordDroppable
              isDragDisabled={!isRearrangingLetters}
              playerLetters={initialPlayerLetters}
              teamLetters={g.team.bonus}
              sortedCards={sortedCards}
            />
          </DisplayCell>
        </div>
      </DragDropContext>
    </PanelLayout>
  );
};
