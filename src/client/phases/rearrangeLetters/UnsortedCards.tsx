import _ from "lodash";
import { styled } from "@material-ui/core";

import { HandOfCards } from "../../display/DisplayRow";
import { SingleDroppableCard } from "./SingleDroppableCard";
import { SortableCard } from "./sortableCard";
import { CARD_SLOT_PADDING } from "./SortedWordDroppable";

const UnsortedHandOfCards = styled(HandOfCards)({
  marginLeft: CARD_SLOT_PADDING,
});

interface Props {
  initialCards: SortableCard[];
  sortedCards: SortableCard[];
}

export const UnsortedCards = (props: Props) => {
  const { initialCards, sortedCards } = props;
  return (
    <UnsortedHandOfCards>
      {initialCards.map((card, i) => (
        <SingleDroppableCard
          key={i}
          card={card}
          isPlaceholder={_.some(
            sortedCards,
            (c) => c.origin === card.origin && c.index === card.index
          )}
        />
      ))}
    </UnsortedHandOfCards>
  );
};
