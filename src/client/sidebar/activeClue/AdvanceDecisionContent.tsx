import { styled } from "@material-ui/core";

import { Button } from "../Button";

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

// https://stackoverflow.com/a/13627586/3241924
const getOrdinalSuffix = (i: number): string => {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return i + "st";
  }
  if (j === 2 && k !== 12) {
    return i + "nd";
  }
  if (j === 3 && k !== 13) {
    return i + "rd";
  }
  return i + "th";
};

interface Props {
  activeLetterIndex: number;
  onAdvanceLetter: () => void;
  onConfirmActiveLetter: () => void;
}

export const AdvanceDecisionContent = (props: Props) => {
  const { activeLetterIndex, onAdvanceLetter, onConfirmActiveLetter } = props;
  return (
    <AdvanceDecisionButtons>
      <AdvanceDecisionButton>
        <AdvanceDecisionButtonHelpText>
          I know my {getOrdinalSuffix(activeLetterIndex + 1)} letter!
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
