import { Letter, CardStack, OwnerCardLocation } from "../../../game/types";
import { AdvanceLetter } from "./AdvanceLetter";
import { GuessBonusLetter } from "./GuessBonusLetter";

interface Props {
  activeLetter: OwnerCardLocation;
  onAdvanceLetter: (letterGuess?: Letter) => void;
  onConfirmActiveLetter: () => void;
}

export const AdvanceDecisionContent = (props: Props) => {
  const { activeLetter, onAdvanceLetter, onConfirmActiveLetter } = props;
  return activeLetter.stack === CardStack.SINGLE ? (
    <GuessBonusLetter
      onAdvanceLetter={onAdvanceLetter}
      onConfirmActiveLetter={onConfirmActiveLetter}
    />
  ) : (
    <AdvanceLetter
      activeLetterIndex={activeLetter.letterIndex}
      onAdvanceLetter={onAdvanceLetter}
      onConfirmActiveLetter={onConfirmActiveLetter}
    />
  );
};
