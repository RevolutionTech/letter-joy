import { assertNever } from "../../../../game/utils";
import { ConfirmExpectedWordContent } from "./ConfirmExpectedWordContent";
import { ConfirmSortedCardsContent } from "./ConfirmSortedCardsContent";
import { ConfirmUnexpectedWordContent } from "./ConfirmUnexpectedWordContent";

interface Props {
  stage: "rearrangeLettersMain" | "unexpectedWord";
  numSortedCards: number;
  isRearrangingLetters: boolean;
  spelledWord?: string;
  onConfirmSortedCards: () => void;
  onResetSortedCards: () => void;
  onConfirmExpectedWord: (expectedWord: string) => void;
  onCancelExpectedWord: () => void;
  onConfirmUnexpectedWord: (isWord: boolean) => void;
}

export const RearrangeLettersBottombar = (props: Props) => {
  const {
    stage,
    numSortedCards,
    isRearrangingLetters,
    spelledWord,
    onConfirmSortedCards,
    onResetSortedCards,
    onConfirmExpectedWord,
    onCancelExpectedWord,
    onConfirmUnexpectedWord,
  } = props;
  if (stage === "rearrangeLettersMain") {
    return isRearrangingLetters ? (
      <ConfirmSortedCardsContent
        numSortedCards={numSortedCards}
        onConfirmSortedCards={onConfirmSortedCards}
        onResetSortedCards={onResetSortedCards}
      />
    ) : (
      <ConfirmExpectedWordContent
        numSortedCards={numSortedCards}
        onConfirmExpectedWord={onConfirmExpectedWord}
        onCancelExpectedWord={onCancelExpectedWord}
      />
    );
  } else if (stage === "unexpectedWord") {
    return spelledWord == null ? null : (
      <ConfirmUnexpectedWordContent
        spelledWord={spelledWord}
        onConfirmUnexpectedWord={onConfirmUnexpectedWord}
      />
    );
  } else {
    return assertNever(stage);
  }
};
