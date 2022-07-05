import { styled } from "@mui/material";

import { CardStack, OwnerCardLocation } from "../../../game/types";
import { getOrdinalSuffix } from "../../../game/utils";
import { Button } from "../../panels/Button";

const AdvanceDecisionButtons = styled("div")({
  display: "flex",
  justifyContent: "space-evenly",
  marginBottom: "16px",
});

const AdvanceDecisionButton = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const AdvanceDecisionButtonHelpText = styled("div")({
  marginTop: "8px",
  marginBottom: "8px",
});

const advanceLetterCopy = (activeLetter: OwnerCardLocation) => {
  if (activeLetter.stack === CardStack.SINGLE) {
    return "I know my bonus letter!";
  } else {
    const suffix = getOrdinalSuffix(activeLetter.letterIndex + 1);
    return `I know my ${suffix} letter!`;
  }
};

interface Props {
  activeLetter: OwnerCardLocation;
  onAdvanceLetter: () => void;
  onConfirmActiveLetter: () => void;
}

export const AdvanceDecisionContent = (props: Props) => {
  const { activeLetter, onAdvanceLetter, onConfirmActiveLetter } = props;
  return (
    <AdvanceDecisionButtons>
      <AdvanceDecisionButton>
        <AdvanceDecisionButtonHelpText>
          {advanceLetterCopy(activeLetter)}
        </AdvanceDecisionButtonHelpText>
        <Button
          variant="outlined"
          onClick={() => {
            onAdvanceLetter();
            onConfirmActiveLetter();
          }}
        >
          Next Letter
        </Button>
      </AdvanceDecisionButton>
      <AdvanceDecisionButton>
        <AdvanceDecisionButtonHelpText>
          I need another clue&#8230;
        </AdvanceDecisionButtonHelpText>
        <Button variant="outlined" onClick={onConfirmActiveLetter}>
          Keep Letter
        </Button>
      </AdvanceDecisionButton>
    </AdvanceDecisionButtons>
  );
};
