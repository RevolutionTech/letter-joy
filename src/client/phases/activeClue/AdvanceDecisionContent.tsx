import { styled } from "@mui/material";

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
